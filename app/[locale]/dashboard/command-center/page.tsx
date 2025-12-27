'use client';

import React from 'react';
import { 
  Activity, 
  Cpu, 
  Globe, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  MousePointerClick,
  Layers,
  TrendingUp
} from 'lucide-react';
import { AgenticPerformance } from '@/components/dashboard/AgenticPerformance';
import { ExecutiveExport } from '@/components/dashboard/ExecutiveExport';

export default function CommandCenter() {
  return (
    <div className="min-h-screen bg-[#020305] text-[#e2e8f0] p-6 lg:p-12">
      
      {/* --- TOP BAR: SYSTEM TELEMETRY --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500">System-Protocol-7 // Online</span>
          </div>
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-white italic">
            Command <span className="text-slate-500">Center</span>
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto">
          {[
            { label: 'Market Node', val: 'USA-TX-01' },
            { label: 'Agent Density', val: '8 Nodes' },
            { label: 'Uptime', val: '99.99%' },
            { label: 'Active Yield', val: '+22.4%' },
          ].map((stat, i) => (
            <div key={i} className="px-6 py-3 bg-white/5 border border-white/10 rounded-sm">
              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-sm font-black text-white tracking-tighter">{stat.val}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT: PRIMARY PERFORMANCE MATRIX (8 COLS) --- */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Real-time Agentic Workforce Component */}
          <AgenticPerformance />

          {/* Institutional Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-sm">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Omni-Pivot Efficacy</h4>
                <Zap className="w-4 h-4 text-cyan-500" />
              </div>
              <div className="flex items-end gap-4 mb-4">
                <span className="text-5xl font-bold tracking-tighter">88.2%</span>
                <span className="text-emerald-500 text-[10px] font-bold mb-2">+4.1%</span>
              </div>
              <p className="text-[9px] text-slate-600 uppercase font-bold tracking-widest leading-relaxed">
                Autonomous redirection of failed voice packets to digital channels (WhatsApp/SMS).
              </p>
            </div>

            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-sm">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Capital Protection</h4>
                <ShieldCheck className="w-4 h-4 text-cyan-500" />
              </div>
              <div className="flex items-end gap-4 mb-4">
                <span className="text-5xl font-bold tracking-tighter">100%</span>
                <span className="text-cyan-500 text-[10px] font-bold mb-2">Secure</span>
              </div>
              <p className="text-[9px] text-slate-600 uppercase font-bold tracking-widest leading-relaxed">
                Zero-knowledge encryption active on all clinical/legal data ingestion nodes.
              </p>
            </div>
          </div>
        </div>

        {/* --- RIGHT: INTELLIGENCE SIDEBAR (4 COLS) --- */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Active Traffic Heatmap Simulation */}
          <div className="p-8 bg-black border border-white/10 rounded-sm">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white mb-8">Node Activity</h4>
            <div className="space-y-6">
              {[
                { loc: 'Inbound Intake', status: 'Processing', color: 'bg-emerald-500' },
                { loc: 'Neural Handshake', status: 'Syncing', color: 'bg-cyan-500' },
                { loc: 'WhatsApp Pivot', status: 'Dispatched', color: 'bg-amber-500' },
                { loc: 'CRM Synthesis', status: 'Idle', color: 'bg-slate-700' },
              ].map((node, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${node.color}`} />
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{node.loc}</span>
                  </div>
                  <span className="text-[9px] font-black text-slate-500 uppercase">{node.status}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/5">
              <div className="w-full h-32 bg-white/5 rounded-sm overflow-hidden relative">
                 {/* Visual placeholder for a waveform or mini-map */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Activity className="w-20 h-20 text-cyan-500" />
                 </div>
              </div>
            </div>
          </div>

          {/* Board-Ready Reporting */}
          <ExecutiveExport />

          <div className="p-8 bg-cyan-500 text-black rounded-sm">
            <TrendingUp className="w-8 h-8 mb-6" />
            <h4 className="text-xl font-bold uppercase tracking-tighter mb-2 italic">Scale Workforce</h4>
            <p className="text-[10px] font-black uppercase tracking-widest mb-6 opacity-80 leading-relaxed">
              Immediate deployment of additional neural nodes to capture peak market demand.
            </p>
            <button className="w-full py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Provision Extra Node
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
