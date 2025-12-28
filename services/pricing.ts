import { Plans } from './plans';

export interface PricingPlan {
  id: Plans;
  name: string;
  price: number;
  minutes: number;
  description: string;
  features: string[];
}

// Regional Multipliers: Every market is served as a local platform
const multipliers: Record<string, number> = {
  WESTERN: 1.0,  // US, UK, EU, CA
  MEDIUM: 0.65,  // TR, BR, MX
  GROWTH: 0.35,  // VN, IN, PH, ID
};

export const getAdjustedPricing = (region: string = 'WESTERN'): PricingPlan[] => {
  const m = multipliers[region] || 1;

  return [
    {
      id: Plans.BASIC,
      name: 'Basic',
      price: Math.round(199 * m),
      minutes: 500,
      description: 'Solo-operators (Barbers, Consultants)',
      features: ['500 Neural Minutes', 'Standard KB Ingest', 'Email Support']
    },
    {
      id: Plans.PROFESSIONAL,
      name: 'Professional',
      price: Math.round(399 * m),
      minutes: 1000,
      description: 'Service Biz (HVAC, Dental, Legal)',
      features: ['1000 Neural Minutes', 'CRM Sync', 'Sentiment Analysis']
    },
    {
      id: Plans.GROWTH,
      name: 'Growth',
      price: Math.round(799 * m),
      minutes: 2500,
      description: 'High-Lead (MedSpas, Real Estate)',
      features: ['2500 Neural Minutes', 'Multi-Agent Support', 'Priority API']
    },
    {
      id: Plans.ELITE,
      name: 'Elite',
      price: Math.round(1499 * m),
      minutes: 5000,
      description: 'Enterprise (Clinics, Call Centers)',
      features: ['5000 Neural Minutes', 'Voice Cloning', 'Dedicated Infrastructure']
    }
  ];
};
