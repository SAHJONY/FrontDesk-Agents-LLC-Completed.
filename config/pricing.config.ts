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
    name: 'Starter',
    price: 299,
    description: 'Perfect for small businesses and single locations.',
    features: ['24/7 AI Receptionist', 'Natural-language intake', 'Call summaries + notes', 'Multi-language support (English/Spanish)']
  },
  {
    id: 'professional' as unknown as Plan,
    name: 'Professional',
    price: 699,
    description: 'Complete AI workforce for 2-5 locations.',
    features: ['Advanced Call Routing', '50+ Languages', 'Stripe Billing Integration', 'Priority Support (24/7)']
  },
  {
    id: 'growth' as unknown as Plan,
    name: 'Growth',
    price: 1299,
    description: 'Advanced AI workforce for 6-15 locations.',
    features: ['Enterprise Dashboards', '100+ Languages', 'Full CRM Integrations', 'Dedicated Account Manager']
  },
  {
    id: 'elite' as unknown as Plan,
    name: 'Enterprise',
    price: 2499,
    description: 'Unlimited AI workforce for 16+ locations.',
    features: ['Unlimited Scale', 'Custom Integrations', 'SOC 2-aligned Security', 'Dedicated Success Manager']
  }
];
