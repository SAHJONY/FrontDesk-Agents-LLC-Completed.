/**
 * Stripe Setup Script
 * 
 * This script creates products and pricing plans in Stripe.
 * Run with: npx ts-node scripts/setup-stripe.ts
 */

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

async function setupStripe() {
  console.log('🚀 Setting up Stripe products and pricing...\n');

  try {
    // Create Starter Plan
    console.log('Creating Starter Plan...');
    const starterProduct = await stripe.products.create({
      name: 'FrontDesk Agents - Starter',
      description: 'Perfect for small businesses getting started with AI agents',
      metadata: {
        agents: '1',
        calls_per_month: '500',
        features: 'Basic analytics, Email support',
      },
    });

    const starterPrice = await stripe.prices.create({
      product: starterProduct.id,
      unit_amount: 9900, // $99.00
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      metadata: {
        plan_name: 'starter',
      },
    });

    console.log(`✅ Starter Plan created: ${starterProduct.id}`);
    console.log(`   Price ID: ${starterPrice.id}\n`);

    // Create Professional Plan
    console.log('Creating Professional Plan...');
    const professionalProduct = await stripe.products.create({
      name: 'FrontDesk Agents - Professional',
      description: 'For growing businesses that need more capacity and features',
      metadata: {
        agents: '5',
        calls_per_month: '2000',
        features: 'Advanced analytics, Priority support, Custom voice training',
      },
    });

    const professionalPrice = await stripe.prices.create({
      product: professionalProduct.id,
      unit_amount: 29900, // $299.00
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      metadata: {
        plan_name: 'professional',
      },
    });

    console.log(`✅ Professional Plan created: ${professionalProduct.id}`);
    console.log(`   Price ID: ${professionalPrice.id}\n`);

    // Create Enterprise Plan
    console.log('Creating Enterprise Plan...');
    const enterpriseProduct = await stripe.products.create({
      name: 'FrontDesk Agents - Enterprise',
      description: 'Custom solution for large organizations with unlimited needs',
      metadata: {
        agents: 'unlimited',
        calls_per_month: 'unlimited',
        features: 'White-label, Dedicated support, SLA guarantees, Custom integrations',
      },
    });

    const enterprisePrice = await stripe.prices.create({
      product: enterpriseProduct.id,
      unit_amount: 99900, // $999.00 (starting price, can be customized)
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      metadata: {
        plan_name: 'enterprise',
      },
    });

    console.log(`✅ Enterprise Plan created: ${enterpriseProduct.id}`);
    console.log(`   Price ID: ${enterprisePrice.id}\n`);

    // Summary
    console.log('🎉 Stripe setup complete!\n');
    console.log('📋 Summary:');
    console.log('─────────────────────────────────────────────────');
    console.log(`Starter Plan:       ${starterPrice.id}`);
    console.log(`Professional Plan:  ${professionalPrice.id}`);
    console.log(`Enterprise Plan:    ${enterprisePrice.id}`);
    console.log('─────────────────────────────────────────────────\n');
    console.log('Next steps:');
    console.log('1. Add these Price IDs to your .env.local file');
    console.log('2. Configure webhook endpoint in Stripe dashboard:');
    console.log('   URL: https://frontdeskagents.com/api/webhooks/stripe');
    console.log('3. Add webhook secret to STRIPE_WEBHOOK_SECRET env var');
    console.log('4. Test subscription flow in your application\n');

  } catch (error) {
    console.error('❌ Error setting up Stripe:', error);
    process.exit(1);
  }
}

// Run the setup
setupStripe();
