'use client';

import { useSearchParams } from 'next/navigation';
import { PricingCard } from '@/components/pricing/PricingCard';

export default function PricingPage() {
  const searchParams = useSearchParams();
  const isOverLimit = searchParams.get('reason') === 'usage_limit';

  const tiers = [
    { name: 'Starter', price: 149, mins: 300, featured: false },
    { name: 'Professional', price: 499, mins: 1200, featured: true },
    { name: 'Growth', price: 999, mins: 3000, featured: false },
    { name: 'Enterprise', price: 1999, mins: 7000, featured: false },
  ];

  return (
    <div className="bg-black min-h-screen py-20 px-6">
      {isOverLimit && (
        <div className="max-w-4xl mx-auto mb-12 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
          <p className="text-red-500 text-center font-bold animate-pulse">
            ⚠️ ACTION REQUIRED: Your current minute bucket is exhausted. 
            Select a tier below to resume AI Fleet operations.
          </p>
        </div>
      )}

      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-4">
          Global Node Access
        </h1>
        <p className="text-zinc-500 max-w-2xl mx-auto">
          Scale your autonomous workforce. Every tier includes Bland AI infrastructure 
          and full Script Engine sovereignty.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {tiers.map((tier) => (
          <PricingCard 
            key={tier.name}
            {...tier}
            isSuggested={isOverLimit && tier.name === 'Professional'} 
          />
        ))}
      </div>
    </div>
  );
}
