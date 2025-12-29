'use client';
import { useState, useMemo } from 'react';

// Centralized source of truth for multipliers
const REGIONAL_MULTIPLIERS = {
  WESTERN: 1.0,
  EMERGING: 0.65,
  GROWTH: 0.35,
};

// Permanent Pricing Tiers
const BASE_PLANS = [
  { id: 'tier-basic', name: 'Basic', usd: 199, features: ['500 Minutes', '1 AI Agent', 'CRM Sync'] },
  { id: 'tier-professional', name: 'Professional', usd: 399, features: ['1,500 Minutes', '3 AI Agents', 'Lead Gen'] },
  { id: 'tier-growth', name: 'Growth', usd: 799, features: ['4,000 Minutes', '10 AI Agents', 'Payments'] },
  { id: 'tier-elite', name: 'Elite', usd: 1499, features: ['Unlimited Minutes', 'Unlimited Fleet', 'Success Logic'] },
];

export function useMarketPricing() {
  const [region, setRegion] = useState<keyof typeof REGIONAL_MULTIPLIERS>('WESTERN');

  const plans = useMemo(() => {
    const multiplier = REGIONAL_MULTIPLIERS[region];
    return BASE_PLANS.map(plan => ({
      ...plan,
      adjustedPrice: Math.round(plan.usd * multiplier),
    }));
  }, [region]);

  return {
    plans,
    region,
    setRegion,
    currency: { symbol: '$', code: 'USD' },
    multiplier: REGIONAL_MULTIPLIERS[region]
  };
}
