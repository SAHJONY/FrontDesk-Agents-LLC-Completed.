/**
 * Autonomous Onboarding API
 */

import { NextRequest, NextResponse } from 'next/server';
import { autonomousOnboardingAssistant } from '@/lib/onboarding/autonomous-assistant';

// In-memory session storage (use Redis in production)
const sessions = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, customerId, sessionId, message } = body;

    if (action === 'start') {
      // Start new onboarding session
      const context = await autonomousOnboardingAssistant.startOnboarding(customerId, message);
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      sessions.set(newSessionId, context);

      const { response } = await autonomousOnboardingAssistant.processMessage(
        context,
        message || 'Hello'
      );

      return NextResponse.json({
        success: true,
        data: {
          sessionId: newSessionId,
          response,
          context: {
            currentStep: context.currentStep,
            progress: autonomousOnboardingAssistant.getProgress(context),
            extractedInfo: context.extractedInfo,
          },
        },
      });
    }

    if (action === 'message') {
      // Continue existing session
      if (!sessionId || !sessions.has(sessionId)) {
        return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
      }

      const context = sessions.get(sessionId);
      const { context: updatedContext, response } = await autonomousOnboardingAssistant.processMessage(
        context,
        message
      );

      sessions.set(sessionId, updatedContext);

      return NextResponse.json({
        success: true,
        data: {
          response,
          context: {
            currentStep: updatedContext.currentStep,
            progress: autonomousOnboardingAssistant.getProgress(updatedContext),
            extractedInfo: updatedContext.extractedInfo,
            configurationState: updatedContext.configurationState,
          },
        },
      });
    }

    if (action === 'get_context') {
      // Get current context
      if (!sessionId || !sessions.has(sessionId)) {
        return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
      }

      const context = sessions.get(sessionId);

      return NextResponse.json({
        success: true,
        data: {
          context: {
            currentStep: context.currentStep,
            progress: autonomousOnboardingAssistant.getProgress(context),
            extractedInfo: context.extractedInfo,
            configurationState: context.configurationState,
            conversationHistory: context.conversationHistory,
          },
        },
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Autonomous onboarding error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    if (!sessions.has(sessionId)) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const context = sessions.get(sessionId);

    return NextResponse.json({
      success: true,
      data: {
        context: {
          currentStep: context.currentStep,
          progress: autonomousOnboardingAssistant.getProgress(context),
          extractedInfo: context.extractedInfo,
          configurationState: context.configurationState,
        },
      },
    });
  } catch (error: any) {
    console.error('Get context error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
