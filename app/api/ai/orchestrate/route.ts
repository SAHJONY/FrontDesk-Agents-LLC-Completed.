/**
 * Multi-Agent Orchestration API
 * 
 * Coordinate multiple agents to work together on complex tasks
 */

import { NextRequest, NextResponse } from 'next/server';
import { orchestrator } from '@/lib/ai/multi-agent-orchestrator';

/**
 * POST /api/ai/orchestrate
 * Execute a complex goal using multiple agents
 */
export async function POST(request: NextRequest) {
  const supabase = requireSupabaseServer();
  try {
    const body = await request.json();
    const { goal, agentIds, context } = body;

    if (!goal || !agentIds || !Array.isArray(agentIds) || agentIds.length === 0) {
      return NextResponse.json(
        { error: 'Goal and agent IDs array are required' },
        { status: 400 }
      );
    }

    // Execute goal with multi-agent orchestration
    const result = await orchestrator.executeGoal(goal, agentIds, context || {});

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Orchestration error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to orchestrate agents' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai/orchestrate?sessionId=xxx
 * Get collaboration session status
 */
export async function GET(request: NextRequest) {
  const supabase = requireSupabaseServer();
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const session = await orchestrator.getSessionStatus(sessionId);

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: session,
    });
  } catch (error: any) {
    console.error('Failed to get session status:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get session status' },
      { status: 500 }
    );
  }
}
