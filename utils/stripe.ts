// utils/stripe.ts
import Stripe from 'stripe';

// Initialize Stripe with your secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

/**
 * Pricing Plans Configuration
 */
export const PRICING_PLANS = {
  starter: {
    name: 'Starter',
    priceId: process.env.STRIPE_PRICE_STARTER || 'price_starter',
    price: 297,
    features: [
      'AI Voice Receptionist (300 min/month)',
      'Live Chat Web Widget',
      'Proactive SMS Agent (500 SMS/month)',
      'Instant Lead Qualifier',
      'Meeting Scheduler',
      'Real-time Sentiment Monitor',
    ],
  },
  growth: {
    name: 'Growth',
    priceId: process.env.STRIPE_PRICE_GROWTH || 'price_growth',
    price: 697,
    features: [
      'Everything in Starter',
      'WhatsApp Business Concierge',
      'Autonomous Email Assistant',
      'AI SDR (Outbound Prospecting)',
      'Lead Nurturing Sequence',
      'AI Quality Analyst',
      'Collections & Billing Agent',
    ],
  },
  scale: {
    name: 'Scale',
    priceId: process.env.STRIPE_PRICE_SCALE || 'price_scale',
    price: 1497,
    features: [
      'Everything in Growth',
      'All 15 AI Services Unlocked',
      'Revenue Attribution Tracker',
      'KYC & Security Gatekeeper',
      'Global Kill-Switch',
      'Priority Support',
      'White-label Options',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    priceId: process.env.STRIPE_PRICE_ENTERPRISE || 'price_enterprise',
    price: 3997,
    features: [
      'Everything in Scale',
      'Custom AI Training',
      'Dedicated Infrastructure',
      '99.99% Uptime SLA',
      '24/7 Phone Support',
      'Multi-tenant Management',
      'Custom Integrations',
    ],
  },
} as const;

export type PricingPlan = keyof typeof PRICING_PLANS;

/**
 * Create a Stripe checkout session
 */
export async function createCheckoutSession(
  priceId: string,
  customerId?: string,
  successUrl?: string,
  cancelUrl?: string
): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    customer_email: !customerId ? undefined : undefined, // Email will be prefilled if customer exists
  });

  return session;
}

/**
 * Create a Stripe customer portal session
 */
export async function createCustomerPortalSession(
  customerId: string,
  returnUrl?: string
): Promise<Stripe.BillingPortal.Session> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });

  return session;
}

/**
 * Get subscription by ID
 */
export async function getSubscription(subscriptionId: string): Promise<Stripe.Subscription | null> {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    return null;
  }
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.cancel(subscriptionId);
  return subscription;
}

/**
 * Update subscription
 */
export async function updateSubscription(
  subscriptionId: string,
  priceId: string
): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: priceId,
      },
    ],
    proration_behavior: 'always_invoice',
  });

  return updatedSubscription;
}

/**
 * Create a Stripe customer
 */
export async function createCustomer(
  email: string,
  name?: string,
  metadata?: Record<string, string>
): Promise<Stripe.Customer> {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata,
  });

  return customer;
}

/**
 * Get customer by ID
 */
export async function getCustomer(customerId: string): Promise<Stripe.Customer | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return customer as Stripe.Customer;
  } catch (error) {
    console.error('Error retrieving customer:', error);
    return null;
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
  secret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, secret);
}

/**
 * Get price details
 */
export async function getPrice(priceId: string): Promise<Stripe.Price | null> {
  try {
    const price = await stripe.prices.retrieve(priceId);
    return price;
  } catch (error) {
    console.error('Error retrieving price:', error);
    return null;
  }
}

export default stripe;
