// lib/pricing.ts

export type PlanKey = "starter" | "professional" | "growth" | "enterprise";

export type PricingPlan = {
  key: PlanKey;
  name: string;
  priceMonthlyUsd: number;

  includedMinutes: number;
  overagePerMinuteUsd: number;

  description: string;
  featured?: boolean;
  badge?: "MOST POPULAR" | "RECOMMENDED";

  ctaLabel: string;
  ctaHref: string;
};

export const PRICING_META = {
  headline: "Global Node Access",
  subheadline: "Choose the capacity tier that matches your call volume.",
  currency: "USD",
  cadence: "monthly",
} as const;

/**
 * ✅ SOURCE OF TRUTH — Matches production UI
 * https://www.frontdeskagents.com/pricing
 *
 * Starter      $199
 * Professional $399
 * Growth       $799
 * Enterprise   $1499
 */
export const PRICING_PLANS: PricingPlan[] = [
  {
    key: "starter",
    name: "Starter",
    priceMonthlyUsd: 199,
    includedMinutes: 300,
    overagePerMinuteUsd: 0.45,
    description: "Essential autonomous intake for solo operators.",
    ctaLabel: "Activate Node",
    ctaHref: "/signup?plan=starter",
  },
  {
    key: "professional",
    name: "Professional",
    priceMonthlyUsd: 399,
    includedMinutes: 1200,
    overagePerMinuteUsd: 0.40,
    description: "Advanced fleet with priority routing and 50+ languages.",
    featured: true,
    badge: "MOST POPULAR",
    ctaLabel: "Scale Fleet",
    ctaHref: "/signup?plan=professional",
  },
  {
    key: "growth",
    name: "Growth",
    priceMonthlyUsd: 799,
    includedMinutes: 3000,
    overagePerMinuteUsd: 0.35,
    description: "Multi-location cluster with custom voice cloning.",
    ctaLabel: "Establish Cluster",
    ctaHref: "/signup?plan=growth",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    priceMonthlyUsd: 1499,
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
  if (!isPlanKey(value)) {
    throw new Error(`Invalid plan key: ${String(value)}`);
  }
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
