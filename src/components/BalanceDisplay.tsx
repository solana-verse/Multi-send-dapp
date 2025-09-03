import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

interface BalanceDisplayProps {
  selectedToken: string;
}

export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ selectedToken }) => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (connected && publicKey && selectedToken === 'SOL') {
      fetchSOLBalance();
    } else {
      setBalance(null);
    }
  }, [connected, publicKey, selectedToken, connection]);

  const fetchSOLBalance = async () => {
    if (!publicKey) return;
    
    setLoading(true);
    try {
      const lamports = await connection.getBalance(publicKey);
      const solBalance = lamports / LAMPORTS_PER_SOL;
      setBalance(solBalance);
    } catch (error) {
      console.error('Error fetching SOL balance:', error);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Wallet Balance</span>
        <div className="flex items-center space-x-2">
          {loading ? (
            <div className="flex items-center space-x-2">
              <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm text-gray-600">Loading...</span>
            </div>
          ) : balance !== null ? (
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-gray-900">{balance.toFixed(4)}</span>
              <span className="text-sm text-blue-600">{selectedToken}</span>
            </div>
          ) : (
            <span className="text-sm text-red-500">Failed to load</span>
          )}
          {selectedToken === 'SOL' && (
            <button
              onClick={fetchSOLBalance}
              className="text-blue-600 hover:text-blue-700 transition-colors"
              title="Refresh balance"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
