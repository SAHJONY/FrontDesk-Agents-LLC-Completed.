// config/plans.ts
export enum PlanTier {
  CORE_STATION = 'core-station',
  ENTERPRISE_CLUSTER = 'enterprise-cluster',
  SOVEREIGN_COMMAND = 'sovereign-command'
}

export interface Plan {
  id: PlanTier;
  name: string;
  description: string;
  price: number;
  features: string[];
  stripePriceId?: string;
  appointmentFee?: number;
}

export const PlanData: Plan[] = [
  {
    id: PlanTier.CORE_STATION,
    name: 'Core Station',
    description: 'Establishing a 24/7 Sovereign Presence',
    price: 2500,
    appointmentFee: 10,
    features: [
      '24/7/365 Availability',
      'Single Aegis Silo Deployment',
      'Front-Desk Mirror Intelligence',
      'Neural Qualifier System',
      'Multi-calendar Autonomous Scheduling',
      'Glass Cockpit Command Center',
      'Knowledge Ingestion Included',
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE_MONTHLY || '',
  },
  {
    id: PlanTier.ENTERPRISE_CLUSTER,
    name: 'Enterprise Cluster',
    description: 'Aggressive Revenue Capture & Growth',
    price: 7500,
    appointmentFee: 7,
    features: [
      '24/7/365 Availability',
      'High-Compute Neural Cluster',
      'Forensic Data Vault',
      'Sovereign Closer Agent',
      'Abandoned Intent Recovery',
      'Database Re-Activation System',
      'Command-Level Override',
      'Priority Support (<2 hour)',
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_MONTHLY || '',
  },
  {
    id: PlanTier.SOVEREIGN_COMMAND,
    name: 'Sovereign Command',
    description: 'Total Global Institutional Transformation',
    price: 25000,
    appointmentFee: 0, // Negotiated
    features: [
      'Unlimited Aegis Silo Scaling',
      'Private Server Cluster',
      'Full 20+ Module Catalog',
      'Language Localization Node (50+ languages)',
      'Forensic Auditor Node',
      'Neural Ingestion Bridge',
      'White-Label Capability',
      'Dedicated Account Manager',
      'Custom SLA Terms',
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SOVEREIGN_MONTHLY || '',
  },
];

export const INITIALIZATION_FEE = 1500;
