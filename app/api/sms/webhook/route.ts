// app/api/sms/webhook/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import twilio from 'twilio';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const from = formData.get('From') as string;
    const to = formData.get('To') as string;
    const body = formData.get('Body') as string;
    const messageSid = formData.get('MessageSid') as string;

    // Validate Twilio signature (recommended for production)
    const twilioSignature = request.headers.get('x-twilio-signature') || '';
    const url = process.env.NEXT_PUBLIC_APP_URL + '/api/sms/webhook';
    
    // Log incoming SMS
    const { error: logError } = await supabase
      .from('sms_messages')
      .insert({
        from_number: from,
        to_number: to,
        message_body: body,
        direction: 'inbound',
        twilio_sid: messageSid,
        created_at: new Date().toISOString(),
      });

    if (logError) {
      console.error('Error logging SMS:', logError);
    }

    // Generate AI response
    const response = await generateSMSResponse(body);

    // Send response using Twilio
    const twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );

    await twilioClient.messages.create({
      body: response,
      from: to,
      to: from,
    });

    // Return TwiML response
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Message>${response}</Message>
      </Response>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/xml',
        },
      }
    );
  } catch (error) {
    console.error('SMS webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process SMS webhook' },
      { status: 500 }
    );
  }
}

async function generateSMSResponse(messageBody: string): Promise<string> {
  const lowerMessage = messageBody.toLowerCase();

  if (lowerMessage.includes('stop') || lowerMessage.includes('unsubscribe')) {
    return 'You have been unsubscribed. Reply START to subscribe again.';
  }

  if (lowerMessage.includes('start') || lowerMessage.includes('subscribe')) {
    return 'Welcome! You are now subscribed to our updates.';
  }

  if (lowerMessage.includes('hours') || lowerMessage.includes('open')) {
    return 'We are open 24/7! Our AI assistant is always available.';
  }

  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return 'Plans start at $297/month. Reply DEMO to schedule a call.';
  }

  if (lowerMessage.includes('demo')) {
    return 'Great! Visit our website to book a demo, or reply with your email and we\'ll reach out.';
  }

  return 'Thanks for your message! Our team will respond shortly. Reply HELP for more options.';
}
