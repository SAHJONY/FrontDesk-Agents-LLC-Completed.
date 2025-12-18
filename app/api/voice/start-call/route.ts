import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { phoneNumber, clientName } = await req.json()
    
    const response = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'authorization': process.env.BLAND_AI_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        task: `
          # ROLE: Alex, Front Desk Manager for ${clientName}.
          # PATIENCE PROTOCOL: 
          - Callers take time to think. Wait 4 seconds after they pause.
          - If silence exceeds 6 seconds, say: "I'm still here, take your time."
          - If they are still silent after 10 seconds, say: "Are you still there? I'm ready when you are."
          # GOAL: Book appointments and answer FAQs concisely.
        `,
        voice: "nat",
        model: "enhanced",
        patience_level: "high", // Critical for silence handling
        interruption_threshold: 200,
        background_track: "office",
        wait_for_greeting: true,
      }),
    })

    const data = await response.json()
    return NextResponse.json({ success: true, callId: data.call_id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
