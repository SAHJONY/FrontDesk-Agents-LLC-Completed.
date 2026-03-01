"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  Cpu,
  Globe,
  Lock,
  Shield,
  Sparkles,
  Workflow
} from "lucide-react";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";

const STATS = [
  { label: "Inbound SLA", value: "12s", detail: "Average response time globally" },
  { label: "Conversion Lift", value: "+84%", detail: "vs. legacy answering services" },
  { label: "Compliance", value: "24 regions", detail: "Regional governance frameworks" },
  { label: "Languages", value: "50+", detail: "Neural workforce fluency" }
];

const TRUST_LOGOS = [
  "Fortune 500 Financial Services",
  "Global Healthcare Networks",
  "Tier-1 Legal Institutions",
  "Enterprise Technology Leaders"
];

const PLATFORM_COLUMNS = [
  {
    title: "Autonomous Workforce",
    copy: "Voice + messaging agents orchestrated by reinforcement signals. Escalation pathways mapped to your operating playbooks.",
    bullets: ["Neural voice routing", "Sentiment-aware follow ups", "Owner takeover console"],
    icon: Cpu
  },
  {
    title: "Governance & Security",
    copy: "Audit-grade observability with region-aware compliance layers for HIPAA, SOX, FINRA, and SOC2 pipelines.",
    bullets: ["Role-based control plane", "Zero-trust session policies", "Immutable activity ledger"],
    icon: Shield
  },
  {
    title: "Revenue Command",
    copy: "Unified telemetry for calls, conversations, billing posture, and proactive retention campaigns backed by AI scoring.",
    bullets: ["Live owner cockpit", "Predictive churn radar", "Automated overage recovery"],
    icon: BarChart3
  }
];

const INDUSTRIES = [
  {
    name: "Financial Services",
    detail: "Private banking, wealth desks, and capital markets teams with audit trails & KYC hand-offs"
  },
  {
    name: "Healthcare Networks",
    detail: "HIPAA-aligned intake, multilingual scheduling, and after-hours escalation workflows"
  },
  {
    name: "Property & Hospitality",
    detail: "Leasing ops, STR concierge, and hospitality brands with occupancy-focused playbooks"
  },
  {
    name: "Legal & Compliance",
    detail: "Boutique to AmLaw firms with docket-aware routing, CRM sync, and transcript export"
  }
];

const TIERS = [
  {
    name: "Starter Node",
    price: 199,
    usage: "Up to 300 conversations / month",
    bullets: ["Two-channel receptionist", "Core analytics", "Google Workspace sync"]
  },
  {
    name: "Professional Fleet",
    price: 399,
    usage: "Up to 1,200 conversations / month",
    bullets: ["Global linguistic fleet", "Stripe fiscal gateway", "Outbound sales automations"],
    highlight: true
  },
  {
    name: "Growth Cluster",
    price: 799,
    usage: "Up to 3,000 conversations / month",
    bullets: ["API-first workflows", "Self-healing follow ups", "Dedicated strategist"]
  },
  {
    name: "Enterprise Protocol",
    price: 1499,
    usage: "7,000+ conversations / month",
    bullets: ["Private infra", "Custom neural models", "Executive response SLA"]
  }
];

const clampInt = (value: number, min: number, max: number) => {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, Math.trunc(value)));
};

