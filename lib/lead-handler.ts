// lib/core/lead-handler.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface LeadData {
  full_name: string;
  phone_number: string;
  email?: string;
  source: 'web' | 'phone' | 'sms' | 'whatsapp' | 'referral';
  notes?: string;
  user_id?: string;
}

export interface LeadResponse {
  success: boolean;
  leadId?: string;
  error?: string;
}

/**
 * Core Lead Handler
 * Manages lead ingestion from all sources with <15s speed-to-lead
 */
export async function handleLead(leadData: LeadData): Promise<LeadResponse> {
  try {
    const {
      full_name,
      phone_number,
      email,
      source,
      notes,
      user_id,
    } = leadData;

    // Validate required fields
    if (!full_name || !phone_number) {
      return {
        success: false,
        error: 'Missing required fields: full_name and phone_number',
      };
    }

    // Insert into Supabase with the specific source tag
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          full_name,
          phone_number,
          email,
          source,
          notes,
          user_id,
          created_at: new Date().toISOString(),
          status: 'new',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Lead insertion error:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    // Trigger immediate follow-up (async, non-blocking)
    if (data) {
      triggerSpeedToLead(data.id, phone_number, source).catch(err =>
        console.error('Speed-to-lead trigger failed:', err)
      );
    }

    return {
      success: true,
      leadId: data.id,
    };
  } catch (error) {
    console.error('Lead handler error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Speed-to-Lead Engine
 * Initiates contact within 15 seconds
 */
async function triggerSpeedToLead(
  leadId: string,
  phoneNumber: string,
  source: string
): Promise<void> {
  try {
    // Determine best contact method based on source
    let contactMethod: 'call' | 'sms' | 'whatsapp' = 'call';

    if (source === 'sms') contactMethod = 'sms';
    if (source === 'whatsapp') contactMethod = 'whatsapp';

    // Trigger immediate outreach via appropriate channel
    await fetch('/api/calls/initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId,
        phoneNumber,
        method: contactMethod,
        priority: 'immediate',
      }),
    });

    // Log the speed-to-lead action
    await supabase.from('speed_to_lead_logs').insert({
      lead_id: leadId,
      phone_number: phoneNumber,
      contact_method: contactMethod,
      initiated_at: new Date().toISOString(),
    });

    console.log(`Speed-to-lead triggered for ${phoneNumber} via ${contactMethod}`);
  } catch (error) {
    console.error('Speed-to-lead execution error:', error);
    throw error;
  }
}

/**
 * Batch Lead Import
 * For CSV uploads and bulk imports
 */
export async function handleBatchLeads(
  leads: Omit<LeadData, 'user_id'>[],
  userId: string
): Promise<{ success: number; failed: number; errors: string[] }> {
  let success = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const lead of leads) {
    const result = await handleLead({ ...lead, user_id: userId });

    if (result.success) {
      success++;
    } else {
      failed++;
      errors.push(`${lead.phone_number}: ${result.error}`);
    }
  }

  return { success, failed, errors };
}

/**
 * Lead Qualification Score
 * Quick scoring algorithm for prioritization
 */
export function calculateLeadScore(lead: LeadData): number {
  let score = 0;

  // Source weight
  const sourceWeight: Record<string, number> = {
    web: 5,
    phone: 10,
    whatsapp: 7,
    sms: 6,
    referral: 15,
  };
  score += sourceWeight[lead.source] || 0;

  // Has email = more complete lead
  if (lead.email) score += 5;

  // Has notes = more context
  if (lead.notes && lead.notes.length > 20) score += 3;

  return Math.min(score, 100); // Cap at 100
}

export default {
  handleLead,
  handleBatchLeads,
  calculateLeadScore,
};
