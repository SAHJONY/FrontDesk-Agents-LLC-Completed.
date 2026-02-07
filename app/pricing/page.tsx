'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { Check, Shield, Zap, Globe, Cpu } from 'lucide-react';

type BillingCycle = 'monthly' | 'annual';

const pricingTiers = [
  {
    name: 'Starter',
    tagline: 'Global Node Activation',
    price: 149,
    description: 'Autonomous receptionist service with dedicated account access.',
    features: {
      'Core Infrastructure': [
        { name: '300 Included Minutes', included: true },
        { name: 'Global Service Activation', included: true },
        { name: 'Overage Protection', value: '$0.45/min' },
      ],
      'Operational Tools': [
        { name: '24/7 Intake Management', included: true },
        { name: 'Professional Scripting', included: true },
      ],
      'Service Level': [
        { name: 'Users', value: '1' },
        { name: 'Uptime SLA', value: '99.5%' },
      ],
    },
    cta: 'Activate Starter Node',
    popular: false,
    accent: 'emerald'
  },
  {
    name: 'Professional',
    tagline: 'High-Concurrency Priority',
    price: 499,
    description: 'High-capacity virtual workforce with priority call routing.',
    features: {
      'Core Infrastructure': [
        { name: '1,200 Included Minutes', included: true },
        { name: 'Priority Service Status', included: true },
        { name: 'Volume Discounts', value: '$0.40/min' },
      ],
      'Operational Tools': [
        { name: 'Advanced API Integration', included: true },
        { name: 'Multilingual Support (50+)', included: true },
      ],
      'Service Level': [
        { name: 'Users', value: 'Up to 5' },
        { name: 'Uptime SLA', value: '99.9%' },
      ],
    },
    cta: 'Activate Pro Node',
    popular: true,
    accent: 'emerald'
  },
  {
    name: 'Enterprise',
    tagline: 'Sovereign Corporate Solution',
    price: 1999,
    description: 'Unlimited scalability with performance-based engagement models.',
    features: {
      'Core Infrastructure': [
        { name: '7,000 Included Minutes', included: true },
        { name: 'Dedicated Server Instance', included: true },
        { name: 'Enterprise Overage Rates', value: '$0.30/min' },
      ],
      'Compliance & Security': [
        { name: 'Regulatory Compliance Suite', included: true },
        { name: 'Dedicated Account Manager', included: true },
      ],
      'Service Level': [
        { name: 'Users', value: 'Unlimited' },
        { name: 'Uptime SLA', value: '99.99%' },
      ],
    },
    cta: 'Contact Global Sales',
    popular: false,
    accent: 'emerald'
  },
];

function PricingContent() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30">
      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-black to-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="py-24 px-6 border-b border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-emerald-400 uppercase border border-emerald-400/30 bg-emerald-400/10 rounded-full">
              Global Infrastructure Tiers
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase italic">
              Platform <span className="text-emerald-500">Pricing</span>
            </h1>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
              Transparent, performance-driven models designed to scale your autonomous workforce globally.
            </p>

            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-1.5 backdrop-blur-xl">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all uppercase tracking-widest ${
                  billingCycle === 'monthly' ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all uppercase tracking-widest ${
                  billingCycle === 'annual' ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'text-slate-400 hover:text-white'
                }`}
              >
                Annual <span className="ml-1 opacity-60 text-xs">(-20%)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.name} 
                className={`relative flex flex-col p-10 rounded-3xl border transition-all duration-500 group hover:scale-[1.02] ${
                  tier.popular 
                    ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_40px_rgba(16,185,129,0.1)]' 
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    Most Deployed
                  </div>
                )}
                
                <div className="mb-10">
                  <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tight">{tier.name}</h3>
                  <p className="text-sm font-bold text-emerald-500 uppercase tracking-widest">{tier.tagline}</p>
                </div>

                <div className="mb-10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-black tracking-tighter">${tier.price}</span>
                    <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">/mo</span>
                  </div>
                  <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <Link 
                  href="/signup" 
                  className={`w-full py-4 rounded-2xl font-black text-center mb-10 uppercase tracking-[0.15em] text-sm transition-all ${
                    tier.popular 
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]' 
                      : 'bg-white text-black hover:bg-slate-200'
                  }`}
                >
                  {tier.cta}
                </Link>

                <div className="space-y-8 flex-grow">
                  {Object.entries(tier.features).map(([cat, feats]) => (
                    <div key={cat}>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2">
                        <span className="w-4 h-px bg-slate-800" /> {cat}
                      </p>
                      <ul className="space-y-4">
                        {feats.map((f: any) => (
                          <li key={f.name} className="flex items-start gap-3 text-sm group/item">
                            <div className="mt-1 p-0.5 rounded-full bg-emerald-500/20 text-emerald-500 group-hover/item:bg-emerald-500 group-hover/item:text-black transition-colors">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="text-slate-300 font-medium">
                              {f.name} {f.value && <span className="text-white font-bold ml-1">[{f.value}]</span>}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Section */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-white/10 pt-16">
            <div className="flex flex-col items-center text-center space-y-4">
              <Shield className="w-8 h-8 text-emerald-500" />
              <p className="text-xs font-black uppercase tracking-widest">Enterprise Security</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <Zap className="w-8 h-8 text-emerald-500" />
              <p className="text-xs font-black uppercase tracking-widest">Instant Activation</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <Globe className="w-8 h-8 text-emerald-500" />
              <p className="text-xs font-black uppercase tracking-widest">Global Reach</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <Cpu className="w-8 h-8 text-emerald-500" />
              <p className="text-xs font-black uppercase tracking-widest">Neural Optimization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-emerald-500 font-black uppercase tracking-[0.3em]">Initializing Tiers...</div>}>
      <PricingContent />
    </Suspense>
  );
}
