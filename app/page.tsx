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
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white">
              FrontDesk Agents
            </h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
              Global Revenue Workforce 1.0
            </p>
          </div>
          {/* Passing the Elite Tier parameter to satisfy NodeStatusProps */}
          <NodeStatus tier="Elite" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
             <div className="h-[400px] rounded-3xl border border-white/5 bg-zinc-900/20 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-4 animate-pulse flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-brand-cyan" />
                </div>
                <p className="text-white font-black text-xs uppercase tracking-[0.4em] mb-2">System Core Active</p>
                <p className="text-zinc-500 text-[10px] font-medium uppercase tracking-widest max-w-xs">
                  Portland Node (PDX1) serving global markets with 1.0 parity logic.
                </p>
             </div>
          </div>
          
          <aside>
            <CallActivityFeed />
          </aside>
        </div>
      </div>
    </main>
  );
}
