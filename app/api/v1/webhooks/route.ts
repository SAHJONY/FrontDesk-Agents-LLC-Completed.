import { NextResponse } from 'next/server';
import { aiCeoAgent } from '@/services/automation.service';

/**
 * GLOBAL GATEWAY: The AI CEO's Communication Channel
 * This route receives signals from all 15 products worldwide.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Extract Global Context and Industry Intelligence
    const industryContext = req.headers.get('x-industry-type') || 'GENERAL';
    const region = req.headers.get('x-region') || 'US-EAST';
    const productId = req.headers.get('x-product-id') || body.productId || 'UNKNOWN';

    console.log(`[GATEWAY] Inbound signal for ${productId} in industry ${industryContext}`);

    // 2. The AI CEO takes the wheel
    // Orchestrates the 15 products based on region and industry RL policies
    const response = await aiCeoAgent.orchestrate({
      productId,
      industry: industryContext,
      region: region,
      payload: body,
      // Pass clientId if present to maintain cross-product memory
      clientId: body.clientId 
    });

    // 3. HIPAA & Global Standard Response
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: response
    });

  } catch (error: any) {
    console.error('[CEO HANDOFF FAILED]', error);
    
    // Return standardized error for global clients
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'CEO Handoff Failed',
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}
