// app/pricing/page.tsx
'use client';

import { usePricing } from '@/hooks/usePricing';
import PricingCard from '@/components/pricing/PricingCard';

export default function PricingPage() {
  const { plans, region, loading } = usePricing();

  if (loading) return <div className="h-screen flex items-center justify-center text-white">Detecting Local Node...</div>;

  return (
    <div className="py-20 px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-white">SOVEREIGN PRICING</h1>
        <p className="text-slate-400 mt-2">Current Node: {region} Market</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
