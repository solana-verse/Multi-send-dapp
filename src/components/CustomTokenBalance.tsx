import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { getAccount, getAssociatedTokenAddress, getMint } from '@solana/spl-token';

interface CustomTokenBalanceProps {
  tokenMintAddress: string;
  className?: string;
}

export const CustomTokenBalance: React.FC<CustomTokenBalanceProps> = ({ 
  tokenMintAddress, 
  className = "" 
}) => {
  const { connected, publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [tokenSymbol, setTokenSymbol] = useState<string>('');

  const fetchTokenBalance = async () => {
    if (!connected || !publicKey || !tokenMintAddress) {
      setBalance('0');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const tokenMint = new PublicKey(tokenMintAddress);
      
      // Get token info
      const mintInfo = await getMint(connection, tokenMint);
      
      // Get associated token account
      const tokenAccount = await getAssociatedTokenAddress(tokenMint, publicKey);
      
      try {
        const account = await getAccount(connection, tokenAccount);
        const balance = Number(account.amount) / Math.pow(10, mintInfo.decimals);
        setBalance(balance.toFixed(6));
      } catch (accountError) {
        // Account doesn't exist, balance is 0
        setBalance('0');
      }
      
      // Try to get token symbol (this is a simplified approach)
      setTokenSymbol('TOKEN');
      
    } catch (err) {
      console.error('Error fetching token balance:', err);
      setError('Invalid token address');
      setBalance('0');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tokenMintAddress) {
      fetchTokenBalance();
    }
  }, [tokenMintAddress, connected, publicKey]);

  if (!connected) {
    return (
      <div className={`text-sm text-slate-400 ${className}`}>
        Connect wallet to view balance
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`text-sm text-slate-400 ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <span>Fetching balance...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-sm text-red-400 ${className}`}>
        {error}
      </div>
    );
  }

  return (
    <div className={`text-sm ${className}`}>
      <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg border border-slate-600">
        <span className="text-slate-300">Balance:</span>
        <span className="text-white font-medium">
          {balance} {tokenSymbol}
        </span>
      </div>
    </div>
  );
};
