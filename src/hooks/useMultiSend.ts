import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  getMint,
} from "@solana/spl-token";

export interface Recipient {
  id: string;
  address: string;
  amount: string;
}

export interface TransactionStatus {
  status: "idle" | "pending" | "success" | "error";
  signature?: string;
  message?: string;
}

// Helper function to get token mint addresses
const getTokenMintAddress = (token: string): string => {
  const tokenMints: { [key: string]: string } = {
    // Devnet addresses
    USDC: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    USDT: "DAwBSXe6w9g37wdE2tCrFbho3QHKZi4PjuBytQCULap2",
  };

  return tokenMints[token] || "";
};

export const useMultiSend = () => {
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [selectedToken, setSelectedToken] = useState("SOL");
  const [customTokenAddress, setCustomTokenAddress] = useState("");
  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: "1", address: "", amount: "" },
  ]);
  const [totalAmount, setTotalAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    { status: "idle" }
  );

  const addRecipient = () => {
    const newRecipient: Recipient = {
      id: Date.now().toString(),
      address: "",
      amount: "",
    };
    setRecipients([...recipients, newRecipient]);
  };

  const removeRecipient = (id: string) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter((r) => r.id !== id));
    }
  };

  const updateRecipient = (
    id: string,
    field: "address" | "amount",
    value: string
  ) => {
    setRecipients(
      recipients.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const clearAllRecipients = () => {
    setRecipients([{ id: "1", address: "", amount: "" }]);
  };

  const setEqualAmounts = () => {
    if (totalAmount && recipients.length > 0) {
      const equalAmount = (parseFloat(totalAmount) / recipients.length).toFixed(
        6
      );
      setRecipients(recipients.map((r) => ({ ...r, amount: equalAmount })));
    }
  };

  const importRecipients = (importedRecipients: Omit<Recipient, "id">[]) => {
    const newRecipients = importedRecipients.map((r, index) => ({
      ...r,
      id: (Date.now() + index).toString(),
    }));
    setRecipients(newRecipients);
  };

  const calculateTotal = () => {
    const total = recipients.reduce((sum, recipient) => {
      const amount = parseFloat(recipient.amount) || 0;
      return sum + amount;
    }, 0);
    setTotalAmount(total.toFixed(6));
  };

  const isValidTransaction = (): boolean => {
    if (!connected || !publicKey) return false;

    const hasValidRecipients = recipients.every((r) => {
      if (!r.address.trim() || !r.amount.trim()) return false;
      try {
        new PublicKey(r.address);
        return parseFloat(r.amount) > 0;
      } catch {
        return false;
      }
    });

    return (
      hasValidRecipients &&
      recipients.length > 0 &&
      recipients.some((r) => r.address.trim() && r.amount.trim())
    );
  };

  const handleSend = async () => {
    if (!connected || !publicKey || !isValidTransaction()) return;

    try {
      setIsLoading(true);
      setTransactionStatus({
        status: "pending",
        message: "Preparing transaction...",
      });

      const txn = new Transaction();

      if (selectedToken === "SOL") {
        // SOL transfer logic
        for (const recipient of recipients) {
          const recipientPublicKey = new PublicKey(recipient.address);
          const lamports = Math.floor(
            parseFloat(recipient.amount) * LAMPORTS_PER_SOL
          );

          txn.add(
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: recipientPublicKey,
              lamports: lamports,
            })
          );
        }
      } else {
        // SPL Token transfer logic
        const tokenMintAddress =
          selectedToken === "CUSTOM"
            ? customTokenAddress
            : getTokenMintAddress(selectedToken);
        const tokenMint = new PublicKey(tokenMintAddress);

        // Get token decimals
        const mintInfo = await getMint(connection, tokenMint);
        const decimals = mintInfo.decimals;

        // Get sender's associated token account
        const senderATA = await getAssociatedTokenAddress(tokenMint, publicKey);

        for (const recipient of recipients) {
          const recipientPublicKey = new PublicKey(recipient.address);
          const recipientATA = await getAssociatedTokenAddress(
            tokenMint,
            recipientPublicKey
          );

          // Check if recipient's ATA exists, if not create it
          const recipientAccount = await connection.getAccountInfo(
            recipientATA
          );
          if (!recipientAccount) {
            txn.add(
              createAssociatedTokenAccountInstruction(
                publicKey, // payer
                recipientATA, // associated token account
                recipientPublicKey, // owner
                tokenMint // mint
              )
            );
          }

          // Calculate amount with decimals
          const amount = Math.floor(
            parseFloat(recipient.amount) * Math.pow(10, decimals)
          );

          // Add transfer instruction
          txn.add(
            createTransferInstruction(
              senderATA, // source account
              recipientATA, // destination account
              publicKey, // owner of source account
              amount, // amount to transfer
              [], // multiSigners (empty for single signer)
              TOKEN_PROGRAM_ID // program ID
            )
          );
        }
      }

      const { blockhash } = await connection.getLatestBlockhash();
      txn.recentBlockhash = blockhash;
      txn.feePayer = publicKey;

      setTransactionStatus({
        status: "pending",
        message: "Sending transaction...",
      });

      // Send and sign the transaction
      const signature = await sendTransaction(txn, connection);

      setTransactionStatus({
        status: "pending",
        message: "Confirming transaction...",
      });

      // Wait for confirmation
      await connection.confirmTransaction(signature, "confirmed");

      setTransactionStatus({
        status: "success",
        signature: signature,
        message: `Successfully sent ${totalAmount} ${selectedToken} to ${recipients.length} recipient(s)`,
      });
    } catch (error) {
      console.error("Transaction failed:", error);
      setTransactionStatus({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Transaction failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    selectedToken,
    setSelectedToken,
    customTokenAddress,
    setCustomTokenAddress,
    recipients,
    totalAmount,
    isLoading,
    transactionStatus,
    setTransactionStatus,
    connected,

    // Actions
    addRecipient,
    removeRecipient,
    updateRecipient,
    clearAllRecipients,
    setEqualAmounts,
    importRecipients,
    calculateTotal,
    isValidTransaction,
    handleSend,
  };
};
