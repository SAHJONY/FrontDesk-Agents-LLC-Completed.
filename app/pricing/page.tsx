'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Zap, Shield, TrendingUp, AlertTriangle, Globe, Loader2 } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Starter',
    price: 199,
    mins: 300,
    description: 'Essential autonomous intake for solo operators.',
    overage: '$0.45/min',
    featured: false,
    cta: 'Activate Node',
  },
  {
    name: 'Professional',
    price: 399,
    mins: 1200,
    description: 'Advanced fleet with priority routing and 50+ languages.',
    overage: '$0.40/min',
    featured: true,
    cta: 'Scale Fleet',
  },
  {
    name: 'Growth',
    price: 799,
    mins: 3000,
    description: 'Multi-location cluster with custom voice cloning.',
    overage: '$0.35/min',
    featured: false,
    cta: 'Establish Cluster',
  },
  {
    name: 'Enterprise',
    price: 1499,
    mins: 7000,
    description: 'Infinite scale with performance royalties (Sec. 3).',
    overage: '$0.30/min',
    featured: false,
    cta: 'Consult Sovereignty',
  },
];

function PricingContent() {
  const searchParams = useSearchParams();
  const isOverLimit = searchParams.get('reason') === 'usage_limit';

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white py-24 px-6 selection:bg-brand-gold/30 overflow-hidden">
      
      {/* 🛡️ FAIL-SAFE BACKGROUND LAYER */}
      <div className="absolute inset-0 -z-10">
        {/* We keep the Image component but wrap it in a container that handles the 'missing' state gracefully */}
        <div className="relative h-full w-full opacity-40">
          <Image
            src="/images/8k/hero-team-8k.jpg"
            alt="FrontDesk Agents Global Workforce"
            fill
            priority
            quality={90}
            className="object-cover object-center transition-opacity duration-1000"
            onError={(e) => {
              // If image fails, the background remains a clean, branded deep-ink gradient
              (e.target as any).style.display = 'none';
            }}
          />
        </div>
        
        {/* Brand Aura (Ink/Gold Gradient) - This maintains the "8K" feel even if the JPG is missing */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/90 via-brand-ink/80 to-brand-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(212,175,55,0.12),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-6 mb-20 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">
            <Zap className="h-3 w-3" />
            <span>Revenue Operations Infrastructure</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
            Pricing Engineered for <span className="text-brand-gold">Authority</span>
          </h1>

          <p className="max-w-2xl text-slate-400 text-lg font-medium leading-relaxed">
            Autonomous intake, dispatch, and revenue intelligence. Deploy fast. Track ROI weekly. Scale without adding headcount.
          </p>

          {isOverLimit && (
            <div className="w-full max-w-2xl rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-amber-100 animate-pulse">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <div className="text-left">
                  <div className="font-bold uppercase text-xs tracking-wider">Usage limit reached</div>
                  <div className="text-sm opacity-80 font-medium">Upgrade to continue uninterrupted coverage.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pricingTiers.map((tier, idx) => (
            <div
              key={tier.name}
              className={[
                'relative flex flex-col rounded-[2rem] border p-8 transition-all duration-500 hover:scale-[1.02]',
                tier.featured
                  ? 'border-brand-gold/40 bg-brand-gold/[0.03] shadow-[0_0_40px_rgba(212,175,55,0.1)]'
                  : 'border-white/10 bg-white/[0.02]',
              ].join(' ')}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gold px-4 py-1 text-[10px] font-black uppercase tracking-widest text-black">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-black italic uppercase tracking-tight">{tier.name}</h3>
              <p className="mt-2 text-slate-500 text-xs font-bold uppercase tracking-wider">{tier.description}</p>

              <div className="mt-8 flex flex-col gap-1">
                <div className="text-5xl font-black tracking-tighter">
                  ${tier.price}
                  <span className="text-sm font-bold text-slate-600 uppercase tracking-widest ml-1">/mo</span>
                </div>
                <div className="mt-2 text-xs font-bold text-brand-gold/80 uppercase tracking-widest">
                  {tier.mins.toLocaleString()} Minutes Included
                </div>
                <div className="text-[10px] text-slate-600 font-bold uppercase">
                  Overage: {tier.overage}
                </div>
              </div>

              {/* Feature List */}
              <ul className="mt-8 space-y-4 flex-grow">
                {['24/7 call handling', 'Smart triage + tagging', 'Weekly impact reporting', 'Capacity alerts'].map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <Check className="h-4 w-4 mt-0.5 text-brand-gold" />
                    <span className="text-sm font-medium text-slate-300">{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={[
                  'mt-10 inline-flex w-full items-center justify-center rounded-xl py-4 font-black uppercase tracking-[0.2em] text-xs transition-all',
                  tier.featured 
                    ? 'bg-brand-gold text-black hover:bg-brand-gold/80' 
                    : 'bg-white text-black hover:bg-slate-200',
                ].join(' ')}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* 🛡️ Trust Row */}
        <div className="mt-20 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { icon: Shield, title: 'Operational Guardrails', desc: 'Threshold tracking and automated upgrade prompts.' },
            { icon: TrendingUp, title: 'ROI Visibility', desc: 'Weekly summaries proving value before renewals.' },
            { icon: Globe, title: 'Global Ready', desc: 'Multi-language support and scalable routing.' },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/5 bg-white/[0.01] p-6 hover:bg-white/[0.03] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <item.icon className="h-5 w-5 text-brand-gold" />
                <div className="font-black italic uppercase tracking-tight text-sm">{item.title}</div>
              </div>
              <div className="text-xs font-medium text-slate-500 leading-relaxed">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-brand-gold animate-spin mb-4" />
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Synchronizing Nodes</div>
        </div>
      }
    >
      <PricingContent />
    </Suspense>
  );
}
