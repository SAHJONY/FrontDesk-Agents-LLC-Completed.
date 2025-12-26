'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Command, Lock, ShieldAlert, Globe, Languages, Shield, Zap, 
  Stethoscope, Scale, Hammer, ArrowRight 
} from 'lucide-react';

// Neural Components - Using Absolute Pathing to ensure Build Success
import { ROICalculator } from '@/components/marketing/ROICalculator';
import { PricingGrid } from '@/components/marketing/PricingGrid';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#010204] text-[#f8fafc] font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* --- SOVEREIGN NAVIGATION --- */}
      <nav className={`fixed top-0 w-full z-[200] transition-all duration-700 ${scrolled ? 'bg-black/60 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <Link href={`/${locale}`} className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-cyan-500 flex items-center justify-center rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-transform group-hover:rotate-180">
              <Command className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">FRONTDESK<span className="text-cyan-500">AGENTS</span></span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <Link href="#infrastructure" className="hover:text-cyan-400 transition-colors">Infrastructure</Link>
            <Link href="#intelligence" className="hover:text-cyan-400 transition-colors">Sovereign Logic</Link>
            <Link href="#pricing" className="hover:text-cyan-400 transition-colors">Deploy Node</Link>
            <Link href={`/${locale}/login`} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2">
              <Lock className="w-3 h-3" /> Client Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO: WORLDWIDE SOVEREIGNTY --- */}
      <section className="relative h-screen flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-neutral-950 neural-grid opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010204] via-transparent to-[#010204]" />
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
              <ShieldAlert className="w-3 h-3 text-cyan-500 animate-pulse" />
              <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em]">
                {locale.toUpperCase()} Node • Aegis Shield Active • v2.5
              </span>
            </div>
            <h1 className="text-[12vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase italic mb-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              GLOBAL <br /><span className="text-cyan-500">ENTERPRISE NODES</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-400 max-w-2xl font-medium mb-12 uppercase tracking-wide">
              Provisioning high-fidelity, sovereign AI intelligence for global service leaders. Forensic-grade automation across 6,000+ dialects.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="#pricing" className="px-10 lg:px-14 py-6 lg:py-7 bg-cyan-500 text-black font-black uppercase text-xs tracking-widest rounded-xl shadow-[0_20px_50px_rgba(6,182,212,0.3)] hover:scale-105 transition-all inline-block">
                Initialize {locale.toUpperCase()} Node
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTELLIGENCE LAYER --- */}
      <section id="intelligence" className="py-32 bg-[#050505] border-y border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="text-cyan-500 font-black text-xs uppercase tracking-[0.4em] mb-4">Market Sovereignty</div>
              <h2 className="text-5xl font-black uppercase italic mb-8">Adaptive <span className="text-cyan-500">Intelligence</span></h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed italic">
                Our proprietary "Shadow Logic" constructs high-fidelity agents for high-stakes verticals.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Stethoscope, label: 'Medical Ingestion' },
                  { icon: Scale, label: 'Legal Intake' },
                  { icon: Hammer, label: 'Technical Trades' },
                  { icon: Globe, label: 'Global Logistics' }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-3 hover:border-cyan-500/30 transition-all">
                    <item.icon className="text-cyan-500 w-4 h-4" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full aspect-video titan-card flex flex-col items-center justify-center p-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Shield className="w-16 h-16 text-cyan-500 mb-6 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500">Vaulted Architecture</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FORENSIC ROI --- */}
      <section id="roi" className="py-40 bg-white/[0.01] relative border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
           <div className="mb-16 text-center">
             <h2 className="text-6xl font-black uppercase italic mb-4 tracking-tighter">Forensic ROI</h2>
             <p className="text-cyan-500 font-black tracking-[0.3em] uppercase text-xs">Analyze Your Potential Recovery Value</p>
           </div>
          <ROICalculator />
        </div>
      </section>

      {/* --- PRICING GRID --- */}
      <div id="pricing">
        <PricingGrid />
      </div>

      {/* --- INFRASTRUCTURE --- */}
      <section id="infrastructure" className="py-32 bg-black border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 relative h-[450px] titan-card overflow-hidden group p-12 flex flex-col justify-between hover:border-white/20 transition-all">
                <div className="flex items-center gap-4">
                  <Languages className="w-12 h-12 text-cyan-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">LTR / RTL Native Core</span>
                </div>
                <div>
                  <h3 className="text-5xl font-black uppercase italic mb-4 text-white tracking-tighter leading-none">Linguistic <br/>Sovereignty</h3>
                  <p className="text-slate-400 max-w-md font-bold text-xs tracking-widest uppercase">Autonomous directionality mapping across global territories.</p>
                </div>
            </div>

            <div className="relative h-[450px] rounded-[32px] bg-cyan-500 p-12 text-black overflow-hidden flex flex-col justify-between group cursor-pointer shadow-[0_0_50px_rgba(6,182,212,0.2)]">
              <Lock className="w-12 h-12 group-hover:rotate-12 transition-transform" />
              <div>
                <h3 className="text-4xl font-black uppercase italic leading-none mb-4">Aegis <br/>Shield</h3>
                <p className="font-black text-[10px] uppercase tracking-widest">Enterprise-grade autonomous injection neutralization.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 text-center bg-black">
        <div className="flex justify-center gap-8 mb-8 opacity-20">
            <Shield className="w-8 h-8" />
            <Globe className="w-8 h-8" />
            <Zap className="w-8 h-8" />
        </div>
        <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">
          All Nodes Encrypted via Aegis Protocol • 2025 FrontDesk Agents
        </p>
      </footer>
    </div>
  );
}
