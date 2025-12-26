import { NextResponse } from 'next/server';
import { blandAiService } from '@/services/blandAiService';

/**
 * SOVEREIGN TELEMETRY GATEWAY
 * GET /api/voice/status/[callId]
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

    // 1. Poll Bland AI for the current state of the call
    const callData = await blandAiService.getCallStatus(callId);

    if (!callData) {
      return NextResponse.json(
        { success: false, error: 'Could not retrieve neural data.' },
        { status: 404 }
      );
    }

    // 2. Return the relevant data to the CallMonitor component
    return NextResponse.json({
      success: true,
      status: callData.status, // 'queued', 'ringing', 'in-progress', 'completed'
      transcript: callData.transcript || '',
      duration: callData.call_length || 0,
      to: callData.to,
      created_at: callData.created_at
    });

  } catch (error) {
    console.error('Telemetry Retrieval Failed:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
