// lib/billing/regional-pricing.ts
	import { REGIONAL_MULTIPLIERS } from '@/services/pricing';

/**
 * MOTOR DE PRECIOS REGIONALES
 * Calcula el costo final basado en los tiers permanentes:
 * $199, $399, $799, $1,499 [cite: 2025-12-28]
 */
export function calculateRegionalPrice(
  basePrice: number,
  region: keyof typeof REGIONAL_MULTIPLIERS
): number {
  // Busca el multiplicador; si la región no existe, aplica 1.0 por defecto
	  const multiplier = REGIONAL_MULTIPLIERS[region]?.multiplier || 1.0;
  
  const finalPrice = basePrice * multiplier;
  
  console.log(`Cálculo completado: Base ${basePrice} * Multiplicador ${multiplier} = ${finalPrice}`);
  
  return finalPrice;
}
