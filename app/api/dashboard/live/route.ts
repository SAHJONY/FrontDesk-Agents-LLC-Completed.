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
        activeAgents: 0,
        pendingTasks: 0,
        completedToday: 0,
        revenue: 0,
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
