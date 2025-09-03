import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from './WalletButton';

export const Header: React.FC = () => {
  const { connected } = useWallet();

  return (
    <header className="bg-black/90 backdrop-blur-md shadow-2xl border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              {connected && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-wider transform -skew-x-6 hover:skew-x-0 transition-transform duration-300">
                🚀 Multi-Send dApp ✨
              </h1>
              <p className="text-sm text-gray-400 mt-1 font-mono italic tracking-wide">Send crypto to multiple addresses instantly ⚡</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {connected && (
              <div className="hidden sm:flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-700 text-sm font-medium">Network: Devnet</span>
              </div>
            )}
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  );
};
