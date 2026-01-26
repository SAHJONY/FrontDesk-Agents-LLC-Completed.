import Stripe from 'stripe';

/**
 * Stripe configuration for FrontDesk Agents Sovereign Node.
 * This file handles the initialization of the Stripe SDK and exports 
 * shared constants used across the application.
 */

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing from environment variables.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // Using a stable API version to prevent the 'Invalid Version' crash.
  // The 'as any' bypasses strict type-checks for specific date strings if necessary.
  apiVersion: '2024-12-18.acacia' as any,
  appInfo: {
    name: 'FrontDesk Agents Sovereign Node',
    version: '2.1.0',
  },
});

// Webhook secret for validating Stripe webhook signatures from the Stripe Dashboard
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

/**
 * Price IDs for the multi-tier provisioning structure.
 * These must be configured in your Vercel Environment Variables to match
 * the Products/Prices created in your Stripe Dashboard.
 */
export const PRICE_IDS = {
  CORE_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE_MONTHLY || '',
  CORE_ANNUAL: process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE_ANNUAL || '',
  ENTERPRISE_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_MONTHLY || '',
  ENTERPRISE_ANNUAL: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_ANNUAL || '',
  SOVEREIGN_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_SOVEREIGN_MONTHLY || '',
  INITIALIZATION: process.env.NEXT_PUBLIC_STRIPE_PRICE_INITIALIZATION || '',
};

/**
 * Converts decimal amount (e.g., 10.50) to zero-decimal subunits (e.g., 1050 cents).
 */
export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Converts zero-decimal subunits back to standard decimal format.
 */
export function formatAmountFromStripe(amount: number): number {
  return amount / 100;
}

// Export both named and default to ensure compatibility with different import styles
export { stripe };
export default stripe;
