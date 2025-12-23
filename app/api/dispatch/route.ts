// app/api/dispatch/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Emergency Triage Dispatcher
 * Identifies if a call/message is CRITICAL EMERGENCY or ROUTINE APPOINTMENT
 */

interface DispatchRequest {
  customerId: string;
  message: string;
  phoneNumber: string;
  timestamp: string;
  source: 'phone' | 'sms' | 'whatsapp' | 'web';
}

interface TriageResult {
  priority: 'EMERGENCY' | 'URGENT' | 'ROUTINE';
  category: string;
  dispatchNeeded: boolean;
  technicianId?: string;
  estimatedResponse: string;
  notes: string;
}

const EMERGENCY_KEYWORDS = [
  'burst', 'pipe', 'flood', 'water', 'leak', 'no heat', 'no power',
  'gas', 'smell', 'smoke', 'fire', 'emergency', 'urgent', 'broken',
  'not working', 'overflow', 'backup', 'sewage'
];

const HVAC_EMERGENCIES = ['no heat', 'no cooling', 'ac broken', 'furnace out'];
const PLUMBING_EMERGENCIES = ['burst pipe', 'flood', 'no water', 'backup', 'sewage'];
const ELECTRICAL_EMERGENCIES = ['no power', 'sparks', 'burning smell', 'breaker'];

export async function POST(req: Request) {
  try {
    const body: DispatchRequest = await req.json();
    const { customerId, message, phoneNumber, timestamp, source } = body;

    // Perform triage analysis
    const triageResult = performTriage(message);

    // Log the dispatch request
    await supabase.from('dispatch_logs').insert({
      customer_id: customerId,
      message,
      phone_number: phoneNumber,
      source,
      priority: triageResult.priority,
      category: triageResult.category,
      dispatch_needed: triageResult.dispatchNeeded,
      created_at: timestamp || new Date().toISOString(),
    });

    // If emergency, notify on-call technician
    if (triageResult.priority === 'EMERGENCY' && triageResult.dispatchNeeded) {
      await dispatchTechnician(triageResult, phoneNumber, message);
    }

    return NextResponse.json({
      success: true,
      triage: triageResult,
      message: triageResult.dispatchNeeded
        ? `Emergency dispatch initiated. Technician ${triageResult.technicianId} notified.`
        : 'Appointment scheduling in progress.',
    });
  } catch (error) {
    console.error('Dispatch error:', error);
    return NextResponse.json(
      { error: 'Dispatch failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function performTriage(message: string): TriageResult {
  const lowerMessage = message.toLowerCase();

  // Check for emergency keywords
  const hasEmergency = EMERGENCY_KEYWORDS.some(keyword =>
    lowerMessage.includes(keyword)
  );

  // Categorize the emergency type
  let category = 'GENERAL';
  if (HVAC_EMERGENCIES.some(kw => lowerMessage.includes(kw))) {
    category = 'HVAC';
  } else if (PLUMBING_EMERGENCIES.some(kw => lowerMessage.includes(kw))) {
    category = 'PLUMBING';
  } else if (ELECTRICAL_EMERGENCIES.some(kw => lowerMessage.includes(kw))) {
    category = 'ELECTRICAL';
  }

  // Determine priority
  let priority: 'EMERGENCY' | 'URGENT' | 'ROUTINE' = 'ROUTINE';
  let dispatchNeeded = false;
  let estimatedResponse = '24-48 hours';

  if (hasEmergency) {
    priority = 'EMERGENCY';
    dispatchNeeded = true;
    estimatedResponse = '15-30 minutes';
  } else if (lowerMessage.includes('urgent') || lowerMessage.includes('today')) {
    priority = 'URGENT';
    estimatedResponse = '2-4 hours';
  }

  return {
    priority,
    category,
    dispatchNeeded,
    estimatedResponse,
    notes: `Detected ${priority} priority ${category} issue`,
  };
}

async function dispatchTechnician(
  triage: TriageResult,
  customerPhone: string,
  message: string
): Promise<void> {
  try {
    // Get on-call technician for this category
    const { data: technician } = await supabase
      .from('technicians')
      .select('*')
      .eq('category', triage.category)
      .eq('on_call', true)
      .single();

    if (!technician) {
      console.error('No on-call technician available for', triage.category);
      return;
    }

    // Send SMS to technician
    await fetch('/api/sms/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: technician.phone,
        from: process.env.TWILIO_PHONE_NUMBER,
        message: `🚨 EMERGENCY DISPATCH
Category: ${triage.category}
Customer: ${customerPhone}
Issue: ${message.substring(0, 100)}
ETA Required: ${triage.estimatedResponse}

Reply ACCEPT to claim job.`,
      }),
    });

    // Call technician if no response in 2 minutes (handled by separate worker)
    await supabase.from('dispatch_queue').insert({
      technician_id: technician.id,
      customer_phone: customerPhone,
      priority: triage.priority,
      category: triage.category,
      message,
      dispatched_at: new Date().toISOString(),
      status: 'PENDING',
    });

    console.log(`Emergency dispatched to ${technician.name} for ${triage.category}`);
  } catch (error) {
    console.error('Technician dispatch error:', error);
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'Emergency Triage Dispatcher',
    status: 'operational',
    categories: ['HVAC', 'PLUMBING', 'ELECTRICAL'],
  });
}
