"use client";

/**
 * FRONTDESK AGENTS: ENTERPRISE LANDING NODE
 * Core Revenue Workforce Platform & Global Pricing Architecture
 */

import React, { useMemo, useState } from "react";
import { HeroImage } from "./components/HeroImage";
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
  BookOpen
} from "lucide-react";
import Link from "next/link";

const TIERS = {
  STARTER: {
    name: "Starter",
    price: 199,
    locations: "1 location",
    desc: "Essential AI receptionist for single location businesses",
    features: [
      "300 conversations/month",
      "English & Spanish support",
      "Google Calendar integration",
      "Basic CRM sync",
      "Email & SMS notifications",
      "Standard support (24hr response)"
    ],
    highlight: false
  },
  PROFESSIONAL: {
    name: "Professional",
    price: 399,
    locations: "2-5 locations",
    desc: "Complete AI workforce for growing multi-location operations",
    features: [
      "1,200 conversations/month",
      "50+ languages supported",
      "Stripe billing integration",
      "Salesforce & HubSpot CRM",
      "Outbound campaigns (84% conversion)",
      "Priority support (4hr response)",
      "Custom call routing & IVR",
      "Real-time analytics dashboard"
    ],
    highlight: true
  },
  GROWTH: {
    name: "Growth",
    price: 799,
    locations: "6-15 locations",
    desc: "Advanced AI workforce for established enterprise operations",
    features: [
      "3,000 conversations/month",
      "100+ languages supported",
      "Full enterprise CRM integration",
      "AI-powered lead scoring & routing",
      "Automated follow-up workflows",
      "Dedicated account manager",
      "Custom API integrations",
      "Advanced predictive analytics"
    ],
    highlight: false
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: 1499,
    locations: "16+ locations",
    desc: "Unlimited AI workforce for global Fortune 500 organizations",
    features: [
      "7,000 conversations/month",
      "All 100+ languages supported",
      "White-label deployment options",
      "Custom AI model training",
      "Dedicated cloud infrastructure",
      "24/7 premium support (SLA)",
      "Executive onboarding & training",
      "Full API access & webhooks"
    ],
    highlight: false
  }
};

const ENTERPRISE_FEATURES = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Enterprise-Grade Security",
    desc: "SOC 2-Aligned, HIPAA ready, AES-256-GCM encryption, row-level security, and comprehensive audit logging"
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: "8-Division AI Workforce",
    desc: "Email operations, customer acquisition, technical ops, financial ops, analytics, HR, legal, and customer success"
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Self-Healing Infrastructure",
    desc: "Autonomous incident detection and resolution with reinforcement learning that continuously improves"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Scale",
    desc: "Support 100+ languages, multi-region deployment, localized compliance (GDPR, CCPA, TCPA)"
  },
  {
    icon: <Workflow className="w-8 h-8" />,
    title: "Supreme AI Commander",
    desc: "Central orchestration layer managing all 8 divisions with mission-based execution and real-time optimization"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Predictive Analytics Engine",
    desc: "AI-powered insights, trend detection, anomaly alerts, and actionable recommendations for executive decision-making"
  }
];

