"use client";

import React from 'react';
// Corrected imports to match the workforce directory and kebab-case naming
import { AgentPerformanceGrid } from "@/components/workforce/agent-performance-grid";
import { Cpu, Zap } from "lucide-react";

// Note: 'force-dynamic' is a server-side hint; in a 'use client' file, 
// the real-time heavy lifting is handled by your Supabase hooks.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AIAgentsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="flex flex-col gap-10 p-6 max-w-7xl mx-auto">
        
        {/* 1. COMMAND HEADER (Replacement for NeuralHero if path is unstable) */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/5 p-8 md:p-12">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Cpu size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
                  Neural Management System
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-4">
                Agent <span className="text-emerald-500 text-stroke-sm">Workforce</span>
              </h1>
              <p className="max-w-xl text-slate-400 font-medium leading-relaxed">
                Supervise, optimize, and scale your autonomous "Agent Smith" nodes across your global infrastructure in real-time.
              </p>
            </div>
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full" />
          </div>
        </section>

        {/* 2. THE WORKFORCE GRID SECTION */}
        <section className="animate-in fade-in duration-700 delay-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight italic uppercase flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" /> Active Neural Workforce
              </h2>
              <p className="text-gray-400 mt-1 text-sm font-medium">Real-time status of your autonomous agents across all jurisdictions.</p>
            </div>
            
            {/* Status Indicator for Supabase Realtime */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live Sync Active</span>
            </div>
          </div>

          {/* Corrected Component: Using AgentPerformanceGrid from your workforce directory */}
          <AgentPerformanceGrid />
        </section>
      </div>
    </main>
  );
}
