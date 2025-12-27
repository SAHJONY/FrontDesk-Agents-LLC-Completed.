'use client';

import React from 'react';
import { Check, Shield, Globe, Cpu, Zap } from 'lucide-react';

const tiers = [
  {
    name: 'Sovereign Node',
    id: 'tier-sovereign',
    price: '$2,450',
    description: 'Entry-level institutional provisioning for single-market operations.',
    features: [
      'SYSTEM-PROTOCOL-7 Access',
      'Single Region Deployment',
      'Non-Linear RL Core (Standard)',
      '10,000 Provisioned Minutes',
      'Aegis Shield Protection'
    ],
    cta: 'Initialize Node',
    featured: false,
  },
  {
    name: 'Enterprise Matrix',
    id: 'tier-matrix',
    price: '$7,800',
    description: 'Multi-node infrastructure for high-velocity global conglomerates.',
    features: [
      'Omni-Pivot Continuity Logic',
      'Multi-Region Deployment',
      'Priority RL Training Sync',
      '50,000 Provisioned Minutes',
      'White-Glove Implementation',
      'Executive Board Reporting'
    ],
    cta: 'Deploy Matrix',
    featured: true,
  }
];

export const PricingGrid = () => {
  return (
    <div className="py-24 sm:py-32 bg-[#020305]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-20">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500 mb-4">Capital Yield Tiers</h2>
          <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl uppercase italic">
            Institutional <span className="text-slate-500">Provisioning</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col justify-between p-10 rounded-sm border ${
                tier.featured 
                  ? 'bg-white/5 border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.1)]' 
                  : 'bg-transparent border-white/10'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">
                    {tier.name}
                  </h3>
                  {tier.featured && (
                    <span className="px-3 py-1 bg-cyan-500 text-black text-[8px] font-black uppercase tracking-widest">
                      High Yield
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-x-2 mb-4">
                  <span className="text-5xl font-bold tracking-tighter text-white">{tier.price}</span>
                  <span className="text-sm font-semibold leading-6 text-slate-500 uppercase tracking-widest">/mo</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400 uppercase tracking-widest mb-10">
                  {tier.description}
                </p>
                <ul role="list" className="space-y-4 mb-10 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3 items-center">
                      <Check className="h-4 w-4 flex-none text-cyan-500" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
                  tier.featured
                    ? 'bg-cyan-500 text-black hover:bg-white'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
