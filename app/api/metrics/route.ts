// app/api/metrics/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

type Range = "today" | "7d" | "30d";

interface CommandMetrics {
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
  status: "answered" | "missed" | "voicemail";
  summary: string;
}

interface ApiResponse {
  metrics: CommandMetrics;
  recentCalls: RecentCall[];
}

function getRangeDates(range: Range): { startIso: string; endIso: string } {
  const now = new Date();
  const end = new Date(now);
  const start = new Date(now);

  if (range === "today") {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
  } else if (range === "7d") {
    start.setDate(start.getDate() - 7);
  } else if (range === "30d") {
    start.setDate(start.getDate() - 30);
  }

  return {
    startIso: start.toISOString(),
    endIso: end.toISOString()
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rangeParam = (searchParams.get("range") as Range) || "today";
    const tenantId = searchParams.get("tenant");

    const range: Range =
      rangeParam === "7d" || rangeParam === "30d" ? rangeParam : "today";

    const { startIso, endIso } = getRangeDates(range);

    // ---------- CALLS: TOTAL ----------
    let callsQuery = supabase
      .from("calls")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startIso)
      .lte("created_at", endIso);

    if (tenantId) {
      callsQuery = callsQuery.eq("tenant_id", tenantId);
    }

    const {
      count: totalCallsToday = 0,
      error: callsError
    } = await callsQuery;

    if (callsError) {
      console.error("[metrics] callsError:", callsError.message);
    }

    // ---------- CALLS: ANSWERED ----------
    let answeredQuery = supabase
      .from("calls")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startIso)
      .lte("created_at", endIso)
      .eq("status", "answered");

    if (tenantId) {
      answeredQuery = answeredQuery.eq("tenant_id", tenantId);
    }

    const {
      count: answeredCallsToday = 0,
      error: answeredError
    } = await answeredQuery;

    if (answeredError) {
      console.error("[metrics] answeredError:", answeredError.message);
    }

    // ---------- CALLS: MISSED ----------
    let missedQuery = supabase
      .from("calls")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startIso)
      .lte("created_at", endIso)
      .eq("status", "missed");

    if (tenantId) {
      missedQuery = missedQuery.eq("tenant_id", tenantId);
    }

    const {
      count: missedCallsToday = 0,
      error: missedError
    } = await missedQuery;

    if (missedError) {
      console.error("[metrics] missedError:", missedError.message);
    }

    // ---------- LEADS: NEW LEADS ----------
    let leadsQuery = supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startIso)
      .lte("created_at", endIso);

    if (tenantId) {
      leadsQuery = leadsQuery.eq("tenant_id", tenantId);
    }

    const {
      count: newLeadsToday = 0,
      error: leadsError
    } = await leadsQuery;

    if (leadsError) {
      console.error("[metrics] leadsError:", leadsError.message);
    }

    // ---------- APPOINTMENTS + ESTIMATED REVENUE ----------
    let appointmentsQuery = supabase
      .from("appointments")
      .select("id, created_at, estimated_value", { head: false })
      .gte("created_at", startIso)
      .lte("created_at", endIso);

    if (tenantId) {
