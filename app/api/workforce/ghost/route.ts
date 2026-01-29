import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { callId, text } = await req.json();

  try {
    const response = await fetch(`https://api.bland.ai/v1/calls/${callId}/speak`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': process.env.BLAND_API_KEY as string
      },
      body: JSON.stringify({ text })
    });

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Voice Bridge Failed" }, { status: 500 });
  }
}
