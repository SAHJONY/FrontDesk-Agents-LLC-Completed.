'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Cpu, Globe, Shield, Command, Radio, Zap, Activity, ArrowUpRight, Lock, BarChart3, Users, Languages, CheckCircle, Scale, Stethoscope, Hammer, ShieldAlert, ChevronRight 
} from 'lucide-react';
import { Plans } from '@/config/plans';
import { ROICalculator } from '@/components/marketing/ROICalculator';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#010204] text-[#f8fafc] font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* --- SOVEREIGN NAVIGATION --- */}
      <nav className={`fixed top-0 w-full z-[200] transition-all duration-700 ${scrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-12 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-cyan-500 flex items-center justify-center rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-transform group-hover:rotate-180">
              <Command className="w-6 h-6 text-black" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tighter uppercase italic">FRONTDESK<span className="text-cyan-500">AGENTS</span></span>
              <span className="text-[7px] font-black tracking-[0.4em] uppercase text-slate-500">LLC Sovereign Architecture</span>
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <Link href="#infrastructure" className="hover:text-cyan-400 transition-colors">Infrastructure</Link>
            <Link href="#pricing" className="hover:text-cyan-400 transition-colors">Nodes</Link>
            <Link href="https://www.frontdeskagents.com" target="_blank" className="hover:text-cyan-400 transition-colors">Mainframe</Link>
            <Link href="/login" className="px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2">
              <Lock className="w-3 h-3" /> Client Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO: GLOBAL OPERATIONS MAINBOARD --- */}
      <section className="relative h-screen flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          {/* Background image reflecting Global Operations */}
          <div className="absolute inset-0 bg-[url('https://googleusercontent.com/image_generation_content/0')] bg-cover bg-center opacity-40 grayscale-[50%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#010204] via-[#010204]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010204] via-transparent to-[#010204]" />
        </div>
        
        <div className="container mx-auto px-12 relative z-10">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em]">System Live: Global Dispatch Active</span>
            </div>
            <h1 className="text-[10vw] lg:text-[7vw] font-black leading-[0.85] tracking-tighter uppercase italic mb-8">
              FRONTDESK <br /><span className="text-cyan-500 text-glow">AGENTS LLC</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl font-medium mb-12 uppercase tracking-wide leading-relaxed border-l-2 border-cyan-500 pl-6">
              Sovereign AI Infrastructure for Global Enterprise. <br/>
              <span className="text-slate-500 text-sm italic">provisioning high-fidelity nodes across all LTR/RTL markets.</span>
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="#pricing" className="px-12 py-6 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-sm shadow-[0_20px_50px_rgba(6,182,212,0.3)] hover:bg-white transition-all flex items-center gap-4">
                Deploy Agent Node <ChevronRight className="w-5 h-5" />
              </Link>
              <div className="px-12 py-6 border border-white/10 text-white font-black uppercase tracking-widest rounded-sm hover:bg-white/5 transition-all">
                View Network Stats
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- INFRASTRUCTURE: LTR/RTL CAPABILITIES --- */}
      
      <section id="infrastructure" className="py-32 bg-[#050505]">
        <div className="container mx-auto px-12">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="text-cyan-500 font-black text-xs uppercase tracking-[0.4em] mb-4">Linguistic Sovereignty</div>
              <h2 className="text-6xl font-black uppercase italic mb-8 leading-none">Universal <br/><span className="text-cyan-500">Dispatch Logic</span></h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                Our platform autonomously adapts to market directionality. Whether your leads are in Houston or Dubai, the FrontDesk Agents LLC protocol ensures native-grade interaction.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10 text-cyan-500">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">Geo-Chameleon Protocol</h4>
                    <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">Automatic market-based pricing, language detection, and regional compliance.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10 text-cyan-500">
                    <Languages className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">Native RTL Inversion</h4>
                    <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">Dynamic CSS logical properties support for Arabic, Hebrew, and Persian nodes.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-cyan-500/20 blur-[120px] rounded-full" />
              <div className="relative p-8 rounded-[32px] bg-zinc-900/50 border border-white/10 backdrop-blur-3xl">
                <div className="flex justify-between items-center mb-12">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Ops Monitor v4.0</span>
                </div>
                {/* Visualizing live market nodes */}
                <div className="space-y-4">
                  {[
                    { node: "Houston Node", status: "Active", region: "US", ping: "24ms" },
                    { node: "Dubai Node", status: "Active", region: "UAE", ping: "142ms" },
                    { node: "London Node", status: "Standby", region: "UK", ping: "89ms" }
                  ].map((node, i) => (
                    <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Activity className="w-4 h-4 text-cyan-500" />
                        <span className="text-[11px] font-black uppercase text-white tracking-widest">{node.node}</span>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className="text-[9px] font-bold text-slate-500">{node.ping}</span>
                         <div className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[8px] font-black uppercase tracking-tighter">Secure</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- REVENUE GUARDED SECTION --- */}
      <section className="py-40 relative overflow-hidden bg-black border-y border-white/5">
        <div className="container mx-auto px-12">
          <div className="flex flex-col items-center text-center mb-24">
            <h2 className="text-7xl font-black uppercase italic mb-6">Revenue <span className="text-cyan-500 text-glow">Guarded</span></h2>
            <p className="text-slate-400 max-w-xl font-bold uppercase tracking-widest text-sm leading-loose">
              Every node deployed by FrontDesk Agents LLC is optimized for Forensic ROI. Protect your global pipeline with zero-latency dispatching.
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* --- GLOBAL FOOTER --- */}
      <footer className="py-20 bg-[#010204] border-t border-white/5">
        <div className="container mx-auto px-12 flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-2xl font-black tracking-tighter uppercase italic text-white">FRONTDESK<span className="text-cyan-500">AGENTS</span></span>
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">© 2025 FrontDesk Agents LLC • Sovereignty Secured</p>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <Link href="https://www.frontdeskagents.com" className="hover:text-cyan-500">Brand Home</Link>
            <Link href="/privacy" className="hover:text-cyan-500">Node Security</Link>
            <Link href="/terms" className="hover:text-cyan-500">Service Terms</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
