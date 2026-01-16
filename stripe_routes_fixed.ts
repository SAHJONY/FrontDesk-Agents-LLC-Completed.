// ===== FILE 1: app/api/webhooks/stripe/route.ts =====
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey 
  ? new Stripe(stripeKey, { apiVersion: '2024-11-20.acacia' as any })
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    // Safety check for Stripe initialization
    if (!stripe) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature || !webhookSecret) {
      return NextResponse.json(
        { error: 'Missing signature or webhook secret' },
        { status: 400 }
      );
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Checkout session completed:', session.id);
        break;
      
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        console.log('Subscription updated:', subscription.id);
        break;
      
      case 'customer.subscription.deleted':
        const deletedSub = event.data.object;
        console.log('Subscription deleted:', deletedSub.id);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}

// ===== FILE 2: app/api/checkout/route.ts =====
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey 
  ? new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" as any }) 
  : null;

export async function POST(req: Request) {
  try {
    // Safety Check: Ensure Stripe is initialized
    if (!stripe) {
      console.error("CRITICAL: STRIPE_SECRET_KEY is not defined in environment variables.");
      return NextResponse.json(
        { error: "Stripe is not configured on this deployment." },
        { status: 500 }
      );
    }

    const { planName } = await req.json();

    // Map plan names to their dollar values (Location-Based Model)
    const priceMap: Record<string, number> = {
      Starter: 299,
      Professional: 699,
      Growth: 1299,
      Enterprise: 2499,
    };

    const amount = priceMap[planName] || 299; // Default to Starter if planName is invalid

    // Create the Subscription Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `FrontDesk Agents - ${planName} Plan`,
              description: `AI Workforce Subscription for ${planName} tier.`,
            },
            unit_amount: amount * 100, // Stripe uses cents
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://front-desk-agents-llc.vercel.app'}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://front-desk-agents-llc.vercel.app'}/pricing`,
      metadata: { 
        plan: planName,
        marketplace_fee: "15%" // Logic placeholder for workforce revenue share
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

// ===== FILE 3: app/api/subscriptions/route.ts =====
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey 
  ? new Stripe(stripeKey, { apiVersion: '2024-11-20.acacia' as any })
  : null;

export async function GET(req: NextRequest) {
  try {
    // Safety check for Stripe initialization
    if (!stripe) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    // Get customer ID from query params or session
    const searchParams = req.nextUrl.searchParams;
    const customerId = searchParams.get('customer_id');

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    // Fetch customer's subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 10,
    });

    return NextResponse.json({ subscriptions: subscriptions.data });
  } catch (error: any) {
    console.error('Subscriptions error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Safety check for Stripe initialization
    if (!stripe) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    const { customerId, priceId } = await req.json();

    if (!customerId || !priceId) {
      return NextResponse.json(
        { error: 'Customer ID and Price ID are required' },
        { status: 400 }
      );
    }

    // Create a new subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
    });

    return NextResponse.json({ subscription });
  } catch (error: any) {
    console.error('Create subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create subscription' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Safety check for Stripe initialization
    if (!stripe) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const subscriptionId = searchParams.get('subscription_id');

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID is required' },
        { status: 400 }
      );
    }

    // Cancel the subscription
    const subscription = await stripe.subscriptions.cancel(subscriptionId);

    return NextResponse.json({ subscription });
  } catch (error: any) {
    console.error('Cancel subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}

// ===== FILE 4: app/api/subscriptions/[id]/route.ts =====
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey 
  ? new Stripe(stripeKey, { apiVersion: '2024-11-20.acacia' as any })
  : null;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Safety check for Stripe initialization
    if (!stripe) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    const subscription = await stripe.subscriptions.retrieve(params.id);

    return NextResponse.json({ subscription });
  } catch (error: any) {
    console.error('Get subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch subscription' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Safety check for Stripe initialization
    if (!stripe) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    const body = await req.json();

    const subscription = await stripe.subscriptions.update(params.id, body);

    return NextResponse.json({ subscription });
  } catch (error: any) {
    console.error('Update subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update subscription' },
      { status: 500 }
    );
  }
}