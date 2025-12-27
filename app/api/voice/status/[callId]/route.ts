import { NextResponse } from 'next/server';

// FIXED: params must be treated as a Promise in Next.js 15
export async function GET(
  request: Request,
  { params }: { params: Promise<{ callId: string }> }
) {
  const { callId } = await params;

  try {
    // Your logic to fetch call status using callId
    return NextResponse.json({ success: true, callId, status: 'completed' });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
