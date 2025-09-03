import React from 'react';
import { WalletButton } from './WalletButton';

export const WelcomeSection: React.FC = () => {
  return (
    <div className="text-center py-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-black text-white mb-4 tracking-wider transform hover:scale-105 transition-transform duration-300 cursor-default">
            🎉 Welcome to Multi-Send 🎉
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed font-mono tracking-wide">
            Send SOL or SPL tokens to multiple recipients in a single transaction. ⚡
            <br />
            <span className="text-purple-400 font-bold">Fast, secure, and cost-effective on Solana! 🚀</span>
          </p>
        </div>
        
        <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-500/60 p-8 max-w-md mx-auto hover:shadow-2xl transition-shadow transform hover:scale-105 duration-300">
          <div className="text-6xl mb-6 animate-bounce">🚀</div>
          <h3 className="text-2xl font-black text-white mb-3 tracking-widest transform hover:rotate-1 transition-transform duration-300">
            ✨ GET STARTED ✨
          </h3>
          <p className="text-gray-400 mb-6 font-mono tracking-wide">Connect your wallet to begin sending tokens to multiple addresses 🎯</p>
          <WalletButton />
        </div>
      </div>
    </div>
  );
};
