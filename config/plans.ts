/**
 * SOVEREIGN PLAN ENUMERATION
 * Used for routing, database flags, and logic checks.
 */
export enum PlanTier {
  STARTER = 'starter',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
}

export interface Plan {
  id: PlanTier; // Linked to the Enum
  name: string;
  description: string;
  price: number;
  appointmentFee: number;
  features: string[];
  cta: string;
  highlight?: boolean;
}

export const PlanData: Plan[] = [
  {
    id: PlanTier.STARTER,
    name: 'Starter Node',
    description: 'Entry-level AI receptionist for low-volume single clinics.',
    price: 499,
    appointmentFee: 20,
    features: [
      'Single SARA.AI Voice Agent',
      'Basic Website Knowledge Scrape',
      'Email Lead Notifications',
      'Standard Security Shield'
    ],
    cta: 'Initialize Starter',
  },
  {
    id: PlanTier.PROFESSIONAL,
    name: 'Professional',
    description: 'High-fidelity intelligence for growing healthcare practices.',
    price: 899,
    appointmentFee: 15,
    highlight: true,
    features: [
      'Multi-Dialect Voice Agents',
      'Deep-Mesh Knowledge Base',
      'SMS & Appointment Booking',
      'Aegis Shield v2.5 Encryption',
      'Priority Neural Processing'
    ],
    cta: 'Deploy Infrastructure',
  },
  {
    id: PlanTier.ENTERPRISE,
    name: 'Enterprise Mesh',
    description: 'Global-scale infrastructure for multi-location groups.',
    price: 2499,
    appointmentFee: 10,
    features: [
      'Infinite Market Scaling',
      'Custom Voice Persona Synthesis',
      'Dedicated Sovereign Node',
      '24/7 Forensic Audit Logs',
      'Custom API Webhooks'
    ],
    cta: 'Contact Command',
  }
];
