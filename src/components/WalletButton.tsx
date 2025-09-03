import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';

export const WalletButton: React.FC = () => {
  const { wallet, publicKey, connected } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (!connected) {
    return (
      <WalletMultiButton className="!bg-gradient-to-r !from-purple-500 !to-blue-500 hover:!from-purple-600 hover:!to-blue-600 !text-white !px-6 !py-2 !rounded-lg !font-medium !transition-all !duration-200 !transform hover:!scale-105 !flex !items-center !space-x-2" />
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        <span>
          {wallet?.adapter.name} - {publicKey ? formatAddress(publicKey.toString()) : 'Connected'}
        </span>
      </div>
      <WalletDisconnectButton className="!bg-red-500/20 hover:!bg-red-500/30 !text-red-400 !px-4 !py-2 !rounded-lg !text-sm !transition-colors" />
    </div>
  );
};
