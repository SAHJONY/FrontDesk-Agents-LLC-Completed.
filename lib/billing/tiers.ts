export const SUBSCRIPTION_TIERS = {
  BASIC: {
    price: 199,
    minutes: 500,
    features: ['basic_booking', 'email_alerts']
  },
  PROFESSIONAL: {
    price: 399,
    minutes: 1000,
    features: ['sentiment_analysis', 'crm_integration', 'sms_pivot']
  },
  GROWTH: {
    price: 799,
    minutes: 2500,
    features: ['multi_agent', 'custom_knowledge_base', 'priority_support']
  },
  ELITE: {
    price: 1499,
    minutes: 5000,
    features: ['voice_cloning', 'dedicated_infra', 'advanced_analytics']
  }
};
