'use client';

import { CheckIcon } from '@heroicons/react/24/solid';

const tiers = [
  {
    name: 'Starter',
    price: '$499',
    setup: 'Waived',
    description: 'Perfect for small business owners seeking 24/7 coverage.',
    features: ['1,500 Neural Minutes', '1 Live Agent (Sara)', 'Standard Knowledge Base', 'Email Support'],
    color: 'border-white/10'
  },
  {
    name: 'Professional',
    price: '$1,499',
    setup: '$1,500',
    description: 'For growing teams requiring outbound sales capabilities.',
    features: ['5,000 Neural Minutes', '3 Custom Agents', 'Outbound Sales Logic', 'Priority Processing'],
    color: 'border-cyan-500/30'
  },
  {
    name: 'Enterprise',
    price: '$4,999',
    setup: '$15,000',
    description: 'High-volume infrastructure for established companies.',
    features: ['20,000 Neural Minutes', 'Unlimited Agents', '5 Custom Voice Clones', 'SOC2 Compliance'],
    color: 'border-purple-500/30'
  },
  {
    name: 'Sovereign',
    price: 'Custom',
    setup: '$50,000+',
    description: 'Total operational dominance for global entities.',
    features: ['Unlimited Scale', 'Hyper-Scale Swarm', 'Military-Grade Security', 'Dedicated Hardware'],
    color: 'border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]'
  }
];

export default function PricingSection() {
  return (
    <div className="bg-[#000814] py-24 px-6 lg:px-20">
      <div className="text-center mb-20">
        <h2 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em] mb-4">Pricing Architecture</h2>
        <p className="text-5xl font-black text-white italic tracking-tighter uppercase">Select Your <span className="text-cyan-500">Intelligence Tier</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {tiers.map((tier) => (
          <div key={tier.name} className={`bg-[#000d1a] border ${tier.color} rounded-[40px] p-10 flex flex-col justify-between transition-all hover:scale-[1.02]`}>
            <div>
              <h3 className="text-2xl font-black text-white italic uppercase">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white tracking-tighter">{tier.price}</span>
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">/mo</span>
              </div>
              <p className="text-[9px] text-slate-500 font-bold uppercase mt-2">Setup Fee: {tier.setup}</p>
              <p className="text-xs text-slate-400 mt-6 leading-relaxed font-medium">{tier.description}</p>
              
              <ul className="mt-10 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckIcon className="w-4 h-4 text-cyan-500" />
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wide">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button className={`mt-12 w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${
              tier.name === 'Sovereign' ? 'bg-white text-black' : 'bg-cyan-500 text-black'
            }`}>
              Initialize {tier.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
