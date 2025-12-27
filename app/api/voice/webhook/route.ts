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
    // Captures the call and links it to the specific Business Workspace
    const callLog = await db.callLog.create({
      data: {
        blandCallId: call_id,
        businessId: metadata?.businessId, // Linked via Bland AI metadata object
        customerPhone: to,
        transcript: transcript || "No transcript provided",
        duration: Math.round(parseFloat(duration)) || 0,
        estimatedValue: parseFloat(price) || 0,
        status: status,
        summary: variables?.summary || "Pending RL Analysis",
        wasBooked: status === 'completed' && (transcript?.toLowerCase().includes('book') || variables?.booked === 'true'),
        createdAt: new Date()
      }
    });

    // 2. SOVEREIGN CRM LEAD UPDATE
    // Updates the Lead status based on SARA's conversation outcome
    if (metadata?.businessId) {
      await db.lead.upsert({
        where: { phone: to },
        update: { 
          status: status === 'completed' ? 'QUALIFIED' : 'FOLLOW_UP',
          lastContacted: new Date()
        },
        create: {
          phone: to,
          businessId: metadata.businessId,
          status: 'NEW'
        }
      });
    }

    // 3. AGENTIC HIVE-MIND PIVOT
    // If SARA didn't secure a booking, the Orchestrator takes over via WhatsApp/SMS
    const bookingConfirmed = status === 'completed' && transcript?.toLowerCase().includes('confirmed');
    
    if (!bookingConfirmed && metadata?.businessId) {
      console.log(`🔄 Pivot Triggered: Initiating Cross-Channel Follow-up for ${to}`);
      
      await agenticOrchestrator.handleCallOutcome(call_id, status, {
        phone: to,
        businessId: metadata.businessId,
        industry: metadata.industry,
        locale: metadata.locale || 'en-US'
      });
    }

    // 4. GLOBAL ROI ANALYTICS SYNC
    await db.platformStats.upsert({
      where: { id: 1 },
      update: { 
        totalCalls: { increment: 1 },
        totalBookings: { increment: bookingConfirmed ? 1 : 0 },
        totalRevenue: { increment: bookingConfirmed ? (metadata?.dealValue || 50) : 0 }
      },
      create: { 
        id: 1, 
        totalCalls: 1, 
        totalBookings: bookingConfirmed ? 1 : 0, 
        totalRevenue: bookingConfirmed ? (metadata?.dealValue || 50) : 0 
      }
    });

    return NextResponse.json({ 
      success: true, 
      agenticAction: !bookingConfirmed ? 'PIVOT_DISPATCHED' : 'CONVERSION_LOGGED' 
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Hive-Mind Ingestion Failed:', error);
    return NextResponse.json({ error: 'Orchestration Error' }, { status: 500 });
  }
}
