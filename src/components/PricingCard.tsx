import React from 'react';
import { Check } from 'lucide-react';
import { PricingPlan } from '@/services/pricing';

interface PricingCardProps {
  plan: PricingPlan;
  currencySymbol: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, currencySymbol }) => {
  const isElite = plan.price === 1499;

  return (
    <div className={`relative flex flex-col p-6 rounded-2xl border ${
      isElite ? 'border-blue-500 bg-slate-900 shadow-lg shadow-blue-500/20' : 'border-slate-800 bg-slate-950'
    }`}>
      {isElite && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-xs font-bold uppercase tracking-wider rounded-full">
          Global Node Activated
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
        <p className="text-sm text-slate-400">{plan.description}</p>
      </div>

      <div className="mb-8 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-white">{currencySymbol}{plan.price}</span>
        <span className="text-slate-500">/month</span>
      </div>

      <ul className="flex-1 space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-slate-300">
            <Check className="w-5 h-5 text-blue-500 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
        {/* Automatic Logic for Voice Receptionist Minutes */}
        <li className="flex items-start gap-3 text-sm text-slate-300 font-medium">
          <Check className="w-5 h-5 text-blue-500 shrink-0" />
          <span>{plan.minutes === 999999 ? 'Unlimited' : plan.minutes} AI Voice Minutes</span>
        </li>
      </ul>

      <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${
        isElite 
          ? 'bg-blue-600 hover:bg-blue-500 text-white' 
          : 'bg-white hover:bg-slate-200 text-slate-950'
      }`}>
        {isElite ? 'Deploy Global Fleet' : 'Get Started'}
      </button>
    </div>
  );
};
