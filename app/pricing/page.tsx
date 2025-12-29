'use client';

import React from 'react';
import { useMarketPricing } from '../../hooks/useMarketPricing';
import { PricingCard } from '../../components/PricingCard';
import { CurrencySwitcher } from '../../components/CurrencySwitcher';

export default function PricingPage() {
  const { plans, region, setRegion, currency } = useMarketPricing();

  return (
    <div className="max-w-7xl mx-auto py-24 px-6 relative z-10">
      <div className="text-center mb-20">
        <h2 className="text-brand-cyan font-bold tracking-[0.3em] uppercase text-sm mb-4">
          Global Node Activation
        </h2>
        <h1 className="text-5xl md:text-6xl font-black mb-8 italic">
          SOVEREIGN PRICING
        </h1>
        <CurrencySwitcher currentRegion={region} onRegionChange={setRegion} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => (
          <PricingCard 
            key={plan.id} 
            plan={plan} 
            currencySymbol={currency.symbol} 
          />
        ))}
      </div>
      
      <footer className="mt-24 text-center text-slate-500 text-sm italic">
        *Pricing is permanent across all platforms. Regional multipliers applied at checkout.
      </footer>
    </div>
  );
}
