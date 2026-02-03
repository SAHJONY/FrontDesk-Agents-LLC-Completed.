"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Cpu, Zap, Loader2, AlertCircle } from "lucide-react";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

/**
 * AI AGENTS PAGE - PRODUCTION HARDENED
 * - Suspense handles loading
 * - ErrorBoundary handles runtime exceptions
 * - dynamic import with ssr:false prevents server-render crashes
 */

// Loading fallback
const GridFallback = () => (
  <div className="flex flex-col items-center justify-center p-20 rounded-[2rem] border border-white/5 bg-white/5 text-center">
    <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
    <h3 className="text-xl font-bold italic uppercase tracking-tighter">Initializing Neural Links</h3>
    <p className="text-slate-500 text-sm mt-2 max-w-xs">
      Connecting to the global agent workforce. Please wait while the bridge establishes...
    </p>
  </div>
);

const GridErrorFallback = () => (
  <div className="flex flex-col items-center justify-center p-20 rounded-[2rem] border border-red-500/20 bg-red-500/5 text-center">
    <h3 className="text-xl font-bold italic uppercase tracking-tighter text-red-200">
      Workforce Grid Unavailable
    </h3>
    <p className="text-red-200/70 text-sm mt-2 max-w-xs">
      We hit an unexpected error loading the agent grid. Please try again or check configuration.
    </p>
  </div>
);

// Client-only load to avoid SSR crashes from dependencies/hook side-effects
const AgentPerformanceGrid = dynamic(
  () =>
    import("@/components/workforce/agent-performance-grid").then(
      (m) => m.AgentPerformanceGrid
    ),
  { ssr: false, loading: () => <GridFallback /> }
);

export default function AIAgentsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-emerald-500/30">
      <div className="flex flex-col gap-10 p-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/5 p-8 md:p-12">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Cpu size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">
                  Neural Management System v2.2.1
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-4 leading-none">
                Agent <span className="text-emerald-500 text-stroke-sm">Workforce</span>
              </h1>
              <p className="max-w-xl text-slate-400 font-medium leading-relaxed">
                Supervise, optimize, and scale your autonomous nodes across your infrastructure in real-time.
              </p>
            </div>

            {/* Glows */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 blur-[100px] rounded-full" />
          </div>
        </section>

        {/* GRID */}
        <section className="animate-in fade-in duration-700 delay-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                <h2 className="text-2xl font-bold tracking-tight italic uppercase">
                  Active Neural Workforce
                </h2>
              </div>
              <p className="text-gray-400 mt-1 text-sm font-medium">
                Real-time status of your autonomous agents across all jurisdictions.
              </p>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">
                Bridge Secure
              </span>
            </div>
          </div>

          <ErrorBoundary fallback={<GridErrorFallback />}>
            <Suspense fallback={<GridFallback />}>
              <div className="min-h-[400px]">
                <AgentPerformanceGrid />
              </div>
            </Suspense>
          </ErrorBoundary>
        </section>

        {/* FOOTER */}
        <div className="flex items-center gap-2 p-4 rounded-xl border border-white/5 bg-white/[0.02] mt-10">
          <AlertCircle size={14} className="text-slate-500" />
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
            End-to-End Encrypted Session • Authorized Admin Access Only
          </p>
        </div>
      </div>
    </main>
  );
}
