import { NextRequest, NextResponse } from 'next/server';
import { parseBlandWebhook } from '../../../Telephony/blandai-config';
import { BASE_PRICES } from '../../../services/prices';

/**
 * GLOBAL REVENUE WORKFORCE - TELEPHONY WEBHOOK HANDLER
 * Processes real-time data from Bland.AI to update sales metrics.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // 1. Parse the incoming workforce data from Bland.AI
    const callData = parseBlandWebhook(body);

    // 2. Log activity for the Global Revenue Workforce dashboard
    console.log(`[Workforce Activity]: Call ${callData.callId} status: ${callData.status}`);

    // 3. Handle Completed Sales/Calls
    if (callData.status === 'completed') {
      // In a production environment, you would update your database here:
      // - Update app/dashboard/outbound metrics
      // - Trigger Success Fee logic if the partner is on the Elite ($1,499) tier
      
      const isElitePartner = true; // Placeholder for DB lookup [cite: 2025-12-28]
      
      if (isElitePartner && callData.analysis?.revenue_generated > 0) {
        const successFee = callData.analysis.revenue_generated * 0.15;
        console.log(`[Success Fee Triggered]: $${successFee} for Elite Partner.`);
      }
    }

    return NextResponse.json({ 
      received: true, 
      fleet_status: 'synchronized' 
    }, { status: 200 });

  } catch (error) {
    console.error('[Webhook Error]:', error);
    return NextResponse.json({ error: 'Fleet synchronization failed' }, { status: 500 });
  }
}
