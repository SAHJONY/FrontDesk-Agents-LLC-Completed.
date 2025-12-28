import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { phoneNumber } = await req.json();

    const response = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'authorization': process.env.BLAND_AI_API_KEY!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        task: "You are the FrontDesk Agents Executive Assistant. You are calling a business owner to demonstrate your human-like capabilities. Speak about the $399 Professional tier and explain that you can handle all their bookings and FAQs with zero latency. Be polite, authoritative, and high-fidelity.",
        voice: "Nat", // Or your preferred high-quality voice
        wait_for_greeting: true
      })
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Call Failed' }, { status: 500 });
  }
}
