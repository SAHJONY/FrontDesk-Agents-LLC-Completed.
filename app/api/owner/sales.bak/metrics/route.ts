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
    const timeRange = searchParams.get('range') || 'month';

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case 'day':
        startDate.setDate(now.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    // Fetch subscriptions data
    const { data: subscriptions, error: subsError } = await supabase
      .from('subscriptions')
      .select('*')
      .gte('created_at', startDate.toISOString());

    if (subsError) {
      console.error('Error fetching subscriptions:', subsError);
    }

    // Fetch payments/transactions data
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('*')
      .gte('created_at', startDate.toISOString());

    if (paymentsError) {
      console.error('Error fetching payments:', paymentsError);
    }

    // Fetch customers data
    const { data: customers, error: customersError } = await supabase
      .from('customers')
      .select('*');

    if (customersError) {
      console.error('Error fetching customers:', customersError);
    }

    // Calculate metrics
    const totalRevenue = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
    const totalCustomers = customers?.length || 0;
    const activeSubscriptions = subscriptions?.filter(s => s.status === 'active').length || 0;
    const newCustomers = customers?.filter(c => new Date(c.created_at) >= startDate).length || 0;
    
    // Calculate churn rate
    const churnedCustomers = subscriptions?.filter(s => s.status === 'canceled').length || 0;
    const churnRate = totalCustomers > 0 ? (churnedCustomers / totalCustomers) * 100 : 0;

    // Calculate monthly revenue (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const monthlyRevenue = payments?.filter(p => new Date(p.created_at) >= thirtyDaysAgo)
      .reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

    // Calculate quarterly revenue (last 90 days)
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const quarterlyRevenue = payments?.filter(p => new Date(p.created_at) >= ninetyDaysAgo)
      .reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

    // Calculate yearly revenue (last 365 days)
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const yearlyRevenue = payments?.filter(p => new Date(p.created_at) >= oneYearAgo)
      .reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

    // Calculate revenue growth (compare to previous period)
    const previousPeriodStart = new Date(startDate);
    const periodLength = now.getTime() - startDate.getTime();
    previousPeriodStart.setTime(previousPeriodStart.getTime() - periodLength);
    
    const previousRevenue = payments?.filter(p => {
      const date = new Date(p.created_at);
      return date >= previousPeriodStart && date < startDate;
    }).reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

    const revenueGrowth = previousRevenue > 0 
      ? ((totalRevenue - previousRevenue) / previousRevenue) * 100 
      : 0;

    // Calculate average deal size
    const averageDealSize = payments && payments.length > 0 
      ? totalRevenue / payments.length 
      : 0;

    // Calculate lifetime value (simplified: average revenue per customer)
    const lifetimeValue = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;

    // Fetch deals/pipeline data
    const { data: deals, error: dealsError } = await supabase
      .from('deals')
      .select('*');

    if (dealsError) {
      console.error('Error fetching deals:', dealsError);
    }

    const pipelineValue = deals?.filter(d => d.status === 'in_progress')
      .reduce((sum, d) => sum + (d.value || 0), 0) || 0;
    const dealsInProgress = deals?.filter(d => d.status === 'in_progress').length || 0;
    const closedDeals = deals?.filter(d => d.status === 'closed_won').length || 0;
    const lostDeals = deals?.filter(d => d.status === 'closed_lost').length || 0;

    // Calculate win rate
    const totalClosedDeals = closedDeals + lostDeals;
    const winRate = totalClosedDeals > 0 ? (closedDeals / totalClosedDeals) * 100 : 0;

    // Calculate conversion rate (simplified: customers / total signups)
    const { data: signups, error: signupsError } = await supabase
      .from('signups')
      .select('count');

    const totalSignups = signups?.[0]?.count || totalCustomers;
    const conversionRate = totalSignups > 0 ? (totalCustomers / totalSignups) * 100 : 0;

    // Calculate average sales cycle length
    const completedDeals = deals?.filter(d => d.status === 'closed_won' && d.created_at && d.closed_at) || [];
    const salesCycleLength = completedDeals.length > 0
      ? completedDeals.reduce((sum, d) => {
          const created = new Date(d.created_at).getTime();
          const closed = new Date(d.closed_at).getTime();
          return sum + (closed - created) / (1000 * 60 * 60 * 24); // Convert to days
        }, 0) / completedDeals.length
      : 0;

    const metrics = {
      totalRevenue,
      monthlyRevenue,
      quarterlyRevenue,
      yearlyRevenue,
      revenueGrowth,
      totalCustomers,
      newCustomers,
      churnRate,
      activeSubscriptions,
      lifetimeValue,
      conversionRate,
      averageDealSize,
      salesCycleLength: Math.round(salesCycleLength),
      winRate,
      pipelineValue,
      dealsInProgress,
      closedDeals,
      lostDeals,
    };

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error in sales metrics API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
