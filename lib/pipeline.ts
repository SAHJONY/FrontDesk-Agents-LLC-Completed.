// lib/pipeline.ts
import { supabaseAdmin } from "@/lib/supabaseClient";

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
  const supabase = supabaseAdmin;

  if (!supabase) {
    throw new Error("Supabase admin client not initialized");
  }

  const { lead_id, ...rest } = payload;

  const { data, error } = await supabase
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
