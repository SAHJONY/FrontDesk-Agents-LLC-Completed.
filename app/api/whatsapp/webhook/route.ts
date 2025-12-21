// app/api/whatsapp/webhook/route.ts
import { NextResponse } from 'next/server';
import { whatsappAgent } from '@/services/whatsappAgent';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const from = formData.get('From') as string;
    const to = formData.get('To') as string;
    const body = formData.get('Body') as string;
    const mediaUrl = formData.get('MediaUrl0') as string | undefined;

    // Process the message through WhatsApp agent
    const result = await whatsappAgent.processMessage({
      from: from.replace('whatsapp:', ''),
      to: to.replace('whatsapp:', ''),
      body,
      mediaUrl,
    });

    if (!result.success) {
      console.error('WhatsApp processing error:', result.error);
    }

    // Return empty TwiML response (agent already sent reply)
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
      <Response></Response>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/xml',
        },
      }
    );
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process WhatsApp webhook' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  // Handle Twilio webhook verification
  const { searchParams } = new URL(request.url);
  const hubChallenge = searchParams.get('hub.challenge');
  
  if (hubChallenge) {
    return new NextResponse(hubChallenge, { status: 200 });
  }

  return NextResponse.json({ message: 'WhatsApp webhook endpoint' });
}
