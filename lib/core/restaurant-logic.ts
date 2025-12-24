export const getRestaurantContext = () => {
  return {
    critical_triggers: ['refrigeration-failure', 'grease-trap-overflow', 'hood-vent-malfunction'],
    revenue_impact_high: true, // A kitchen closure costs $5k - $20k per night
    ai_dispatch_priority: 'IMMEDIATE',
    upsell_logic: {
      'emergency-hvac': 350.00, // Premium emergency lead fee
      'preventative-maintenance': 150.00, // Monthly recurring lead
    }
  };
};
