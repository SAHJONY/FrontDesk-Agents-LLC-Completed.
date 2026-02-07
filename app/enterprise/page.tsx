"use client";

/**
 * FRONTDESK AGENTS: SUPREME ENTERPRISE NODE
 * Design System: Obsidian Elite v4.0 (Fortune 500 Standard)
 * Infrastructure: Global Command & Control Interface
 */

import React, { useMemo, useState, useEffect } from "react";
import { 
  Shield, 
  Cpu, 
  ArrowRight, 
  Globe, 
  Lock, 
  Zap, 
  Activity, 
  Building2, 
  ChevronRight,
  Target
} from "lucide-react";
import Link from "next/link";

const SOVEREIGN_TIERS = {
  STARTER: {
    label: "Strategic Node",
    price: 199,
    capacity: "300 Mins/Mo",
    specs: ["Linguistic Core: EN/ES", "Standard CRM Bridge", "Neural SMS Engine"],
  },
  PROFESSIONAL: {
    label: "Professional Fleet",
    price: 399,
    capacity: "1,200 Mins/Mo",
    specs: ["50+ Global Dialects", "Fiscal Gateway (Stripe)", "Active Lead Prospecting"],
    highlight: true
  },
  GROWTH: {
    label: "Growth Cluster",
    price: 799,
    capacity: "3,000 Mins/Mo",
    specs: ["Full API Command", "Predictive Analytics", "Dedicated Logic Guard"],
  },
  ENTERPRISE: {
    label: "Enterprise Protocol",
    price: 1499,
    capacity: "7,000 Mins/Mo",
    specs: ["Custom Neural Training", "Sovereign Infrastructure", "24/7 Executive SLA"],
  }
};

