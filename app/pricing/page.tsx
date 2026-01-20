'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, Zap, Shield, TrendingUp, AlertTriangle } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Starter',
    price: 149,
    mins: 300,
    description: 'Essential autonomous intake for solo operators.',
    overage: '$0.45/min',
    featured: false,
    cta: 'Activate Node'
  },
  {
    name: 'Professional',
    price: 499,
    mins: 1200,
    description: 'Advanced fleet with priority routing and 50+ languages.',
    overage: '$0.40/min',
    featured: true,
    cta: 'Scale Fleet'
  },
  {
    name: 'Growth',
    price: 999,
    mins: 3000,
    description: 'Multi-location cluster with custom voice cloning.',
    overage: '$0.35/min',
    featured: false,
    cta: 'Establish Cluster'
  },
  {
    name: 'Enterprise',
    price: 1999,
    mins: 7000,
    description: 'Infinite scale with performance royalties (Sec. 3).',
    overage: '$0.30/min',
    featured: false,
    cta: 'Consult Sovereignty'
  }
];

function PricingContent() {
  const searchParams = useSearchParams();
  const isOverLimit = searchParams.get('reason') === 'usage_limit';

  return (
    <div className="bg-black min-h-screen py-24 px-6 selection:bg-cyan-500/30">
      {/* Usage Limit Alert */}
      {isOverLimit && (
        <div className="max-w-4xl mx-auto mb-16 p-6 bg-red-500/10 border border-red-500/50 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-red-500 p-2 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-black uppercase italic tracking-tighter">System Lock Activated</h3>
            <p className="text-red-400 text-sm">Your minute bucket is exhausted. Upgrade your Node Tier below to resume autonomous operations immediately.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-20">
        <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase mb-4">
          Global Node Access
        </h1>
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-12 bg-zinc-800" />
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-[0.3em]">
            Sovereign Infrastructure 2026
          </p>
          <span className="h-px w-12 bg-zinc-800" />
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
        {pricingTiers.map((tier) => (
          <div 
            key={tier.name}
            className={`relative group p-8 rounded-3xl border transition-all duration-300 ${
              tier.featured 
                ? 'bg-zinc-900/50 border-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.15)]' 
                : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600'
            } ${isOverLimit && tier.name === 'Professional' ? 'ring-2 ring-red-500 ring-offset-4 ring-offset-black' : ''}`}
          >
            {tier.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[10px] font-black uppercase px-4 py-1 rounded-full tracking-widest">
                Recommended
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-black text-white">${tier.price}</span>
                <span className="text-zinc-600 text-xs uppercase">/mo</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed h-12 italic">{tier.description}</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-cyan-500" />
                <span className="text-white font-bold text-sm">{tier.mins.toLocaleString()} Mins Included</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-zinc-500" />
                <span className="text-zinc-400 text-xs">Overage: {tier.overage}/min</span>
              </div>
            </div>

            <Link
              href={`/signup?plan=${tier.name.toLowerCase()}`}
              className={`block w-full py-4 rounded-xl text-center text-xs font-black uppercase tracking-widest transition-all ${
                tier.featured 
                  ? 'bg-cyan-500 text-black hover:bg-cyan-400' 
                  : 'bg-white text-black hover:bg-zinc-200'
              }`}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Trust Footer */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto border-t border-zinc-900 pt-20">
        <div className="text-center">
          <Globe className="w-8 h-8 text-cyan-500 mx-auto mb-4" />
          <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-2">Global Nodes</h4>
          <p className="text-zinc-500 text-xs italic">Low-latency AI deployments across 15+ regional data centers.</p>
        </div>
        <div className="text-center">
          <TrendingUp className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
          <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-2">Success Fees</h4>
          <p className="text-zinc-500 text-xs italic">Revenue-linked pricing for Enterprise partners. We grow when you grow.</p>
        </div>
        <div className="text-center">
          <Shield className="w-8 h-8 text-zinc-500 mx-auto mb-4" />
          <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-2">Autonomy</h4>
          <p className="text-zinc-500 text-xs italic">Your scripts and data remain 100% sovereign. No third-party training.</p>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen" />}>
      <PricingContent />
    </Suspense>
  );
}
