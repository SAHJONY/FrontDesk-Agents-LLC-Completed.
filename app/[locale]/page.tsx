'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Command, Lock, ShieldAlert, Globe, Languages, Shield, Zap, 
  Stethoscope, Scale, Hammer, ArrowRight, Cpu, Share2 
} from 'lucide-react';

// Neural Components
import { ROICalculator } from '@/components/marketing/ROICalculator';
import { PricingGrid } from '@/components/marketing/PricingGrid';
import { ScarcityEngine } from '@/components/marketing/ScarcityEngine';

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
            <Link href="#agentic-workforce" className="hover:text-cyan-400 transition-colors">Agentic Core</Link>
            <Link href="#pricing" className="hover:text-cyan-400 transition-colors">Deploy Node</Link>
            <Link href={`/${locale}/login`} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2">
              <Lock className="w-3 h-3" /> Client Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO: AGENTIC SOVEREIGNTY --- */}
      <section className="relative h-screen flex items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-neutral-950 neural-grid opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010204] via-transparent to-[#010204]" />
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <Cpu className="w-3 h-3 text-cyan-500 animate-pulse" />
              <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em]">
                {locale.toUpperCase()} Node • RL-Agentic Workforce • v3.0
              </span>
            </div>
            <h1 className="text-[12vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase italic mb-8">
              AUTONOMOUS <br /><span className="text-cyan-500">WORKFORCE NODES</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-400 max-w-2xl font-medium mb-12 uppercase tracking-wide">
              Provisioning high-fidelity, RL-powered agentic workforces for global enterprise. Cross-channel "Hive-Mind" logic across 65+ regional dialects.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="#pricing" className="px-10 py-6 bg-cyan-500 text-black font-black uppercase text-xs tracking-widest rounded-xl shadow-[0_20px_50px_rgba(6,182,212,0.3)] hover:scale-105 transition-all">
                Initialize {locale.toUpperCase()} Workforce
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE HIVE-MIND CORE --- */}
      <section id="agentic-workforce" className="py-32 bg-[#050505] border-y border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-cyan-500 font-black text-xs uppercase tracking-[0.4em] mb-4">The Hive-Mind Sync</div>
              <h2 className="text-5xl font-black uppercase italic mb-8">Reinforcement <span className="text-cyan-500">Learning</span></h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed italic">
                Our agents don't just speak—they learn. Every missed call triggers an autonomous "Hive-Mind" pivot to WhatsApp/SMS to ensure 100% lead capture.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Share2, label: 'Cross-Channel Pivot' },
                  { icon: Zap, label: 'RL Conversion Tuning' },
                  { icon: Shield, label: 'Sovereign AI CRM' },
                  { icon: Globe, label: 'Cultural Prosody' }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-3">
                    <item.icon className="text-cyan-500 w-4 h-4" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="titan-card aspect-square flex flex-col items-center justify-center p-12 relative overflow-hidden">
               <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
               <Cpu className="w-20 h-20 text-cyan-500 mb-6" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500">Neural Command Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SCARCITY ENGINE --- */}
      <div className="bg-black py-20">
        <ScarcityEngine />
      </div>

      {/* --- FORENSIC ROI --- */}
      <section id="roi" className="py-40 bg-white/[0.01] border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
           <div className="mb-16 text-center">
             <h2 className="text-6xl font-black uppercase italic mb-4 tracking-tighter">Recovered Revenue</h2>
             <p className="text-cyan-500 font-black tracking-[0.3em] uppercase text-xs">Analyze Your Total Workforce Yield</p>
           </div>
          <ROICalculator />
        </div>
      </section>

      {/* --- PRICING GRID --- */}
      <div id="pricing" className="pb-32">
        <PricingGrid />
      </div>
      
      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 text-center bg-black">
        <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">
          All Agents Protected via Aegis Shield • 2025 FrontDesk Agents LLC
        </p>
      </footer>
    </div>
  );
}
