"use client";

/**
 * FRONTDESK AGENTS: ENTERPRISE LANDING NODE
 * Core Revenue Workforce Platform & Global Pricing Architecture
 * Design System: Obsidian Elite v3.0
 */

import React, { useMemo, useState } from "react";
import { HeroImage } from "./components/HeroImage";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import {
  Phone,
  Globe,
  Zap,
  Shield,
  BarChart3,
  Bot,
  CheckCircle2,
  Building2,
  Award,
  Lock,
  Workflow,
  Database,
  Cpu,
  Network,
  BookOpen,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const TIERS = {
  STARTER: {
    name: "Starter Node",
    price: 199,
    locations: "Single Instance",
    desc: "Essential AI receptionist for high-growth single location firms.",
    features: [
      "300 conversations/month",
      "Global Linguistic Core (EN/ES)",
      "Google Workspace Integration",
      "Enterprise CRM Sync",
      "Automated SMS Notification Node",
      "Standard Priority SLA"
    ],
    highlight: false
  },
  PROFESSIONAL: {
    name: "Professional Fleet",
    price: 399,
    locations: "2-5 Locations",
    desc: "Autonomous workforce for scaling multi-location operations.",
    features: [
      "1,200 conversations/month",
      "Global Linguistic Fleet (50+ Lang)",
      "Stripe Fiscal Gateway Integration",
      "Full CRM Orchestration",
      "Outbound Sales Campaigns",
      "Tier-1 Priority Support",
      "Intelligent IVR Routing",
      "Real-time Workforce Analytics"
    ],
    highlight: true
  },
  GROWTH: {
    name: "Growth Cluster",
    price: 799,
    locations: "6-15 Locations",
    desc: "Advanced AI orchestration for established enterprise networks.",
    features: [
      "3,000 conversations/month",
      "Unrestricted Linguistic Support",
      "API-First Workflow Customization",
      "AI-Powered Lead Prioritization",
      "Self-Healing Follow-up Sequences",
      "Dedicated Technical Strategist",
      "Predictive Analytics Node",
      "Custom Data Ingestion"
    ],
    highlight: false
  },
  ENTERPRISE: {
    name: "Enterprise Protocol",
    price: 1499,
    locations: "16+ Locations",
    desc: "Unrestricted global workforce for Fortune 500 organizations.",
    features: [
      "7,000 conversations/month",
      "Global Cloud Sovereignty",
      "White-label Workforce Deployment",
      "Custom Neural Model Training",
      "Dedicated Private Infrastructure",
      "Executive Response SLA",
      "Compliance Governance Suite",
      "Full Webhook Command Control"
    ],
    highlight: false
  }
};

const TRUSTED_BY = [
  "Fortune 500 Financial Services",
  "Global Healthcare Networks",
  "Tier-1 Legal Institutions",
  "Enterprise Technology Leaders"
];

function clampInt(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, Math.trunc(n)));
}

