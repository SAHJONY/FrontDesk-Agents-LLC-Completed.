import { NextRequest, NextResponse } from 'next/server';

/**
 * @name WebhookHandler
 * @description Serves as the local entry point for infrastructure signals
 */
export async function POST(req: NextRequest) {
  try {
    // We parse the JSON to ensure it's a valid request
    const body = await req.json();
    
    // Log the incoming signal for the Revenue Recovery audit trail
    console.log('[Webhook Received]:', body?.call_id || 'System Signal');

    // Return success to the platform
    return NextResponse.json({ 
      status: 'success', 
      timestamp: new Date().toISOString() 
    }, { status: 200 });

  } catch (error: any) {
    console.error('[Webhook Error]:', error.message);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
