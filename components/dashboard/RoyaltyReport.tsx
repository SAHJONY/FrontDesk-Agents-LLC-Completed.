'use client';

import React from 'react';
import { TrendingUp, BarChart3, Download, Percent, ShieldCheck, Zap } from 'lucide-react';

/**
 * SOVEREIGN PERFORMANCE AUDIT (v2.0)
 * Purpose: Justifies 2026 Enterprise Success Fees (Section 3)
 */

export const RoyaltyReport = () => {
  const stats = [
    { label: 'Total Node Revenue', value: '$84,200', change: '+12.5%', icon: TrendingUp },
    { label: 'Platform Success Fee', value: '$2,526', change: '3% Fixed', icon: Percent },
    { label: 'Human Labor Offset', value: '$12,400', change: '85% Saved', icon: Zap },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Top Level ROI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon className="w-12 h-12 text-cyan-500" />
            </div>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white italic tracking-tighter">{stat.value}</span>
              <span className="text-[10px] font-bold text-emerald-500 font-mono">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Analytics Bridge */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              Sovereign Yield Audit
            </h3>
            <p className="text-zinc-500 text-[10px] uppercase font-mono mt-1">Fiscal Period: Jan 2026 // Node Group PDX1</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-lg shadow-cyan-500/20">
            <Download className="w-3.5 h-3.5" /> Export Sovereign PDF
          </button>
        </div>

        {/* Data Visualization Placeholder */}
        

        <div className="grid lg:grid-cols-2 gap-8 mt-10 pt-10 border-t border-zinc-800/50">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Efficiency Metrics</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-xs border-b border-zinc-800/50 pb-2">
                <span className="text-zinc-400 italic">Avg. Resolution Speed</span>
                <span className="text-white font-mono">1.4 mins</span>
              </div>
              <div className="flex justify-between text-xs border-b border-zinc-800/50 pb-2">
                <span className="text-zinc-400 italic">Success Fee Cap (Sec. 3)</span>
                <span className="text-emerald-500 font-mono">$5,000.00 Max</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400 italic">Node Signal Strength</span>
                <span className="text-cyan-400 font-mono">99.98%</span>
              </div>
            </div>
          </div>

          <div className="bg-black/40 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-center text-center relative overflow-hidden">
            <ShieldCheck className="w-8 h-8 text-emerald-500/50 mx-auto mb-3" />
            <p className="text-xs text-zinc-300 font-medium leading-relaxed italic">
              "This node is currently operating at <span className="text-emerald-400 font-bold">12x capital efficiency</span> compared to standard human-operated intake centers."
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};
