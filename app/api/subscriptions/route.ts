import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET /api/subscriptions - List all subscriptions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customer_id = searchParams.get('customer_id');

    let query = supabase
      .from('subscriptions')
      .select('*, customers(company_name, contact_email)')
      .order('created_at', { ascending: false });

    if (customer_id) {
      query = query.eq('customer_id', customer_id);
    }

    const { data, error } = await query;

    if (error) {
      console.error('❌ Error fetching subscriptions:', error);
      return NextResponse.json(
        { error: 'Failed to fetch subscriptions' },
        { status: 500 }
      );
    }

    return NextResponse.json({ subscriptions: data || [] });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/subscriptions - Create a new subscription
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer_id, price_id, payment_method_id } = body;

    if (!customer_id || !price_id) {
      return NextResponse.json(
        { error: 'Customer ID and price ID are required' },
        { status: 400 }
      );
    }

    // Get customer details
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('*')
      .eq('id', customer_id)
      .single();

    if (customerError || !customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Create or retrieve Stripe customer
    let stripeCustomerId = customer.stripe_customer_id;
    
    if (!stripeCustomerId) {
      const stripeCustomer = await stripe.customers.create({
        email: customer.contact_email,
        name: customer.company_name,
        metadata: {
          customer_id: customer.id,
        },
      });
      stripeCustomerId = stripeCustomer.id;

      // Update customer with Stripe ID
      await supabase
        .from('customers')
        .update({ stripe_customer_id: stripeCustomerId })
        .eq('id', customer_id);
    }

    // Attach payment method if provided
    if (payment_method_id) {
      await stripe.paymentMethods.attach(payment_method_id, {
        customer: stripeCustomerId,
      });

      await stripe.customers.update(stripeCustomerId, {
        invoice_settings: {
          default_payment_method: payment_method_id,
        },
      });
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: price_id }],
      metadata: {
        customer_id: customer.id,
      },
      expand: ['latest_invoice.payment_intent'],
    });

    // Store subscription in database
    const { data: dbSubscription, error: dbError } = await supabase
      .from('subscriptions')
      .insert({
        customer_id: customer.id,
        stripe_subscription_id: subscription.id,
        stripe_customer_id: stripeCustomerId,
        status: subscription.status,
        plan_id: price_id,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error('❌ Error storing subscription:', dbError);
    }

    console.log('✅ Subscription created:', subscription.id);
    return NextResponse.json({
      subscription: dbSubscription,
      stripe_subscription: subscription,
    }, { status: 201 });
  } catch (error: any) {
    console.error('❌ Error creating subscription:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
