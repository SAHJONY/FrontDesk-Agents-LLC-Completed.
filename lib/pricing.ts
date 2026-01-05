export const BASE_PRICES = {
  basic: 199,
  professional: 399,
  growth: 799,
  elite: 1499
};

export function calculateRegionalPrice(tier: keyof typeof BASE_PRICES, multiplier: number) {
  const price = BASE_PRICES[tier] * multiplier;
  return Math.round(price * 100) / 100; // Returns localized price
}

export const MULTIPLIERS: Record<string, number> = {
  US: 1.00, CA: 1.00, GB: 1.00,
  MX: 0.65, BR: 0.65, PL: 0.65,
  IN: 0.35, PH: 0.35, NG: 0.35
};
