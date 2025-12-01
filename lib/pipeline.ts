import { supabaseAdmin } from "@/lib/supabaseClient";

interface LeadPayload {
  lead_id?: string;
  tenantId?: string;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  source?: string | null; // "bland_call", "web_form", etc.
  notes?: string | null;
}

interface AppointmentPayload {
  appointment_id?: string;
  tenantId?: string;
  lead_id?: string | null;
  phone?: string | null;
  start_time?: string; // ISO string
  duration_minutes?: number | null;
  channel?: string | null; // "phone", "zoom", etc.
  notes?: string | null;
}

export async function storeLead(payload: LeadPayload) {
  if (!supabaseAdmin) throw new Error("Supabase admin client not configured");

  const { error } = await supabaseAdmin.from("leads").insert({
    external_id: payload.lead_id ?? null,
    tenant_id: payload.tenantId ?? null,
    name: payload.name ?? null,
    phone: payload.phone ?? null,
    email: payload.email ?? null,
    source: payload.source ?? "bland_call",
    notes: payload.notes ?? null
  });

  if (error) {
    console.error("[storeLead] error inserting lead:", error);
    throw error;
  }
}

export async function storeAppointment(payload: AppointmentPayload) {
  if (!supabaseAdmin) throw new Error("Supabase admin client not configured");

  const { error } = await supabaseAdmin.from("appointments").insert({
    external_id: payload.appointment_id ?? null,
    tenant_id: payload.tenantId ?? null,
    lead_id: payload.lead_id ?? null,
    phone: payload.phone ?? null,
    start_time: payload.start_time ?? null,
    duration_minutes: payload.duration_minutes ?? null,
    channel: payload.channel ?? "phone",
    notes: payload.notes ?? null
  });

  if (error) {
    console.error("[storeAppointment] error inserting appointment:", error);
    throw error;
  }
}
