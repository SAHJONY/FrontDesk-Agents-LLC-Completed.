// lib/core/lead-handler.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Expanded to include your 6 specialized verticals
export type VerticalSource = 
  | 'medical' 
  | 'dental' 
  | 'law' 
  | 'real-estate' 
  | 'property-management' 
  | 'home-services';

export interface LeadData {
  full_name: string;
  phone_number: string;
  email?: string;
  source: 'web' | 'phone' | 'sms' | 'whatsapp' | 'referral';
  vertical: VerticalSource; // New required field for ROI tracking
  notes?: string;
  user_id?: string;
  priority?: 'priority_1' | 'priority_2'; // Added for Emergency Triage
}

/**
 * Enhanced Lead Handler
 * Optimized for pdx1 edge performance and vertical-specific ROI reporting
 */
export async function handleLead(leadData: LeadData): Promise<LeadResponse> {
  try {
    const { full_name, phone_number, vertical, priority = 'priority_2' } = leadData;

    if (!full_name || !phone_number) {
      return { success: false, error: 'Missing required fields' };
    }

    // Insert with Vertical Tagging for the 5X ROI Guarantee
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          ...leadData,
          created_at: new Date().toISOString(),
          status: 'new',
          // Metadata used for Weekly Revenue Recovery Reports
          metadata: { 
            vertical: leadData.vertical,
            triage_priority: priority 
          }
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Trigger Speed-to-Lead (<15s) with Vertical-specific Prompting
    if (data) {
      triggerSpeedToLead(data.id, phone_number, leadData.source, vertical, priority)
        .catch(err => console.error('Dispatch failed:', err));
    }

    return { success: true, leadId: data.id };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Vertical-Aware Dispatch Engine
 */
async function triggerSpeedToLead(
  leadId: string,
  phoneNumber: string,
  source: string,
  vertical: VerticalSource,
  priority: string
): Promise<void> {
  // Logic to wake up technicians for Home Services Priority 1
  const isEmergency = vertical === 'home-services' && priority === 'priority_1';
  
  await fetch('/api/calls/initiate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      leadId,
      phoneNumber,
      vertical,
      isEmergency, // Triggers Redundancy Switch for HVAC/Plumbing
      priority
    }),
  });
}
