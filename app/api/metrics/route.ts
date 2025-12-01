import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import { resolveTenantContextFromRequest } from "@/lib/tenantContext";

function getDateRange(range: string | null) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (range === "7d") {
    const start = new Date(today);
    start.setDate(start.getDate() - 6);
    return { start, end: now };
  }
  if (range === "30d") {
    const start = new Date(today);
    start.setDate(start.getDate() - 29);
    return { start, end: now };
  }

  // default: hoy
  return { start: today, end: now };
}

export async function GET(req: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase not configured on server" },
      { status: 500 }
    );
  }

  try {
    const url = new URL(req.url);
    const rangeParam = url.searchParams.get("range"); // "today" | "7d" | "30d"
    const { start, end } = getDateRange(rangeParam);
    const startIso = start.toISOString();
    const endIso = end.toISOString();

    const { tenantId } = await resolveTenantContextFromRequest(req);

    const baseFilter = (query: any) => {
      let q = query.gte("created_at", startIso).lte("created_at", endIso);
      if (tenantId) {
        q = q.eq("tenant_id", tenantId);
      }
      return q;
    };

    // Calls
    const { data: calls, error: callsError } = await baseFilter(
      supabaseAdmin
        .from("calls")
        .select("id, from_number, status, summary, revenue_estimate, created_at, tenant_id")
        .order("created_at", { ascending: false })
    );

    if (callsError) throw callsError;

    // Leads
    const leadsQuery = supabaseAdmin
      .from("leads")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startIso)
      .lte("created_at", endIso);

    const { count: leadsCount, error: leadsError } = tenantId
      ? leadsQuery.eq("tenant_id", tenantId)
      : leadsQuery;

    if (leadsError) throw leadsError;

    // Appointments (usamos start_time como referencia)
    let apptsQuery = supabaseAdmin
      .from("appointments")
      .select("id", { count: "exact", head: true })
      .gte("start_time", startIso)
      .lte("start_time", endIso);

    if (tenantId) {
      apptsQuery = apptsQuery.eq("tenant_id", tenantId);
    }

    const { count: apptsCount, error: apptsError } = await apptsQuery;
    if (apptsError) throw apptsError;

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

    const metrics = {
      totalCallsToday,
      answeredCallsToday,
      missedCallsToday,
      newLeadsToday: leadsCount ?? 0,
      appointmentsToday: apptsCount ?? 0,
      estimatedRevenueToday,
      currency: "USD"
    };

    const recentCalls =
      calls?.slice(0, 50).map((c) => ({
        id: String(c.id),
        when: new Date(c.created_at).toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }),
        from: c.from_number ?? "Unknown",
        status: c.status ?? "answered",
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
