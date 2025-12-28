import { Plans } from './plans';

export interface PricingPlan {
  id: Plans;
  name: string;
  description: string;
  price: number;
  minutes: number;
  currency: string;
  features: string[];
  securityLevel: 'STANDARD' | 'HIPAA' | 'MAXIMUM';
  successFees: {
    appointment: number;
    recoveryPercent: number;
  };
}

// Global region-based multipliers to dominate emerging markets
// WESTERN is the anchor for your permanent platform prices
const multipliers: Record<string, number> = {
  WESTERN: 1.0,    // Permanent Base Pricing
  MEDIUM: 0.6,     // Market Penetration (e.g., BR, MX)
  GROWTH: 0.35,    // High Volume (e.g., VN, IN, PH)
};

/**
 * GET ADJUSTED PRICING
 * Dynamically scales the 4 permanent tiers based on the local market.
 */
export const getAdjustedPricing = (region: string = 'WESTERN'): PricingPlan[] => {
  const multiplier = multipliers[region] || 1;

  return [
    {
      id: Plans.BASIC,
      name: 'Basic (Solopreneur)',
      description: 'Solo operators, Barbers & Consultants',
      price: Math.round(199 * multiplier),
      minutes: 500,
      currency: 'USD',
      features: ['500 Neural Minutes', 'Basic Scheduling', 'Guardian Standard'],
      securityLevel: 'STANDARD',
      successFees: { appointment: 5, recoveryPercent: 0.03 }
    },
    {
      id: Plans.PROFESSIONAL,
      name: 'Professional (Service Biz)',
      description: 'HVAC, Dental, Legal & Growing Teams',
      price: Math.round(399 * multiplier),
      minutes: 1000,
      currency: 'USD',
      features: ['1,000 Neural Minutes', 'Sentiment Analysis', 'CRM Sync', 'Guardian HIPAA'],
      securityLevel: 'HIPAA',
      successFees: { appointment: 10, recoveryPercent: 0.05 }
    },
    {
      id: Plans.GROWTH,
      name: 'Growth (Agency)',
      description: 'High-lead businesses & MedSpas',
      price: Math.round(799 * multiplier),
      minutes: 2500,
      currency: 'USD',
      features: ['2,500 Neural Minutes', 'Multi-Agent Support', 'Custom KB Ingest'],
      securityLevel: 'HIPAA',
      successFees: { appointment: 15, recoveryPercent: 0.07 }
    },
    {
      id: Plans.ELITE,
      name: 'Elite (Sovereign)',
      description: 'Enterprises, Clinics & Call Centers',
      price: Math.round(1499 * multiplier),
      minutes: 5000,
      currency: 'USD',
      features: ['5,000 Neural Minutes', 'Voice Cloning', 'Guardian Maximum', 'Dedicated Brain'],
      securityLevel: 'MAXIMUM',
      successFees: { appointment: 25, recoveryPercent: 0.10 }
    },
  ];
};
