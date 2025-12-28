import React from 'react';

const UsageVisualizer = ({ tier = "PROFESSIONAL", usedMins = 1150 }) => {
  // Logic based on our 4-tier pricing model
  const tiers = {
    BASIC: 500,
    PROFESSIONAL: 1500,
    GROWTH: 4000,
    ELITE: 10000
  };

  const limit = tiers[tier as keyof typeof tiers] || 500;
  const percentage = Math.min((usedMins / limit) * 100, 100);
  const remaining = Math.max(limit - usedMins, 0);

  return (
    <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">AI Brain Power</h3>
          <p className="text-2xl font-bold text-slate-900">{tier} Tier</p>
        </div>
        <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
          Active
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
              Usage: {percentage.toFixed(1)}%
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-indigo-600">
              {usedMins.toLocaleString()} / {limit.toLocaleString()} min
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-slate-100">
          <div 
            style={{ width: `${percentage}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${percentage > 90 ? 'bg-red-500' : 'bg-indigo-600'}`}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-3 bg-slate-50 rounded-2xl">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Remaining</p>
          <p className="text-lg font-bold text-slate-800">{remaining.toLocaleString()} min</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-2xl">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Cost/Min</p>
          <p className="text-lg font-bold text-slate-800">Included</p>
        </div>
      </div>

      {percentage > 85 && (
        <button className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors">
          Upgrade to {tier === 'BASIC' ? 'Professional' : tier === 'PROFESSIONAL' ? 'Growth' : 'Elite'}
        </button>
      )}
    </div>
  );
};

export default UsageVisualizer;
