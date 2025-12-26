'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Cpu, Globe, Shield, Command, Radio, Zap, Activity, ArrowUpRight, Lock, BarChart3, Users, Languages, CheckCircle, Scale, Stethoscope, Hammer 
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
      
      {/* --- SOVEREIGN NAVIGATION: Abstracted --- */}
      <nav className={`fixed top-0 w-full z-[200] transition-all duration-700 ${scrolled ? 'bg-black/60 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-12 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-cyan-500 flex items-center justify-center rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-transform group-hover:rotate-180">
              <Command className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">FRONTDESK<span className="text-cyan-500">AGENTS</span></span>
          </Link>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <Link href="#infrastructure" className="hover:text-cyan-400 transition-colors">Global Node</Link>
            <Link href="#intelligence" className="hover:text-cyan-400 transition-colors">Expertise</Link>
            <Link href="#pricing" className="hover:text-cyan-400 transition-colors">Deployment</Link>
            <Link href="/login" className="px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">Client Access</Link>
          </div>
        </div>
      </nav>

      {/* --- HERO: WORLDWIDE SOVEREIGNTY --- */}
      <section className="relative h-screen flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/global-neural-mesh.png')] bg-cover bg-center opacity-20 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010204] via-transparent to-[#010204]" />
        </div>
        
        <div className="container mx-auto px-12 relative z-10">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <Radio className="w-3 h-3 text-cyan-500 animate-pulse" />
              <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em]">Protocol v2.5 Stable • Global Sovereign Access</span>
            </div>
            <h1 className="text-[11vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase italic mb-8">
              THE WORLD'S <br /><span className="text-cyan-500">ELITE AI NODE</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl font-medium mb-12 uppercase tracking-wide">
              Architecting autonomous front-office solutions for high-stakes service enterprises. Seamless integration across all worldwide markets.
            </p>
            <div className="flex gap-6">
              <Link href="#pricing" className="px-14 py-7 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-xl shadow-[0_20px_50px_rgba(6,182,212,0.3)] hover:scale-105 transition-all inline-block">
                Initialize Sovereignty
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTELLIGENCE LAYER: Obfuscated vertical logic --- */}
      <section id="intelligence" className="py-32 bg-[#050505] border-y border-white/5">
        <div className="container mx-auto px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="text-cyan-500 font-black text-xs uppercase tracking-[0.4em] mb-4">Cultural Alignment</div>
              <h2 className="text-5xl font-black uppercase italic mb-8">Adaptive <span className="text-cyan-500">Expertise</span></h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Our proprietary logic constructs high-fidelity personas for any industry. We ensure your digital presence is pre-configured with regional intelligence before activation.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-3">
                  <Stethoscope className="text-cyan-500 w-4 h-4" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Healthcare</span>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-3">
                  <Scale className="text-cyan-500 w-4 h-4" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Legal Services</span>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-3">
                  <Hammer className="text-cyan-500 w-4 h-4" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Premium Trades</span>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-3">
                  <Globe className="text-cyan-500 w-4 h-4" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Enterprise</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative p-1 rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
                <div className="absolute inset-0 neural-mesh-overlay opacity-30" />
                <div className="bg-black p-12 relative z-10 flex items-center justify-center aspect-square lg:aspect-video">
                  <Zap className="w-20 h-20 text-cyan-500/10 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- INFRASTRUCTURE: LTR/RTL Abstracted --- */}
      <section id="infrastructure" className="py-32 bg-black">
        <div className="container mx-auto px-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 relative h-[450px] rounded-[48px] border border-white/5 overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
               <div className="relative z-10 p-12 flex flex-col h-full justify-between">
                <Languages className="w-12 h-12 text-cyan-500" />
                <div>
                  <h3 className="text-5xl font-black uppercase italic mb-4">Linguistic Core</h3>
                  <p className="text-slate-400 max-w-md font-bold text-sm tracking-widest uppercase">Autonomous directionality and dialect optimization for global market sovereignty.</p>
                </div>
              </div>
            </div>

            <div className="relative h-[450px] rounded-[48px] bg-cyan-500 p-12 text-black overflow-hidden group">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <Shield className="w-12 h-12" />
                <div>
                  <h3 className="text-4xl font-black uppercase italic leading-none mb-4">Aegis <br/>Logic</h3>
                  <p className="font-black text-[10px] uppercase tracking-widest">Encrypted data protection and automated node optimization.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ROI CALCULATOR: "Forensic" stays as a brand term --- */}
      <section className="py-40 bg-white/[0.01] relative">
        <div className="container mx-auto px-12">
           <div className="mb-16 text-center">
             <h2 className="text-6xl font-black uppercase italic mb-4">Forensic ROI</h2>
             <p className="text-cyan-500 font-black tracking-[0.3em] uppercase text-xs">Verify Enterprise Performance</p>
           </div>
          <ROICalculator />
        </div>
      </section>

    </div>
  );
}
