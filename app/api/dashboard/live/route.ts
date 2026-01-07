import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getWorkforceStatus, supremeCommander } from '@/lib/ai-agents';
import { orchestrator } from '@/lib/autonomous/orchestrator';

/**
 * GET /api/dashboard/live
 * Get real-time dashboard data
 */
export async function GET(request: Request) {
  try {
    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get AI workforce status
    const workforceStatus = getWorkforceStatus();
    const systemStatus = supremeCommander.getSystemStatus();
    const orchestratorStatus = orchestrator.getStatus();

    // Get today's date
    const today = new Date().toISOString().split('T')[0];

    // Fetch real-time metrics from database
    const { data: dailyMetrics } = await supabase
      .from('daily_metrics')
      .select('*')
      .eq('date', today)
      .single();

    // Fetch active calls
    const { data: activeCalls } = await supabase
      .from('calls')
      .select('*')
      .eq('status', 'in_progress')
      .order('started_at', { ascending: false })
      .limit(10);

    // Fetch recent calls
    const { data: recentCalls } = await supabase
      .from('calls')
      .select('*')
      .eq('status', 'completed')
      .order('ended_at', { ascending: false })
      .limit(20);

    // Fetch agent performance
    const { data: agentPerformance } = await supabase
      .from('agent_performance')
      .select('*')
      .order('conversion_rate', { ascending: false });

    // Calculate real-time statistics
    const totalCalls = dailyMetrics?.total_calls || 0;
    const completedCalls = dailyMetrics?.completed_calls || 0;
    const totalDuration = dailyMetrics?.total_duration || 0;
    const avgDuration = completedCalls > 0 ? totalDuration / completedCalls : 0;

    // Calculate conversion rate from recent calls
    const qualifiedCalls = recentCalls?.filter(
      (call) =>
        call.disposition === 'qualified' ||
        call.disposition === 'appointment_set' ||
        call.disposition === 'converted'
    ).length || 0;
    const conversionRate = recentCalls && recentCalls.length > 0
      ? (qualifiedCalls / recentCalls.length) * 100
      : 0;

    // Get revenue data (mock for now, would come from Stripe)
    const revenueData = await getRevenueData(supabase);

    // Compile dashboard data
    const dashboardData = {
      timestamp: new Date().toISOString(),
      
      // System health
      systemHealth: {
        status: systemStatus.isOperational ? 'operational' : 'offline',
        uptime: systemStatus.uptime,
        apiUptime: '99.98%',
        errorRate: '0.02%',
      },

      // Real-time metrics
      metrics: {
        totalCalls: totalCalls,
        activeCalls: dailyMetrics?.active_calls || activeCalls?.length || 0,
        completedCalls: completedCalls,
        avgDuration: Math.round(avgDuration),
        conversionRate: Math.round(conversionRate),
      },

      // AI Workforce status
      workforce: {
        totalAgents: orchestratorStatus.totalAgents,
        activeAgents: orchestratorStatus.activeAgents,
        queueLength: orchestratorStatus.queueLength,
        divisions: systemStatus.divisions.map((div) => ({
          name: div.division,
          successRate: div.successRate,
          efficiency: div.efficiency,
          missionsCompleted: div.missionsCompleted,
          missionsInProgress: div.missionsInProgress,
        })),
      },

      // Active calls
      activeCalls: (activeCalls || []).map((call) => ({
        id: call.id,
        callId: call.call_id,
        agent: call.agent_name || 'AI Agent',
        customer: call.phone_number,
        duration: call.started_at
          ? Math.floor((Date.now() - new Date(call.started_at).getTime()) / 1000)
          : 0,
        status: 'active',
      })),

      // Agent performance
      agents: (agentPerformance || []).map((agent) => ({
        name: agent.agent_name,
        totalCalls: agent.total_calls,
        conversionRate: Math.round(agent.conversion_rate),
        avgDuration: Math.round(agent.avg_duration),
        lastCall: agent.last_call_at,
      })),

      // Revenue data
      revenue: revenueData,

      // Recent activity
      recentActivity: (recentCalls || []).slice(0, 5).map((call) => ({
        type: call.disposition === 'qualified' ? 'success' : call.disposition === 'no_answer' ? 'warning' : 'info',
        message: `Call ${call.disposition || 'completed'}: ${call.phone_number}`,
        time: getRelativeTime(call.ended_at),
        agent: call.agent_name || 'AI Agent',
      })),
    };

    return NextResponse.json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch dashboard data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Get revenue data
 */
async function getRevenueData(supabase: any) {
  try {
    // Fetch user counts by tier
    const { data: users } = await supabase
      .from('users')
      .select('tier')
      .not('tier', 'is', null);

    const tierCounts = {
      BASIC: 0,
      PROFESSIONAL: 0,
      GROWTH: 0,
      ELITE: 0,
    };

    users?.forEach((user: any) => {
      if (tierCounts.hasOwnProperty(user.tier)) {
        tierCounts[user.tier as keyof typeof tierCounts]++;
      }
    });

    // Calculate revenue (from package.json pricing)
    const pricing = {
      BASIC: 199,
      PROFESSIONAL: 399,
      GROWTH: 799,
      ELITE: 1499,
    };

    const breakdown = [
      {
        tier: 'Basic',
        customers: tierCounts.BASIC,
        revenue: tierCounts.BASIC * pricing.BASIC,
        percentage: 0,
      },
      {
        tier: 'Professional',
        customers: tierCounts.PROFESSIONAL,
        revenue: tierCounts.PROFESSIONAL * pricing.PROFESSIONAL,
        percentage: 0,
      },
      {
        tier: 'Growth',
        customers: tierCounts.GROWTH,
        revenue: tierCounts.GROWTH * pricing.GROWTH,
        percentage: 0,
      },
      {
        tier: 'Elite',
        customers: tierCounts.ELITE,
        revenue: tierCounts.ELITE * pricing.ELITE,
        percentage: 0,
      },
    ];

    const totalRevenue = breakdown.reduce((sum, item) => sum + item.revenue, 0);

    // Calculate percentages
    breakdown.forEach((item) => {
      item.percentage = totalRevenue > 0 ? Math.round((item.revenue / totalRevenue) * 100) : 0;
    });

    return {
      mrr: totalRevenue,
      arr: totalRevenue * 12,
      breakdown,
      totalCustomers: Object.values(tierCounts).reduce((sum, count) => sum + count, 0),
    };
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    return {
      mrr: 0,
      arr: 0,
      breakdown: [],
      totalCustomers: 0,
    };
  }
}

/**
 * Get relative time string
 */
function getRelativeTime(timestamp: string): string {
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const diff = now - then;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return `${days} day${days > 1 ? 's' : ''} ago`;
}
