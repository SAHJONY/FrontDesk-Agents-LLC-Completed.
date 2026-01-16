import { NextRequest, NextResponse } from 'next/server';
import { requireSupabaseServer } from '@/lib/supabase-server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: '2024-12-18.acacia' });
}

export async function POST(request: NextRequest) {
  const supabase = requireSupabaseServer();
  try {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured (missing STRIPE_SECRET_KEY).' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { customerId, priceId, trialDays } = body;

    if (!customerId || !priceId) {
      return NextResponse.json(
        { error: 'customerId and priceId are required' },
        { status: 400 }
      );
    }

    // ... tu lógica actual (create subscription en Stripe, guardar en Supabase, etc.)
    // IMPORTANTE: usa `stripe` solo aquí dentro.

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Subscriptions API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error?.message },
      { status: 500 }
    );
  }
}
