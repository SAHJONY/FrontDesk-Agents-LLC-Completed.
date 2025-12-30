/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Regional Multiplier Engine: Purchasing Power Parity (PPP) Logic
 */

import { REGIONAL_MULTIPLIERS, RegionalPricing } from '@/types/billing';

/**
 * THE SOVEREIGN PRICING CONSTANTS [cite: 2025-12-28]
 */
const BASE_TIERS = {
  basic: 199,
  professional: 399,
  growth: 799,
  elite: 1499,
};

/**
 * CALCULATE TIER PRICING
 * Injects PPP multipliers into the base tier structure.
 */
export function getTierPricingForMarket(countryCode: string) {
  const market = REGIONAL_MULTIPLIERS[countryCode.toUpperCase()] || REGIONAL_MULTIPLIERS.US;
  
  return Object.entries(BASE_TIERS).map(([tier, price]) => {
    const regionalPrice = price * market.multiplier;
    
    return {
      tier,
      baseUSD: price,
      marketPrice: regionalPrice,
      currency: market.currencyCode,
      formatted: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: market.currencyCode,
      }).format(regionalPrice)
    };
  });
}

/**
 * REAL-TIME REVENUE CONVERSION
 * Used for the 15% Success Fee calculation in local currencies.
 */
export async function convertRecoveryToLocal(
  amountUSD: number, 
  targetCurrency: string
): Promise<number> {
  if (targetCurrency === 'USD') return amountUSD;

  try {
    const response = await fetch(`${process.env.EXCHANGE_RATE_BASE_URL}/USD`);
    const data = await response.json();
    const rate = data.rates[targetCurrency] || 1;
    
    return amountUSD * rate;
  } catch (error) {
    console.error('[FX_ERROR] Falling back to 1:1 rate', error);
    return amountUSD;
  }
}
