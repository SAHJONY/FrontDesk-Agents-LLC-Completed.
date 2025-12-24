'use client';

import React, { useState, useEffect } from 'react';
import AnalyticsView from '@/components/dashboard/AnalyticsView'; 
import { Activity, ShieldCheck, Globe, Zap, Cpu, ArrowUpRight } from 'lucide-react';

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/analytics');
        if (!response.ok) throw new Error('Failed to synchronize neural analytics');
        
        const data = await response.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  // 1. ELITE LOADING STATE: NEURAL SYNC
  if (loading) return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#010204] space-y-6">
      <div className="relative">
        <div className="w-20 h-20 border-2 border-cyan-500/20 rounded-full animate-spin border-t-cyan-500" />
        <Cpu className="absolute inset-0 m-auto text-cyan-500 w-8 h-8 animate-pulse" />
      </div>
      <div className="text-cyan-500 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">
        Synchronizing Global Neural Analytics...
      </div>
    </div>
  );

  // 2. ERROR STATE
  if (error) return (
    <div className="flex h-screen items-center justify-center bg-[#010204] p-10">
      <div className="p-8 border border-red-500/20 bg-red-500/5 rounded-2xl text-red-500 font-black uppercase tracking-widest text-xs">
        System Alert: {error}
      </div>
    </div>
  );

  // 3. THE TITAN COMMAND VIEW
  return (
    <div className="min-h-screen bg-[#010204] text-[#f8fafc] p-8 md:p-12 font-sans selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* COMMAND HEADER */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <Activity className="w-3 h-3 text-cyan-500" />
              <span className="text-cyan-500 text-[9px] font-black uppercase tracking-[0.3em]">Live Node Intelligence</span>
            </div>
            <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none">
              Performance <span className="text-cyan-500">Forensics</span>
            </h1>
            <p className="text-slate-500 font-bold uppercase text-[11px] tracking-[0.2em] max-w-xl">
              Real-time synthesis of global neural dispatch metrics and revenue recovery manifests.
            </p>
          </div>

          <button className="group flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all duration-500">
            <span className="text-[10px] font-black uppercase tracking-widest">Export ROI Manifest</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </header>

        {/* ANALYTICS GRID WRAPPER */}
        <div className="relative group">
          {/* Subtle Glow Background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-[40px] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
          
          <div className="relative bg-[#010204]/80 backdrop-blur-3xl border border-white/5 p-8 md:p-12 rounded-[40px] shadow-2xl">
            {/* Tremor Component Integration */}
            <AnalyticsView stats={stats} />
          </div>
        </div>

        {/* GLOBAL NETWORK STATUS BAR */}
        <footer className="mt-16 flex items-center justify-between border-t border-white/5 pt-8 opacity-40">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Aegis Protection: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Node: Houston-TX-01</span>
              </div>
           </div>
           <span className="text-[9px] font-mono tracking-tighter">V.2.1.0_PRO_SVRIGN</span>
        </footer>

      </div>
    </div>
  );
}
