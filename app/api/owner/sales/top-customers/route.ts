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
    const limit = parseInt(searchParams.get('limit') || '5');

    // Fetch customers with their subscription and payment data
    const { data: customers, error: customersError } = await supabase
      .from('customers')
      .select(`
        *,
        subscriptions(
          id,
          plan_name,
          amount,
          status,
          created_at
        ),
        payments(
          amount,
          created_at
        )
      `)
      .order('created_at', { ascending: false });

    if (customersError) {
      console.error('Error fetching customers:', customersError);
      return NextResponse.json({ customers: [] });
    }

    // Calculate metrics for each customer
    const customersWithMetrics = customers?.map(customer => {
      const subscriptions = Array.isArray(customer.subscriptions) ? customer.subscriptions : [];
      const payments = Array.isArray(customer.payments) ? customer.payments : [];

      // Get active subscription
      const activeSubscription = subscriptions.find(s => s.status === 'active');
      const mrr = activeSubscription?.amount || 0;

      // Calculate total lifetime value
      const ltv = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

      // Determine status
      let status: 'active' | 'at_risk' | 'churned' = 'churned';
      if (activeSubscription) {
        status = 'active';
        
        // Check if at risk (no payment in last 60 days)
        const lastPayment = payments.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )[0];
        
        if (lastPayment) {
          const daysSinceLastPayment = (Date.now() - new Date(lastPayment.created_at).getTime()) / (1000 * 60 * 60 * 24);
          if (daysSinceLastPayment > 60) {
            status = 'at_risk';
          }
        }
      }

      return {
        id: customer.id,
        name: customer.name || customer.email || 'Unknown Customer',
        email: customer.email || '',
        plan: activeSubscription?.plan_name || 'No Plan',
        mrr,
        ltv,
        signupDate: customer.created_at,
        status,
      };
    }) || [];

    // Sort by LTV (highest first) and limit
    const topCustomers = customersWithMetrics
      .sort((a, b) => b.ltv - a.ltv)
      .slice(0, limit);

    return NextResponse.json({ customers: topCustomers });
  } catch (error) {
    console.error('Error in top customers API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
