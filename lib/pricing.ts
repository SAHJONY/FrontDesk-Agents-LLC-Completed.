// lib/pricing.ts
export type PlanKey = "starter" | "professional" | "growth" | "enterprise";

export type LocationRange = {
  label: string;      // "1 Location", "2–5 Locations", etc.
  min: number;        // inclusive
  max: number | null; // inclusive, null = open ended
};

export type PricingPlan = {
  key: PlanKey;
  name: string;
  priceMonthlyUsd: number;
  locationRange: LocationRange;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  badge?: "MOST POPULAR";
};

export const PRICING_META = {
  headline: "Location-Based Pricing",
  subheadline: "Scaling infrastructure for your entire footprint",
  guarantee: "14-day money-back guarantee • Cancel anytime",
  currency: "USD",
  cadence: "monthly",
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    key: "starter",
    name: "STARTER",
    priceMonthlyUsd: 299,
    locationRange: { label: "1 Location", min: 1, max: 1 },
    features: [
      "24/7 AI Receptionist",
      "Call Summaries & Notes",
      "Natural Language Intake",
      "Standard CRM Basics",
    ],
    ctaLabel: "Start Trial",
    ctaHref: "/signup?plan=starter",
  },
  {
    key: "professional",
    name: "PROFESSIONAL",
    priceMonthlyUsd: 699,
    locationRange: { label: "2–5 Locations", min: 2, max: 5 },
    features: [
      "Multi-staff Scheduling",
      "Voicemail Transcription",
      "Advanced Analytics",
      "TCPA/DNC Support",
    ],
    ctaLabel: "Start Trial",
    ctaHref: "/signup?plan=professional",
    badge: "MOST POPULAR",
  },
  {
    key: "growth",
    name: "GROWTH",
    priceMonthlyUsd: 1299,
    locationRange: { label: "6–15 Locations", min: 6, max: 15 },
    features: [
      "Multi-language Support",
      "CRM Connectors",
      "Audit Logs",
      "99.9% SLA",
    ],
    ctaLabel: "Start Trial",
    ctaHref: "/signup?plan=growth",
  },
  {
    key: "enterprise",
    name: "ENTERPRISE",
    priceMonthlyUsd: 2499,
    locationRange: { label: "16+ Locations", min: 16, max: null },
    features: [
      "White-labeling",
      "SSO (SAML) Integration",
      "Dedicated Tenant",
      "99.99% SLA",
    ],
    ctaLabel: "Schedule Demo",
    ctaHref: "/demo?plan=enterprise",
  },
];

export function formatUsd(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

export function planForLocations(locations: number): PricingPlan {
  const n = Math.max(1, Math.floor(locations));
  const match = PRICING_PLANS.find((p) => {
    const { min, max } = p.locationRange;
    return n >= min && (max === null ? true : n <= max);
  });
  return match ?? PRICING_PLANS[0];
}
