// app/api/metrics/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

// ❗ SUPOSICIONES DE ESQUEMA (ajusta a tu SQL real):
// Tabla `calls`:
//   - id (uuid)
//   - tenant_id (uuid o text) -> multi-tenant
//   - from_number (text)
//   - status (text: 'answered' | 'missed' | 'voicemail')
//   - summary (text, opcional)
//   - revenue_estimate (numeric, opcional)
//   - created_at (timestamptz)
//
// Tabla `leads`:
//   - id, tenant_id, created_at, ... (usamos count por fecha)
//
// Tabla `appointments`:
//   - id, tenant_id, start_time (timestamptz), ... (usamos count por fecha)

type CallStatus = "answered" | "missed" | "voicemail";

interface Metrics {
  totalCallsToday: number;
  answeredCallsToday: number;
  missedCallsToday: number;
  newLeadsToday: number;
  appointmentsToday: number;
  estimatedRevenueToday: number;
  currency: string;
}

interface RecentCall {
  id: string;
  when: string;
  from: string;
  status: CallStatus;
  summary: string | null;
}

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase not configured on server" },
      { status: 500 }
    );
  }

  try {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfDayIso = startOfDay.toISOString();

    // TODO: Si quieres filtrar por tenant, añade .eq("tenant_id", "<TENANT_ID>")
    // o calcula tenant_id en función del dominio/usuario.

    // 1) Llamadas de hoy
    const { data: calls, error: callsError } = await supabaseAdmin
      .from("calls")
      .select("id, from_number, status, summary, revenue_estimate, created_at")
      .gte("created_at", startOfDayIso)
      .order("created_at", { ascending: false });

    if (callsError) {
      console.error("[metrics] Error loading calls:", callsError);
      throw callsError;
    }

    const totalCallsToday = calls?.length ?? 0;
    const answeredCallsToday =
      calls?.filter((c) => c.status === "answered").length ?? 0;
    const missedCallsToday =
      calls?.filter((c) => c.status === "missed").length ?? 0;
    const estimatedRevenueToday =
      calls?.reduce(
        (sum, c) => sum + (Number(c.revenue_estimate) || 0),
        0
      ) ?? 0;

    // 2) Leads creados hoy
    const { count: leadsCount, error: leadsError } = await supabaseAdmin
      .from("leads")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfDayIso);

    if (leadsError) {
      console.error("[metrics] Error loading leads:", leadsError);
      throw leadsError;
    }

    // 3) Citas de hoy
    // Suposición: appointments.start_time almacena fecha/hora de la cita
    const { count: apptsCount, error: apptsError } = await supabaseAdmin
      .from("appointments")
      .select("id", { count: "exact", head: true })
      .gte("start_time", startOfDayIso);

    if (apptsError) {
      console.error("[metrics] Error loading appointments:", apptsError);
      throw apptsError;
    }

    const metrics: Metrics = {
      totalCallsToday,
      answeredCallsToday,
      missedCallsToday,
      newLeadsToday: leadsCount ?? 0,
      appointmentsToday: apptsCount ?? 0,
      estimatedRevenueToday,
      currency: "USD"
    };

    const recentCalls: RecentCall[] =
      calls?.slice(0, 20).map((c) => ({
        id: String(c.id),
        when: new Date(c.created_at).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        }),
        from: c.from_number ?? "Unknown",
        status: (c.status as CallStatus) ?? "answered",
        summary: c.summary ?? null
      })) ?? [];

    return NextResponse.json({ metrics, recentCalls }, { status: 200 });
  } catch (error) {
    console.error("[metrics] Unexpected error:", error);
    return NextResponse.json(
      { error: "Failed to load metrics from Supabase" },
      { status: 500 }
    );
  }
}
