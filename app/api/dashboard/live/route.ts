import { NextResponse } from 'next/server';

// Force Node.js runtime and ensure no static caching
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request) {
  try {
    /**
     * Note: We have removed the Upstash Redis dependency.
     * Future Integration: Fetch real-time metrics directly from 
     * your Supabase 'calls' and 'agents' tables here.
     */
    
    return NextResponse.json({
      success: true,
      data: {
        systemHealth: {
          status: 'operational',
          apiUptime: '99.99%',
          errorRate: '0.01%',
          lastIncident: 'None'
        },
        metrics: {
          totalCalls: 124, // Example stub value
          avgDuration: 345, // in seconds
          successRate: '98.5%',
          peakHours: '09:00 - 17:00'
        },
        workforce: {
          activeAgents: 15,
          totalAgents: 16,
          onBreak: 1,
          offline: 0
        },
        activeCalls: [],
        agents: [],
        revenue: {
          today: 450.00,
          thisWeek: 2800.00,
          thisMonth: 12500.00,
          growth: '+12%',
          mrr: 15000,
          arr: 180000,
          breakdown: []
        },
        recentActivity: [
          { id: 1, type: 'call', description: 'Incoming call from +1...4422 handled by AI Agent', time: new Date().toISOString() },
          { id: 2, type: 'signup', description: 'New Enterprise client registered', time: new Date().toISOString() }
        ],
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ Dashboard live error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch dashboard data' 
      },
      { status: 500 }
    );
  }
}
