import { Plans } from './plans';

export interface PricingPlan {
  id: Plans;
  name: string;
  description: string;
  price: number;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: Plans.STARTER,
    name: 'Starter',
    description: 'Solo operators & small teams',
    price: 399,
  },
  {
    id: Plans.PROFESSIONAL,
    name: 'Professional',
    description: 'Growing businesses',
    price: 899,
  },
  {
    id: Plans.ENTERPRISE,
    name: 'Enterprise',
    description: 'High-volume & custom workflows',
    price: 1799,
  },
];
