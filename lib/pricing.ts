// lib/pricing.ts
export type PlanKey = "starter" | "professional" | "growth" | "enterprise";

export type PricingPlan = {
  key: PlanKey;
  name: string; // Display name
  priceMonthlyUsd: number;

  // Canonical entitlement model (minutes-based)
  includedMinutes: number;
  overagePerMinuteUsd: number;

  description: string;
  featured?: boolean;

  ctaLabel: string;
  ctaHref: string;

  badge?: "RECOMMENDED";
};

export const PRICING_META = {
  headline: "Global Node Access",
  subheadline: "Choose the capacity tier that matches your call volume.",
  currency: "USD",
  cadence: "monthly",
} as const;

/**
 * ✅ Canonical prices (source of truth):
 * $149 / $499 / $999 / $1999
 */
export const PRICING_PLANS: PricingPlan[] = [
  {
    key: "starter",
    name: "Starter",
    priceMonthlyUsd: 149,
    includedMinutes: 300,
    overagePerMinuteUsd: 0.45,
    description: "Essential autonomous intake for solo operators.",
    ctaLabel: "Activate Node",
    ctaHref: "/signup?plan=starter",
  },
  {
    key: "professional",
    name: "Professional",
    priceMonthlyUsd: 499,
    includedMinutes: 1200,
    overagePerMinuteUsd: 0.40,
    description: "Advanced fleet with priority routing and 50+ languages.",
    featured: true,
    badge: "RECOMMENDED",
    ctaLabel: "Scale Fleet",
    ctaHref: "/signup?plan=professional",
  },
  {
    key: "growth",
    name: "Growth",
    priceMonthlyUsd: 999,
    includedMinutes: 3000,
    overagePerMinuteUsd: 0.35,
    description: "Multi-location cluster with custom voice cloning.",
    ctaLabel: "Establish Cluster",
    ctaHref: "/signup?plan=growth",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    priceMonthlyUsd: 1999,
    includedMinutes: 7000,
    overagePerMinuteUsd: 0.30,
    description: "Infinite scale with performance royalties (Sec. 3).",
    ctaLabel: "Consult Sovereignty",
    ctaHref: "/demo?plan=enterprise",
  },
];

export const PRICING_BY_KEY = Object.freeze(
  Object.fromEntries(PRICING_PLANS.map((p) => [p.key, p])) as Record<
    PlanKey,
    PricingPlan
  >
);

export function isPlanKey(value: unknown): value is PlanKey {
  return (
    value === "starter" ||
    value === "professional" ||
    value === "growth" ||
    value === "enterprise"
  );
}

export function assertPlanKey(value: unknown): asserts value is PlanKey {
  if (!isPlanKey(value)) throw new Error(`Invalid plan key: ${String(value)}`);
}

export function planByKey(key: PlanKey): PricingPlan {
  return PRICING_BY_KEY[key];
}

export function formatUsd(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

export function formatOverage(amount: number) {
  return `$${amount.toFixed(2)}/min`;
}
