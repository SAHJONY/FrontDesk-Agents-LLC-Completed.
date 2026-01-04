/**
 * CONFIGURACIÓN DE FACTURACIÓN GLOBAL
 * Define los multiplicadores por región y los tiers de precios permanentes.
 */

export const REGIONAL_MULTIPLIERS = {
  US: 1.0,
  EU: 1.0,
  LATAM: 0.8,
  ASIA: 0.9,
  AFRICA: 0.7
} as const;

export type RegionalPricing = keyof typeof REGIONAL_MULTIPLIERS;

/**
 * TIERS DE PRECIOS PERMANENTES [cite: 2025-12-28]
 * Estos valores son constantes en toda la plataforma.
 */
export const PLATFORM_TIERS = {
  BASIC: 199,
  PROFESSIONAL: 399,
  GROWTH: 799,
  ELITE: 1499
} as const;
