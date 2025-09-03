import React from 'react';

interface QuickActionsProps {
  onClearAll: () => void;
  onSetEqualAmounts: () => void;
  recipientCount: number;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onClearAll,
  onSetEqualAmounts,
  recipientCount
}) => {
  return (
    <div className="bg-black/20 rounded-lg p-4 border border-white/10">
      <h3 className="text-sm font-medium text-white mb-3 flex items-center space-x-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>Quick Actions</span>
      </h3>
      
      <div className="space-y-2">
        <button
          onClick={onSetEqualAmounts}
          disabled={recipientCount === 0}
          className="w-full bg-green-500/20 hover:bg-green-500/30 disabled:bg-gray-500/20 text-green-400 disabled:text-gray-500 py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span>Set Equal Amounts</span>
        </button>
        
        <button
          onClick={onClearAll}
          disabled={recipientCount === 0}
          className="w-full bg-red-500/20 hover:bg-red-500/30 disabled:bg-gray-500/20 text-red-400 disabled:text-gray-500 py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Clear All</span>
        </button>
      </div>
    </div>
  );
};
