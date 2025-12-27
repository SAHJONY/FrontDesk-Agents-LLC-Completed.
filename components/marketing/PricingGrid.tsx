'use client';

import React from 'react';
import { Check, Cpu, Zap, Shield, Crown, ChevronRight } from 'lucide-react';

const TIERS = [
  {
    name: 'Foundation Node',
    id: 'satellite',
    price: '$2,500',
    description: 'Establish 24/7 baseline operational presence with core triage logic.',
    modules: ['Front-Desk Mirror', 'Neural Qualifier', 'Institutional Triage', 'Basic Asset Sync'],
    features: ['Single Aegis Silo', 'Standard Telemetry', 'Executive Override Protocol'],
    highlight: false
  },
  {
    name: 'Growth Accelerator',
    id: 'orbital',
    price: '$7,500',
    description: 'Aggressive revenue capture and churn defense for expanding enterprises.',
    modules: ['All Foundation Modules', 'Sovereign Closer', 'Abandoned Intent Recovery', 'Retention Guardian'],
    features: ['High-Priority Node Compute', 'Forensic Telemetry', 'Strategic Equilibrium Modeling'],
    highlight: true
  },
  {
    name: 'Sovereign Enterprise',
    id: 'sovereign',
    price: 'Custom',
    description: 'Total autonomous infrastructure transformation for global institutions.',
    modules: ['Full 20+ Module Catalog', 'Forensic Auditor', 'Language Localization', 'Neural Ingestion Bridge'],
    features: ['Dedicated Cluster Ingestion', 'Unlimited Aegis Silo Scaling', 'Immutable Compliance Logs'],
    highlight: false
  }
];

export const PricingGrid = () => {
  return (
    <section className="container mx-auto px-8 lg:px-16 py-24 bg-black">
      <div className="text-center mb-20">
        <h2 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.6em] mb-4">Infrastructure Provisioning</h2>
        <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter">Choose Your <span className="text-slate-600">Yield Tier</span></h3>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {TIERS.map((tier) => (
          <div 
            key={tier.id} 
            className={`relative flex flex-col p-10 border transition-all duration-500 ${
              tier.highlight 
              ? 'bg-gradient-to-b from-cyan-950/20 to-black border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.1)]' 
              : 'bg-[#050608] border-white/5 hover:border-white/20'
            }`}
          >
            {tier.highlight && (
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-cyan-500 text-black text-[9px] font-black uppercase px-4 py-1 tracking-widest">
                Recommended Allocation
              </div>
            )}

            <div className="mb-8">
              <h4 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tighter">{tier.name}</h4>
              <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider leading-relaxed">{tier.description}</p>
            </div>

            <div className="mb-8 pb-8 border-b border-white/5">
              <span className="text-4xl font-black text-white">{tier.price}</span>
              {tier.price !== 'Custom' && <span className="text-slate-600 text-[10px] font-bold uppercase ml-2 tracking-widest">/ Month Provisioning</span>}
            </div>

            <div className="flex-grow space-y-8 mb-12">
              <div>
                <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest block mb-4 italic underline underline-offset-4">Active Neural Modules</span>
                <ul className="space-y-3">
                  {tier.modules.map((mod) => (
                    <li key={mod} className="flex items-center gap-3 text-[11px] font-medium text-slate-300">
                      <Cpu size={12} className="text-cyan-500 opacity-50" /> {mod}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-4">System Governance</span>
                <ul className="space-y-3">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-[11px] font-medium text-slate-400">
                      <Shield size={12} className="text-white/20" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button className={`w-full py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 ${
              tier.highlight 
              ? 'bg-cyan-500 text-black hover:bg-white' 
              : 'bg-white text-black hover:bg-cyan-500'
            }`}>
              Initiate Ingestion <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
