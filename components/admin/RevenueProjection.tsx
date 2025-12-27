'use client';

import React, { useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap,
  ArrowUpRight,
  DollarSign
} from 'lucide-react';

// Data would typically be fetched from Supabase 'customers' table
const MOCK_STATION_DATA = [
  { tier: 'CORE_STATION', count: 8, price: 2500, outcomes: 412 },
  { tier: 'ENTERPRISE_CLUSTER', count: 3, price: 7500, outcomes: 280 },
  { tier: 'SOVEREIGN_COMMAND', count: 1, price: 25000, outcomes: 0 },
];

export const RevenueProjection = () => {
  const stats = useMemo(() => {
    const mrr = MOCK_STATION_DATA.reduce((acc, curr) => acc + (curr.count * curr.price), 0);
    const outcomeYield = MOCK_STATION_DATA.reduce((acc, curr) => acc + (curr.outcomes * 10), 0);
    return { mrr, outcomeYield, total: mrr + outcomeYield };
  }, []);

  return (
    <div className="bg-[#020305] border border-white/10 p-8 rounded-sm font-sans selection:bg-cyan-500/30">
      
      {/* HEADER: FISCAL INTELLIGENCE */}
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-2 italic">Internal Ledger</h2>
          <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            Capital <span className="text-slate-700">Yield Synthesis</span>
          </h3>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Monthly Yield</p>
          <p className="text-4xl font-black text-green-500 tracking-tighter tabular-nums">
            ${stats.total.toLocaleString()}
          </p>
        </div>
      </div>

      {/* CORE REVENUE TIERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        {/* FIXED PROVISIONING (MRR) */}
        <div className="p-6 bg-white/[0.03] border border-white/5 relative group">
          <div className="flex justify-between items-start mb-4">
            <Zap className="w-5 h-5 text-cyan-500" />
            <span className="text-[8px] font-black bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded-full">FIXED</span>
          </div>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Infrastructure Provisioning</p>
          <p className="text-2xl font-bold text-white tracking-tighter italic">${stats.mrr.toLocaleString()}</p>
          <p className="text-[10px] text-slate-400 mt-2 italic font-medium">12 Active Core Stations stationed.</p>
        </div>

        {/* VARIABLE YIELD (OUTCOMES) */}
        <div className="p-6 bg-white/[0.03] border border-white/5 relative group">
          <div className="flex justify-between items-start mb-4">
            <BarChart3 className="w-5 h-5 text-green-500" />
            <span className="text-[8px] font-black bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">VARIABLE</span>
          </div>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Outcome Synthesis Yield</p>
          <p className="text-2xl font-bold text-white tracking-tighter italic">${stats.outcomeYield.toLocaleString()}</p>
          <p className="text-[10px] text-slate-400 mt-2 italic font-medium">Success fees @ $10/appointment.</p>
        </div>
      </div>

      {/* GROWTH PROJECTOR LOGIC */}
      <div className="bg-cyan-500/5 border border-cyan-500/20 p-6 rounded-sm">
        <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-4 italic">Next Phase Projection</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-slate-500" />
              <span className="text-xs text-slate-300 font-medium tracking-tight">Acquisition of 5 Core Stations</span>
            </div>
            <span className="text-xs font-bold text-green-500">+$12,500 MRR</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-slate-500" />
              <span className="text-xs text-slate-300 font-medium tracking-tight">Outcome Optimization (+15%)</span>
            </div>
            <span className="text-xs font-bold text-green-500">+$1,038 Variable</span>
          </div>
        </div>
      </div>

    </div>
  );
};
