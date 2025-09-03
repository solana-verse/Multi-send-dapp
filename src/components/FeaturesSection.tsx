import React from 'react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Lightning Fast",
      description: "Send to multiple addresses in a single transaction on Solana's fast network.",
      color: "blue"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Secure",
      description: "Your private keys never leave your wallet. All transactions are signed locally.",
      color: "green"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "Cost Effective",
      description: "Save on transaction fees by batching multiple transfers into one transaction.",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          iconBg: 'bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-700/30',
          iconText: 'text-blue-400'
        };
      case 'green':
        return {
          iconBg: 'bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/30',
          iconText: 'text-emerald-400'
        };
      case 'orange':
        return {
          iconBg: 'bg-gradient-to-br from-orange-900/50 to-amber-900/50 border border-orange-700/30',
          iconText: 'text-orange-400'
        };
      default:
        return {
          iconBg: 'bg-gradient-to-br from-slate-800/50 to-gray-800/50 border border-slate-600/30',
          iconText: 'text-slate-400'
        };
    }
  };

  return (
    <div className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const colorClasses = getColorClasses(feature.color);
          return (
            <div key={index} className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700/60 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 ${colorClasses.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                <div className={colorClasses.iconText}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
