// services/billing.ts

export const FOUNDERS_PRICING = {
  STARTER: {
    id: 'price_starter_197', // Replace with your actual Stripe Price ID
    amount: 19700,
    commission: 0.05,
    services: ['voice', 'whatsapp', 'sms']
  },
  GROWTH: {
    id: 'price_growth_497',
    amount: 49700,
    commission: 0.03,
    services: ['voice', 'whatsapp', 'sms', 'sdr', 'scheduler', 'nurture']
  },
  SCALE: {
    id: 'price_scale_997',
    amount: 99700,
    commission: 0.00,
    services: ['all_15_services'] // Full Empire access
  }
};

/**
 * Validates that the transaction matches the new "Founder's 50" prices.
 * This effectively cancels and ignores any legacy pricing data.
 */
export async function validateSubscription(priceId: string) {
  const activePrices = Object.values(FOUNDERS_PRICING).map(p => p.id);
  
  if (!activePrices.includes(priceId)) {
    throw new Error("LEGACY PRICE DETECTED: This pricing plan is no longer active.");
  }
  
  return true;
}
