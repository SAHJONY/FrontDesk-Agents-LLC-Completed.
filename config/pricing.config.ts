import { Plan } from './plans';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Core Pricing Logic: Permanent Tier Registry
 * Logic: 1.0 Global Parity
 * Deployment: Final Strict Build Override
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
    id: 'basic' as unknown as Plan,
    name: 'Basic',
    price: 299,
    description: 'Local platform parity for small operations.',
    features: ['Node Access', 'Standard Telemetry', 'Email Support', 'Global Parity 1.0']
  },
  {
    id: 'professional' as unknown as Plan,
    name: 'Professional',
    price: 699,
    description: 'Enhanced workforce logic for growing teams.',
    features: ['Custom Nodes', 'Live Activity Feed', 'Priority Support']
  },
  {
    id: 'growth' as unknown as Plan,
    name: 'Growth',
    price: 1299,
    description: 'Full revenue velocity and advanced scaling.',
    features: ['Revenue Analytics', 'Dedicated Dashboard', 'Multi-Market Integration']
  },
  {
    id: 'elite' as unknown as Plan,
    name: 'Elite',
    price: 2499,
    description: 'High-performance infrastructure for enterprise workforce.',
    features: ['Unlimited Scale', '24/7 Dedicated Ops', 'Master Node Control']
  }
];
