import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * NEURAL TELEMETRY WEBHOOK
 * POST /api/voice/webhook
 * Handled by Bland AI after call completion.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { call_id, transcript, duration, status, variables, price } = body;

    console.log(`📡 Telemetry Received for Call: ${call_id} [Status: ${status}]`);

    // 1. FORENSIC RECORDING
    // We update the existing consumption record or create a new detailed log
    await db.call_logs.create({
      data: {
        call_id: call_id,
        transcript: transcript || "No transcript provided",
        duration: parseFloat(duration) || 0,
        cost: parseFloat(price) || 0,
        status: status,
        metadata: variables || {}, // Capture any variables extracted (e.g., {{user_name}})
        created_at: new Date()
      }
    });

    // 2. ANALYTICS TRIGGER
    // Logic: If the call status is 'completed' and duration > 30s, 
    // we can assume a successful engagement for the ROI dashboard.
    if (status === 'completed' && duration > 0.5) {
       await db.analytics_summary.upsert({
         where: { id: 'global_metrics' },
         update: { 
           total_minutes: { increment: parseFloat(duration) },
           total_calls: { increment: 1 }
         },
         create: { 
           id: 'global_metrics', 
           total_minutes: parseFloat(duration), 
           total_calls: 1 
         }
       });
    }

    return NextResponse.json({ success: true, message: 'Telemetry Logged' }, { status: 200 });

  } catch (error) {
    console.error('❌ Webhook Ingestion Failed:', error);
    return NextResponse.json({ error: 'Internal Webhook Error' }, { status: 500 });
  }
}
