import React from 'react';

const OwnerProfitCenter = () => {
  const globalStats = {
    totalSubscriptionMRR: 1450000, // Monthly Recurring Revenue
    transactionVolume24h: 8900000, // Total money moved through platform
    platformFeeRevenue24h: 22250,  // Your $0.25 "Neural Toll" + % fees
    activeEliteOffices: 850
  };

  return (
    <div className="p-8 bg-slate-900 text-white min-h-screen rounded-3xl">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Sovereign Global Command</h1>
          <p className="text-slate-400">Real-time revenue across all autonomous offices.</p>
        </div>
        <div className="bg-indigo-600 px-4 py-2 rounded-lg font-mono text-sm">
          System Status: OPTIMIZED
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total MRR" value={`$${globalStats.totalSubscriptionMRR.toLocaleString()}`} color="text-blue-400" />
        <StatCard title="24h Volume" value={`$${globalStats.transactionVolume24h.toLocaleString()}`} color="text-green-400" />
        <StatCard title="24h Net Profit" value={`$${globalStats.platformFeeRevenue24h.toLocaleString()}`} color="text-indigo-400" />
        <StatCard title="Elite Offices" value={globalStats.activeEliteOffices.toString()} color="text-purple-400" />
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-lg font-bold mb-4">Top Performing Markets</h3>
        <div className="space-y-4">
          <MarketRow region="Latin America" volume="$2.4M" growth="+12%" />
          <MarketRow region="Southeast Asia" volume="$1.9M" growth="+18%" />
          <MarketRow region="West Africa" volume="$1.2M" growth="+24%" />
          <MarketRow region="Europe (B2B)" volume="$3.4M" growth="+5%" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
    <p className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">{title}</p>
    <p className={`text-2xl font-mono font-bold ${color}`}>{value}</p>
  </div>
);

const MarketRow = ({ region, volume, growth }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-700 last:border-0">
    <span className="text-slate-300 font-medium">{region}</span>
    <div className="text-right">
      <span className="font-mono mr-4">{volume}</span>
      <span className="text-green-400 text-xs">{growth}</span>
    </div>
  </div>
);

export default OwnerProfitCenter;
