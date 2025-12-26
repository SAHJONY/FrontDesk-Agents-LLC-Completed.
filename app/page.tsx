'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Cpu, Globe, Shield, Command, Radio, Zap, Activity, ArrowUpRight, Lock, BarChart3, Users, Languages, CheckCircle 
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
      <nav className={`fixed top-0 w-full z-[200] transition-all duration-700 ${scrolled ? 'bg-black/60 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-12 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-cyan-500 flex items-center justify-center rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-transform group-hover:rotate-180">
              <Command className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">FRONTDESK<span className="text-cyan-500">AGENTS</span></span>
          </Link>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <Link href="#solutions" className="hover:text-cyan-400 transition-colors">Infrastructure</Link>
            <Link href="#autonomous" className="hover:text-cyan-400 transition-colors">Shadow Logic</Link>
            <Link href="#pricing" className="hover:text-cyan-400 transition-colors">Deployment</Link>
            <Link href="/login" className="px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">Client Portal</Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION: GLOBAL NEURAL ENGINE --- */}
      <section className="relative h-screen flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/global-neural-mesh.png')] bg-cover bg-center opacity-30 grayscale hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010204] via-transparent to-[#010204]" />
        </div>
        
        <div className="container mx-auto px-12 relative z-10">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <Radio className="w-3 h-3 text-cyan-500 animate-pulse" />
              <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em]">System v2.1 Live • All Global Nodes Operational</span>
            </div>
            <h1 className="text-[11vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase italic mb-8">
              THE WORLD'S <br /><span className="text-cyan-500">ELITE AI ENGINE</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl font-medium mb-12 uppercase tracking-wide">
              Architecting autonomous front-office sovereignty for the world's leading service enterprises. Instant deployment on any market, in any language.
            </p>
            <div className="flex gap-6">
              <Link href="#pricing" className="px-14 py-7 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-xl shadow-[0_20px_50px_rgba(6,182,212,0.3)] hover:scale-105 transition-all inline-block">
                Initialize Deployment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- AUTONOMOUS SHADOW LOGIC --- */}
      <section id="autonomous" className="py-32 bg-[#050505] border-y border-white/5">
        <div className="container mx-auto px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="text-cyan-500 font-black text-xs uppercase tracking-[0.4em] mb-4">Zero-Touch Ingestion</div>
              <h2 className="text-5xl font-black uppercase italic mb-8">Shadow <span className="text-cyan-500">Provisioning</span></h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                The platform autonomously configures itself with your business intelligence. No manual setup. No training required. The system is ready before you are.
              </p>
              <ul className="space-y-6 text-sm font-black uppercase tracking-widest text-slate-300">
                <li className="flex items-center gap-4"><Zap className="text-cyan-500 w-5 h-5"/> Instant Knowledge Mapping</li>
                <li className="flex items-center gap-4"><Languages className="text-cyan-500 w-5 h-5"/> Multilingual Autonomous Switching</li>
                <li className="flex items-center gap-4"><CheckCircle className="text-cyan-500 w-5 h-5"/> Seamless Production Transition</li>
              </ul>
            </div>
            <div className="lg:w-1/2 relative group">
              <div className="relative z-10 p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/5">
                <div className="bg-black/80 rounded-[22px] p-8 aspect-video flex items-center justify-center">
                   <BarChart3 className="w-24 h-24 text-cyan-500/20 animate-pulse" />
                </div>
              </div>
              <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* --- WORLDWIDE SOLUTIONS GRID --- */}
      <section id="solutions" className="py-32 bg-black">
        <div className="container mx-auto px-12">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* NEURAL DISPATCH */}
            <div className="lg:col-span-2 relative h-[500px] rounded-[48px] border border-white/5 overflow-hidden group">
              <div className="absolute inset-0 bg-[url('/images/dispatch-flow.png')] opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10 p-12 bg-gradient-to-t from-black to-transparent h-full flex flex-col justify-end">
                <Globe className="w-12 h-12 text-cyan-500 mb-8" />
                <h3 className="text-5xl font-black uppercase italic mb-4">Neural Dispatch</h3>
                <p className="text-slate-400 max-w-md font-bold text-sm tracking-widest uppercase">Autonomous intent processing across global nodes with native LTR and RTL support.</p>
              </div>
            </div>

            {/* AEGIS PROTECTION */}
            <div className="relative h-[500px] rounded-[48px] bg-cyan-500 p-12 text-black overflow-hidden group">
              <div className="absolute inset-0 bg-[url('/images/aegis-protection.png')] opacity-10 grayscale group-hover:opacity-20 transition-all" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <Lock className="w-12 h-12" />
                <div>
                  <h3 className="text-4xl font-black uppercase italic leading-none mb-4">Aegis <br/>Shield</h3>
                  <p className="font-black text-[10px] uppercase tracking-widest">Forensic-grade data protection and spam interception.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- ROI ANALYTICS --- */}
      <section className="py-40 bg-white/[0.01] relative overflow-hidden">
        <div className="container mx-auto px-12 relative z-10">
           <div className="mb-16 text-center">
             <h2 className="text-6xl font-black uppercase italic mb-4">Forensic ROI</h2>
             <p className="text-cyan-500 font-black tracking-[0.3em] uppercase text-xs">Analyze Your Enterprise Value Autonomously</p>
           </div>
          <ROICalculator />
        </div>
      </section>

    </div>
  );
}
