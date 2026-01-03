"use client";

import React from 'react';
import { NodeStatus } from '@/components/dashboard/NodeStatus';
import { CallActivityFeed } from '@/components/dashboard/CallActivityFeed';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Infrastructure: Portland (pdx1)
 * Logic: 1.0 Global Parity
 * Status: Production Final
 */

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      {/* Background Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-950/20 via-black to-black -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-white/5 pb-8 gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white leading-none">
              FrontDesk Agents
            </h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
              Global Revenue Workforce 1.0
            </p>
          </div>
          {/* Visualizing the Elite node for performance monitoring */}
          <NodeStatus tier="Elite" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             {/* Main Operational Core Visualization */}
             <div className="h-[450px] rounded-3xl border border-white/10 bg-zinc-900/30 backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 flex items-center justify-center relative">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                  <div className="absolute inset-0 rounded-full border border-cyan-500/40 animate-ping" />
                </div>

                <h2 className="text-white font-black text-sm uppercase tracking-[0.5em] mb-3">System Core Active</h2>
                <p className="text-zinc-400 text-[10px] font-mono leading-relaxed uppercase tracking-widest max-w-sm">
                  Portland Node (PDX1) established. <br/>
                  Executing 1.0 parity logic across all active markets.
                </p>

                {/* Pricing Tiers Quick-Stats */}
                <div className="mt-12 grid grid-cols-4 gap-4 w-full border-t border-white/5 pt-8">
                  {[["B", "$199"], ["P", "$399"], ["G", "$799"], ["E", "$1,499"]].map(([tag, price]) => (
                    <div key={tag} className="flex flex-col items-center">
                      <span className="text-[9px] font-black text-zinc-600 mb-1">{tag}</span>
                      <span className="text-xs font-mono text-zinc-400">{price}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
          
          <aside className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-2">Live Workforce Activity</h3>
            <CallActivityFeed />
          </aside>
        </div>
      </div>
    </main>
  );
}
