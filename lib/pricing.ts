// lib/pricing.ts
export type PlanKey = "basic" | "professional" | "growth" | "elite";

export const REGION_MULTIPLIERS = {
  western: 1.0,
  emerging: 0.65,
  growth: 0.35,
} as const;

export const PLANS: Record<PlanKey, { name: string; baseMonthlyUSD: number; minutes: string; agents: string; bullets: string[] }> = {
  basic: {
    name: "Basic Workforce",
    baseMonthlyUSD: 399, // TODO: confirm
    minutes: "500 Minutes",
    agents: "1 AI Agent",
    bullets: ["CRM Sync"],
  },
  professional: {
    name: "Professional Workforce",
    baseMonthlyUSD: 899, // TODO: confirm
    minutes: "1,500 Minutes",
    agents: "3 AI Agents",
    bullets: ["Lead Gen"],
  },
  growth: {
    name: "Growth Workforce",
    baseMonthlyUSD: 1799, // TODO: confirm
    minutes: "4,000 Minutes",
    agents: "10 AI Agents",
    bullets: ["Payments"],
  },
  elite: {
    name: "Elite Workforce",
    baseMonthlyUSD: 2799, // TODO: confirm
    minutes: "Unlimited Minutes",
    agents: "Unlimited Fleet",
    bullets: ["Success Logic"],
  },
};

export function safePriceUSD(baseUSD: number, multiplier: number) {
  const m = Number.isFinite(multiplier) ? multiplier : 1.0;
  const b = Number.isFinite(baseUSD) ? baseUSD : 0;
  const value = b * m;
  return Number.isFinite(value) && value > 0 ? value : null;
}

export function formatUSD(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}
