import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

interface Plan {
  name: string;
  price: number;
  features: string[];
}

interface PlanCardProps {
  plan: Plan;
  currentPlanName?: string;
  isPromoActive?: boolean;
  priceMultiplier?: number;
}

// Fixed: Removed the explicit JSX.Element return type to satisfy React 19 / TS requirements
const PlanCard = ({
  plan,
  currentPlanName = 'Free',
  isPromoActive = false,
  priceMultiplier = 1,
}: PlanCardProps) => {
  const isCurrent = plan.name === currentPlanName;
  const finalPrice = Math.round(plan.price * priceMultiplier);

  return (
    <div className={`rounded-2xl border p-8 transition-all ${isCurrent ? 'border-blue-600 ring-1 ring-blue-600' : 'border-slate-200'}`}>
      <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-bold tracking-tight text-slate-900">${finalPrice}</span>
        <span className="ml-1 text-sm font-semibold text-slate-500">/mo</span>
      </div>
      
      <ul className="mt-8 space-y-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start">
            <Check className="h-5 w-5 text-blue-600 shrink-0" />
            <span className="ml-3 text-sm text-slate-600">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={isCurrent ? '#' : '/settings/billing'}
        className={`mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
          isCurrent 
            ? 'bg-slate-100 text-slate-400 cursor-default' 
            : 'bg-blue-600 text-white hover:bg-blue-500'
        }`}
      >
        {isCurrent ? 'Current Plan' : 'Upgrade Plan'}
      </Link>
    </div>
  );
};

export default function SubscriptionPage() {
  const plans: Plan[] = [
    { name: 'Starter', price: 49, features: ['2 AI Agents', 'Basic Analytics', 'Email Support'] },
    { name: 'Professional', price: 149, features: ['10 AI Agents', 'Advanced Orchestration', 'Priority Support', 'SLA Monitoring'] },
    { name: 'Enterprise', price: 499, features: ['Unlimited Agents', 'Full Compliance Suite', 'Custom Calibration', '24/7 Phone Support'] }
  ];

  return (
    <div className="bg-white py-12 px-6 lg:px-8">
      <div className="mx-auto max-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold leading-7 text-blue-600">Pricing</h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          FrontDesk Agents LLC Subscription
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} currentPlanName="Starter" />
        ))}
      </div>
    </div>
  );
}
