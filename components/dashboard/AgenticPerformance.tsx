'use client';

import React, { useState, useEffect } from 'react';
import { 
  CpuChipIcon, 
  ArrowTrendingUpIcon, 
  ShieldCheckIcon, 
  BeakerIcon,
  CurrencyDollarIcon 
} from '@heroicons/react/24/solid';

// Mock data reflecting the RL Agentic Workforce behavior
const AGENT_STATS = [
  { id: 'sales-node-1', name: 'SARA Sales RL', role: 'Conversion', efficiency: 94.2, revenue: 12450 },
  { id: 'triage-node-2', name: 'SARA Triage RL', role: 'Logistics', efficiency: 88.7, revenue: 4200 },
];

export const AgenticPerformance = () => {
  return (
    <div className="space-y-8 p-8 bg-[#020202] rounded-[40px] border border-white/5 shadow-2xl">
      {/* --- HEADER: RL STATUS --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500">
              Agentic Workforce Active
            </h2>
          </div>
          <h1 className="text-4xl font-black uppercase italic text-white tracking-tighter">
            Neural <span className="text-cyan-500">Command</span> Center
          </h1>
        </div>
        
        <div className="flex gap-4">
          <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-3xl text-center">
            <p className="text-[8px] font-black uppercase text-slate-500 mb-1">Global RL Accuracy</p>
            <p className="text-2xl font-black text-white italic">91.4%</p>
          </div>
          <div className="px-6 py-4 bg-cyan-500 border border-cyan-400 rounded-3xl text-center shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <p className="text-[8px] font-black uppercase text-black/60 mb-1">Recovered Revenue</p>
            <p className="text-2xl font-black text-black italic">$16,650</p>
          </div>
        </div>
      </div>

      {/* --- AGENT CARDS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {AGENT_STATS.map((agent) => (
          <div key={agent.id} className="relative group overflow-hidden p-8 rounded-[32px] bg-[#080808] border border-white/5 hover:border-cyan-500/30 transition-all duration-500">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <CpuChipIcon className="w-24 h-24 text-cyan-500" />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md inline-block mb-3">
                    <p className="text-[8px] font-black text-cyan-500 uppercase tracking-widest">{agent.role}</p>
                  </div>
                  <h3 className="text-xl font-black uppercase text-white tracking-tight">{agent.name}</h3>
                </div>
                <BeakerIcon className="w-6 h-6 text-slate-600" />
              </div>

              {/* RL Learning Progress Bar */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                  <span className="text-slate-500 italic">Reinforcement Learning Progress</span>
                  <span className="text-cyan-500">{agent.efficiency}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)]" 
                    style={{ width: `${agent.efficiency}%` }} 
                  />
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <ArrowTrendingUpIcon className="w-3 h-3 text-emerald-500" />
                    <span className="text-[9px] font-black text-slate-400 uppercase">+12% Today</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-black text-slate-500 uppercase mb-1 italic">Agent Yield</p>
                  <p className="text-xl font-black text-white italic">${agent.revenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- FORENSIC AUDIT LOG --- */}
      <div className="p-8 rounded-[32px] bg-black border border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Recent Autonomous Actions</h4>
        </div>
        <div className="space-y-4">
          {[
            'Sales Agent detected pricing objection; autonomously applied "Local Scarcity" rebuttal strategy.',
            'Triage Agent verified insurance provider "Blue Cross" via secondary neural handshake.',
            'Executive Agent updated Sovereign CRM Lead #4492 - Status: BOOKED.'
          ].map((log, i) => (
            <div key={i} className="flex gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
              <span className="text-[9px] font-mono text-cyan-500/50">[{new Date().toLocaleTimeString()}]</span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{log}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
          
