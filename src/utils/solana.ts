import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createTransferInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  getAccount,
} from "@solana/spl-token";

export interface Recipient {
  address: string;
  amount: string;
}

export interface TransactionResult {
  signature: string;
  success: boolean;
  error?: string;
}

/**
 * Send SOL to multiple recipients in a single transaction
 */
export async function sendSOLToMultiple(
  connection: Connection,
  senderPublicKey: PublicKey,
  recipients: Recipient[],
  sendTransaction: (transaction: Transaction) => Promise<string>
): Promise<TransactionResult> {
  try {
    const transaction = new Transaction();

    for (const recipient of recipients) {
      const recipientPublicKey = new PublicKey(recipient.address);
      const amountLamports = Math.floor(
        parseFloat(recipient.amount) * LAMPORTS_PER_SOL
      );

      const instruction = SystemProgram.transfer({
        fromPubkey: senderPublicKey,
        toPubkey: recipientPublicKey,
        lamports: amountLamports,
      });

      transaction.add(instruction);
    }

    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = senderPublicKey;

    // Send transaction
    const signature = await sendTransaction(transaction);

    // Confirm transaction
    await connection.confirmTransaction(signature, "confirmed");

    return {
      signature,
      success: true,
    };
  } catch (error) {
    console.error("SOL transfer failed:", error);
    return {
      signature: "",
      success: false,
      error: error instanceof Error ? error.message : "Transaction failed",
    };
  }
}

/**
 * Send SPL tokens to multiple recipients in a single transaction
 */
export async function sendTokenToMultiple(
  connection: Connection,
  senderPublicKey: PublicKey,
  recipients: Recipient[],
  tokenMintAddress: string,
  decimals: number,
  sendTransaction: (transaction: Transaction) => Promise<string>
): Promise<TransactionResult> {
  try {
    const transaction = new Transaction();
    const mintPublicKey = new PublicKey(tokenMintAddress);

    // Get sender's token account
    const senderTokenAccount = await getAssociatedTokenAddress(
      mintPublicKey,
      senderPublicKey
    );

    for (const recipient of recipients) {
      const recipientPublicKey = new PublicKey(recipient.address);
      const amount = Math.floor(
        parseFloat(recipient.amount) * Math.pow(10, decimals)
      );

      // Get or create recipient's token account
      const recipientTokenAccount = await getAssociatedTokenAddress(
        mintPublicKey,
        recipientPublicKey
      );

      // Check if recipient token account exists
      try {
        await getAccount(connection, recipientTokenAccount);
      } catch (error) {
        // Token account doesn't exist, create it
        const createAccountInstruction =
          createAssociatedTokenAccountInstruction(
            senderPublicKey, // payer
            recipientTokenAccount, // associated token account
            recipientPublicKey, // owner
            mintPublicKey // mint
          );
        transaction.add(createAccountInstruction);
      }

      // Create transfer instruction
      const transferInstruction = createTransferInstruction(
        senderTokenAccount, // source
        recipientTokenAccount, // destination
        senderPublicKey, // owner
        amount, // amount
        [], // multiSigners
        TOKEN_PROGRAM_ID // programId
      );

      transaction.add(transferInstruction);
    }

    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = senderPublicKey;

    // Send transaction
    const signature = await sendTransaction(transaction);

    // Confirm transaction
    await connection.confirmTransaction(signature, "confirmed");

    return {
      signature,
      success: true,
    };
  } catch (error) {
    console.error("Token transfer failed:", error);
    return {
      signature: "",
      success: false,
      error: error instanceof Error ? error.message : "Transaction failed",
    };
  }
}

/**
 * Get token metadata (decimals, symbol, etc.)
 */
export async function getTokenMetadata(
  connection: Connection,
  mintAddress: string
): Promise<{ decimals: number; symbol?: string } | null> {
  try {
    const mintPublicKey = new PublicKey(mintAddress);
    const mintInfo = await connection.getParsedAccountInfo(mintPublicKey);

    if (mintInfo.value?.data && "parsed" in mintInfo.value.data) {
      const { decimals } = mintInfo.value.data.parsed.info;
      return { decimals };
    }

    return null;
  } catch (error) {
    console.error("Failed to get token metadata:", error);
    return null;
  }
}

/**
 * Calculate total transaction fees
 */
export async function calculateTransactionFees(
  numberOfRecipients: number,
  isTokenTransfer: boolean = false
): Promise<number> {
  try {
    // Base fee per signature (5000 lamports)
    const baseFee = 5000;

    // Additional fees for token account creation if needed
    const tokenAccountCreationFee = isTokenTransfer ? 2039280 : 0; // Rent exempt minimum

    // Estimate total fee (this is a rough estimate)
    const estimatedFee = baseFee + tokenAccountCreationFee * numberOfRecipients;

    return estimatedFee / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error("Failed to calculate fees:", error);
    return 0.001 * numberOfRecipients; // Fallback estimate
  }
}

/**
 * Validate if all addresses are valid Solana public keys
 */
export function validateAddresses(addresses: string[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  for (let i = 0; i < addresses.length; i++) {
    try {
      new PublicKey(addresses[i]);
    } catch (error) {
      errors.push(`Recipient ${i + 1}: Invalid address format`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if sender has sufficient balance
 */
export async function checkBalance(
  connection: Connection,
  senderPublicKey: PublicKey,
  totalAmount: number,
  isSOL: boolean = true,
  tokenMintAddress?: string
): Promise<{ sufficient: boolean; currentBalance: number; required: number }> {
  try {
    let currentBalance = 0;

    if (isSOL) {
      const lamports = await connection.getBalance(senderPublicKey);
      currentBalance = lamports / LAMPORTS_PER_SOL;
    } else if (tokenMintAddress) {
      // TODO: Implement token balance checking
      // This would require getting the token account and checking its balance
      currentBalance = 0; // Placeholder
    }

    return {
      sufficient: currentBalance >= totalAmount,
      currentBalance,
      required: totalAmount,
    };
  } catch (error) {
    console.error("Failed to check balance:", error);
    return {
      sufficient: false,
      currentBalance: 0,
      required: totalAmount,
    };
  }
}
