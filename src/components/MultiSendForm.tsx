import React, { useEffect } from 'react';
import { RecipientCard } from './RecipientCard';
import { TransactionSummary } from './TransactionSummary';
import { CSVImport } from './CSVImport';
import { QuickActions } from './QuickActions';
import { BalanceDisplay } from './BalanceDisplay';
import { CustomTokenBalance } from './CustomTokenBalance';
import { useMultiSend } from '../hooks/useMultiSend';

interface MultiSendFormProps {
  onTransactionSubmit: () => void;
}

export const MultiSendForm: React.FC<MultiSendFormProps> = ({ onTransactionSubmit }) => {
  const {
    selectedToken,
    setSelectedToken,
    customTokenAddress,
    setCustomTokenAddress,
    recipients,
    totalAmount,
    isLoading,
    connected,
    addRecipient,
    removeRecipient,
    updateRecipient,
    clearAllRecipients,
    setEqualAmounts,
    importRecipients,
    calculateTotal,
    isValidTransaction,
    handleSend,
    transactionStatus,
    setTransactionStatus,
  } = useMultiSend();

  // Calculate total whenever recipients change
  useEffect(() => {
    calculateTotal();
  }, [recipients, calculateTotal]);

  const onSend = async () => {
    await handleSend();
    onTransactionSubmit();
  };

  return (
    <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-500/20 p-8 hover:shadow-2xl transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-white mb-2 tracking-wide transform hover:scale-105 transition-transform duration-300 cursor-default">
            🎯 Multi-Send Transaction 🎪
          </h2>
          <p className="text-gray-400 font-mono text-sm tracking-wider">Send tokens to multiple addresses in one transaction 🔥</p>
        </div>
        <div className="bg-purple-500/10 rounded-xl p-3 border border-purple-500/30 animate-pulse">
          <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
      </div>

      {/* Transaction Status Notification */}
      {transactionStatus.status !== 'idle' && (
        <div className={`mb-6 p-4 rounded-xl border transition-all duration-300 transform hover:scale-[1.02] ${
          transactionStatus.status === 'pending' 
            ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300' 
            : transactionStatus.status === 'success'
            ? 'bg-green-500/10 border-green-500/30 text-green-300'
            : 'bg-red-500/10 border-red-500/30 text-red-300'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {transactionStatus.status === 'pending' && (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="font-bold tracking-wide">⚡ TRANSACTION PENDING ⚡</span>
                </>
              )}
              {transactionStatus.status === 'success' && (
                <>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-bold tracking-wide">🎉 TRANSACTION SUCCESS 🎉</span>
                </>
              )}
              {transactionStatus.status === 'error' && (
                <>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="font-bold tracking-wide">❌ TRANSACTION FAILED ❌</span>
                </>
              )}
            </div>
            <button
              onClick={() => setTransactionStatus({ status: 'idle' })}
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {transactionStatus.message && (
            <p className="mt-2 text-sm font-mono opacity-80">{transactionStatus.message}</p>
          )}
          {transactionStatus.signature && (
            <div className="mt-3 flex items-center space-x-2">
              <span className="text-xs font-mono opacity-60 uppercase tracking-wider">Signature:</span>
              <a
                href={`https://explorer.solana.com/tx/${transactionStatus.signature}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono break-all hover:underline flex items-center space-x-1 transform hover:scale-105 transition-all duration-200"
              >
                <span>{transactionStatus.signature}</span>
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      )}

      {/* Token Selection */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-gray-300 mb-3 tracking-widest uppercase transform hover:scale-105 transition-transform duration-200">
          🎭 Select Token 🎭
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
            className="flex-1 bg-gray-900 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors hover:border-purple-500/50 font-mono text-lg"
          >
            <option value="SOL">🟡 SOL</option>
            <option value="USDC">🔵 USDC</option>
            <option value="USDT">🟢 USDT</option>
            <option value="CUSTOM">🌈 Custom Token</option>
          </select>
          <div className="sm:w-64">
            {selectedToken === 'CUSTOM' && customTokenAddress ? (
              <CustomTokenBalance tokenMintAddress={customTokenAddress} />
            ) : (
              <BalanceDisplay selectedToken={selectedToken} />
            )}
          </div>
        </div>
      </div>

      {/* Custom Token Input */}
      {selectedToken === 'CUSTOM' && (
        <div className="mb-8 p-6 bg-purple-500/5 rounded-xl border border-purple-500/20">
          <label className="block text-sm font-bold text-gray-300 mb-3 tracking-widest uppercase">
            🎪 Token Mint Address 🎪
          </label>
          <input
            type="text"
            value={customTokenAddress}
            onChange={(e) => setCustomTokenAddress(e.target.value)}
            placeholder="Enter token mint address... 🎯"
            className="w-full bg-gray-900 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors font-mono"
          />
        </div>
      )}

      {/* Recipients Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-bold text-gray-300 tracking-widest uppercase transform hover:rotate-1 transition-transform duration-300">
                🎯 Recipients 🎯
              </label>
              <button
                onClick={addRecipient}
                className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center space-x-2 border border-purple-500/30 hover:scale-105 transform"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="tracking-wide">✨ Add Recipient ✨</span>
              </button>
            </div>
          </div>
          
          <div className="lg:w-80 space-y-4">
            <CSVImport onImport={importRecipients} />
            <QuickActions 
              onClearAll={clearAllRecipients}
              onSetEqualAmounts={setEqualAmounts}
              recipientCount={recipients.length}
            />
          </div>
        </div>

        <div className="space-y-4">
          {recipients.map((recipient, index) => (
            <RecipientCard
              key={recipient.id}
              recipient={recipient}
              index={index}
              selectedToken={selectedToken}
              onUpdate={updateRecipient}
              onRemove={removeRecipient}
              canRemove={recipients.length > 1}
            />
          ))}
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="mb-8">
        <TransactionSummary
          recipientCount={recipients.length}
          totalAmount={totalAmount}
          selectedToken={selectedToken}
          estimatedFee={0.001}
          isValid={isValidTransaction()}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={calculateTotal}
          className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-200 py-3 rounded-xl font-bold transition-all duration-200 border border-gray-700 hover:border-gray-600 transform hover:scale-105 tracking-wide"
        >
          🔄 Recalculate Total 🔄
        </button>
        <button
          onClick={onSend}
          disabled={!connected || !isValidTransaction() || isLoading}
          className="flex-1 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-xl font-black transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 tracking-wider"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : !connected ? (
            'Connect Wallet to Send'
          ) : (
            'Send Tokens'
          )}
        </button>
      </div>

      {/* Help Text */}
      <div className="mt-8 p-4 bg-purple-500/5 rounded-xl border border-purple-500/20">
        <div className="text-sm text-gray-400">
          <p className="mb-2 font-medium text-gray-300">
            <strong>Note:</strong> This will create a single transaction to send tokens to all recipients simultaneously.
          </p>
          <p>
            Make sure all addresses are correct as transactions on Solana are irreversible.
          </p>
        </div>
      </div>
    </div>
  );
};
