'use client';

import React from 'react';
import { PricingCard } from '@/components/PricingCard';
import { CurrencySwitcher } from '@/components/CurrencySwitcher';
import { useMarketPricing } from '@/hooks/useMarketPricing';

export default function PricingPage() {
  const { currency, exchangeRate } = useMarketPricing();

  const tiers = [
    {
      name: 'Basic',
      price: 199,
      description: 'Essential AI receptionist for single-market entry.',
      features: ['1 Autonomous Agent', 'Local Phone Number', 'Standard Dashboard'],
    },
    {
      name: 'Professional',
      price: 399,
      description: 'Advanced capabilities for growing businesses.',
      features: ['3 Autonomous Agents', 'CRM Integration', '24/7 Priority Support'],
    },
    {
      name: 'Growth',
      price: 799,
      description: 'Scale your operations with multi-agent orchestration.',
      features: ['10 Autonomous Agents', 'Advanced Analytics', 'Custom Workflows'],
    },
    {
      name: 'Elite',
      price: 1499,
      description: 'The full Sovereign Global Financial Hub experience.',
      features: ['Unlimited Agent Fleet', 'Global Node Activation', 'Executive Export Tools'],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Sovereign Global Pricing</h1>
        <p className="text-xl text-slate-400 mb-12">
          Deploy your AI workforce across any market with local-first precision.
        </p>

        {/* Global Currency Controller */}
        <div className="flex justify-center mb-16">
          <CurrencySwitcher />
        </div>

        {/* Pricing Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiers.map((tier) => (
            <PricingCard
              key={tier.name}
              tier={tier.name}
              // Calculate price based on the permanent hub rates and current market exchange
              price={Math.round(tier.price * exchangeRate)}
              currency={currency}
              description={tier.description}
              features={tier.features}
              highlight={tier.name === 'Elite'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
