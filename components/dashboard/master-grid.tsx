"use client";

import React from 'react';
import { RevenueTicker } from './revenue-ticker';
import { LiveTransactions } from './live-transactions';
import { GlobalPulseMap } from './global-pulse-map';
import { AgentPerformanceGrid } from './agent-performance-grid';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

export function MasterDashboard() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 p-4 md:p-8 font-sans selection:bg-emerald-500/30">
      {/* Top Header / Stats Bar */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Revenue & Logs */}
        <div className="lg:col-span-4 space-y-6">
          <RevenueTicker />
          
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Activity className="w-3 h-3 text-emerald-500" /> 
              Transmission Log
            </h3>
            <LiveTransactions />
          </div>
          
          {/* System Health Module */}
          <div className="rounded-3xl border border-white/5 bg-emerald-500/[0.02] p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <ShieldCheck className="text-emerald-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold">Emerald Protocol</p>
                <p className="text-[10px] text-slate-500 italic">V3.1.2 Secured</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-emerald-500">ENCRYPTED</p>
              <div className="h-1 w-16 bg-emerald-900 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-emerald-500 w-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Global Map & Workforce */}
        <div className="lg:col-span-8 space-y-6">
          <GlobalPulseMap />
          
          <div className="p-1">
             <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-sm font-black uppercase tracking-tighter italic flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                  Neural Workforce Distribution
                </h2>
                <span className="text-[10px] text-slate-500 font-mono">NODE_COUNT: 10 // STATUS: OPTIMAL</span>
             </div>
             <AgentPerformanceGrid />
          </div>
        </div>
        
      </div>
    </div>
  );
}
