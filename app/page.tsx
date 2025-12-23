'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// ... other imports stay the same
import { 
  Sparkles, ShieldCheck, Zap, Globe, Cpu, Mic, DollarSign, Terminal, 
  Activity, MessageSquare, Flame, Check, Clock, Phone, ArrowRight, TrendingUp 
} from 'lucide-react';

export default function HomePage() {
  const [spotsLeft] = useState(42);

  return (
    <div className="min-h-screen bg-[#000814] text-white selection:bg-cyan-500/30 font-sans antialiased overflow-x-hidden">
      
      {/* --- URGENCY MARQUEE --- */}
      <div className="fixed top-0 left-0 w-full bg-cyan-500 py-2.5 overflow-hidden whitespace-nowrap z-[110] shadow-[0_4px_30px_rgba(6,182,212,0.4)]">
        <div className="flex animate-marquee gap-12 items-center text-[#000814] font-black text-[9px] uppercase tracking-[0.4em]">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-2">
              <Flame className="w-3 h-3 fill-current" /> Founder's 50 Status: {spotsLeft} Slots Remaining at Legacy Rates
            </span>
          ))}
        </div>
      </div>

      {/* --- NAVIGATION & HERO (Same as previous version) --- */}
      {/* ... (Omitted for brevity, keep your existing Nav and Hero code here) ... */}

      {/* --- PRICING MATRIX --- */}
      <section id="pricing" className="py-48 bg-black relative border-t border-white/5">
        <div className="container mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-6">Financial Matrix</h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Infrastructure Subscription + Performance ROI</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* STARTER - $399 */}
            <div className="p-12 rounded-[48px] bg-white/5 border border-white/10 flex flex-col group hover:border-cyan-500/50 transition-all">
              <div className="flex justify-between items-start mb-6">
                <span className="text-cyan-500 text-[9px] font-black uppercase tracking-widest">Entry Protocol</span>
                <div className="flex items-center gap-1 text-[8px] font-black text-slate-500 uppercase tracking-tighter">
                  <TrendingUp className="w-3 h-3" /> ROI Focused
                </div>
              </div>
              <h3 className="text-2xl font-black italic uppercase text-white mb-2 tracking-tighter">Starter (Growth)</h3>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-6xl font-black italic tracking-tighter">$399</span>
                <span className="text-slate-500 text-sm font-bold mb-3 uppercase">/mo</span>
              </div>
              
              {/* SUCCESS FEE MINI-CARD */}
              <div className="mb-10 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl">
                <p className="text-[8px] font-black text-cyan-500 uppercase tracking-widest mb-1">Success Fee</p>
                <p className="text-xs font-bold text-white uppercase tracking-tighter">$10/Appt • 5% Recovery</p>
              </div>

              <ul className="space-y-6 mb-16 flex-1">
                {["5 Workforce Agents", "Guardian Standard Encryption", "Weekly ROI Manifests", "Email & SMS Protocols"].map((f, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <Check className="w-4 h-4 text-cyan-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-6 bg-white/5 border border-white/10 rounded-3xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Select Tier</button>
            </div>

            {/* PROFESSIONAL - $899 */}
            <div className="p-12 rounded-[48px] bg-gradient-to-br from-cyan-500/20 to-transparent border-2 border-cyan-500 shadow-[0_0_100px_rgba(6,182,212,0.15)] flex flex-col relative scale-105 z-10">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-cyan-500 text-[#000814] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic">HIPAA COMPLIANT</div>
              <span className="text-white/50 text-[9px] font-black uppercase tracking-widest mb-6 mt-4">Medic/Legal Protocol</span>
              <h3 className="text-2xl font-black italic uppercase text-white mb-2 tracking-tighter">Professional</h3>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-6xl font-black italic tracking-tighter">$899</span>
                <span className="text-slate-500 text-sm font-bold mb-3 uppercase">/mo</span>
              </div>

              <div className="mb-10 p-4 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-[8px] font-black text-cyan-500 uppercase tracking-widest mb-1">Success Fee</p>
                <p className="text-xs font-bold text-white uppercase tracking-tighter">$15/Appt • 10% Recovery</p>
              </div>

              <ul className="space-y-6 mb-16 flex-1">
                {["10 Workforce Agents", "Guardian HIPAA Isolation", "Medic Self-Healing Logic", "Live Command Center"].map((f, i) => (
                  <li key={i} className="flex items-center gap-4 text-white text-xs font-bold uppercase tracking-widest">
                    <Check className="w-4 h-4 text-cyan-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-6 bg-cyan-500 text-[#000814] rounded-3xl text-[11px] font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all">Launch Growth</button>
            </div>

            {/* ENTERPRISE - $1,799 */}
            <div className="p-12 rounded-[48px] bg-white/5 border border-white/10 flex flex-col group hover:border-purple-500/50 transition-all">
              <span className="text-purple-500 text-[9px] font-black uppercase tracking-widest mb-6">Sovereign Control</span>
              <h3 className="text-2xl font-black italic uppercase text-white mb-2 tracking-tighter">Enterprise</h3>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-6xl font-black italic tracking-tighter">$1,799</span>
                <span className="text-slate-500 text-sm font-bold mb-3 uppercase">/mo</span>
              </div>

              <div className="mb-10 p-4 bg-purple-500/5 border border-purple-500/20 rounded-2xl">
                <p className="text-[8px] font-black text-purple-500 uppercase tracking-widest mb-1">Success Fee</p>
                <p className="text-xs font-bold text-white uppercase tracking-tighter">$25/Appt • 15% Recovery</p>
              </div>

              <ul className="space-y-6 mb-16 flex-1">
                {["All 15 Specialized Agents", "Guardian Maximum Security", "Medic Zero-Latency", "Dedicated RL Brain"].map((f, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <Check className="w-4 h-4 text-purple-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-6 bg-white/5 border border-white/10 rounded-3xl text-[11px] font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all">Initiate Scale</button>
            </div>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      {/* ... (Existing Footer code) ... */}

    </div>
  );
}
