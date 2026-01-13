/**
 * Multi-Location Pricing System
 * Handles volume discounts for businesses with multiple locations
 */

export interface Location {
  id: string;
  name: string;
  plan: 'basic' | 'professional' | 'growth' | 'elite';
  basePrice: number;
  active: boolean;
}

export interface MultiLocationAccount {
  accountId: string;
  accountName: string;
  locations: Location[];
  totalLocations: number;
  discountTier: number;
  totalMonthlyPrice: number;
  monthlySavings: number;
}

/**
 * Volume discount tiers based on number of locations
 */
export const VOLUME_DISCOUNTS = {
  1: 0,      // 1 location: 0% discount
  2: 0.10,   // 2-5 locations: 10% discount
  6: 0.15,   // 6-10 locations: 15% discount
  11: 0.20,  // 11-25 locations: 20% discount
  26: 0.25,  // 26+ locations: 25% discount (or custom pricing)
} as const;

/**
 * Get discount percentage based on number of locations
 */
export function getVolumeDiscount(locationCount: number): number {
  if (locationCount === 1) return 0;
  if (locationCount >= 2 && locationCount <= 5) return 0.10;
  if (locationCount >= 6 && locationCount <= 10) return 0.15;
  if (locationCount >= 11 && locationCount <= 25) return 0.20;
  if (locationCount >= 26) return 0.25; // or trigger custom pricing
  return 0;
}

/**
 * Calculate total monthly price for multi-location account
 */
export function calculateMultiLocationPricing(locations: Location[]): {
  baseTotal: number;
  discount: number;
  discountAmount: number;
  finalTotal: number;
  savings: number;
} {
  // Filter only active locations
  const activeLocations = locations.filter(loc => loc.active);
  const locationCount = activeLocations.length;

  // Calculate base total (sum of all location prices)
  const baseTotal = activeLocations.reduce((sum, loc) => sum + loc.basePrice, 0);

  // Get discount percentage
  const discount = getVolumeDiscount(locationCount);

  // Calculate discount amount
  const discountAmount = baseTotal * discount;

  // Calculate final total
  const finalTotal = baseTotal - discountAmount;

  return {
    baseTotal,
    discount,
    discountAmount,
    finalTotal,
    savings: discountAmount,
  };
}

/**
 * Get discount tier description
 */
export function getDiscountTierDescription(locationCount: number): string {
  if (locationCount === 1) return 'Single Location - No Discount';
  if (locationCount >= 2 && locationCount <= 5) return '2-5 Locations - 10% Discount';
  if (locationCount >= 6 && locationCount <= 10) return '6-10 Locations - 15% Discount';
  if (locationCount >= 11 && locationCount <= 25) return '11-25 Locations - 20% Discount';
  if (locationCount >= 26) return '26+ Locations - Custom Pricing';
  return 'Unknown';
}

/**
 * Generate multi-location account summary
 */
export function generateAccountSummary(
  accountId: string,
  accountName: string,
  locations: Location[]
): MultiLocationAccount {
  const activeLocations = locations.filter(loc => loc.active);
  const pricing = calculateMultiLocationPricing(locations);

  return {
    accountId,
    accountName,
    locations: activeLocations,
    totalLocations: activeLocations.length,
    discountTier: getVolumeDiscount(activeLocations.length),
    totalMonthlyPrice: pricing.finalTotal,
    monthlySavings: pricing.savings,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Example usage and test cases
 */
export function exampleUsage() {
  // Example 1: Small restaurant chain (3 locations)
  const restaurantLocations: Location[] = [
    { id: 'loc1', name: 'Downtown Location', plan: 'professional', basePrice: 699, active: true },
    { id: 'loc2', name: 'Uptown Location', plan: 'professional', basePrice: 699, active: true },
    { id: 'loc3', name: 'Suburban Location', plan: 'basic', basePrice: 299, active: true },
  ];

  const restaurantPricing = calculateMultiLocationPricing(restaurantLocations);
  console.log('Restaurant Chain (3 locations):');
  console.log(`Base Total: ${formatCurrency(restaurantPricing.baseTotal)}`);
  console.log(`Discount: ${restaurantPricing.discount * 100}%`);
  console.log(`Final Total: ${formatCurrency(restaurantPricing.finalTotal)}`);
  console.log(`Monthly Savings: ${formatCurrency(restaurantPricing.savings)}`);
  console.log('---');

  // Example 2: Medical group (8 locations)
  const medicalLocations: Location[] = Array.from({ length: 8 }, (_, i) => ({
    id: `loc${i + 1}`,
    name: `Clinic ${i + 1}`,
    plan: 'growth',
    basePrice: 1299,
    active: true,
  }));

  const medicalPricing = calculateMultiLocationPricing(medicalLocations);
  console.log('Medical Group (8 locations):');
  console.log(`Base Total: ${formatCurrency(medicalPricing.baseTotal)}`);
  console.log(`Discount: ${medicalPricing.discount * 100}%`);
  console.log(`Final Total: ${formatCurrency(medicalPricing.finalTotal)}`);
  console.log(`Monthly Savings: ${formatCurrency(medicalPricing.savings)}`);
  console.log('---');

  // Example 3: Enterprise (15 locations)
  const enterpriseLocations: Location[] = Array.from({ length: 15 }, (_, i) => ({
    id: `loc${i + 1}`,
    name: `Office ${i + 1}`,
    plan: 'elite',
    basePrice: 2499,
    active: true,
  }));

  const enterprisePricing = calculateMultiLocationPricing(enterpriseLocations);
  console.log('Enterprise (15 locations):');
  console.log(`Base Total: ${formatCurrency(enterprisePricing.baseTotal)}`);
  console.log(`Discount: ${enterprisePricing.discount * 100}%`);
  console.log(`Final Total: ${formatCurrency(enterprisePricing.finalTotal)}`);
  console.log(`Monthly Savings: ${formatCurrency(enterprisePricing.savings)}`);
}
