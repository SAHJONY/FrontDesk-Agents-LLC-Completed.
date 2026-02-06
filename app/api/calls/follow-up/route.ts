import { NextResponse } from 'next/server';
import { sendFollowUpSMS } from '@/lib/sms';

/**
 * Enterprise Lead Engagement API
 * Dispatches automated SMS follow-ups immediately following AI Agent interaction.
 * Path: /api/calls/follow-up
 */
export async function POST(req: Request) {
  try {
    const { phoneNumber, customerName, intent, agentId } = await req.json();

    // Validate essential lead data
    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Incomplete payload: phoneNumber is required for SMS dispatch.' },
        { status: 400 }
      );
    }

    // Professional, conversion-optimized message template
    const message = `Hi ${customerName || 'there'}! This is the office of FrontDesk Agents. Our AI representative mentioned you were interested in ${intent || 'our services'}. Would you like to finalize your booking now? Secure Link: https://frontdeskagents.com/book`;

    // Execute SMS dispatch via the enterprise SMS utility
    const success = await sendFollowUpSMS(phoneNumber, message);

    if (success) {
      // Log successful outreach for the Fleet Telemetry dashboard
      console.log(`[OUTREACH] Follow-up SMS successfully dispatched to ${phoneNumber} (Agent: ${agentId})`);
      return NextResponse.json({ 
        success: true, 
        message: 'Follow-up communication successfully queued.' 
      });
    } else {
      throw new Error('SMS Provider returned a non-success response.');
    }
  } catch (error: any) {
    console.error(`[CRITICAL] Lead Automation Error: ${error.message}`);
    return NextResponse.json(
      { error: 'Communication infrastructure failure. Please verify SMS provider status.' },
      { status: 500 }
    );
  }
}
