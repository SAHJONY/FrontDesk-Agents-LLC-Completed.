'use client';

import { TrendingUp, Zap } from 'lucide-react';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Component: Revenue Stats Telemetry
 * Logic: 1.0 Global Parity Verified
 */

export function RevenueStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-brand-cyan/10">
            <Zap className="w-5 h-5 text-brand-cyan" />
          </div>
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Efficiency</span>
        </div>
        <p className="text-zinc-400 text-xs font-bold uppercase tracking-tighter mb-1">Node Performance</p>
        <h4 className="text-2xl font-black text-white tracking-tight">99.9%</h4>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-green-500/10">
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Growth</span>
        </div>
        <p className="text-zinc-400 text-xs font-bold uppercase tracking-tighter mb-1">Revenue Velocity</p>
        <h4 className="text-2xl font-black text-white tracking-tight">+12.5%</h4>
      </div>
    </div>
  );
}
