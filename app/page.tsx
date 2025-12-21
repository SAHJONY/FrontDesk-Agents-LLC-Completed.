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
  MicrophoneIcon,
  CurrencyDollarIcon,
  CommandLineIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  FireIcon,
  CheckIcon,
  ClockIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const [spotsLeft, setSpotsLeft] = useState(42);

  return (
    <div className="min-h-screen bg-[#000814] text-white selection:bg-cyan-500/30 font-sans antialiased">
      
      {/* --- URGENCY BANNER (Founder's 50) --- */}
      <div className="fixed top-0 left-0 w-full bg-cyan-500 py-2 overflow-hidden whitespace-nowrap z-[110]">
        <div className="flex animate-marquee gap-12 items-center text-[#000814] font-black text-[9px] uppercase tracking-[0.3em]">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-2">
              <FireIcon className="w-4 h-4" /> Founder's 50 Offer: {spotsLeft} Spots Remaining at Legacy Rates
            </span>
          ))}
        </div>
      </div>

      {/* --- ELITE NAVIGATION --- */}
      <nav className="fixed top-8 w-full z-[100] border-b border-white/5 bg-[#000814]/70 backdrop-blur-2xl">
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
            <Link href="#services" className="hover:text-white transition-colors">15 Services</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="mailto:Frontdeskllc@outlook.com" className="hover:text-white transition-colors">Contact</Link>
          </div>

          <Link href="/dashboard">
            <button className="px-8 py-3 bg-white text-[#000814] rounded-full hover:bg-cyan-500 transition-all text-[10px] font-black uppercase tracking-widest">
              Access Portal
            </button>
          </Link>
        </div>
      </nav>

      {/* --- CINEMATIC HERO --- */}
      <header className="relative pt-48 pb-32 px-6 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/premium/hero-cinematic.jpg" alt="Command Center" fill priority className="object-cover opacity-30 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000814] via-transparent to-[#000814]" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-[110px] font-black mb-10 tracking-tighter leading-[0.85] italic uppercase">
            <span className="text-white">Neural</span><br />
            <span className="bg-gradient-to-b from-cyan-400 to-cyan-700 bg-clip-text text-transparent">Execution.</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 font-medium leading-relaxed uppercase tracking-widest text-[11px]">
            The high-fidelity autonomous workforce. <br />
            <span className="text-cyan-500">First 50 partners lock in performance-based rates forever.</span>
          </p>
          <div className="flex justify-center">
            <Link href="#pricing" className="px-12 py-6 bg-cyan-500 text-[#000814] rounded-2xl font-black transition-all shadow-[0_0_50px_rgba(6,182,212,0.3)] text-[12px] uppercase tracking-widest">
              Secure Founder's Slot
            </Link>
          </div>
        </div>
      </header>

      {/* --- PRICING MATRIX --- */}
      <section id="pricing" className="py-32 bg-[#000814] relative border-t border-white/5">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
            
            {/* STARTER - 500 MINS */}
            <div className="p-10 rounded-[40px] bg-white/5 border border-white/10 flex flex-col hover:border-cyan-500/30 transition-all">
              <h3 className="text-lg font-black italic uppercase text-white mb-2 tracking-tighter">Starter</h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl font-black italic">$197</span>
                <span className="text-slate-500 text-sm font-bold mb-2">/mo</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-black uppercase mb-8 bg-cyan-500/10 p-3 rounded-xl">
                <ClockIcon className="w-4 h-4" /> 500 Neural Mins Incl.
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                {["Voice Receptionist 24/7", "WhatsApp Business Concierge", "SMS Proactive Agent", "5% Performance Fee"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    <CheckIcon className="w-4 h-4 text-cyan-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Select Starter</button>
            </div>

            {/* GROWTH - 1,000 MINS */}
            <div className="p-10 rounded-[40px] bg-gradient-to-br from-cyan-500/10 to-transparent border-2 border-cyan-500 shadow-[0_0_80px_rgba(6,182,212,0.1)] flex flex-col scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-[#000814] px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest italic">Most Popular</div>
              <h3 className="text-lg font-black italic uppercase text-white mb-2 tracking-tighter pt-4">Growth</h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl font-black italic">$497</span>
                <span className="text-slate-500 text-sm font-bold mb-2">/mo</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-black uppercase mb-8 bg-cyan-500/20 p-3 rounded-xl border border-cyan-500/30">
                <ClockIcon className="w-4 h-4" /> 1,000 Neural Mins Incl.
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                {["Full Sales Suite", "AI SDR (Outbound)", "Meeting Scheduler", "3% Performance Fee"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-white text-[10px] font-bold uppercase tracking-widest">
                    <CheckIcon className="w-4 h-4 text-cyan-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-5 bg-cyan-500 text-[#000814] rounded-2xl text-[10px] font-black uppercase tracking-widest">Launch Growth</button>
            </div>

            {/* SCALE - 1,500 MINS */}
            <div className="p-10 rounded-[40px] bg-white/5 border border-white/10 flex flex-col hover:border-purple-500/30 transition-all">
              <h3 className="text-lg font-black italic uppercase text-white mb-2 tracking-tighter">Scale</h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl font-black italic">$997</span>
                <span className="text-slate-500 text-sm font-bold mb-2">/mo</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400 text-[10px] font-black uppercase mb-8 bg-purple-500/10 p-3 rounded-xl">
                <ClockIcon className="w-4 h-4" /> 1,500 Neural Mins Incl.
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                {["All 15 AI Agents", "Global Kill-Switch", "Sentiment Analysis", "0% Performance Fee"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    <CheckIcon className="w-4 h-4 text-purple-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all">Initiate Scale</button>
            </div>

            {/* ENTERPRISE - CALL FOR QUOTE */}
            <div className="p-10 rounded-[40px] bg-black border border-white/20 flex flex-col group hover:bg-white/5 transition-all">
              <h3 className="text-lg font-black italic uppercase text-slate-400 mb-2 tracking-tighter">Enterprise</h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-black italic uppercase tracking-tighter">Contact</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase mb-8 bg-white/5 p-3 rounded-xl border border-white/10">
                <PhoneIcon className="w-4 h-4" /> Bulk Infrastructure
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                {["Unlimited Infrastructure", "Whitelabel Dashboard", "Dedicated GPU Power", "Direct Engineer Access"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    <CheckIcon className="w-4 h-4 text-slate-700" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="mailto:Frontdeskllc@outlook.com">
                <button className="w-full py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500 transition-all">Call for Quote</button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* --- ELITE FOOTER --- */}
      <footer className="py-24 border-t border-white/5 bg-black">
        <div className="container mx-auto px-8 text-center text-slate-700 text-[10px] font-black uppercase tracking-[0.3em]">
          © 2025 FrontDesk Agents LLC • Intelligence Architecture v4.2.0-PRO <br />
          <span className="text-slate-800 italic uppercase">Optimized for Surface Pro 11 & iPad Pro M4 Systems</span>
          <p className="mt-8 text-cyan-900 font-bold uppercase tracking-widest">Secure Uplink: Frontdeskllc@outlook.com</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
