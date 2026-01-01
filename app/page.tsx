'use client';

import React from 'react';
import NodeStatus from '@/components/dashboard/NodeStatus';
import Link from 'next/link';
import Image from 'next/image';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Premium Landing & Entry Portal
 */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Glow for Premium Feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black -z-10" />

      <header className="mt-12 mb-16 text-center max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
          FRONTDESK AGENTS
        </h1>
        <p className="text-zinc-400 font-mono text-sm md:text-base tracking-[0.3em] uppercase mb-8">
          Global Revenue Workforce • Autonomous Fleet
        </p>
        
        {/* Hero Image Integration */}
        <div className="relative w-full aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-zinc-800 shadow-2xl mb-12 group">
          <Image 
            src="/assets/premium/hero-team.png" 
            alt="FrontDesk Agents Elite Team" 
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-8 left-8 text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-2">Global Headquarters</p>
            <h2 className="text-2xl font-bold italic">Sovereign Financial Hub</h2>
          </div>
        </div>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Real-time Node Status Monitor */}
        <div className="md:col-span-2">
          <NodeStatus tier="Elite" />
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2rem] flex flex-col justify-center relative overflow-hidden group">
            <Image 
              src="/assets/premium/outbound-calls-stats.png" 
              alt="Performance Stats" 
              fill
              className="object-cover opacity-20 group-hover:opacity-30 transition-opacity"
            />
            <div className="relative z-10">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Workforce Performance</h3>
              <p className="text-4xl font-black text-blue-500">15% Recovery Yield</p>
              <p className="text-[10px] text-zinc-500 mt-4 uppercase tracking-[0.2em]">Active in pdx1 Region</p>
            </div>
          </div>

          <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2rem] flex flex-col justify-center relative overflow-hidden group">
            <Image 
              src="/assets/premium/ai-agent-interface.png" 
              alt="AI Interface" 
              fill
              className="object-cover opacity-20 group-hover:opacity-30 transition-opacity"
            />
            <div className="relative z-10">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">System Integrity</h3>
              <p className="text-4xl font-black text-green-500">99.9% Uptime</p>
              <p className="text-[10px] text-zinc-500 mt-4 uppercase tracking-[0.2em]">Autonomous Fleet Active</p>
            </div>
          </div>
        </div>

        <Link 
          href="/login"
          className="md:col-span-3 group relative p-6 bg-white text-black font-black text-center rounded-2xl transition-all hover:bg-zinc-200 active:scale-[0.99] overflow-hidden"
        >
          <span className="relative z-10 text-xl uppercase tracking-tighter">Access Command Center</span>
          <span className="absolute right-8 top-1/2 -translate-y-1/2 group-hover:translate-x-2 transition-transform text-2xl z-10">→</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </Link>
      </main>

      <section className="mt-24 w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black italic mb-6 uppercase tracking-tighter">Global Industries</h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              FrontDesk Agents provides elite AI-powered litigation, arbitration, and revenue operations serving global markets locally. Our autonomous fleet is trained across specialized sectors to ensure maximum recovery and compliance.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {['Healthcare', 'Legal', 'Real Estate', 'Finance'].map((industry) => (
                <div key={industry} className="flex items-center gap-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  <span className="text-xs font-bold uppercase tracking-widest">{industry}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-zinc-800">
            <Image 
              src="/assets/premium/industries-overview.png" 
              alt="Industries Overview" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <footer className="mt-32 mb-16 w-full max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-zinc-900 pt-16">
          <div>
            <p className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-600 mb-2">Basic</p>
            <p className="text-2xl font-black">$199</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-600 mb-2">Professional</p>
            <p className="text-2xl font-black">$399</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-600 mb-2">Growth</p>
            <p className="text-2xl font-black">$799</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-black tracking-[0.3em] text-blue-500 mb-2">Elite</p>
            <p className="text-2xl font-black text-blue-500">$1,499</p>
          </div>
        </div>
        <div className="mt-16 text-center">
          <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em]">
            © 2025 FrontDesk Agents LLC // All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
