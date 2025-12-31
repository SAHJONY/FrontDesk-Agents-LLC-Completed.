import { Plans } from './plans';

export interface PricingPlan {
  id: Plans;
  name: string;
  price: number;
  minutes: number;
  description: string;
  features: string[];
}

/**
 * Permanent Pricing Tiers
 * These values are fixed across the entire Sovereign Global Financial Hub.
 */
export const PERMANENT_TIERS = {
  BASIC: 199,
  PROFESSIONAL: 399,
  GROWTH: 799,
  ELITE: 1499,
};

/**
 * Regional Multipliers
 * Set to 1.0 globally to serve every market as a local platform.
 */
export const REGIONAL_MULTIPLIERS: Record<string, number> = {
  WESTERN: 1.0,
  MEDIUM: 1.0,
  GROWTH: 1.0,
};

export const getAdjustedPricing = (region: string = 'WESTERN'): PricingPlan[] => {
  // Every market is treated as a local platform with 1:1 parity
  const m = REGIONAL_MULTIPLIERS[region] || 1.0;

  return [
    {
      id: Plans.BASIC,
      name: 'Basic',
      price: PERMANENT_TIERS.BASIC,
      minutes: 500,
      description: 'Solo-operators (Barbers, Consultants)',
      features: ['500 Neural Minutes', 'Standard KB Ingest', 'Email Support']
    },
    {
      id: Plans.PROFESSIONAL,
      name: 'Professional',
      price: PERMANENT_TIERS.PROFESSIONAL,
      minutes: 1000,
      description: 'Service Biz (HVAC, Dental, Legal)',
      features: ['1000 Neural Minutes', 'CRM Sync', 'Sentiment Analysis']
    },
    {
      id: Plans.GROWTH,
      name: 'Growth',
      price: PERMANENT_TIERS.GROWTH,
      minutes: 2500,
      description: 'High-Lead (MedSpas, Real Estate)',
      features: ['2500 Neural Minutes', 'Multi-Agent Support', 'Priority API']
    },
    {
      id: Plans.ELITE,
      name: 'Elite',
      price: PERMANENT_TIERS.ELITE,
      minutes: 5000,
      description: 'Enterprise (Clinics, Call Centers)',
      features: ['5000 Neural Minutes', 'Voice Cloning', 'Dedicated Infrastructure']
    }
  ];
};
