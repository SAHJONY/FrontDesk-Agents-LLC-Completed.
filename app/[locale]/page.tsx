'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // REQUIRED for client components in [locale]
import { 
  Cpu, Globe, Shield, Command, Radio, Zap, Activity, ArrowUpRight, Lock, BarChart3, Users, Languages, CheckCircle, Scale, Stethoscope, Hammer, ShieldAlert 
} from 'lucide-react';
import { Plans } from '@/config/plans';
import { ROICalculator } from '@/components/marketing/ROICalculator';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const params = useParams();
  const locale = params?.locale || 'en'; // Get the current market context

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#010204] text-[#f8fafc] font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* --- SOVEREIGN NAVIGATION: High-Security Variant --- */}
      <nav className={`fixed top-0 w-full z-[200] transition-all duration-700 ${scrolled ? 'bg-black/60 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-12 flex justify-between items-center">
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
          <div className="absolute inset-0 bg-[url('/images/global-neural-mesh.png')] bg-cover bg-center opacity-20 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010204] via-transparent to-[#010204]" />
        </div>
        
        <div className="container mx-auto px-12 relative z-10">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <ShieldAlert className="w-3 h-3 text-cyan-500 animate-pulse" />
              <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em]">
                {locale.toUpperCase()} Node • Aegis Shield Active • v2.5
              </span>
            </div>
            <h1 className="text-[11vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase italic mb-8">
              GLOBAL <br /><span className="text-cyan-500">ENTERPRISE NODES</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl font-medium mb-12 uppercase tracking-wide">
              Provisioning high-fidelity, sovereign AI intelligence for global service leaders. Forensic-grade automation across 6,000+ dialects.
            </p>
            <div className="flex gap-6">
              <Link href={`/${locale}/onboarding`} className="px-14 py-7 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-xl shadow-[0_20px_50px_rgba(6,182,212,0.3)] hover:scale-105 transition-all inline-block">
                Initialize {locale.toUpperCase()} Node
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ... (Rest of your content sections) ... */}
      
      <section id="infrastructure" className="py-32 bg-black border-t border-white/5">
        {/* ... (Your infrastructure section content) ... */}
      </section>

      <section className="py-40 bg-white/[0.01] relative border-t border-white/5">
        <div className="container mx-auto px-12 relative z-10">
           <div className="mb-16 text-center">
             <h2 className="text-6xl font-black uppercase italic mb-4">Forensic ROI</h2>
             <p className="text-cyan-500 font-black tracking-[0.3em] uppercase text-xs">Analyze Your Potential Recovery Value</p>
           </div>
          <ROICalculator />
        </div>
      </section>
    </div>
  );
}
