import { NextResponse } from 'next/server';
import { blandAiService } from '@/services/blandAiService';

/**
 * SOVEREIGN VOICE GATEWAY
 * POST /api/voice/make-call
 * * This route initiates a high-fidelity voice interaction through the SARA node.
 */
export async function POST(req: Request) {
  try {
    // 1. Parse the incoming request from the dashboard or onboarding
    const body = await req.json();
    const { phoneNumber, task, transferPhone, locale } = body;

    // 2. Validation: Ensure the neural destination is set
    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, error: 'Destination phone number is required.' },
        { status: 400 }
      );
    }

    // 3. Execution: Dispatch via the Centralized Service
    // This abstracts the Bland AI logic, making the route simpler
    const result = await blandAiService.makeCall({
      phoneNumber,
      task: task || `You are SARA, an AI receptionist for the ${locale || 'EN'} market. Be professional and secure a booking.`,
      transferPhone: transferPhone || undefined,
    });

    // 4. Response: Deliver Call ID for real-time monitoring
    if (result.success) {
      console.log(`✅ Neural link active: ${result.callId}`);
      return NextResponse.json({
        success: true,
        message: 'Neural link established. Call initiated.',
        callId: result.callId
      });
    } else {
      console.error(`❌ Handshake Failed: ${result.error}`);
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('CRITICAL GATEWAY ERROR:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error in Voice Gateway' },
      { status: 500 }
    );
  }
}
