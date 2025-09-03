import React from 'react';

interface TransactionStatusProps {
  signature?: string;
  status: 'idle' | 'pending' | 'success' | 'error';
  message?: string;
  onClose: () => void;
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
  signature,
  status,
  message,
  onClose
}) => {
  if (status === 'idle') return null;

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return (
          <svg className="animate-spin h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        );
      case 'success':
        return (
          <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'from-blue-500/10 to-indigo-500/10 border-blue-500/20';
      case 'success':
        return 'from-green-500/10 to-emerald-500/10 border-green-500/20';
      case 'error':
        return 'from-red-500/10 to-pink-500/10 border-red-500/20';
      default:
        return '';
    }
  };

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4`}>
      <div className={`bg-gradient-to-r ${getStatusColor()} rounded-xl border p-6 max-w-md w-full`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getStatusIcon()}
            <h3 className="text-lg font-medium text-white">
              {status === 'pending' && 'Transaction Pending'}
              {status === 'success' && 'Transaction Successful'}
              {status === 'error' && 'Transaction Failed'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {message && (
          <p className="text-gray-300 mb-4">{message}</p>
        )}

        {signature && (
          <div className="bg-black/30 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-400 mb-1">Transaction Signature:</p>
            <p className="text-sm text-white font-mono break-all">{signature}</p>
            <button
              onClick={() => window.open(`https://explorer.solana.com/tx/${signature}?cluster=devnet`, '_blank')}
              className="mt-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              View on Solana Explorer →
            </button>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
