import { NextRequest, NextResponse } from 'next/server';
import { requireSupabaseServer } from '@/lib/supabase-server';


// GET /api/calls/analytics - Get call analytics
export async function GET(request: NextRequest) {
  const supabase = requireSupabaseServer();
  try {
    const { searchParams } = new URL(request.url);
    const agent_id = searchParams.get('agent_id');
    const customer_id = searchParams.get('customer_id');
    const days = parseInt(searchParams.get('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    let query = supabase
      .from('calls')
      .select('*')
      .gte('started_at', startDate.toISOString());

    if (agent_id) {
      query = query.eq('agent_id', agent_id);
    }

    if (customer_id) {
      query = query.eq('customer_id', customer_id);
    }

    const { data: calls, error } = await query;

    if (error) {
      console.error('❌ Error fetching call analytics:', error);
      return NextResponse.json(
        { error: 'Failed to fetch analytics' },
        { status: 500 }
      );
    }

    // Calculate analytics
    const totalCalls = calls?.length || 0;
    const completedCalls = calls?.filter(c => c.status === 'completed').length || 0;
    const failedCalls = calls?.filter(c => c.status === 'failed').length || 0;
    const inboundCalls = calls?.filter(c => c.direction === 'inbound').length || 0;
    const outboundCalls = calls?.filter(c => c.direction === 'outbound').length || 0;

    const totalDuration = calls?.reduce((sum, call) => sum + (call.duration || 0), 0) || 0;
    const avgDuration = completedCalls > 0 ? Math.floor(totalDuration / completedCalls) : 0;

    // Calculate success rate
    const successRate = totalCalls > 0 
      ? Math.round((completedCalls / totalCalls) * 100) 
      : 0;

    // Group calls by date
    const callsByDate: Record<string, number> = {};
    calls?.forEach(call => {
      const date = new Date(call.started_at).toISOString().split('T')[0];
      callsByDate[date] = (callsByDate[date] || 0) + 1;
    });

    // Group calls by hour
    const callsByHour: Record<number, number> = {};
    calls?.forEach(call => {
      const hour = new Date(call.started_at).getHours();
      callsByHour[hour] = (callsByHour[hour] || 0) + 1;
    });

    // Calculate conversion metrics
    const conversions = calls?.filter(c => c.converted).length || 0;
    const conversionRate = completedCalls > 0
      ? Math.round((conversions / completedCalls) * 100)
      : 0;

    const totalRevenue = calls?.reduce((sum, call) => sum + (call.revenue || 0), 0) || 0;

    return NextResponse.json({
      summary: {
        totalCalls,
        completedCalls,
        failedCalls,
        inboundCalls,
        outboundCalls,
        successRate,
        avgDuration,
        conversions,
        conversionRate,
        totalRevenue,
      },
      trends: {
        callsByDate,
        callsByHour,
      },
      period: {
        days,
        startDate: startDate.toISOString(),
        endDate: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
