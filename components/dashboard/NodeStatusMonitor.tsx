'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Lock, 
  TrendingUp, 
  AlertCircle,
  Power
} from 'lucide-react';

/**
 * NodeStatusMonitor
 * The primary Command & Control interface for provisioned Sovereign Workforce nodes.
 * Features real-time telemetry, Aegis Silo encryption status, and the Executive Override.
 */
export const NodeStatusMonitor = () => {
  const [load, setLoad] = useState(14.2);

  // Simulation of fluctuating neural synthesis load
  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(prev => {
        const variance = Math.random() * 2 - 1;
        const nextLoad = prev + variance;
        return nextLoad > 5 && nextLoad < 40 ? parseFloat(nextLoad.toFixed(1)) : prev;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#020305] border border-white/10 p-8 rounded-sm font-sans selection:bg-cyan-500/30 shadow-2xl">
      
      {/* HEADER: STATION IDENTITY & UPTIME */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-12">
        <div>
          <h2 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-2 italic">
            Infrastructure Status
          </h2>
          <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            Core Station <span className="text-slate-700">#ND-882</span>
          </h3>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full mb-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">
              Sovereign Active
            </span>
          </div>
          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest tabular-nums">
            Network Uptime: 99.998%
          </span>
        </div>
      </div>

      {/* CORE TELEMETRY GRID: SECURITY, LOAD, YIELD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* AEGIS SILO STATUS */}
        <div className="p-6 bg-white/5 border border-white/5 relative overflow-hidden group transition-all hover:bg-white/[0.07]">
          <Lock className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 group-hover:text-cyan-500/10 transition-colors" />
          <div className="relative z-10">
            <ShieldCheck className="w-5 h-5 text-cyan-500 mb-4" />
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
              Security Architecture
            </p>
            <p className="text-sm font-bold text-white uppercase tracking-tighter italic">
              Aegis Silo Encrypted
            </p>
          </div>
        </div>

        {/* NEURAL LOAD MONITOR */}
        <div className="p-6 bg-white/5 border border-white/5 relative overflow-hidden transition-all hover:bg-white/[0.07]">
          <Activity className="w-5 h-5 text-cyan-500 mb-4" />
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
            Neural Synthesis Load
          </p>
          <div className="flex items-end gap-2">
            <span className="text-xl font-bold text-white tracking-tighter tabular-nums">
              {load}%
            </span>
            <div className="flex gap-1 mb-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className={`w-1 h-3 rounded-full transition-colors duration-500 ${
                    i <= Math.ceil(load / 8) ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'bg-white/10'
                  }`} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* CAPITAL YIELD / SUCCESS TRACKER */}
        <div className="p-6 bg-white/5 border border-white/5 relative overflow-hidden transition-all hover:bg-white/[0.07]">
          <TrendingUp className="w-5 h-5 text-green-500 mb-4" />
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">
            Capital Yield (MTD)
          </p>
          <p className="text-xl font-bold text-white tracking-tighter tabular-nums">
            84 Success Outcomes
          </p>
        </div>
      </div>

      {/* FORENSIC ACTIVITY LOG: IMMUTABLE RECORDS */}
      <div className="border-t border-white/5 pt-8 mb-12">
        <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 italic underline underline-offset-8">
          Forensic Activity Log
        </h4>
        <div className="space-y-4">
          {[
            { time: '14:22:01', event: 'Inbound Intent Analysis', status: 'Qualified', node: 'Neural-Qualifier-1' },
            { time: '14:18:45', event: 'Knowledge Ingestion Sync', status: 'Complete', node: 'Aegis-Mirror' },
            { time: '13:59:12', event: 'Outcome Synthesis', status: 'Success', node: 'Sovereign-Closer' },
          ].map((log, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-medium border-b border-white/5 pb-3 gap-2">
              <div className="flex items-center gap-4">
                <span className="text-slate-600 tabular-nums">{log.time}</span>
                <span className="text-white uppercase tracking-wider">{log.event}</span>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <span className="text-[8px] px-2 py-0.5 bg-white/5 text-slate-400 rounded-sm italic border border-white/5">
                  {log.node}
                </span>
                <span className={log.status === 'Success' ? 'text-green-500 font-bold' : 'text-cyan-500'}>
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EXECUTIVE OVERRIDE CONTROL: THE KILL-SWITCH */}
      <div className="bg-red-500/5 border border-red-500/20 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">
              Critical Authority
            </p>
            <p className="text-[11px] font-medium text-slate-400 leading-tight">
              Suspend all Neural Synthesis and disconnect station from live traffic.
            </p>
          </div>
        </div>
        <button 
          onClick={() => confirm("WARNING: Do you want to initiate Executive Override? All autonomous workforce activity will cease.")}
          className="w-full md:w-auto px-8 py-3 bg-red-500 text-white font-black uppercase text-[10px] tracking-[0.3em] hover:bg-red-600 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
        >
          <Power className="w-4 h-4" /> Executive Override
        </button>
      </div>

    </div>
  );
};
