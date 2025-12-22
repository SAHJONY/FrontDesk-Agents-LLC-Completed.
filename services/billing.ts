// services/billing.ts

export const FOUNDERS_PRICING = {
  STARTER: {
    id: 'price_starter_197', 
    amount: 19700,
    minutes: 500,
    commission: 0.05,
    services: ['voice', 'whatsapp', 'sms']
  },
  GROWTH: {
    id: 'price_growth_497',
    amount: 49700,
    minutes: 1000,
    commission: 0.03,
    services: ['voice', 'whatsapp', 'sms', 'sdr', 'scheduler', 'nurture']
  },
  SCALE: {
    id: 'price_scale_997',
    amount: 99700,
    minutes: 1500,
    commission: 0.00,
    services: ['all_15_services']
  }
};

// This is what the Webhook route (app/api/v1/webhooks/route.ts) is looking for
export const billingService = {
  validateSubscription: async (priceId: string) => {
    const activePrices = Object.values(FOUNDERS_PRICING).map(p => p.id);
    if (!activePrices.includes(priceId)) {
      throw new Error("LEGACY PRICE DETECTED: Plan no longer active.");
    }
    return true;
  },

  handleWebhook: async (event: any) => {
    // This satisfies the "missing export" error in your logs
    console.log("Neural Billing: Event received", event.type);
    return { received: true };
  }
};
