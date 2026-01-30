// lib/stripe-pricing.ts
import { PlanKey } from "@/lib/pricing";

export const STRIPE_PRICE_IDS: Record<PlanKey, string> = {
  starter: "price_fd_starter_199",
  professional: "price_fd_pro_399",
  growth: "price_fd_growth_799",
  enterprise: "price_fd_enterprise_1499",
};

export function getStripePriceId(plan: PlanKey): string {
  const priceId = STRIPE_PRICE_IDS[plan];
  if (!priceId) {
    throw new Error(`Missing Stripe priceId for plan: ${plan}`);
  }
  return priceId;
}
