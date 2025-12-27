export enum PlanTier {
  SATELLITE = 'satellite',
  ORBITAL = 'orbital',
  SOVEREIGN = 'sovereign'
}

export const PlanData = [
  {
    id: PlanTier.SATELLITE,
    name: "Satellite Node",
    price: "499",
    appointmentFee: "15",
    description: "For emerging firms requiring 24/7 autonomous front-desk presence.",
    features: [
      "2 Concurrent Voice Paths",
      "Standard Knowledge Sync",
      "Governance Kill-Switch",
      "Data Export Guarantee"
    ],
    stripePriceId: "price_satellite_123"
  },
  {
    id: PlanTier.ORBITAL,
    name: "Orbital Command",
    price: "1499",
    appointmentFee: "10",
    description: "High-yield infrastructure for established medical and legal practices.",
    features: [
      "10 Concurrent Voice Paths",
      "Deep-Mesh Asset Ingestion",
      "Human-in-the-Loop Thresholds",
      "Sovereign Memory Silos (No Cross-Learning)"
    ],
    stripePriceId: "price_orbital_456"
  },
  {
    id: PlanTier.SOVEREIGN,
    name: "Sovereign Enterprise",
    price: "4999",
    appointmentFee: "5",
    description: "Custom neural infrastructure for multi-location institutional operations.",
    features: [
      "Unlimited Voice Synthesis",
      "Custom Protocol Development",
      "Full Forensic API Access",
      "Economic Risk-Share (SLA Backed)"
    ],
    stripePriceId: "price_sovereign_789"
  }
];
