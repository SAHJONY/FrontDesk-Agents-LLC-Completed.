// app/api/sms/webhook/route.ts
// Handle incoming SMS messages from Twilio

import { NextRequest, NextResponse } from 'next/server';
import { smsConcierge } from '@/services/smsConcierge';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const from = formData.get('From') as string;
    const to = formData.get('To') as string;
    const body = formData.get('Body') as string;
    
    // Extract business ID from phone number mapping
    const businessId = await getBusinessIdFromPhone(to);
    
    if (!businessId) {
      return NextResponse.json(
        { error: 'Phone number not registered' },
        { status: 404 }
      );
    }

    // Process message with AI
    const response = await smsConcierge.handleInboundSMS(
      from,
      to,
      body,
      businessId
    );

    // Return TwiML response
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${response}</Message>
</Response>`,
      {
        headers: {
          'Content-Type': 'text/xml',
        },
      }
    );
  } catch (error) {
    console.error('SMS webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process SMS' },
      { status: 500 }
    );
  }
}

// Helper function
async function getBusinessIdFromPhone(phone: string): Promise<string | null> {
  // Query database to find business by phone number
  // Simplified for now
  return 'business-123';
}

// app/api/sms/send/route.ts
export async function POST(request: NextRequest) {
  try {
    const { from, to, message } = await request.json();

    await smsConcierge.sendSMS(from, to, message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('SMS send error:', error);
    return NextResponse.json(
      { error: 'Failed to send SMS' },
      { status: 500 }
    );
  }
}

// app/api/sms/campaign/route.ts
export async function POST(request: NextRequest) {
  try {
    const { from, recipients, message } = await request.json();

    const results = await smsConcierge.sendBulkSMS(from, recipients, message);

    return NextResponse.json({
      success: true,
      sent: results.sent,
      failed: results.failed,
    });
  } catch (error) {
    console.error('SMS campaign error:', error);
    return NextResponse.json(
      { error: 'Failed to send campaign' },
      { status: 500 }
    );
  }
}
