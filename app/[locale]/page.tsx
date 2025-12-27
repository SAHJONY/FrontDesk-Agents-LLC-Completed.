'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Command, Lock, ShieldCheck, Globe, Cpu, 
  BarChart3, Landmark, Briefcase, Boxes, 
  Activity, Layers, Fingerprint, TrendingUp,
  ShieldAlert, Database, Zap
} from 'lucide-react';

// Institutional System Designators (Sovereign Lexicon)
const CORE_ARCHITECTURE = "SOVEREIGN-NEURAL-INFRASTRUCTURE";
const WORKFORCE_ID = "FRONTDESK-AGENTS-WORKFORCE";
const SECURITY_PROTOCOL = "AEGIS-CRYPTOGRAPHIC-SILO";

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
    <div className="min-h-screen bg-[#020305] text-[#e2e8f0] font-sans selection:bg-cyan-900/50 overflow-x-hidden">
      
      {/* --- EXECUTIVE NAVIGATION --- */}
      <nav className={`fixed top-0 w-full z-[200] transition-all duration-1000 ${scrolled ? 'bg-[#020305]/95 backdrop-blur-xl border-b border-white/10 py-5' : 'bg-transparent py-10'}`}>
        <div className="container mx-auto px-8 lg:px-16 flex justify-between items-center">
          <Link href={`/${locale}`} className="flex items-center gap-5 group">
            <div className="w-12 h-12 bg-white flex items-center justify-center rounded-sm transition-all duration-700 group-hover:bg-cyan-500 shadow-2xl">
              <Command className="w-7 h-7 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-[0.15em] uppercase leading-none text-white">FrontDesk</span>
              <span className="text-[9px] font-bold tracking-[0.5em] text-cyan-500 uppercase mt-1">Workforce Infrastructure</span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
            <Link href="#infrastructure" className="hover:text-white transition-all underline-offset-8 hover:underline italic">Nodes</Link>
            <Link href="#sovereignty" className="hover:text-white transition-all underline-offset-8 hover:underline italic">Sovereignty</Link>
            <Link href="#capital" className="hover:text-white transition-all underline-offset-8 hover:underline italic">Outcome Maximization</Link>
            <Link href={`/${locale}/login`} className="flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 rounded-sm hover:bg-white hover:text-black transition-all duration-500 shadow-xl">
              <ShieldAlert className="w-4 h-4 text-cyan-500" /> Executive Override
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO: THE LABOR LOOP EXIT --- */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 bg-neutral-950 opacity-40" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>
        
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="max-w-6xl">
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-sm bg-cyan-500/5 border-l-2 border-cyan-500 mb-12 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
              <Zap className="w-4 h-4 text-cyan-500" />
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.5em]">
                {CORE_ARCHITECTURE} • ACTIVE • LOCALE: {locale.toUpperCase()}
              </span>
            </div>
            <h1 className="text-[10vw] lg:text-[7.5vw] font-black leading-[0.85] tracking-tighter uppercase mb-12 text-white">
              Exit the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-slate-500 italic">Labor Loop</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-400 max-w-3xl font-light leading-relaxed mb-16 border-l border-white/10 pl-10 italic">
              Provisioning the <span className="text-white font-bold">{WORKFORCE_ID}</span>. A self-optimizing capital asset utilizing Strategic Equilibrium Modeling for global service dominance.
            </p>
            <div className="flex flex-wrap gap-10">
              <Link href="#pricing" className="px-16 py-8 bg-white text-black font-black uppercase text-[11px] tracking-[0.4em] hover:bg-cyan-500 transition-all duration-700 shadow-[0_20px_60px_rgba(255,255,255,0.1)] active:scale-95">
                Initialize Provisioning
              </Link>
              <div className="flex items-center gap-4 text-slate-500">
                 <Lock className="w-6 h-6 text-cyan-500" />
                 <span className="text-[9px] font-bold uppercase tracking-widest">Aegis Silo Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ARCHITECTURE: NEURAL MIRRORING --- */}
      <section id="infrastructure" className="py-48 bg-[#050608] border-y border-white/5 relative">
        <div className="container mx-auto px-8 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-16">
              <div>
                <h3 className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.6em] mb-6 italic text-glow">Neural Ingestion Nodes</h3>
                <h2 className="text-6xl font-bold uppercase tracking-tighter mb-10 leading-[0.9]">Autonomous <br/>Asset Synthesis</h2>
                <p className="text-slate-400 text-lg leading-relaxed font-light">
                  Our Knowledge Ingestion Nodes perform forensic mapping of your enterprise logic, creating a digital twin of your highest-performing human intelligence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                  { icon: Database, title: 'Knowledge Ingestion', desc: 'Forensic mapping of enterprise assets.' },
                  { icon: ShieldCheck, title: 'Aegis Silos', desc: 'Cryptographically isolated intelligence.' },
                  { icon: Activity, title: 'Equilibrium Modeling', desc: 'Strategic interaction optimization.' },
                  { icon: Command, title: 'Override Protocol', desc: 'Command-level administrative authority.' }
                ].map((item, i) => (
                  <div key={i} className="group border-t border-white/5 pt-6 hover:border-cyan-500/50 transition-all">
                    <item.icon className="w-6 h-6 text-cyan-500 mb-5 opacity-50 group-hover:opacity-100 transition-all" />
                    <h4 className="text-[11px] font-black uppercase text-white tracking-[0.3em] mb-3">{item.title}</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-loose font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
              <div className="relative z-10 bg-black/40 backdrop-blur-3xl border border-white/10 p-24 shadow-2xl rounded-sm">
                 <Cpu className="w-40 h-40 text-white/5 mb-10" />
                 <div className="text-center">
                    <span className="block text-[10px] font-black text-cyan-500 uppercase tracking-[0.8em]">FrontDesk Core Node</span>
                    <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-2 italic">Strategic Simulation Active</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUTCOME MAXIMIZATION ANALYTICS --- */}
      <section id="capital" className="py-56 bg-black relative">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center mb-32">
             <div className="inline-block p-1 border border-cyan-500/20 mb-8">
               <div className="px-4 py-1 bg-cyan-500/10 text-cyan-500 text-[9px] font-black uppercase tracking-[0.4em]">Success Synthesis Audit</div>
             </div>
            <h2 className="text-7xl font-black uppercase tracking-tighter mb-8 leading-none italic">Iterative Outcome <span className="text-slate-500">Maximization</span></h2>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.5em] max-w-xl mx-auto leading-relaxed">
               Evaluating historical synthesis events to project institutional-grade capital yield through workforce automation.
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* --- PRICING & PROVISIONING --- */}
      <div id="pricing" className="pb-56 bg-[#020305]">
        <ScarcityEngine />
        <PricingGrid />
      </div>

      {/* --- FOOTER: SOVEREIGN STANDARDS --- */}
      <footer className="py-32 border-t border-white/5 bg-[#010203] text-center">
        <div className="container mx-auto px-8">
          <div className="flex justify-center gap-16 mb-16 grayscale opacity-20 hover:grayscale-0 transition-all duration-1000">
            <ShieldCheck className="w-8 h-8" />
            <Globe className="w-8 h-8" />
            <Landmark className="w-8 h-8" />
            <TrendingUp className="w-8 h-8" />
          </div>
          <p className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.7em] mb-4">
            CONFIDENTIAL // INFRASTRUCTURE SECURED VIA {SECURITY_PROTOCOL}
          </p>
          <p className="text-[9px] font-medium text-slate-800 uppercase tracking-[0.3em]">
            © 2025 FrontDesk Agents LLC • Sovereign Neural Node Infrastructure
          </p>
        </div>
      </footer>
    </div>
  );
}
