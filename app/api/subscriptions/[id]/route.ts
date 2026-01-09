import { NextRequest, NextResponse } from 'next/server';
import { requireSupabaseServer } from '@/lib/supabase-server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});


// GET /api/subscriptions/[id] - Get subscription details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = requireSupabaseServer();
  try {
    const { id } = params;

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*, customers(company_name, contact_email)')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

    // Get latest info from Stripe
    if (data.stripe_subscription_id) {
      const stripeSubscription = await stripe.subscriptions.retrieve(
        data.stripe_subscription_id
      );
      
      return NextResponse.json({
        subscription: data,
        stripe_subscription: stripeSubscription,
      });
    }

    return NextResponse.json({ subscription: data });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/subscriptions/[id] - Cancel subscription
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = requireSupabaseServer();
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const immediate = searchParams.get('immediate') === 'true';

    // Get subscription
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

    // Cancel in Stripe
    if (subscription.stripe_subscription_id) {
      if (immediate) {
        await stripe.subscriptions.cancel(subscription.stripe_subscription_id);
      } else {
        await stripe.subscriptions.update(subscription.stripe_subscription_id, {
          cancel_at_period_end: true,
        });
      }
    }

    // Update database
    const { data: updated, error: updateError } = await supabase
      .from('subscriptions')
      .update({
        status: immediate ? 'canceled' : 'active',
        cancel_at_period_end: !immediate,
        canceled_at: immediate ? new Date().toISOString() : null,
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('❌ Error updating subscription:', updateError);
      return NextResponse.json(
        { error: 'Failed to cancel subscription' },
        { status: 500 }
      );
    }

    console.log('✅ Subscription canceled:', id);
    return NextResponse.json({
      message: immediate
        ? 'Subscription canceled immediately'
        : 'Subscription will cancel at period end',
      subscription: updated,
    });
  } catch (error) {
    console.error('❌ Error canceling subscription:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}