export default function Landing() {
  const [locations, setLocations] = useState(24);
  const [annual, setAnnual] = useState(true);
  const safeLocations = useMemo(() => clampInt(locations, 1, 500), [locations]);

  const pricing = useMemo(() => {
    let base = 199;
    if (safeLocations >= 16) base = 1499;
    else if (safeLocations >= 6) base = 799;
    else if (safeLocations >= 2) base = 399;

    const tierDiscount = safeLocations >= 16 ? 0.25 : safeLocations >= 6 ? 0.15 : safeLocations >= 2 ? 0.1 : 0;
    const monthly = base * safeLocations * (1 - tierDiscount);
    const annualDiscount = 0.2;
    const finalMonthly = annual ? monthly * (1 - annualDiscount) : monthly;
    const annualSavings = annual ? monthly * annualDiscount * 12 : 0;

    return {
      finalMonthly,
      unitCost: finalMonthly / safeLocations,
      annualSavings
    };
  }, [safeLocations, annual]);

  return (
    <div className="min-h-screen bg-[#02030a] text-white">
      <header className="border-b border-white/10 bg-gradient-to-br from-[#060b1a] via-[#050914] to-[#010205]">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-blue-300">
            <span className="inline-flex items-center gap-2 text-blue-200">
              <Sparkles className="w-3.5 h-3.5" />
              Gen-5 Autonomous Workforce
            </span>
            <span className="text-white/40">•</span>
            <span className="inline-flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" /> Global Nodes Active
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[3fr,2fr] mt-12">
            <div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                Fortune-Grade AI Receptionists & Revenue Command for Every Location You Operate
              </h1>
              <p className="mt-6 text-lg md:text-xl text-white/60 leading-relaxed">
                Deploy a multilingual, compliance-ready workforce in days. FrontDesk Agents unifies inbound voice, SMS, and proactive revenue campaigns under a single owner cockpit with auditable AI decisions.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/signup" className="inline-flex items-center gap-3 rounded-2xl bg-white text-black px-8 py-4 text-sm font-semibold tracking-wide shadow-xl shadow-blue-900/30 hover:translate-y-0.5 transition">
                  Launch Enterprise Trial
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/demo" className="inline-flex items-center gap-3 rounded-2xl bg-transparent border border-white/20 px-8 py-4 text-sm font-semibold tracking-wide text-white hover:bg-white/5 transition">
                  Review Platform Tour
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 text-xs uppercase tracking-[0.3em] text-white/40">
                {TRUST_LOGOS.map((logo) => (
                  <span key={logo} className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-blue-400" />
                    {logo}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">System Health</p>
                <span className="inline-flex items-center gap-2 text-emerald-300 text-sm font-semibold">
                  <BadgeCheck className="w-4 h-4" /> Operational Excellence
                </span>
              </div>
              <hr className="my-5 border-white/10" />
              <div className="space-y-4">
                {STATS.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-[0.3em]">{stat.label}</p>
                      <p className="text-sm text-white/40">{stat.detail}</p>
                    </div>
                    <p className="text-3xl font-black">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        <section className="grid gap-8 md:grid-cols-3">
          {PLATFORM_COLUMNS.map((column) => (
            <div key={column.title} className="border border-white/10 rounded-3xl p-8 bg-gradient-to-b from-white/5 to-transparent">
              <column.icon className="w-10 h-10 text-blue-400" />
              <h3 className="mt-6 text-2xl font-bold">{column.title}</h3>
              <p className="mt-3 text-white/70 text-sm leading-relaxed">{column.copy}</p>
              <ul className="mt-6 space-y-3 text-sm text-white/70">
                {column.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="grid gap-8 md:grid-cols-[3fr,2fr] items-center border border-white/10 rounded-3xl p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Global Locations Planner</p>
            <h2 className="mt-3 text-4xl font-black">Financial Modeling Console</h2>
            <p className="mt-3 text-white/60">
              Set the locations you operate and preview monthly operating expense, annual savings, and per-location efficiency with our enterprise pricing rails.
            </p>
            <div className="mt-10">
              <div className="flex items-baseline justify-between">
                <span className="text-white/50 text-xs uppercase tracking-[0.3em]">Locations</span>
                <span className="text-6xl font-black">{safeLocations}</span>
              </div>
              <input
                type="range"
                min={1}
                max={500}
                value={safeLocations}
                onChange={(event) => setLocations(clampInt(Number(event.target.value), 1, 500))}
                className="w-full mt-6 accent-blue-500"
              />
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Net Monthly Opex</p>
                <p className="text-4xl font-black">${Math.round(pricing.finalMonthly).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Unit Efficiency</p>
                <p className="text-4xl font-black text-white/60">${Math.round(pricing.unitCost).toLocaleString()}</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Annual Savings</p>
                <p className="text-4xl font-black text-emerald-300">${Math.round(pricing.annualSavings).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Billing cadence</p>
              <div className="inline-flex rounded-full border border-white/10">
                <button
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide rounded-full ${!annual ? "bg-white text-black" : "text-white/60"}`}
                  onClick={() => setAnnual(false)}
                >
                  Monthly
                </button>
                <button
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide rounded-full ${annual ? "bg-emerald-400 text-black" : "text-white/60"}`}
                  onClick={() => setAnnual(true)}
                >
                  Annual -20%
                </button>
              </div>
            </div>
            <hr className="border-white/10" />
            <p className="text-sm text-white/70">
              Enterprise agreements include telemetry ingestion, secure webhooks, field deployment support, and owner priority routing.
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">Industry blueprints</p>
              <h2 className="mt-2 text-4xl font-black">Operational playbooks shipped with every deployment</h2>
            </div>
            <Link href="/case-studies" className="inline-flex items-center gap-3 text-sm font-semibold text-white/70 hover:text-white">
              Explore case studies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {INDUSTRIES.map((item) => (
              <div key={item.name} className="border border-white/10 rounded-3xl p-6 bg-white/5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-blue-300" />
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                </div>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">Commercial tiers</p>
              <h2 className="mt-2 text-4xl font-black">Choose the fleet that matches your demand curve</h2>
            </div>
            <Link href="/pricing" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
              Download pricing brief <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl border p-6 flex flex-col gap-6 ${
                  tier.highlight
                    ? "border-emerald-400 bg-gradient-to-b from-emerald-500/10 to-transparent"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">{tier.name}</p>
                  <p className="mt-2 text-4xl font-black">${tier.price}<span className="text-sm text-white/40 font-normal"> / node</span></p>
                  <p className="text-sm text-white/60">{tier.usage}</p>
                </div>
                <ul className="space-y-3 text-sm text-white/70 flex-1">
                  {tier.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold ${
                    tier.highlight ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Authorize node <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <Testimonials />
        <FAQ />
      </main>

      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-wrap items-center gap-4 text-sm text-white/50">
          <Lock className="w-4 h-4" />
          SOC2 | HIPAA | FINRA controls validated across all US regions.
        </div>
      </footer>
    </div>
  );
}
