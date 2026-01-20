"use client";

import React from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, Zap, Globe, Battery, AlertTriangle } from 'lucide-react';

/**
 * SOVEREIGN GLOBAL FINANCIAL HUB
 * Version: 2.0 (Profit Optimized)
 * Feature: Real-time Minute Tracking & Parity Verification
 */

interface NodeStatusProps {
  tier: string;
  usedMins: number;
  maxMins: number;
  status?: 'ACTIVE' | 'PAST_DUE' | 'EXHAUSTED';
}

export const NodeStatus = ({ 
  tier = "Starter", 
  usedMins = 0, 
  maxMins = 300, 
  status = 'ACTIVE' 
}: NodeStatusProps) => {
  const percentage = Math.min((usedMins / maxMins) * 100, 100);
  const isCritical = percentage > 85;

  return (
    <div className="p-6 bg-zinc-900/40 border border-cyan-500/20 rounded-2xl backdrop-blur-md relative overflow-hidden group transition-all hover:border-cyan-500/40">
      {/* Background Pulse FX */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl transition-colors ${isCritical ? 'bg-red-500/10' : 'bg-cyan-500/10'}`} />
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className={`w-3 h-3 ${isCritical ? 'text-red-500' : 'text-cyan-400'}`} />
            <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">
              Sovereign Node
            </p>
          </div>
          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            {tier} <span className="text-zinc-500 text-lg italic tracking-widest">Instance</span>
          </h3>
        </div>
        <Activity className={`w-5 h-5 ${isCritical ? 'text-red-500 animate-bounce' : 'text-cyan-400 animate-pulse'}`} />
      </div>
      
      {/* Minute Pulse Gauge */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-2 text-zinc-500">
            <Battery className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Minute Pulse</span>
          </div>
          <span className="font-mono text-xs font-bold text-white uppercase tracking-tighter">
            {usedMins.toLocaleString()} / {maxMins.toLocaleString()}
          </span>
        </div>
        
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${isCritical ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className={`h-2.5 w-2.5 rounded-full shadow-[0_0_12px_rgba(0,255,242,0.6)] animate-pulse ${isCritical ? 'bg-red-500' : 'bg-cyan-400'}`} />
          <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase italic">
            PDX1-PORTLAND-{status}
          </span>
        </div>

        <div className="pt-4 border-t border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400/80">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                1.0 Local Parity Verified
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-zinc-500">
            <Globe className="w-3.5 h-3.5" />
            <span className="text-[9px] font-bold uppercase tracking-tighter leading-tight">
              Global platform // Serving as local node
            </span>
          </div>
        </div>
      </div>

      {isCritical && (
        <Link 
          href="/pricing?reason=usage_limit" 
          className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-red-500/10 border border-red-500/20 rounded-lg group/btn hover:bg-red-500 transition-all duration-300"
        >
          <AlertTriangle className="w-3 h-3 text-red-500 group-hover/btn:text-white" />
          <span className="text-[9px] font-black text-red-500 uppercase tracking-widest group-hover/btn:text-white">
            Authorize Expansion
          </span>
        </Link>
      )}
    </div>
  );
};
