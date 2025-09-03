import React from 'react';

export const Sidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Transaction Tips */}
      <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-500/20 p-6 hover:shadow-xl transition-shadow">
        <h3 className="text-lg font-black text-white mb-4 flex items-center space-x-2 tracking-wide transform hover:scale-105 transition-transform duration-300">
          <div className="bg-purple-500/10 rounded-lg p-1.5 border border-purple-500/30">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span>💡 Transaction Tips 💡</span>
        </h3>
        <div className="space-y-3 text-sm text-gray-400 font-mono">
          <div className="flex items-start space-x-2">
            <span className="text-purple-400 mt-1 font-bold">🎯</span>
            <span>Double-check all recipient addresses before sending</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-400 mt-1 font-bold">⚡</span>
            <span>Transactions on Solana are fast and irreversible</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-400 mt-1 font-bold">💰</span>
            <span>You can save on fees by batching multiple transfers</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-400 mt-1 font-bold">🔋</span>
            <span>Make sure you have enough SOL for transaction fees</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-500/20 p-6 hover:shadow-xl transition-shadow">
        <h3 className="text-lg font-black text-white mb-4 tracking-wide transform hover:scale-105 transition-transform duration-300">📊 Network Stats 📊</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400 font-mono tracking-wider uppercase">🌐 Network</span>
            <span className="text-sm font-black text-green-400 tracking-widest">DEVNET ✨</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400 font-mono tracking-wider uppercase">💸 Avg. Fee</span>
            <span className="text-sm font-black text-white tracking-wider">~0.001 SOL</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400 font-mono tracking-wider uppercase">⏱️ Confirmation Time</span>
            <span className="text-sm font-black text-white tracking-wider">~400ms</span>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="bg-purple-500/5 rounded-2xl border border-purple-500/30 p-6 hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-black text-purple-300 mb-2 tracking-wide transform hover:scale-105 transition-transform duration-300">
          🆘 Need Help? 🆘
        </h3>
        <p className="text-sm text-purple-300 mb-4 font-mono tracking-wide">
          Check out the Solana documentation for more information about transactions and tokens. 📚
        </p>
        <a 
          href="https://docs.solana.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors transform hover:scale-105 duration-200 tracking-wider uppercase"
        >
          📖 View Documentation 📖
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};
