/**
 * SOVEREIGN GLOBAL FINANCIAL HUB - CORE PRICING SERVICE
 * Handles permanent tiers, regional multipliers, and success fee calculations.
 */

export const REGIONAL_MULTIPLIERS = {
  WESTERN: 1.0,
  EMERGING: 0.65,
  GROWTH: 0.35,
} as const;

export type MarketRegion = keyof typeof REGIONAL_MULTIPLIERS;

export const PERMANENT_TIERS = {
  BASIC: { usd: 199, minutes: 500 },
  PROFESSIONAL: { usd: 399, minutes: 1500 },
  GROWTH: { usd: 799, minutes: 4000 },
  ELITE: { usd: 1499, minutes: 'Unlimited' },
} as const;

/**
 * Calculates the local price based on the permanent USD tier and market region.
 */
export function calculateMarketPrice(tier: keyof typeof PERMANENT_TIERS, region: MarketRegion): number {
  const basePrice = PERMANENT_TIERS[tier].usd;
  const multiplier = REGIONAL_MULTIPLIERS[region];
  
  // Returns rounded local price to maintain "Local Platform" feel
  return Math.round(basePrice * multiplier);
}

/**
 * Calculates additional revenue from success fees (Elite Tier Logic).
 */
export function calculateSuccessFees(appointments: number, recoveryRevenue: number): number {
  const APPOINTMENT_FEE = 5.00; // $5 per booking
  const RECOVERY_RATE = 0.05;  // 5% on recovered leads
  
  const bookingFees = appointments * APPOINTMENT_FEE;
  const recoveryFees = recoveryRevenue * RECOVERY_RATE;
  
  return bookingFees + recoveryFees;
}

/**
 * Validates if a fleet is exceeding its tier-based minute limits.
 */
export function isOverLimit(tier: keyof typeof PERMANENT_TIERS, minutesUsed: number): boolean {
  const limit = PERMANENT_TIERS[tier].minutes;
  if (limit === 'Unlimited') return false;
  return minutesUsed > (limit as number);
}
