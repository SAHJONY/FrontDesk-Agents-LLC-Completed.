import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || 'month'; // day, week, month, quarter, year

    // Mock comprehensive sales metrics
    const metrics = {
      // Revenue Metrics
      totalRevenue: 487500,
      monthlyRevenue: 45000,
      quarterlyRevenue: 132000,
      yearlyRevenue: 487500,
      revenueGrowth: 23.5, // percentage
      
      // Customer Metrics
      totalCustomers: 156,
      newCustomers: 18,
      churnRate: 2.1, // percentage
      activeSubscriptions: 152,
      lifetimeValue: 12500,
      
      // Sales Performance
      conversionRate: 3.8, // percentage
      averageDealSize: 3125,
      salesCycleLength: 14, // days
      winRate: 28.5, // percentage
      
      // Pipeline
      pipelineValue: 285000,
      dealsInProgress: 42,
      closedDeals: 18,
      lostDeals: 5,
      
      // Additional Metrics
      mrr: 45000, // Monthly Recurring Revenue
      arr: 540000, // Annual Recurring Revenue
      arpu: 296, // Average Revenue Per User
      cac: 850, // Customer Acquisition Cost
      ltv_cac_ratio: 14.7, // LTV/CAC ratio (should be > 3)
      
      // Growth Metrics
      mom_growth: 8.2, // Month over Month growth %
      qoq_growth: 15.7, // Quarter over Quarter growth %
      yoy_growth: 45.3, // Year over Year growth %
      
      // Churn & Retention
      grossChurn: 2.1,
      netChurn: -1.5, // Negative is good (expansion revenue)
      retentionRate: 97.9,
      expansionRevenue: 5400,
      
      // Sales Team Performance
      totalDeals: 23,
      avgDealVelocity: 12.5, // days
      quotaAttainment: 112, // percentage
      
      // By Plan Tier
      byPlan: {
        starter: { customers: 45, mrr: 4500, churn: 3.2 },
        professional: { customers: 78, mrr: 23400, churn: 1.8 },
        growth: { customers: 24, mrr: 14400, churn: 1.2 },
        enterprise: { customers: 5, mrr: 2700, churn: 0.0 },
      },
      
      // Revenue Breakdown
      revenueBySource: {
        new_business: 15000,
        expansion: 5400,
        renewal: 24600,
      },
      
      // Time-based trends (last 12 months)
      monthlyTrend: [
        { month: 'Jan 2025', revenue: 32000, customers: 105 },
        { month: 'Feb 2025', revenue: 34500, customers: 112 },
        { month: 'Mar 2025', revenue: 36000, customers: 118 },
        { month: 'Apr 2025', revenue: 37800, customers: 124 },
        { month: 'May 2025', revenue: 39200, customers: 129 },
        { month: 'Jun 2025', revenue: 40500, customers: 134 },
        { month: 'Jul 2025', revenue: 41200, customers: 138 },
        { month: 'Aug 2025', revenue: 42000, customers: 142 },
        { month: 'Sep 2025', revenue: 42800, customers: 146 },
        { month: 'Oct 2025', revenue: 43500, customers: 149 },
        { month: 'Nov 2025', revenue: 44200, customers: 151 },
        { month: 'Dec 2025', revenue: 45000, customers: 152 },
        { month: 'Jan 2026', revenue: 45000, customers: 156 },
      ],
    };

    // Adjust metrics based on time range
    let filteredMetrics = { ...metrics };
    
    if (range === 'day') {
      filteredMetrics.totalRevenue = metrics.monthlyRevenue / 30;
      filteredMetrics.newCustomers = Math.round(metrics.newCustomers / 30);
    } else if (range === 'week') {
      filteredMetrics.totalRevenue = metrics.monthlyRevenue / 4;
      filteredMetrics.newCustomers = Math.round(metrics.newCustomers / 4);
    } else if (range === 'quarter') {
      filteredMetrics.totalRevenue = metrics.quarterlyRevenue;
    } else if (range === 'year') {
      filteredMetrics.totalRevenue = metrics.yearlyRevenue;
    }

    return NextResponse.json(filteredMetrics);
  } catch (error) {
    console.error('Error fetching sales metrics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { metric, value, timestamp } = body;

    // Track custom metric
    console.log(`Recording metric: ${metric} = ${value} at ${timestamp}`);

    // In production, this would:
    // 1. Validate the metric
    // 2. Save to time-series database
    // 3. Update aggregated metrics
    // 4. Trigger alerts if thresholds crossed

    return NextResponse.json({ 
      success: true,
      message: 'Metric recorded successfully'
    });
  } catch (error) {
    console.error('Error recording metric:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
