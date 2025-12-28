import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { call_id, transcript } = payload;

    // Log the AI interaction for the Sovereign Knowledge Vault
    console.log(`AI Interaction logged for Call: ${call_id}`);

    // Return success to Bland AI
    return NextResponse.json({ status: 'received' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
