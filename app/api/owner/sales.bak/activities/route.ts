import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Verify user is owner
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user || user.email !== 'frontdeskllc@outlook.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');

    // Fetch recent subscription events
    const { data: subscriptionEvents, error: subsError } = await supabase
      .from('subscription_events')
      .select(`
        *,
        customer:customers(name, email),
        subscription:subscriptions(plan_name, amount)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (subsError) {
      console.error('Error fetching subscription events:', subsError);
    }

    // Fetch recent payment events
    const { data: paymentEvents, error: paymentsError } = await supabase
      .from('payments')
      .select(`
        *,
        customer:customers(name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (paymentsError) {
      console.error('Error fetching payment events:', paymentsError);
    }

    // Combine and format activities
    const activities = [];

    // Process subscription events
    if (subscriptionEvents) {
      for (const event of subscriptionEvents) {
        let type: 'new_customer' | 'upgrade' | 'renewal' | 'churn' = 'new_customer';
        
        if (event.event_type === 'subscription.created') {
          type = 'new_customer';
        } else if (event.event_type === 'subscription.upgraded') {
          type = 'upgrade';
        } else if (event.event_type === 'subscription.renewed') {
          type = 'renewal';
        } else if (event.event_type === 'subscription.canceled') {
          type = 'churn';
        }

        activities.push({
          id: event.id,
          type,
          customerName: event.customer?.name || 'Unknown Customer',
          amount: event.subscription?.amount || 0,
          plan: event.subscription?.plan_name || 'Unknown Plan',
          timestamp: event.created_at,
          status: event.status || 'completed',
        });
      }
    }

    // Process payment events
    if (paymentEvents) {
      for (const payment of paymentEvents) {
        // Only add if not already included from subscription events
        const exists = activities.some(a => 
          a.customerName === payment.customer?.name && 
          Math.abs(new Date(a.timestamp).getTime() - new Date(payment.created_at).getTime()) < 60000
        );

        if (!exists) {
          activities.push({
            id: payment.id,
            type: 'renewal' as const,
            customerName: payment.customer?.name || 'Unknown Customer',
            amount: payment.amount || 0,
            plan: payment.description || 'Payment',
            timestamp: payment.created_at,
            status: payment.status || 'completed',
          });
        }
      }
    }

    // Sort by timestamp and limit
    activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    const limitedActivities = activities.slice(0, limit);

    return NextResponse.json({ activities: limitedActivities });
  } catch (error) {
    console.error('Error in sales activities API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
