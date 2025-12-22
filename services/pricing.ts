import { Plans } from './plans';

export interface PricingPlan {
  id: Plans;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  securityLevel: 'STANDARD' | 'HIPAA' | 'MAXIMUM';
  successFees: {
    appointment: number;
    recoveryPercent: number;
  };
}

// Global region-based multipliers to dominate emerging markets
const multipliers: Record<string, number> = {
  WESTERN: 1.0,    // US, EU, UK, CA (Premium)
  MEDIUM: 0.6,     // TR, BR, MX (Market Penetration)
  GROWTH: 0.35,    // VN, IN, PH, ID (High Volume)
};

/**
 * GET ADJUSTED PRICING
 * Dynamically scales the subscription while maintaining 
 * the ROI-driven success fees for the AI CEO.
 */
export const getAdjustedPricing = (region: string = 'WESTERN'): PricingPlan[] => {
  const multiplier = multipliers[region] || 1;

  return [
    {
      id: Plans.STARTER,
      name: 'Starter (Growth)',
      description: 'Solo operators & small teams',
      price: Math.round(399 * multiplier),
      currency: 'USD',
      features: ['5 Workforce Agents', 'Guardian Standard', 'Weekly ROI Reports'],
      securityLevel: 'STANDARD',
      successFees: {
        appointment: 10,
        recoveryPercent: 0.05
      }
    },
    {
      id: Plans.PROFESSIONAL,
      name: 'Professional (Medical/Legal)',
      description: 'Growing businesses requiring HIPAA & Failover',
      price: Math.round(899 * multiplier),
      currency: 'USD',
      features: ['10 Workforce Agents', 'Guardian HIPAA', 'Medic Self-Healing', 'Live Dashboard'],
      securityLevel: 'HIPAA',
      successFees: {
        appointment: 15,
        recoveryPercent: 0.10
      }
    },
    {
      id: Plans.ENTERPRISE,
      name: 'Enterprise (Sovereign)',
      description: 'High-volume custom workflows & maximum security',
      price: Math.round(1799 * multiplier),
      currency: 'USD',
      features: ['All 15 Agents', 'Guardian Maximum', 'Medic Zero-Downtime', 'Dedicated RL Brain'],
      securityLevel: 'MAXIMUM',
      successFees: {
        appointment: 25,
        recoveryPercent: 0.15
      }
    },
  ];
};
