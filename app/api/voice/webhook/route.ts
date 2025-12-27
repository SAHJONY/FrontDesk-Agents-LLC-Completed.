import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { agenticOrchestrator } from '@/services/agenticOrchestrator';

/**
 * SOVEREIGN HIVE-MIND WEBHOOK
 * POST /api/voice/webhook
 * Integrates Voice Telemetry, CRM Lead Gen, and Agentic Pivot Logic.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      call_id, 
      transcript, 
      duration, 
      status, 
      variables, 
      price, 
      to, 
      metadata 
    } = body;

    console.log(`📡 Hive-Mind Signal: ${call_id} [Outcome: ${status}]`);

    // 1. FORENSIC CRM INGESTION
    // FIX: Updated from db.callLog to db.callLogs to match schema pluralization
    const callLog = await db.callLogs.create({
      data: {
        blandCallId: call_id,
        businessId: metadata?.businessId, // Linked via Bland AI metadata object
        customerPhone: to || "Unknown",
        transcript: transcript || "No transcript provided",
        duration: Math.round(parseFloat(duration || "0")) || 0,
        estimatedValue: parseFloat(price || "0") || 0,
        status: status || "unknown",
        summary: variables?.summary || "Pending RL Analysis",
        wasBooked: status === 'completed' && (
          transcript?.toLowerCase().includes('book') || 
          variables?.booked === 'true' || 
          variables?.booked === true
        ),
        createdAt: new Date()
      }
    });

    // 2. SOVEREIGN CRM LEAD UPDATE
    if (metadata?.businessId && to) {
      await db.lead.upsert({
        where: { phone: to },
        update: { 
          status: status === 'completed' ? 'QUALIFIED' : 'FOLLOW_UP',
          lastContacted: new Date()
        },
        create: {
          phone: to,
          businessId: metadata.businessId,
          status: 'NEW',
          lastContacted: new Date()
        }
      });
    }

    // 3. AGENTIC HIVE-MIND PIVOT
    const bookingConfirmed = status === 'completed' && 
      (transcript?.toLowerCase().includes('confirmed') || variables?.booked === 'true');
    
    if (!bookingConfirmed && metadata?.businessId) {
      console.log(`🔄 Pivot Triggered: Initiating Cross-Channel Follow-up for ${to}`);
      
      // Ensure the orchestrator is awaited to prevent background process hanging
      await agenticOrchestrator.handleCallOutcome(call_id, status, {
        phone: to,
        businessId: metadata.businessId,
        industry: metadata.industry,
        locale: metadata.locale || 'en-US'
      });
    }

    // 4. GLOBAL ROI ANALYTICS SYNC
    // Using an upsert to maintain the global dashboard "Pulse"
    await db.platformStats.upsert({
      where: { id: 1 },
      update: { 
        totalCalls: { increment: 1 },
        totalBookings: { increment: bookingConfirmed ? 1 : 0 },
        totalRevenue: { increment: bookingConfirmed ? (Number(metadata?.dealValue) || 50) : 0 }
      },
      create: { 
        id: 1, 
        totalCalls: 1, 
        totalBookings: bookingConfirmed ? 1 : 0, 
        totalRevenue: bookingConfirmed ? (Number(metadata?.dealValue) || 50) : 0 
      }
    });

    return NextResponse.json({ 
      success: true, 
      agenticAction: !bookingConfirmed ? 'PIVOT_DISPATCHED' : 'CONVERSION_LOGGED',
      logId: callLog.id
    }, { status: 200 });

  } catch (error: any) {
    console.error('❌ Hive-Mind Ingestion Failed:', error);
    return NextResponse.json({ 
      error: 'Orchestration Error', 
      details: error.message 
    }, { status: 500 });
  }
}
