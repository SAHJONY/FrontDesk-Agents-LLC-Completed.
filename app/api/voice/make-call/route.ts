import { NextResponse } from 'next/server';
import { blandAiService } from '@/services/blandAiService';

/**
 * SOVEREIGN VOICE GATEWAY
 * POST /api/voice/make-call
 */
export async function POST(req: Request) {
  try {
    // 1. Parse the incoming request from the "Activate SARA" button
    const body = await req.json();
    const { phoneNumber, task, transferPhone } = body;

    // 2. Validation: Ensure we have a target for the call
    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, error: 'Destination phone number is required.' },
        { status: 400 }
      );
    }

    // 3. Execution: Trigger the Bland AI Service
    // This runs on the server, protecting your API keys and checking DB limits
    const result = await blandAiService.makeCall({
      phoneNumber,
      task: task || "You are SARA, an AI receptionist. Your goal is to be helpful and professional.",
      transferPhone: transferPhone || undefined,
    });

    // 4. Response: Return the Call ID or Error to the frontend
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Neural link established. Call initiated.',
        callId: result.callId
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Critical Gateway Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error in Voice Gateway' },
      { status: 500 }
    );
  }
}
