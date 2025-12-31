"use client";

import React from 'react';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

/**
 * SOVEREIGN HUB ARCHITECTURE: TELEMETRY NODE
 * This interface satisfies the TypeScript compiler for the pdx1 build.
 */
interface NodeStatusProps {
  tier: string;
}

export const NodeStatus = ({ tier }: NodeStatusProps) => {
  return (
    <div className="p-6 bg-zinc-900/40 border border-brand-cyan/20 rounded-2xl backdrop-blur-md relative overflow-hidden group">
      {/* Background Hub Glow */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-cyan/10 rounded-full blur-3xl" />
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-3 h-3 text-brand-cyan" />
            <p className="text-[10px] font-black text-brand-cyan uppercase tracking-[0.2em]">
              Sovereign Node
            </p>
          </div>
          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            {tier} <span className="text-zinc-500 text-lg italic">Instance</span>
          </h3>
        </div>
        <Activity className="text-brand-cyan animate-pulse w-5 h-5" />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-brand-cyan shadow-[0_0_12px_rgba(0,255,242,0.9)] animate-pulse" />
          <span className="text-xs font-mono font-bold text-zinc-300 uppercase italic">PDX1-PORTLAND-ACTIVE</span>
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">1.0 Global Parity Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
