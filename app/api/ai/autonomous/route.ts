/**
 * Autonomous AI Agent API
 * 
 * Endpoints for interacting with self-learning AI agents
 */

import { NextRequest, NextResponse } from 'next/server';
import { agentManager } from '@/lib/ai/autonomous-agent';
import { requireSupabaseServer } from '@/lib/supabase-server';

/**
 * POST /api/ai/autonomous
 * Process input with autonomous agent
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, input, context, conversationId } = body;

    if (!agentId || !input) {
      return NextResponse.json(
        { error: 'Agent ID and input are required' },
        { status: 400 }
      );
    }

    // Process with autonomous agent
    const result = await agentManager.processWithAgent(agentId, input, {
      ...context,
      conversationId: conversationId || crypto.randomUUID(),
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Autonomous agent error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai/autonomous?agentId=xxx
 * Get agent learning metrics and status
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get('agentId');

    if (!agentId) {
      return NextResponse.json(
        { error: 'Agent ID is required' },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = requireSupabaseServer();

    // Get learning metrics
    const { data: metrics } = await supabase.rpc('get_agent_learning_metrics', {
      agent_id: agentId,
    });

    // Get recent memory
    const { data: recentMemory } = await supabase
      .from('agent_memory')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false })
      .limit(10);

    // Get knowledge count
    const { count: knowledgeCount } = await supabase
      .from('agent_knowledge')
      .select('*', { count: 'exact', head: true })
      .eq('agent_id', agentId);

    // Get recent learnings
    const { data: recentLearnings } = await supabase
      .from('agent_learnings')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false })
      .limit(5);

    return NextResponse.json({
      success: true,
      data: {
        metrics: metrics || {
          successRate: 0.5,
          averageConfidence: 0.5,
          totalInteractions: 0,
          positiveFeedback: 0,
          negativeFeedback: 0,
          improvementRate: 0,
        },
        recentMemory: recentMemory || [],
        knowledgeCount: knowledgeCount || 0,
        recentLearnings: recentLearnings || [],
      },
    });
  } catch (error: any) {
    console.error('Failed to get agent metrics:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get agent metrics' },
      { status: 500 }
    );
  }
}
