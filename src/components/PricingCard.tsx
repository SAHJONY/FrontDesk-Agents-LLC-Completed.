import React from 'react';

// Define the interface for our specific 4-tier architecture
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  minutes: number;
  features: string[];
}

// Fix: Change 'region: string' to 'plan: PricingPlan'
interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div className="p-8 bg-white rounded-3xl shadow-lg border border-slate-100 flex flex-col h-full hover:border-indigo-500 transition-all">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">{plan.name} Node</h3>
        <p className="text-4xl font-extrabold text-slate-900 mt-2">${plan.price}</p>
        <p className="text-slate-500 text-xs">per month</p>
      </div>

      <div className="mb-6 py-2 px-4 bg-indigo-50 rounded-xl inline-block">
        <p className="text-indigo-700 font-bold text-sm">{plan.minutes.toLocaleString()} AI Minutes</p>
      </div>

      <ul className="space-y-3 mb-8 flex-grow">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start text-sm text-slate-600">
            <span className="text-green-500 mr-2">✓</span> {feature}
          </li>
        ))}
      </ul>

      <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-colors">
        Deploy {plan.name}
      </button>
    </div>
  );
}
