'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, ShieldCheck, Zap, Globe, Cpu, Mic, DollarSign, Terminal, 
  Activity, MessageSquare, Flame, Check, Clock, Phone, ArrowRight, TrendingUp 
} from 'lucide-react';

// SECURE ASSETS: Stripe Integration
import { createCheckoutSession } from '@/app/actions/stripe';
import { Plans } from '@/config/plans';
import { ROICalculator } from '@/components/marketing/ROICalculator';

export default function HomePage() {
  const [spotsLeft] = useState(42);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  /**
   * SOVEREIGN UPLINK: Initiates the Stripe Secure Vault Checkout
   * This calls the Server Action to generate a protected redirect.
   */
  const handlePurchase = async (planId: string) => {
    setLoadingPlan(planId);
    try {
      const result = await createCheckoutSession(planId);
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Uplink Failure:", error);
      setLoadingPlan(null);
      alert("Terminal Error: Secure Checkout could not be established.");
    }
  };

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

      {/* --- HERO SECTION --- */}
      {/* Content omitted for brevity - Keep your existing high-impact hero here */}

      {/* --- NEURAL ROI PROJECTION --- */}
      <section className="py-24 bg-black/50 border-y border-white/5">
        <ROICalculator />
      </section>

      {/* --- FINANCIAL MATRIX (PRICING) --- */}
      <section id="pricing" className="py-48 bg-black relative border-t border-white/5">
        <div className="container mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-6">Financial Matrix</h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Infrastructure Subscription + Performance ROI</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* STARTER TIER */}
            <div className="p-12 rounded-[48px] bg-white/5 border border-white/10 flex flex-col group hover:border-cyan-500/50 transition-all">
              <div className="flex justify-between items-start mb-6">
                <span className="text-cyan-500 text-[9px] font-black uppercase tracking-widest">Entry Protocol</span>
                <TrendingUp className="w-3 h-3 text-slate-500" />
              </div>
              <h3 className="text-2xl font-black italic uppercase text-white mb-2 tracking-tighter">Starter</h3>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-6xl font-black italic tracking-tighter">$399</span>
                <span className="text-slate-500 text-sm font-bold mb-3 uppercase">/mo</span>
              </div>
              <div className="mb-10 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl">
                <p className="text-xs font-bold text-white uppercase tracking-tighter">$10/Appt • 5% Recovery</p>
              </div>
              <ul className="space-y-6 mb-16 flex-1 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <li className="flex items-center gap-4"><Check className="w-4 h-4 text-cyan-500" /> 5 Workforce Agents</li>
                <li className="flex items-center gap-4"><Check className="w-4 h-4 text-cyan-500" /> Guardian Standard</li>
                <li className="flex items-center gap-4"><Check className="w-4 h-4 text-cyan-500" /> Weekly ROI Manifests</li>
              </ul>
              <button 
                onClick={() => handlePurchase(Plans.STARTER)}
                disabled={!!loadingPlan}
                className="w-full py-6 bg-white/5 border border-white/10 rounded-3xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-50"
              >
                {loadingPlan === Plans.STARTER ? 'Establishing Uplink...' : 'Select Tier'}
              </button>
            </div>

            {/* PROFESSIONAL TIER (THE "TEXAS FREEZE" SPECIAL) */}
            <div className="p-12 rounded-[48px] bg-gradient-to-br from-cyan-500/20 to-transparent border-2 border-cyan-500 shadow-[0_0_100px_rgba(6,182,212,0.15)] flex flex-col relative scale-105 z-10">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-cyan-500 text-[#000814] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic">HIPAA COMPLIANT</div>
              <h3 className="text-2xl font-black italic uppercase text-white mb-2 tracking-tighter pt-4">Professional</h3>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-6xl font-black italic tracking-tighter">$899</span>
                <span className="text-slate-500 text-sm font-bold mb-3 uppercase">/mo</span>
              </div>
              <div className="mb-10 p-4 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-xs font-bold text-white uppercase tracking-tighter">$15/Appt • 10% Recovery</p>
              </div>
              <ul className="space-y-6 mb-16 flex-1 text-white text-xs font-bold uppercase tracking-widest">
                <li className="flex items-center gap-4"><Check className="w-4 h-4 text-cyan-500" /> 10 Workforce Agents</li>
                <li className="flex items-center gap-4"><Check className="w-4 h-4 text-cyan-500" /> Guardian HIPAA</li>
                <li className="flex items-center gap-4"><Check className="w-4 h-4 text-cyan-500" /> Medic Self-Healing</li>
              </ul>
              <button 
                onClick={() => handlePurchase(Plans.PROFESSIONAL)}
                disabled={!!loadingPlan}
                className="w-full py-6 bg-cyan-500 text-[#000814] rounded-3xl text-[11px] font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50"
              >
                {loadingPlan === Plans.PROFESSIONAL ? 'Establishing Uplink...' : 'Launch Growth'}
              </button>
            </div>

            {/* ENTERPRISE TIER */}
            <div className="p-12 rounded-[48px] bg-white/5 border border-white/10 flex flex-col group hover:border-purple-500/50 transition-all">
              <span className="text-purple-500 text-[9px] font-black uppercase tracking-widest mb-6">Sovereign Control</span>
              <h3 className="text-2xl font-black italic uppercase text-white mb-2 tracking-tighter">Enterprise</h3>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-6xl font-black italic tracking-tighter">$1,799</span>
                <span className="text-slate-500 text-sm font-bold mb-3 uppercase">/mo</span>
              </div>
              <div className="mb-10 p-4 bg-purple-500/5 border border-purple-500/20 rounded-2xl">
                <p className="text-xs font-bold text-white uppercase tracking-tighter">$25/Appt • 15% Recovery</p>
              </div>
              <ul className="space-y-6 mb-16 flex-1 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <li className="flex items-center gap-4"><Check className="w-4 h-4 text-purple-500" /> All 15 Agents</li>
                <li className="flex items-center gap-4"><Check className="w-4 h-4 text-purple-500" /> Guardian Maximum</li>
                <li className="flex items-center gap-4"><Check className="w-4 h-4 text-purple-500" /> Medic Zero-Latency</li>
              </ul>
              <button 
                onClick={() => handlePurchase(Plans.ENTERPRISE)}
                disabled={!!loadingPlan}
                className="w-full py-6 bg-white/5 border border-white/10 rounded-3xl text-[11px] font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all disabled:opacity-50"
              >
                {loadingPlan === Plans.ENTERPRISE ? 'Establishing Uplink...' : 'Initiate Scale'}
              </button>
            </div>

          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
