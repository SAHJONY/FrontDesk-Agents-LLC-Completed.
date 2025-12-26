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
      
      {/* --- UNIVERSAL NAVIGATION --- */}
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
            <Link href="/login" className="px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">Portal</Link>
          </div>
        </div>
      </nav>

      {/* --- HERO: THE GLOBAL ENGINE --- */}
      <section className="relative h-screen flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/global-neural-mesh.png')] bg-cover bg-center opacity-30 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010204] via-transparent to-[#010204]" />
        </div>
        
        <div className="container mx-auto px-12 relative z-10">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <Radio className="w-3 h-3 text-cyan-500 animate-pulse" />
              <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em]">System v2.5 Live • Global Ingestion Nodes Online</span>
            </div>
            <h1 className="text-[11vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase italic mb-8">
              WORLDWIDE <br /><span className="text-cyan-500">SOVEREIGN AI</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl font-medium mb-12 uppercase tracking-wide">
              Deploying forensic-grade front-office intelligence for any industry, in any language, at global scale.
            </p>
            <div className="flex gap-6">
              <Link href="#pricing" className="px-14 py-7 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-xl shadow-[0_20px_50px_rgba(6,182,212,0.3)] hover:scale-105 transition-all inline-block">
                Initialize Global Node
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- UNIVERSAL SHADOW LOGIC --- */}
      <section id="autonomous" className="py-32 bg-[#050505] border-y border-white/5 relative">
        <div className="container mx-auto px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="text-cyan-500 font-black text-xs uppercase tracking-[0.4em] mb-4">Zero-Touch Ingestion</div>
              <h2 className="text-5xl font-black uppercase italic mb-8">Shadow <span className="text-cyan-500">Intelligence</span></h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Our Sovereign Scraper targets high-value industries worldwide. We autonomously provision your agent before the first handshake, ensuring zero-latency deployment.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <Stethoscope className="text-cyan-500 w-5 h-5 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Medical Triage</span>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <Scale className="text-cyan-500 w-5 h-5 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Legal Intake</span>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <Hammer className="text-cyan-500 w-5 h-5 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Technical Trades</span>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <Globe className="text-cyan-500 w-5 h-5 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Global Logistics</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative group">
              
              <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* --- INFRASTRUCTURE GRID --- */}
      <section id="solutions" className="py-32 bg-black">
        <div className="container mx-auto px-12">
          <div className="grid lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 relative h-[500px] rounded-[48px] border border-white/5 overflow-hidden group">
               <div className="absolute inset-0 bg-[url('/images/dispatch-flow.png')] opacity-20 group-hover:opacity-40 transition-opacity" />
               <div className="relative z-10 p-12 flex flex-col h-full justify-between">
                <div className="flex items-center gap-4">
                  <Languages className="w-10 h-10 text-cyan-500" />
                  <div className="h-[1px] w-24 bg-white/10" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">LTR / RTL Native</span>
                </div>
                <div>
                  <h3 className="text-5xl font-black uppercase italic mb-4">Neural Dispatch</h3>
                  <p className="text-slate-400 max-w-md font-bold text-sm tracking-widest uppercase">Autonomous intent mapping across 6,000+ languages with native cultural intelligence.</p>
                </div>
              </div>
            </div>

            <div className="relative h-[500px] rounded-[48px] bg-cyan-500 p-12 text-black overflow-hidden group">
              <div className="absolute inset-0 bg-[url('/images/aegis-protection.png')] opacity-10 grayscale" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <Lock className="w-12 h-12" />
                <div>
                  <h3 className="text-4xl font-black uppercase italic leading-none mb-4">Aegis <br/>Shield</h3>
                  <p className="font-black text-[10px] uppercase tracking-widest">Enterprise-grade data sovereignty and automated spam neutralization.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- ANALYTICS --- */}
      <section className="py-40 bg-white/[0.01] relative overflow-hidden">
        
        <div className="container mx-auto px-12 relative z-10">
           <div className="mb-16 text-center">
             <h2 className="text-6xl font-black uppercase italic mb-4">Forensic ROI</h2>
             <p className="text-cyan-500 font-black tracking-[0.3em] uppercase text-xs">Verify Your Global Performance Metrics</p>
           </div>
          <ROICalculator />
        </div>
      </section>

    </div>
  );
}
