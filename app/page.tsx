'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Cpu, Check, ChevronRight, Globe, Shield, 
  Menu, X, Zap, BarChart3, Fingerprint, 
  Layers, Command, Radio, MousePointer2,
  ArrowUpRight, Server, Activity, Lock
} from 'lucide-react';

// SECURE ASSETS
import { createCheckoutSession } from '@/app/actions/stripe';
import { Plans } from '@/config/plans';
import { ROICalculator } from '@/components/marketing/ROICalculator';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePurchase = async (planId: string) => {
    setLoadingPlan(planId);
    try {
      const result = await createCheckoutSession(planId);
      if (result?.url) window.location.href = result.url;
    } catch (e) {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#010204] text-[#f8fafc] font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* --- GLOBAL COMMAND NAVIGATION --- */}
      <nav className={`fixed top-0 w-full z-[200] transition-all duration-700 ${scrolled ? 'bg-black/60 backdrop-blur-2xl border-b border-white/5 py-3' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative">
               <div className="w-10 h-10 bg-gradient-to-tr from-cyan-600 to-cyan-400 flex items-center justify-center rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] group-hover:rotate-180 transition-transform duration-700">
                 <Command className="w-6 h-6 text-black" />
               </div>
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase italic leading-none">FRONTDESK<span className="text-cyan-500">AGENTS</span></span>
              <span className="text-[8px] font-bold text-cyan-500/50 tracking-[0.4em] uppercase">Global Neural Network</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <Link href="#solutions" className="hover:text-cyan-400 transition-colors">Infrastructure</Link>
            <Link href="#analytics" className="hover:text-cyan-400 transition-colors">Forensics</Link>
            <Link href="#pricing" className="hover:text-cyan-400 transition-colors">Deployment</Link>
            <Link href="/login" className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all backdrop-blur-xl">
              Portal Login
            </Link>
          </div>

          <button className="lg:hidden text-cyan-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* --- HERO: PLANETARY SCALE OPERATIONS --- */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Dynamic Background Grid */}
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #164e63 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-6xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/5 border border-cyan-500/10 mb-10 animate-fade-in-up">
              <Activity className="w-3 h-3 text-cyan-500" />
              <span className="text-cyan-500/80 text-[9px] font-black uppercase tracking-[0.4em]">Sub-100ms Latency Confirmed • Houston Node Online</span>
            </div>
            
            <h1 className="text-[11vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase italic mb-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-500">
              WORLD-CLASS <br />
              <span className="text-cyan-500">AI DISPATCH</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mb-14 leading-relaxed uppercase tracking-wide">
              Architecting the future of industrial labor. We provide the autonomous neural layer that secures, filters, and scales elite service businesses worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 items-center">
              <Link href="#pricing" className="group relative px-14 py-7 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(6,182,212,0.3)]">
                <span className="relative z-10 flex items-center gap-2">Initialize Deployment <ArrowUpRight size={18} /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
              <button className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center"><Zap size={16} /></div>
                View System Specs
              </button>
            </div>
          </div>
        </div>

        {/* Global Data Stream Overlay */}
        <div className="absolute right-0 bottom-0 p-12 hidden lg:block text-right">
           <div className="space-y-2 font-mono text-[10px] text-cyan-500/40 uppercase tracking-widest">
              <p>Buffer: 0.0004ms</p>
              <p>Throughput: 1.2GB/s</p>
              <p>Uptime: 99.9999%</p>
           </div>
        </div>
      </section>

      {/* --- INFRASTRUCTURE (BENTO GRID) --- */}
      <section id="solutions" className="py-32 relative bg-black/40">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 group relative h-[500px] rounded-[40px] border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-12 overflow-hidden hover:border-cyan-500/30 transition-all duration-700">
               <div className="relative z-10">
                  <Globe className="w-10 h-10 text-cyan-500 mb-8" />
                  <h3 className="text-5xl font-black uppercase italic tracking-tighter mb-6">Global Neural <br/>Processing</h3>
                  <p className="max-w-md text-slate-500 font-bold text-sm leading-relaxed uppercase tracking-wider">
                    Our proprietary LLM architecture filters noise at the edge, ensuring that only high-intent revenue opportunities reach your human workforce.
                  </p>
               </div>
               {/* Corporate Image Integration (Simulation) */}
               <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none">
                 <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" className="w-full h-full object-cover grayscale" alt="Secure Server" />
               </div>
            </div>

            <div className="relative h-[500px] rounded-[40px] bg-cyan-500 p-12 text-black flex flex-col justify-between overflow-hidden group">
               <Lock className="w-10 h-10" />
               <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-black/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
               <div>
                  <h3 className="text-4xl font-black uppercase italic leading-none mb-6">Aegis <br/>Shield</h3>
                  <p className="font-bold text-xs uppercase tracking-widest leading-loose">
                    Military-grade spam interception. Every call is authenticated before it rings.
                  </p>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FORENSICS: THE ROI CALCULATOR --- */}
      <section id="analytics" className="py-40 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div>
                <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Performance Forensics</span>
                <h2 className="text-6xl font-black uppercase italic tracking-tighter">Projected <br/>Revenue Gains</h2>
              </div>
              <p className="max-w-xs text-slate-500 font-bold uppercase text-[10px] tracking-widest leading-relaxed">
                Calculate the immediate impact of deploying FrontDesk Agents within your operational ecosystem.
              </p>
           </div>
           <ROICalculator />
        </div>
      </section>

      {/* --- PRICING: THE DEPLOYMENT MATRIX --- */}
      <section id="pricing" className="py-48 bg-[#010204]">
        <div className="container mx-auto px-6">
           {/* Add your Pricing Tiers here with the same visual style */}
        </div>
      </section>

      {/* Footer / Contact / Global Status etc */}

      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-marquee { animation: marquee 40s linear infinite; }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
