'use client';

import React from 'react';
import { NodeStatus } from '@/components/dashboard/NodeStatus';
import Link from 'next/link';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Premium Landing & Entry Portal
 */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 selection:bg-blue-500/30">
      {/* Background Glow for Premium Feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black -z-10" />

      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
          FRONTDESK AGENTS
        </h1>
        <p className="text-zinc-400 font-mono text-sm tracking-[0.2em] uppercase">
          Global Revenue Workforce • Autonomous Fleet
        </p>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Real-time Node Status Monitor */}
        <NodeStatus tier="Elite" />
        
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-2">Workforce Performance</h3>
          <p className="text-3xl font-black text-blue-500">15% Recovery Yield</p>
          <p className="text-xs text-zinc-500 mt-2 uppercase tracking-widest">Active in pdx1 Region</p>
        </div>

        <Link 
          href="/login"
          className="md:col-span-2 group relative p-4 bg-white text-black font-bold text-center rounded-xl transition-all hover:bg-zinc-200 active:scale-[0.98]"
        >
          Access Command Center
          <span className="absolute right-4 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </main>

      <footer className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center opacity-40 hover:opacity-100 transition-opacity">
        <div>
          <p className="text-[10px] uppercase font-bold tracking-widest">Basic</p>
          <p className="text-sm">$199</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold tracking-widest">Professional</p>
          <p className="text-sm">$399</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold tracking-widest">Growth</p>
          <p className="text-sm">$799</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-blue-500">Elite</p>
          <p className="text-sm text-blue-500 font-bold">$1,499</p>
        </div>
      </footer>
    </div>
  );
}
