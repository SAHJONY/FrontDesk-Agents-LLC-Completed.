'use client';

import { useMemo } from 'react';

// Define your Sovereign Pricing Matrix
const PRICING_MATRIX = {
  WESTERN: {
    currency: 'USD',
    symbol: '$',
    starter: 499,
    alpha: 1499,
    enterprise: 4999,
  },
  MEDIUM: {
    currency: 'BRL',
    symbol: 'R$',
    starter: 299,
    alpha: 899,
    enterprise: 2999,
  },
  GROWTH: {
    currency: 'INR',
    symbol: '₹',
    starter: 149,
    alpha: 499,
    enterprise: 1499,
  }
};

export function useMarketPricing(regionHeader: string | null) {
  const market = useMemo(() => {
    // Default to WESTERN if header is missing or unrecognized
    const region = (regionHeader as keyof typeof PRICING_MATRIX) || 'WESTERN';
    return PRICING_MATRIX[region] || PRICING_MATRIX.WESTERN;
  }, [regionHeader]);

  return market;
}
