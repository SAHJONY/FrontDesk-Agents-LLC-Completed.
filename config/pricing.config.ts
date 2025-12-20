import { Plans } from './plans';

export interface PricingPlan {
  id: Plans;
  name: string;
  description: string;
  price: number;
  currency: string;
}

// Region-based price multipliers
const multipliers: Record<string, number> = {
  WESTERN: 1,    // US, EU, UK, CA (Full Price)
  MEDIUM: 0.6,   // TR, BR, MX (40% Discount)
  GROWTH: 0.35,  // VN, IN, PH, ID (65% Discount)
};

export const getAdjustedPricing = (region: string = 'WESTERN'): PricingPlan[] => {
  const multiplier = multipliers[region] || 1;

  return [
    {
      id: Plans.STARTER,
      name: 'Starter',
      description: 'Solo operators & small teams',
      price: Math.round(399 * multiplier),
      currency: 'USD',
    },
    {
      id: Plans.PROFESSIONAL,
      name: 'Professional',
      description: 'Growing businesses',
      price: Math.round(899 * multiplier),
      currency: 'USD',
    },
    {
      id: Plans.ENTERPRISE,
      name: 'Enterprise',
      description: 'High-volume & custom workflows',
      price: Math.round(1799 * multiplier),
      currency: 'USD',
    },
  ];
};

