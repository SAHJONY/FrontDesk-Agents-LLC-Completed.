import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function GET() {
  const healthStatus: any = {
    status: 'operational',
    timestamp: new Date().toISOString(),
    checks: {
      supabase: 'untested',
      stripe: 'untested',
    }
  };

  try {
    // 1. Check Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      healthStatus.checks.supabase = 'missing configuration';
    } else {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error: sbError } = await supabase.from('sso_providers').select('count', { count: 'exact', head: true });
      healthStatus.checks.supabase = sbError ? `error: ${sbError.message}` : 'healthy';
    }
  } catch (e: any) {
    healthStatus.checks.supabase = `failed: ${e.message}`;
  }

  try {
    // 2. Check Stripe
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      healthStatus.checks.stripe = 'missing configuration';
    } else {
      const stripe = new Stripe(stripeKey, {
        apiVersion: '2025-01-27' as any,
      });
      await stripe.balance.retrieve();
      healthStatus.checks.stripe = 'healthy';
    }
  } catch (e: any) {
    healthStatus.checks.stripe = `failed: ${e.message}`;
  }

  // Determine overall status
  if (healthStatus.checks.supabase !== 'healthy' || healthStatus.checks.stripe !== 'healthy') {
    healthStatus.status = 'degraded';
  }

  return NextResponse.json(healthStatus);
}
