'use client';

import { CheckIcon } from '@heroicons/react/24/solid';

const tiers = [
  {
    name: 'Foundation Node',
    price: '$1,997',
    desc: 'Automate your primary reception line.',
    features: ['High-Fidelity Neural Voice', 'SMS Concierge', 'Basic ROI Analytics'],
    cta: 'Initialize Node',
    featured: false
  },
  {
    name: 'Neural Growth',
    price: '$4,997',
    desc: 'Full-scale multi-channel intelligence.',
    features: ['Everything in Foundation', 'AI SDR Sales Swarm', 'WhatsApp Global Sync', 'Email Assistant Relay', 'Lead Priority Scoring'],
    cta: 'Expand Infrastructure',
    featured: true
  },
  {
    name: 'Operational Sovereignty',
    price: '$50,000+',
    desc: 'Total enterprise-wide neural replacement.',
    features: ['Custom Neural Training', 'White-Glove Onboarding', 'Dedicated Infrastructure Monitor', 'Unlimited Neural Nodes', 'Custom API Integration'],
    cta: 'Request Sovereign Access',
    featured: false
  }
];

export default function Pricing() {
  return (
    <section className="bg-black py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-xs font-black uppercase tracking-[0.5em] text-cyan-500 mb-4">Neural Allocation</h2>
          <h1 className="text-5xl font-black text-white italic tracking-tighter">Choose Your Scale of Sovereignty</h1>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div key={tier.name} className={`p-10 rounded-[45px] border ${tier.featured ? 'border-cyan-500 bg-cyan-500/5' : 'border-white/5 bg-white/[0.02]'} transition-all hover:scale-105`}>
              <h3 className="text-xl font-black text-white uppercase italic italic">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">{tier.price}</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">/mo</span>
              </div>
              <p className="mt-4 text-sm text-slate-400 font-medium">{tier.desc}</p>
              <ul className="mt-8 space-y-4">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-xs font-bold text-slate-300">
                    <CheckIcon className="w-4 h-4 text-cyan-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className={`mt-10 w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] ${tier.featured ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white'}`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