export default function SupremeEnterprisePage() {
  const [locations, setLocations] = useState(100);
  const [isAnnual, setIsAnnual] = useState(true);

  const pricing = useMemo(() => {
    let base = locations >= 16 ? 1499 : locations >= 6 ? 799 : locations >= 2 ? 399 : 199;
    let multiplier = locations >= 16 ? 0.70 : locations >= 6 ? 0.85 : 0.90;
    const monthly = base * locations * multiplier * (isAnnual ? 0.8 : 1);
    const savings = base * locations * 0.2 * 12;
    return { monthly, savings, perNode: monthly / locations };
  }, [locations, isAnnual]);

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-100 font-sans selection:bg-blue-600/40 selection:text-white">
      {/* INSTITUTIONAL HEADER */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center">
              <Target className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black uppercase tracking-[0.3em] italic">FrontDesk <span className="text-zinc-500">Agents</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
            <Link href="#" className="hover:text-blue-500 transition-colors">Infrastructure</Link>
            <Link href="#" className="hover:text-blue-500 transition-colors">Global Fleet</Link>
            <Link href="#" className="hover:text-blue-500 transition-colors">Governance</Link>
            <Link href="/login" className="bg-white text-black px-6 py-2 rounded-sm hover:bg-zinc-200 transition-all">Client Access</Link>
          </div>
        </div>
      </nav>

      {/* HERO: KINETIC DEPTH SECTION */}
      <section className="relative pt-32 pb-48 px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#1e3a8a33,transparent)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 py-2 px-6 rounded-full border border-blue-500/20 bg-blue-500/5 mb-12">
            <Activity className="w-3 h-3 text-blue-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-400">Node PDX1: Operational</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8] mb-12">
            The <span className="text-blue-600">Sovereign</span> <br /> 
            Revenue <span className="text-zinc-700">Workforce</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-zinc-500 font-light leading-relaxed mb-16">
            Deploy elite autonomous agents calibrated for Fortune 500 performance. 
            Achieve absolute operational consistency with 84% conversion retention across global jurisdictions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button className="group bg-blue-600 text-white px-14 py-6 rounded-sm font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-500 transition-all flex items-center gap-4">
              Deploy Protocol
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/10 text-white px-14 py-6 rounded-sm font-black text-xs uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
              Institutional PDF
            </button>
          </div>
        </div>
      </section>

      {/* FISCAL INTELLIGENCE: THE CALCULATOR */}
      <section className="max-w-screen-2xl mx-auto px-8 mb-48">
        <div className="bg-zinc-900/30 border border-white/5 rounded-[4rem] p-20 backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Globe className="w-64 h-64 text-blue-500" />
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-24 relative z-10">
            <div className="max-w-md">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-6">Fiscal Modeling</h2>
              <h3 className="text-5xl font-black italic uppercase tracking-tighter mb-8 leading-none">Global <br />Scale Engine</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-12">
                Simulate enterprise-wide deployment costs across multi-jurisdictional nodes. Includes automatic volume discounting and annual fiscal optimization.
              </p>
              
              <div className="flex bg-black p-1.5 rounded-sm border border-white/5 inline-flex">
                <button onClick={() => setIsAnnual(false)} className={`px-8 py-3 text-[9px] font-black uppercase tracking-widest transition-all ${!isAnnual ? 'bg-zinc-800' : 'text-zinc-600'}`}>Monthly</button>
                <button onClick={() => setIsAnnual(true)} className={`px-8 py-3 text-[9px] font-black uppercase tracking-widest transition-all ${isAnnual ? 'bg-blue-600' : 'text-zinc-600'}`}>Annual</button>
              </div>
            </div>

            <div className="flex-1 space-y-20">
              <div>
                <div className="flex justify-between items-end mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 italic">Total Active Nodes</span>
                  <span className="text-8xl font-black italic tracking-tighter leading-none">{locations}</span>
                </div>
                <input 
                  type="range" min="1" max="500" value={locations} 
                  onChange={(e) => setLocations(parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-800 appearance-none accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-12">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2">Net Monthly Opex</p>
                  <p className="text-6xl font-black tracking-tighter">${Math.round(pricing.monthly).toLocaleString()}</p>
                </div>
                <div className="bg-blue-600/5 border border-blue-600/20 p-8">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">Institutional Savings</p>
                  <p className="text-6xl font-black tracking-tighter text-emerald-500">${Math.round(pricing.savings).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOVEREIGN NODES: PRICING */}
      <section className="max-w-screen-2xl mx-auto px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(SOVEREIGN_TIERS).map(([key, tier]) => (
            <div key={key} className={`p-12 border transition-all ${tier.highlight ? 'bg-zinc-100 text-black border-transparent' : 'bg-transparent border-white/10 hover:border-white/30 text-white'}`}>
              <h4 className="text-xs font-black uppercase tracking-[0.4em] mb-8">{tier.label}</h4>
              <div className="mb-12">
                <span className="text-6xl font-black italic tracking-tighter">${tier.price}</span>
                <span className="text-[9px] font-black uppercase tracking-widest ml-2 opacity-60">/ Node</span>
              </div>
              <ul className="space-y-6 mb-16">
                {tier.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest leading-tight">
                    <div className={`w-1 h-1 rotate-45 ${tier.highlight ? 'bg-blue-600' : 'bg-zinc-600'}`} />
                    {spec}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-5 text-[9px] font-black uppercase tracking-[0.3em] transition-all border ${tier.highlight ? 'bg-black text-white border-black hover:bg-zinc-800' : 'border-white/20 hover:bg-white hover:text-black'}`}>
                Initialize Node
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER: GLOBAL GOVERNANCE */}
      <footer className="border-t border-white/5 py-24 bg-black">
        <div className="max-w-screen-2xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4 opacity-50 grayscale">
            <Building2 className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">FrontDesk Agents LLC © 2026</span>
          </div>
          <div className="flex gap-12 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">
            <Link href="#" className="hover:text-white transition-colors">Privacy Protocol</Link>
            <Link href="#" className="hover:text-white transition-colors">Service Level Agreement</Link>
            <Link href="#" className="hover:text-white transition-colors">Security Disclosure</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
