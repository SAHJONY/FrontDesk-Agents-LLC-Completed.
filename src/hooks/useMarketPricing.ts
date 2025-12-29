import { useState, useEffect } from 'react';
import { getAdjustedPricing, PricingPlan } from '@/services/pricing';

export const useMarketPricing = () => {
  // Default to Western market (USD)
  const [region, setRegion] = useState<'WESTERN' | 'MEDIUM' | 'GROWTH'>('WESTERN');
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [currency, setCurrency] = useState({ code: 'USD', symbol: '$' });

  useEffect(() => {
    // Fetches the established tiers: $199, $399, $799, $1,499
    const adjustedPlans = getAdjustedPricing(region);
    setPlans(adjustedPlans);

    // Update currency display based on region
    const currencyMap = {
      WESTERN: { code: 'USD', symbol: '$' },
      MEDIUM: { code: 'BRL', symbol: 'R$' },
      GROWTH: { code: 'VND', symbol: '₫' }
    };
    setCurrency(currencyMap[region]);
  }, [region]);

  return {
    plans,
    region,
    setRegion,
    currency
  };
};
