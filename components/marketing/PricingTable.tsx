'use client';

import { Check, ShieldCheck, Zap } from 'lucide-react';
import { GlobalPricing } from '@/lib/market/pricing';

export default function PricingTable({ region, country }: { region: string, country: string }) {
  // Determine the correct price list (Default to Western USD)
  const market = GlobalPricing[country as keyof typeof GlobalPricing] || 
                 GlobalPricing[region as keyof typeof GlobalPricing] || 
                 GlobalPricing.WESTERN;

  return (
    <section className="py-24 bg-[#010204]">
      <div className="container mx-auto px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
            Industrial <span className="text-cyan-500">Tier Selection</span>
          </h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">
            Currency Optimized for {country} • Local Tax Included
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* PROFESSIONAL TIER */}
          <div className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-cyan-500/50 transition-all group">
            <p className="text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest">Professional</p>
            <div className="flex items-end gap-2 mb-8">
              <span className="text-5xl font-black italic">{market.symbol}{market.tiers.professional}</span>
              <span className="text-slate-500 text-xs font-bold mb-2">/MO</span>
            </div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-xs font-bold uppercase text-slate-400">
                <Check className="w-4 h-4 text-cyan-500" /> Single Edge Node
              </li>
              <li className="flex items-center gap-3 text-xs font-bold uppercase text-slate-400">
                <Check className="w-4 h-4 text-cyan-500" /> Neural CRM Injection
              </li>
            </ul>
            <button className="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-xl">
              Initialize Node
            </button>
          </div>

          {/* SOVEREIGN TIER (Most Popular) */}
          <div className="p-10 rounded-[40px] bg-cyan-500/5 border-2 border-cyan-500 relative shadow-[0_0_50px_rgba(6,182,212,0.1)]">
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-cyan-500 text-black px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
              Recommended for {country}
            </div>
            <p className="text-[10px] font-black uppercase text-cyan-500 mb-2 tracking-widest">Sovereign</p>
            <div className="flex items-end gap-2 mb-8">
              <span className="text-5xl font-black italic">{market.symbol}{market.tiers.sovereign}</span>
              <span className="text-slate-500 text-xs font-bold mb-2">/MO</span>
            </div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-xs font-bold uppercase">
                <ShieldCheck className="w-4 h-4 text-cyan-500" /> Full Aegis Protection
              </li>
              <li className="flex items-center gap-3 text-xs font-bold uppercase">
                <Zap className="w-4 h-4 text-cyan-500" /> Surge Protocol V2
              </li>
            </ul>
            <button className="w-full py-4 bg-cyan-500 text-black font-black uppercase text-[10px] tracking-widest rounded-xl">
              Establish Sovereignty
            </button>
          </div>

          {/* ENTERPRISE TIER */}
          <div className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 opacity-60">
             {/* ... similar structure for Enterprise ... */}
          </div>
        </div>
      </div>
    </section>
  );
}
