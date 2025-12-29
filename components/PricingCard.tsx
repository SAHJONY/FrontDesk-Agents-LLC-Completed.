import React from 'react';

interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    adjustedPrice: number;
    minutes: number | string;
    features: string[];
  };
  currencySymbol: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, currencySymbol }) => {
  const isElite = plan.id === 'tier-elite';

  return (
    <div className={`titan-card flex flex-col h-full relative transition-all duration-500 ${
      isElite ? 'border-brand-cyan/40 shadow-[0_0_40px_-15px_rgba(6,182,212,0.3)] scale-105 z-10' : 'border-white/5'
    }`}>
      {isElite && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-cyan text-black text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-brand-cyan/20">
          Elite Fleet Activated
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-brand-slate text-xs font-bold uppercase tracking-[0.2em] mb-2">
          {plan.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black text-white italic">
            {currencySymbol}{plan.adjustedPrice}
          </span>
          <span className="text-slate-500 text-sm font-medium">/mo</span>
        </div>
      </div>

      <div className="mb-8 p-3 bg-white/5 rounded-xl border border-white/5">
        <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Capacity</p>
        <p className="text-white font-mono font-bold">
          {plan.minutes} {typeof plan.minutes === 'number' ? 'Minutes' : ''}
        </p>
      </div>

      <ul className="space-y-4 flex-1 mb-10">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-tight">
            <div className="mt-1.5 w-1 h-1 rounded-full bg-brand-cyan shadow-[0_0_5px_rgba(6,182,212,1)]" />
            {feature}
          </li>
        ))}
      </ul>

      <button className={`w-full py-4 rounded-xl font-black uppercase tracking-tighter transition-all ${
        isElite 
        ? 'bg-brand-cyan text-black hover:bg-cyan-400 hover:shadow-lg hover:shadow-brand-cyan/20' 
        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
      }`}>
        Initialize {plan.name}
      </button>
    </div>
  );
};
