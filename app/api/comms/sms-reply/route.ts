import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { processLeadReply } from '@/lib/ai/booking-agent';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const incomingText = formData.get('Body') as string;
    const leadPhone = formData.get('From') as string;

    // 1. Generate the AI Response based on intent
    // (In a real app, you'd fetch the lead's name from Supabase using the phone number)
    const aiResponse = await processLeadReply(incomingText, "Valued Lead");

    // 2. Respond via Twilio (TwiML)
    const messagingResponse = new twilio.twiml.MessagingResponse();
    messagingResponse.message(aiResponse || "Got it. Let's get you booked.");

    return new NextResponse(messagingResponse.toString(), {
      headers: { 'Content-Type': 'text/xml' },
    });
  } catch (error) {
    console.error('[SMS RECEIVE ERROR]', error);
    return NextResponse.json({ error: 'Failed to process reply' }, { status: 500 });
  }
}
