/**
 * Agent Feedback API
 * 
 * Provide feedback to agents for continuous learning
 */

import { NextRequest, NextResponse } from 'next/server';
import { agentManager } from '@/lib/ai/autonomous-agent';

/**
 * POST /api/ai/autonomous/feedback
 * Provide feedback to agent for learning
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, memoryId, feedback, details } = body;

    if (!agentId || !memoryId || !feedback) {
      return NextResponse.json(
        { error: 'Agent ID, memory ID, and feedback are required' },
        { status: 400 }
      );
    }

    if (!['positive', 'negative'].includes(feedback)) {
      return NextResponse.json(
        { error: 'Feedback must be "positive" or "negative"' },
        { status: 400 }
      );
    }

    // Provide feedback to agent
    await agentManager.provideFeedback(agentId, memoryId, feedback, details);

    return NextResponse.json({
      success: true,
      message: 'Feedback recorded and agent has learned from it',
    });
  } catch (error: any) {
    console.error('Failed to provide feedback:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to provide feedback' },
      { status: 500 }
    );
  }
}
