// lib/billing/regional-pricing.ts
import { REGIONAL_MULTIPLIERS } from '@/types/billing';

/**
 * CONSTANTES DE PRECIOS GLOBALES [cite: 2025-12-28]
 * Los precios base son permanentes:
 * Basic: $199 | Professional: $399 | Growth: $799 | Elite: $1,499
 */

export function calculateRegionalPrice(
  basePrice: number,
  region: keyof typeof REGIONAL_MULTIPLIERS
) {
  const multiplier = REGIONAL_MULTIPLIERS[region] || 1;
  return basePrice * multiplier;
}
