import { NextResponse } from 'next/server';

// Force Node.js runtime
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    // Return stub data for dashboard live stats
    return NextResponse.json({
      success: true,
      data: {
        systemHealth: {
          status: 'operational',
          apiUptime: '99.9%',
          errorRate: '0.1%',
          lastIncident: 'None'
        },
        metrics: {
          totalCalls: 0,
          avgDuration: 0,
          successRate: '0%',
          peakHours: 'N/A'
        },
        workforce: {
          activeAgents: 0,
          totalAgents: 0,
          onBreak: 0,
          offline: 0
        },
        activeCalls: [],
        agents: [],
        revenue: {
          today: 0,
          thisWeek: 0,
          thisMonth: 0,
          growth: '0%'
        },
        recentActivity: [],
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ Dashboard live error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
