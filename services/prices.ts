/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * BASE PRICE CONFIGURATION [cite: 2025-12-28]
 */

export const BASE_PRICES = {
  BASIC: 199,        // [cite: 2025-12-28]
  PROFESSIONAL: 399, // [cite: 2025-12-28]
  GROWTH: 799,       // [cite: 2025-12-28]
  ELITE: 1499,       // [cite: 2025-12-28]
} as const;

/**
 * Ensures the platform serves the customer as a local platform [cite: 2025-12-24]
 */
export const calculateMarketPrice = (tier: keyof typeof BASE_PRICES, multiplier: number) => {
  return Math.round(BASE_PRICES[tier] * multiplier);
};