const TRUSTED_BY = [
  "Fortune 500 Financial Services",
  "Global Healthcare Networks",
  "Multi-National Retail Chains",
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

  const tierForLocations = useMemo(() => {
    if (safeLocations >= 16) return TIERS.ENTERPRISE;
    if (safeLocations >= 6) return TIERS.GROWTH;
    if (safeLocations >= 2) return TIERS.PROFESSIONAL;
    return TIERS.STARTER;
  }, [safeLocations]);

  const pricing = useMemo(() => {
    let base = 199;
    let discount = 0;

    if (safeLocations >= 16) {
      base = 1499;
      discount = 0.2;
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
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">
      {/* Top Bar Notification */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-[10px] font-black uppercase tracking-[0.2em]">
        Operational Excellence: Trusted by Fortune 500 Financial & Healthcare Networks
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden rounded-[3rem] bg-slate-900 py-24 px-8 mb-20 shadow-2xl border border-slate-800">
          <div className="absolute inset-0 opacity-20">
            <HeroImage />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900" />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2 mb-8 backdrop-blur-xl">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Revenue Workforce v2.2</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] uppercase italic">
              Scale Revenue <br />
              <span className="text-blue-500">Autonomous Ops</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Deploy an 8-division AI workforce to manage mission-critical operations. 
              Achieve 84% conversion rates with self-healing global infrastructure.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link
                href="/signup"
                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                <Phone className="w-4 h-4" />
                Request Demo
              </Link>
              <Link
                href="/blog"
                className="bg-slate-800/50 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all border border-slate-700 flex items-center gap-3"
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                ROI Insights
              </Link>
            </div>

            {/* Trust Matrix */}
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-t border-slate-800/50 pt-10">
              {TRUSTED_BY.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENTERPRISE CALCULATOR */}
        <section className="mb-32">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Investment Calculator</h2>
            <p className="text-slate-500 text-sm font-medium">Customized fiscal modeling for multi-region organizations.</p>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 p-12 rounded-[3rem] shadow-2xl max-w-5xl mx-auto relative overflow-hidden">
             <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
              <div className="space-y-1">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-300">Scale Parameters</h3>
                <p className="text-xs text-zinc-500 uppercase tracking-widest">{tierForLocations.name} Tier Active</p>
              </div>

              <div className="flex items-center gap-4 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800">
                <button 
                  onClick={() => setIsAnnual(false)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isAnnual ? 'bg-zinc-800 text-white shadow-xl' : 'text-zinc-500'}`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setIsAnnual(true)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isAnnual ? 'bg-blue-600 text-white shadow-xl' : 'text-zinc-500'}`}
                >
                  Annual <span className="ml-1 text-[8px] opacity-70">(-20%)</span>
                </button>
              </div>
            </div>

            <div className="mb-20">
              <div className="flex justify-between items-end mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Total Operational Nodes</span>
                <span className="text-7xl font-black italic tracking-tighter text-blue-500">{safeLocations}</span>
              </div>
              <input
                type="range"
                min="1"
                max="500"
                value={safeLocations}
                onChange={(e) => setLocations(clampInt(parseInt(e.target.value, 10), 1, 500))}
                className="w-full h-2 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-zinc-900">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2">Monthly Opex</p>
                <p className="text-4xl font-black tracking-tighter">${Math.round(pricing.monthlyFinal).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2">Per Node Cost</p>
                <p className="text-4xl font-black tracking-tighter text-zinc-400">${Math.round(pricing.costPerLocation)}</p>
              </div>
              <div className="bg-blue-600/5 border border-blue-600/20 p-6 rounded-3xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Annual Savings</p>
                <p className="text-4xl font-black tracking-tighter text-emerald-500">${Math.round(pricing.annualSavings).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </section>

        {/* REVENUE TIERS */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(TIERS).map(([key, tier]) => (
              <div
                key={key}
                className={`p-10 rounded-[2.5rem] border transition-all hover:translate-y-[-8px] flex flex-col ${
                  tier.highlight
                    ? "border-blue-600 bg-zinc-950 shadow-[0_30px_60px_rgba(37,99,235,0.15)]"
                    : "border-zinc-900 bg-zinc-950"
                }`}
              >
                <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white">{tier.name}</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mt-2 mb-6">{tier.locations}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-black text-white">${tier.price}</span>
                  <span className="text-xs text-zinc-600 font-bold uppercase tracking-widest ml-2">/ Node</span>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {tier.features.slice(0, 5).map((feature, i) => (
                    <li key={i} className="text-[11px] font-bold text-zinc-400 flex gap-3 items-start uppercase tracking-tight leading-tight">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all text-center ${
                    tier.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-500"
                      : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  Initialize Tier
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
