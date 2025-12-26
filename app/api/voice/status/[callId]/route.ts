import { NextResponse } from 'next/server';
import { blandAiService } from '@/services/blandAiService';

/**
 * SOVEREIGN TELEMETRY GATEWAY
 * GET /api/voice/status/[callId]
 * This route provides a real-time window into the SARA node's current state.
 */
export async function GET(
  req: Request,
  { params }: { params: { callId: string } }
) {
  try {
    const { callId } = params;

    if (!callId) {
      return NextResponse.json(
        { success: false, error: 'Call ID is required for telemetry.' },
        { status: 400 }
      );
    }

    // 1. Poll the Logic Service for the live state of the call
    // The service handles the Auth and Provider Handshake
    const callData = await blandAiService.getCallStatus(callId);

    if (!callData) {
      return NextResponse.json(
        { success: false, error: 'Could not synchronize with neural node.' },
        { status: 404 }
      );
    }

    // 2. Normalize and return data to the frontend CallMonitor
    return NextResponse.json({
      success: true,
      status: callData.status, // mapped from: 'queued', 'ringing', 'in-progress', 'completed'
      transcript: callData.transcript || '',
      duration: callData.call_length || 0,
      to: callData.to,
      latency: callData.latency || 'optimal',
      created_at: callData.created_at
    });

  } catch (error) {
    console.error('CRITICAL TELEMETRY ERROR:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error during telemetry sync' },
      { status: 500 }
    );
  }
}

