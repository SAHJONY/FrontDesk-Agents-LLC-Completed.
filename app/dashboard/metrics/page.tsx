'use client';

import React from 'react';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Performance Recovery Yield Visualization (Elite Tier)
 */

export default function MetricsPage() {
  const recoveredRevenue = 12540.00;
  const successFee = recoveredRevenue * 0.15; // 15% Elite Yield

  return (
    <div className="space-y-8">
      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel elite-glow p-6 rounded-2xl">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Total Recovered</p>
          <p className="text-4xl font-black mt-2 text-white">${recoveredRevenue.toLocaleString()}</p>
        </div>
        
        <div className="glass-panel p-6 rounded-2xl border-blue-500/20">
          <p className="text-blue-500 text-xs font-bold uppercase tracking-widest">Success Fee (15%)</p>
          <p className="text-4xl font-black mt-2 text-white">${successFee.toLocaleString()}</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Active Fleet Routes</p>
          <p className="text-4xl font-black mt-2 text-white">30 / 30</p>
        </div>
      </div>

      {/* Yield Performance Graph Placeholder */}
      <div className="glass-panel p-8 rounded-2xl h-[400px] flex flex-col justify-end">
        <div className="flex items-end gap-2 h-full">
          {[40, 70, 45, 90, 65, 80, 95].map((height, i) => (
            <div 
              key={i} 
              className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md transition-all hover:brightness-125"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="mt-4 border-t border-zinc-800 pt-4 flex justify-between text-zinc-500 font-mono text-[10px] uppercase">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Elite Audit Log</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-xs font-mono border-b border-zinc-900 pb-2">
            <span className="text-zinc-400">Node_ID: pdx1_fleet_01</span>
            <span className="text-green-500">+ $1,200.00 Recovered</span>
            <span className="text-blue-400">Fee: $180.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
