"use client";

import React from 'react';
import { NodeStatus } from '@/components/dashboard/NodeStatus';
import Image from 'next/image';
import { CallActivityFeed } from '@/components/dashboard/CallActivityFeed';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Node: Portland (pdx1)
 * Status: 1.0 Final Production Build
 */

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">
              FrontDesk Agents
            </h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
              Global Revenue Workforce 1.0
            </p>
          </div>
          <NodeStatus />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
             <div className="h-[400px] rounded-3xl border border-white/5 bg-zinc-900/20 backdrop-blur-xl flex items-center justify-center">
                <p className="text-zinc-600 font-mono text-xs uppercase tracking-[0.5em]">System Core Active</p>
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
