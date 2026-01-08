import { NextResponse } from 'next/server';

// Force Node.js runtime
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    // Return stub data for autonomous agent status
    return NextResponse.json({
      success: true,
      data: {
        status: 'idle',
        enabled: false,
        lastActivity: null,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ Autonomous status error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch autonomous status' },
      { status: 500 }
    );
  }
}
