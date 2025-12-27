import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing from environment variables.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  appInfo: {
    name: 'FrontDesk Agents Sovereign Node',
    version: '2.1.0',
  },
});

// Webhook secret for validating Stripe webhook signatures
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

// Price IDs for new provisioning structure
export const PRICE_IDS = {
  CORE_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE_MONTHLY || '',
  CORE_ANNUAL: process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE_ANNUAL || '',
  ENTERPRISE_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_MONTHLY || '',
  ENTERPRISE_ANNUAL: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_ANNUAL || '',
  SOVEREIGN_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_SOVEREIGN_MONTHLY || '',
  INITIALIZATION: process.env.NEXT_PUBLIC_STRIPE_PRICE_INITIALIZATION || '',
};

// Helper functions
export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100);
}

export function formatAmountFromStripe(amount: number): number {
  return amount / 100;
}

// Export both default and named for maximum compatibility
export { stripe };
export default stripe;
