'use client';

import React from 'react';
import { PricingCard } from '@/components/PricingCard';
import { CurrencySwitcher } from '@/components/CurrencySwitcher';
import { useMarketPricing } from '@/hooks/useMarketPricing';

export default function PricingPage() {
  const { plans, region, setRegion, currency } = useMarketPricing();

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
          Sovereign Global Financial Hub
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Deploy an autonomous AI receptionist fleet at local market rates with global node activation.
        </p>
      </div>

      {/* Regional Multiplier Toggle */}
      <div className="max-w-7xl mx-auto">
        <CurrencySwitcher 
          currentRegion={region} 
          onRegionChange={setRegion} 
        />

        {/* Established Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {plans.map((plan) => (
            <PricingCard 
              key={plan.id} 
              plan={plan} 
              currencySymbol={currency.symbol} 
            />
          ))}
        </div>

        {/* Global Compliance Footer */}
        <div className="mt-20 text-center p-8 rounded-3xl border border-slate-800 bg-slate-900/50">
          <p className="text-slate-400 text-sm">
            All tiers include HIPAA-compliant data handling and regional success fee structures. 
            <br />
            <span className="text-blue-500 font-semibold">Elite Tier Activation</span> grants immediate access to the Unlimited Agent Fleet.
          </p>
        </div>
      </div>
    </div>
  );
}
