import React from 'react';
import { PublicKey } from '@solana/web3.js';

interface RecipientCardProps {
  recipient: {
    id: string;
    address: string;
    amount: string;
  };
  index: number;
  selectedToken: string;
  onUpdate: (id: string, field: 'address' | 'amount', value: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

export const RecipientCard: React.FC<RecipientCardProps> = ({
  recipient,
  index,
  selectedToken,
  onUpdate,
  onRemove,
  canRemove
}) => {
  const isValidAddress = (address: string) => {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  };

  const isValidAmount = (amount: string) => {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  };

  return (
    <div className="bg-black/40 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-gray-300 font-medium">Recipient #{index + 1}</span>
          {recipient.address && (
            <div className={`w-2 h-2 rounded-full ${isValidAddress(recipient.address) ? 'bg-green-400' : 'bg-red-400'}`}></div>
          )}
        </div>
        {canRemove && (
          <button
            onClick={() => onRemove(recipient.id)}
            className="text-red-400 hover:text-red-300 transition-colors p-1 hover:bg-red-500/10 rounded"
            title="Remove recipient"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Wallet Address</label>
          <div className="relative">
            <input
              type="text"
              value={recipient.address}
              onChange={(e) => onUpdate(recipient.id, 'address', e.target.value)}
              placeholder="Enter wallet address..."
              className={`w-full bg-black/50 border rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm ${
                recipient.address && !isValidAddress(recipient.address) 
                  ? 'border-red-500/50' 
                  : 'border-white/20'
              }`}
            />
            {recipient.address && isValidAddress(recipient.address) && (
              <div className="absolute right-2 top-2.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
          {recipient.address && !isValidAddress(recipient.address) && (
            <p className="text-red-400 text-xs mt-1">Invalid address format</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Amount ({selectedToken})</label>
          <div className="relative">
            <input
              type="number"
              value={recipient.amount}
              onChange={(e) => onUpdate(recipient.id, 'amount', e.target.value)}
              placeholder="0.00"
              step="0.000001"
              min="0"
              className={`w-full bg-black/50 border rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm ${
                recipient.amount && !isValidAmount(recipient.amount) 
                  ? 'border-red-500/50' 
                  : 'border-white/20'
              }`}
            />
            {recipient.amount && isValidAmount(recipient.amount) && (
              <div className="absolute right-2 top-2.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
          {recipient.amount && !isValidAmount(recipient.amount) && (
            <p className="text-red-400 text-xs mt-1">Amount must be greater than 0</p>
          )}
        </div>
      </div>
    </div>
  );
};
