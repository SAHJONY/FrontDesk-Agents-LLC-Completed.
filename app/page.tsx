'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  SparklesIcon, 
  CheckBadgeIcon, 
  ShieldCheckIcon, 
  GlobeAmericasIcon,
  CpuChipIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#000814] text-white selection:bg-cyan-500/30 font-sans antialiased">
      
      {/* --- ELITE NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#000814]/70 backdrop-blur-2xl">
        <div className="container mx-auto px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <SparklesIcon className="w-6 h-6 text-[#000814]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase italic leading-none">FrontDesk</span>
              <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-500 uppercase leading-none mt-1">Agents</span>
            </div>
          </div>
          
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <Link href="#neural" className="hover:text-white transition-colors">Neural Core</Link>
            <Link href="#voice" className="hover:text-white transition-colors">Voice Cloning</Link>
            <Link href="#enterprise" className="hover:text-white transition-colors">Enterprise</Link>
          </div>

          <Link href="/dashboard">
            <button className="px-8 py-3 bg-white text-[#000814] rounded-full hover:bg-cyan-500 transition-all text-[10px] font-black uppercase tracking-widest">
              Access Portal
            </button>
          </Link>
        </div>
      </nav>

      {/* --- CINEMATIC HERO SECTION --- */}
      <header className="relative pt-32 pb-32 px-6 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Apple-style background imagery */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/premium/hero-cinematic.jpg" 
            alt="Neural Command Center" 
            fill
            priority
            className="object-cover opacity-30 scale-105"
          />
          {/* Gradient masking for 100% text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#000814] via-transparent to-[#000814]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000814] via-transparent to-[#000814]" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black mb-10 uppercase tracking-[0.4em] animate-pulse">
            <CheckBadgeIcon className="w-4 h-4" /> Global Intelligence Established
          </div>
          
          <h1 className="text-6xl md:text-[120px] font-black mb-10 tracking-tighter leading-[0.8] italic uppercase">
            <span className="text-white">Neural</span><br />
            <span className="bg-gradient-to-b from-cyan-400 to-cyan-700 bg-clip-text text-transparent">Execution.</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
            Replace manual outreach with high-fidelity autonomous voice agents. Trained on your proprietary data. Built for multi-billion dollar scale.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/dashboard" className="px-12 py-6 bg-cyan-500 hover:bg-cyan-400 text-[#000814] rounded-2xl font-black transition-all shadow-[0_0_50px_rgba(6,182,212,0.3)] text-[12px] uppercase tracking-widest">
              Initiate Neural Swarm
            </Link>
            <Link href="#agents" className="px-12 py-6 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-black transition-all text-[12px] uppercase tracking-widest">
              View Agent Specs
            </Link>
          </div>
        </div>
      </header>

      {/* --- AGENT SPECIFICATIONS --- */}
      <section id="agents" className="py-32 relative bg-[#000d1a]">
        <div className="container mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em] mb-4">The Personnel</h2>
            <p className="text-4xl font-black italic uppercase tracking-tighter">Autonomous Intelligence Units</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
            
            {/* AGENT: SARA */}
            <div className="relative group overflow-hidden rounded-[50px] border border-white/5 bg-black/40 backdrop-blur-3xl p-1">
              <div className="relative h-[400px] overflow-hidden rounded-[48px]">
                <Image 
                  src="/premium/team/agents-grid.jpg" 
                  alt="Sara: Inbound Neural Agent" 
                  fill 
                  className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <span className="px-4 py-1 bg-cyan-500 text-[#000814] text-[9px] font-black uppercase rounded-full tracking-widest">Inbound Specialist</span>
                  <h3 className="text-5xl font-black mt-4 italic uppercase">Sara</h3>
                </div>
              </div>
              <div className="p-12">
                <p className="text-slate-400 text-lg leading-relaxed mb-8">Specialized in high-volume customer acquisition, scheduling, and instantaneous knowledge retrieval from your corporate database.</p>
                <div className="flex items-center gap-6 border-t border-white/5 pt-8">
                  <div className="flex-1">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Response Latency</p>
                    <p className="font-mono text-cyan-500 font-bold tracking-tighter">&lt; 400ms</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Human Score</p>
                    <p className="font-mono text-cyan-500 font-bold tracking-tighter">99.8%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AGENT: ALEX */}
            <div className="relative group overflow-hidden rounded-[50px] border border-white/5 bg-black/40 backdrop-blur-3xl p-1">
              <div className="relative h-[400px] overflow-hidden rounded-[48px]">
                <Image 
                  src="/premium/command-center-dark.jpg" 
                  alt="Alex: Outbound Neural Agent" 
                  fill 
                  className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <span className="px-4 py-1 bg-purple-500 text-white text-[9px] font-black uppercase rounded-full tracking-widest">Sales Acquisition</span>
                  <h3 className="text-5xl font-black mt-4 italic uppercase">Alex</h3>
                </div>
              </div>
              <div className="p-12">
                <p className="text-slate-400 text-lg leading-relaxed mb-8">Outbound unit engineered for aggressive prospecting, complex objection handling, and closing high-ticket enterprise contracts.</p>
                <div className="flex items-center gap-6 border-t border-white/5 pt-8">
                  <div className="flex-1">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Objection Logic</p>
                    <p className="font-mono text-purple-500 font-bold tracking-tighter">Advanced v4.2</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Voice Persistence</p>
                    <p className="font-mono text-purple-500 font-bold tracking-tighter">Infinite</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- ENTERPRISE SPECS GRID --- */}
      <section className="py-32 bg-[#000814]">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-16 border-t border-white/5 pt-20">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <CpuChipIcon className="w-6 h-6 text-cyan-500" />
              </div>
              <h4 className="text-xl font-black uppercase italic tracking-tighter text-white">Neural Processing</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Our proprietary Neural engine processes human sentiment in real-time, adjusting pitch and tone for maximum conversion.</p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <GlobeAmericasIcon className="w-6 h-6 text-purple-500" />
              </div>
              <h4 className="text-xl font-black uppercase italic tracking-tighter text-white">Global Scalability</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Deploy swarms across 6 continents with local dialer signatures. Fully compliant with international communications protocols.</p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <MicrophoneIcon className="w-6 h-6 text-emerald-500" />
              </div>
              <h4 className="text-xl font-black uppercase italic tracking-tighter text-white">Neural Cloning</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Capture the exact essence of your best sales rep. Our Neural Voice Lab clones inflection and charisma with extreme precision.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ELITE FOOTER --- */}
      <footer className="py-32 border-t border-white/5 bg-black">
        <div className="container mx-auto px-8 text-center">
          <div className="flex justify-center gap-6 mb-12 grayscale opacity-30">
             <ShieldCheckIcon className="w-6 h-6 text-cyan-500" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Proprietary Security Protocols Active</span>
          </div>
          <p className="text-slate-700 text-[10px] uppercase tracking-[0.3em] font-black leading-loose">
            © 2025 FrontDesk Agents LLC • Intelligence Architecture v4.2.0-PRO <br />
            <span className="text-slate-800">Operational Excellence Engineered by J. Gonzalez</span>
          </p>
          <p className="mt-8 text-slate-800 text-[9px] font-bold uppercase tracking-widest">Secure Uplink: Frontdeskllc@outlook.com</p>
        </div>
      </footer>
    </div>
  );
}
