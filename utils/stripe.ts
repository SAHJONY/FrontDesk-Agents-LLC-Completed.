// utils/stripe.ts
import Stripe from 'stripe';

// Initialize Stripe with your secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
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
      'AI Voice Receptionist (1000 min/month)',
      'Live Chat Web Widget',
      'Proactive SMS Agent (500 SMS/month)',
      'Instant Lead Qualifier',
      'Meeting Scheduler',
      'Real-time Sentiment Monitor',
      '2 user seats',
      '30-day data retention',
    ],
  },
  growth: {
    name: 'Growth',
    priceId: process.env.STRIPE_PRICE_GROWTH || 'price_growth',
    price: 697,
    features: [
      'Everything in Starter',
      'AI Voice Receptionist (3000 min/month)',
      'Unlimited SMS messages',
      'Unlimited chat conversations',
      'WhatsApp Business Concierge',
      'Autonomous Email Assistant',
      'AI SDR (Outbound Prospecting)',
      'Lead Nurturing Sequence',
      'AI Quality Analyst',
      'Collections & Billing Agent',
      '5 user seats',
      '90-day data retention',
      'API access',
      'Custom workflows (up to 10)',
    ],
  },
  scale: {
    name: 'Scale',
    priceId: process.env.STRIPE_PRICE_SCALE || 'price_scale',
    price: 1497,
    features: [
      'Everything in Growth',
      'Unlimited call minutes',
      'Unlimited SMS & chat',
      'Unlimited user seats',
      'All 15 AI Services Unlocked',
      'Revenue Attribution Tracker',
      'KYC & Security Gatekeeper',
      'Global Kill-Switch',
      'Priority Support (2-hour response)',
      'White-label options available',
      'Unlimited custom workflows',
      '1-year data retention',
      'Dedicated account manager',
      'Custom integrations',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    priceId: process.env.STRIPE_PRICE_ENTERPRISE || 'price_enterprise',
    price: 3997,
    features: [
      'Everything in Scale',
      'Unlimited everything',
      'Custom AI training on your brand voice',
      'Dedicated infrastructure',
      '99.99% uptime SLA',
      '24/7 phone support',
      'Multi-tenant management dashboard',
      'Custom integrations & features',
      'Quarterly business reviews',
      'Volume discounts (multi-location)',
      'White-label reseller program',
      'Professional onboarding & training',
      'Priority feature requests',
      'Dedicated Slack channel',
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
    subscription_data: {
      metadata: {
        plan: 'subscription',
      },
    },
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
 * Update subscription (upgrade/downgrade)
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
    metadata: {
      ...metadata,
      source: 'frontdesk-agents-llc',
    },
  });

  return customer;
}

/**
 * Get customer by ID
 */
export async function getCustomer(customerId: string): Promise<Stripe.Customer | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    if (customer.deleted) {
      return null;
    }
    return customer as Stripe.Customer;
  } catch (error) {
    console.error('Error retrieving customer:', error);
    return null;
  }
}

/**
 * Get customer by email
 */
export async function getCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
  try {
    const customers = await stripe.customers.list({
      email,
      limit: 1,
    });
    
    if (customers.data.length > 0) {
      return customers.data[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error finding customer by email:', error);
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

/**
 * Create a setup intent for saving payment methods
 */
export async function createSetupIntent(customerId: string): Promise<Stripe.SetupIntent> {
  const setupIntent = await stripe.setupIntents.create({
    customer: customerId,
    payment_method_types: ['card'],
  });

  return setupIntent;
}

/**
 * Attach payment method to customer
 */
export async function attachPaymentMethod(
  paymentMethodId: string,
  customerId: string
): Promise<Stripe.PaymentMethod> {
  const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
    customer: customerId,
  });

  // Set as default payment method
  await stripe.customers.update(customerId, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });

  return paymentMethod;
}

/**
 * List customer's payment methods
 */
export async function listPaymentMethods(customerId: string): Promise<Stripe.PaymentMethod[]> {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    return paymentMethods.data;
  } catch (error) {
    console.error('Error listing payment methods:', error);
    return [];
  }
}

/**
 * Get active subscriptions for customer
 */
export async function getActiveSubscriptions(customerId: string): Promise<Stripe.Subscription[]> {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
    });

    return subscriptions.data;
  } catch (error) {
    console.error('Error getting active subscriptions:', error);
    return [];
  }
}

export default stripe;
