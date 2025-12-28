'use client';

import { usePricing } from '@/hooks/usePricing'; // Hook we built earlier
import { CheckCircle2, Zap } from 'lucide-react';

export function PricingGrid() {
  const { plans, region, loading } = usePricing();

  if (loading) return <div className="text-center py-20 text-slate-500 animate-pulse font-mono uppercase tracking-[0.4em]">Calibrating Regional Nodes...</div>;

  return (
    <div className="container mx-auto px-8 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="group p-8 rounded-sm border border-white/10 bg-[#080a0f] hover:border-cyan-500 transition-all duration-500">
            <h3 className="text-white font-black uppercase tracking-widest text-sm mb-1">{plan.name}</h3>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-6">{plan.description}</p>
            
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black text-white italic">${plan.price}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">/mo</span>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/20 p-3 mb-8 flex items-center gap-3">
              <Zap className="w-3 h-3 text-cyan-500" />
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">{plan.minutes} Neural Mins</span>
            </div>

            <ul className="space-y-4 mb-10 min-h-[160px]">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  <CheckCircle2 className="w-3 h-3 text-cyan-500 shrink-0" /> {f}
                </li>
              ))}
            </ul>

            <button className="w-full py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-cyan-500 transition-all">
              Initialize {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
