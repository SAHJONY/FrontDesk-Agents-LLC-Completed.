import { Plan } from './plans';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Core Pricing Logic: Permanent Tier Registry
 * Market Strategy: 1.0 Global Parity
 */

export interface PricingPlan {
  id: Plan;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export const PRICING_TIERS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 199,
    description: 'Local platform parity for small operations.',
    features: ['Node Access', 'Standard Telemetry', 'Email Support']
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 399,
    description: 'Enhanced workforce logic for growing teams.',
    features: ['Custom Nodes', 'Live Activity Feed', 'Priority Support']
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 799,
    description: 'Full revenue velocity and advanced scaling.',
    features: ['Global Parity 1.0', 'Dedicated Dashboard', 'Revenue Analytics']
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 1499,
    description: 'High-performance infrastructure for enterprise workforce.',
    features: ['Unlimited Scale', '24/7 Dedicated Ops', 'Master Node Control']
  }
];