export default function EnterpriseLandingPage() {
  const [locations, setLocations] = useState(50);
  const [isAnnual, setIsAnnual] = useState(true);

  const safeLocations = useMemo(() => clampInt(locations, 1, 500), [locations]);

  const pricing = useMemo(() => {
    let base = 199;
    let discount = 0;

    if (safeLocations >= 16) {
      base = 1499;
      discount = 0.25;
    } else if (safeLocations >= 6) {
      base = 799;
      discount = 0.15;
    } else if (safeLocations >= 2) {
      base = 399;
      discount = 0.1;
    }

    const monthlyBeforeAnnual = base * safeLocations * (1 - discount);
    const annualDiscount = 0.2;
    const monthlyFinal = isAnnual ? monthlyBeforeAnnual * (1 - annualDiscount) : monthlyBeforeAnnual;
    const annualSavings = isAnnual ? monthlyBeforeAnnual * annualDiscount * 12 : 0;
    const costPerLocation = monthlyFinal / safeLocations;

    return { monthlyFinal, annualSavings, costPerLocation };
  }, [safeLocations, isAnnual]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30">
      {/* GLOBAL INFRASTRUCTURE NOTIFICATION */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-white py-2 px-4 text-center text-[9px] font-black uppercase tracking-[0.3em] border-b border-white/10">
        System Status: Operational Excellence | Global Workforce Initialized (PDX1)
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* HERO: STRATEGIC ASSET OVERVIEW */}
        <section className="relative overflow-hidden rounded-[4rem] bg-[#0a0a0a] py-32 px-8 mb-24 shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/5">
          <div className="absolute inset-0 opacity-10">
            <HeroImage />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-2.5 mb-10 backdrop-blur-3xl">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-100">8-Division Autonomous Fleet</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-10 leading-[0.85] uppercase italic">
              Scale <span className="text-blue-600">Revenue</span> <br />
              <span className="text-zinc-500">Without Limits</span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-500 mb-14 max-w-3xl mx-auto leading-relaxed font-light">
              Replace operational friction with an autonomous workforce. 
              Our enterprise nodes achieve <span className="text-white font-bold italic">84% conversion</span> through self-healing global infrastructure.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-20">
              <Link
                href="/signup"
                className="bg-white text-black hover:bg-zinc-200 px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl hover:scale-[1.02] flex items-center gap-4"
              >
                Execute Deployment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog"
                className="bg-transparent hover:bg-white/5 text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-white/20 flex items-center gap-4"
              >
                Operational Insights
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
              {TRUSTED_BY.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FISCAL MODELING INTERFACE */}
        <section className="mb-40">
          <div className="bg-[#0a0a0a] border border-white/5 p-16 rounded-[4rem] shadow-2xl max-w-6xl mx-auto relative">
             <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20 border-b border-white/5 pb-12">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-blue-500 mb-4">Investment Calculator</h3>
                <h2 className="text-5xl font-black uppercase italic tracking-tighter">Fiscal Modeling</h2>
              </div>

              <div className="flex items-center gap-2 bg-black p-2 rounded-2xl border border-white/5">
                <button 
                  onClick={() => setIsAnnual(false)}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isAnnual ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:text-white'}`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setIsAnnual(true)}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isAnnual ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-zinc-600 hover:text-white'}`}
                >
                  Annual Protocol <span className="ml-2 opacity-60">(-20%)</span>
                </button>
              </div>
            </div>

            <div className="mb-24 px-4">
              <div className="flex justify-between items-end mb-10">
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-500 italic">Global Distribution Nodes</span>
                <span className="text-9xl font-black italic tracking-tighter text-white">{safeLocations}</span>
              </div>
              <input
                type="range"
                min="1"
                max="500"
                value={safeLocations}
                onChange={(e) => setLocations(clampInt(parseInt(e.target.value, 10), 1, 500))}
                className="w-full h-1.5 bg-zinc-900 rounded-none appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4">Net Monthly Opex</p>
                <p className="text-6xl font-black tracking-tighter">${Math.round(pricing.monthlyFinal).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4">Unit Efficiency Cost</p>
                <p className="text-6xl font-black tracking-tighter text-zinc-500">${Math.round(pricing.costPerLocation)}</p>
              </div>
              <div className="bg-blue-600/5 border border-blue-600/20 p-8 rounded-3xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4">Annual Fiscal Savings</p>
                <p className="text-6xl font-black tracking-tighter text-emerald-500">${Math.round(pricing.annualSavings).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </section>

        {/* WORKFORCE TIERS */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(TIERS).map(([key, tier]) => (
              <div
                key={key}
                className={`p-12 rounded-[3rem] border transition-all hover:scale-[1.02] flex flex-col ${
                  tier.highlight
                    ? "border-blue-600 bg-black shadow-[0_40px_100px_rgba(37,99,235,0.1)]"
                    : "border-white/5 bg-[#0a0a0a]"
                }`}
              >
                <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none">{tier.name}</h4>
                <div className="w-12 h-1 bg-blue-600 mt-4 mb-8" />
                
                <div className="mb-10">
                  <span className="text-5xl font-black text-white">${tier.price}</span>
                  <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest ml-3">/ Node</span>
                </div>

                <ul className="space-y-6 mb-12 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="text-[10px] font-black text-zinc-500 flex gap-4 items-start uppercase tracking-wider leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className={`w-full py-5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all text-center ${
                    tier.highlight
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30 hover:bg-blue-500"
                      : "bg-zinc-900 text-zinc-400 hover:bg-white hover:text-black"
                  }`}
                >
                  Authorize Node
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* SOCIAL PROOF & FAQ */}
        <Testimonials />
        <FAQ />
      </div>
    </div>
  );
}
