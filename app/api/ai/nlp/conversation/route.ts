/**
 * Conversation Sentiment Tracking API
 * 
 * Real-time sentiment analysis for conversations
 */

import { NextRequest, NextResponse } from 'next/server';
import { nlpEngine } from '@/lib/ai/nlp-engine';

/**
 * POST /api/ai/nlp/conversation
 * Track sentiment across a conversation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Convert messages to required format
    const formattedMessages = messages.map((msg: any) => ({
      text: msg.text || msg.content || '',
      timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
    }));

    // Track conversation sentiment
    const analysis = await nlpEngine.trackConversationSentiment(formattedMessages);

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error: any) {
    console.error('Conversation sentiment tracking error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to track conversation sentiment' },
      { status: 500 }
    );
  }
}
