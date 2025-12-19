// lib/pipeline.ts
import { createClient } from '@supabase/supabase-js';

// Initialize the admin client directly to ensure it uses the Service Role Key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface LeadPayload {
  lead_id?: string;
  name?: string;
  phone?: string;
  email?: string;
  source?: string;
  status?: string;
}

/**
 * Inserta o actualiza un lead en la tabla "leads_pipeline"
 * usando el cliente admin de Supabase.
 */
export async function upsertLeadInPipeline(payload: LeadPayload) {
  const { lead_id, ...rest } = payload;

  const { data, error } = await supabaseAdmin
    .from("leads_pipeline")
    .upsert(
      [
        {
          id: lead_id,
          ...rest,
        },
      ],
      {
        onConflict: "id",
        ignoreDuplicates: false,
      }
    )
    .select()
    .single();

  if (error) {
    console.error("[pipeline] Error upserting lead:", error);
    throw error;
  }

  return data;
}
