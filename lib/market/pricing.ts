export const GlobalPricing = {
  WESTERN: {
    currency: 'USD',
    symbol: '$',
    tiers: {
      professional: 899,
      sovereign: 1799,
      enterprise: 4500
    }
  },
  GB: { // Overriding specifically for UK
    currency: 'GBP',
    symbol: '£',
    tiers: {
      professional: 699,
      sovereign: 1399,
      enterprise: 3500
    }
  },
  EU: { // Generic Euro Zone
    currency: 'EUR',
    symbol: '€',
    tiers: {
      professional: 799,
      sovereign: 1599,
      enterprise: 3999
    }
  },
  GROWTH: {
    currency: 'USD',
    symbol: '$',
    tiers: {
      professional: 299, // Optimized for high-volume growth markets
      sovereign: 599,
      enterprise: 1200
    }
  }
};
