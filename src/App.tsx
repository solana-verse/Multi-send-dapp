import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import './App.css'

// Components
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { WelcomeSection } from './components/WelcomeSection';
import { MultiSendForm } from './components/MultiSendForm';
import { Sidebar } from './components/Sidebar';
import { FeaturesSection } from './components/FeaturesSection';
import { TransactionStatus } from './components/TransactionStatus';
import { useMultiSend } from './hooks/useMultiSend';

function App() {
  const { connected } = useWallet();
  const { transactionStatus, setTransactionStatus } = useMultiSend();

  const handleTransactionSubmit = () => {
    // This function can be used for any post-transaction logic
    // like analytics, notifications, etc.
    console.log('Transaction submitted');
  };

  return (
    <Layout>
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!connected ? (
          <>
            <WelcomeSection />
            <FeaturesSection />
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Form - Takes up 3/4 of the space */}
            <div className="lg:col-span-3">
              <MultiSendForm onTransactionSubmit={handleTransactionSubmit} />
            </div>
            
            {/* Sidebar - Takes up 1/4 of the space */}
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
          </div>
        )}
      </main>

      {/* Transaction Status Modal */}
      <TransactionStatus
        status={transactionStatus.status}
        signature={transactionStatus.signature}
        message={transactionStatus.message}
        onClose={() => setTransactionStatus({ status: 'idle' })}
      />
    </Layout>
  );
}

export default App;
