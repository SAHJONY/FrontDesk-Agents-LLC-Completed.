import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: Request) {
  try {
    // Next.js 15 requires awaiting the request body
    const body = await req.json();
    const { priceId, customerEmail } = body;

    if (!priceId) {
      return NextResponse.json({ error: 'Missing Price ID' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/#pricing`,
      customer_email: customerEmail,
      subscription_data: {
        metadata: {
          project: 'FrontDesk Agents LLC',
          tier: 'Founders 50',
        },
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error('Stripe Checkout Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
