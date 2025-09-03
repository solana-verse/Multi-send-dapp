import React from 'react';

interface TransactionSummaryProps {
  recipientCount: number;
  totalAmount: string;
  selectedToken: string;
  estimatedFee: number;
  isValid: boolean;
}

export const TransactionSummary: React.FC<TransactionSummaryProps> = ({
  recipientCount,
  totalAmount,
  selectedToken,
  estimatedFee,
  isValid
}) => {
  return (
    <div className={`bg-black border rounded-xl p-6 transition-all duration-300 ${
      isValid 
        ? 'border-purple-500/30 bg-purple-500/5' 
        : 'border-red-500/30 bg-red-500/5'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-black text-white flex items-center space-x-2 tracking-wide transform hover:scale-105 transition-transform duration-300">
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>📊 Transaction Summary 📊</span>
        </h3>
        <div className={`px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase transform hover:rotate-3 transition-transform duration-300 ${
          isValid ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {isValid ? '✅ READY ✅' : '❌ INVALID ❌'}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
        <div className="space-y-2">
          <span className="text-gray-400 block font-mono tracking-widest uppercase text-xs">👥 Recipients</span>
          <div className="flex items-center space-x-2">
            <span className="text-white font-black text-lg tracking-wider">{recipientCount}</span>
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        
        <div className="space-y-2">
          <span className="text-gray-400 block font-mono tracking-widest uppercase text-xs">💰 Total Amount</span>
          <div className="flex items-center space-x-2">
            <span className="text-white font-black text-lg tracking-wider">{totalAmount || '0.000000'}</span>
            <span className="text-purple-400 font-bold tracking-wide">{selectedToken}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <span className="text-gray-400 block font-mono tracking-widest uppercase text-xs">⚡ Network Fee</span>
          <div className="flex items-center space-x-2">
            <span className="text-white font-black text-lg tracking-wider">~{estimatedFee}</span>
            <span className="text-purple-400 font-bold tracking-wide">SOL</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <span className="text-gray-400 block font-mono tracking-widest uppercase text-xs">🎯 Total Cost</span>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-white font-black tracking-wider">{totalAmount || '0.000000'} {selectedToken}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-xs font-mono">+ {estimatedFee} SOL fee</span>
            </div>
          </div>
        </div>
      </div>

      {!isValid && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-center space-x-2 text-red-400 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>Please fill in all recipient addresses and amounts before sending.</span>
          </div>
        </div>
      )}
    </div>
  );
};
