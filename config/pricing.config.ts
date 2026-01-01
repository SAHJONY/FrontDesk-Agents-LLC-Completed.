import { Plan } from './plans';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Core Pricing Logic: Permanent Tier Registry
 * Market Strategy: 1.0 Global Parity
 * Deployment Node: pdx1 (Portland)
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
    id: 'basic' as Plan,
    name: 'Basic',
    price: 199,
    description: 'Local platform parity for small operations.',
    features: [
      'Standard Node Access',
      'Basic Telemetry',
      'Email Support',
      'Global Parity 1.0'
    ]
  },
  {
    id: 'professional' as Plan,
    name: 'Professional',
    price: 399,
    description: 'Enhanced workforce logic for growing teams.',
    features: [
      'Custom Node Configuration',
      'Live Activity Feed',
      'Priority Support',
      'Advanced Reporting'
    ]
  },
  {
    id: 'growth' as Plan,
    name: 'Growth',
    price: 799,
    description: 'Full revenue velocity and advanced scaling.',
    features: [
      'Revenue Analytics Suite',
      'Dedicated Dashboard',
      'Multi-Market Integration',
      'Direct Node Control'
    ]
  },
  {
    id: 'elite' as Plan,
    name: 'Elite',
    price: 1499,
    description: 'High-performance infrastructure for enterprise workforce.',
    features: [
      'Unlimited Market Scale',
      '24/7 Dedicated Operations',
      'Master Node Control',
      'Custom API Endpoints'
    ]
  }
];
