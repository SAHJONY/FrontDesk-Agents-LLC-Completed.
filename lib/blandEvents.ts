// lib/blandEvents.ts
import { supabaseAdmin } from "@/lib/supabaseClient";

export type BlandCallStatus = "answered" | "missed" | "voicemail";

interface BlandCallPayload {
  call_id?: string;
  from?: string;
  to?: string;
  status?: BlandCallStatus;
  transcript?: string;
  summary?: string;
  revenue_estimate?: number;
  // añade otros campos que uses realmente
}

export async function storeCallFromBland(
  payload: BlandCallPayload,
  opts?: { tenantId?: string }
) {
  if (!supabaseAdmin) {
    throw new Error("Supabase admin client not configured");
  }

  const { tenantId } = opts || {};

  const { error } = await supabaseAdmin.from("calls").insert({
    // ajusta estos nombres a tu esquema real:
    external_id: payload.call_id ?? null,
    tenant_id: tenantId ?? null,
    from_number: payload.from ?? null,
    to_number: payload.to ?? null,
    status: payload.status ?? "answered",
    summary: payload.summary ?? payload.transcript ?? null,
    revenue_estimate: payload.revenue_estimate ?? null
  });

  if (error) {
    console.error("[storeCallFromBland] error inserting call:", error);
    throw error;
  }
}
