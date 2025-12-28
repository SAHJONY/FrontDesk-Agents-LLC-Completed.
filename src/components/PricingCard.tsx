import React from 'react';

// Define the shape of our 4-tier plans
interface PricingPlan {
  id: string;
  name: string;
  price: number;
  minutes: number;
  features: string[];
}

// Update the props to accept 'plan' instead of 'region'
interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div className="p-8 bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col h-full hover:shadow-2xl transition-all">
      <div className="mb-6">
        <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
          {plan.name} Node
        </span>
        <h3 className="text-4xl font-extrabold text-slate-900 mt-4">${plan.price}</h3>
        <p className="text-slate-500 text-sm">per month / fixed price</p>
      </div>

      <div className="mb-6 py-3 border-y border-slate-50">
        <p className="text-slate-700 font-semibold">{plan.minutes.toLocaleString()} AI Minutes</p>
      </div>

      <ul className="space-y-4 mb-8 flex-grow">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start text-sm text-slate-600">
            <span className="text-green-500 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-colors">
        Deploy {plan.name} Node
      </button>
    </div>
  );
}
