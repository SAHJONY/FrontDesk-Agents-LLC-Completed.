import { NextRequest, NextResponse } from "next/server";
// import { requireSupabaseServer } from "@/lib/supabase-server";

export const runtime = "nodejs";

/**
 * POST /api/ai/orchestrate
 * Orchestrates multi-agent workflows (placeholder-safe).
 * NOTE: This endpoint is intentionally lightweight to avoid build/runtime crashes.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const goal = String(body?.goal || "").trim();
    const agentIds = Array.isArray(body?.agentIds) ? body.agentIds : [];
    const context = body?.context ?? {};

    if (!goal) {
      return NextResponse.json({ error: "Missing 'goal'" }, { status: 400 });
    }

    // Placeholder response (production-safe). Wire orchestration here when ready.
    return NextResponse.json({
      ok: true,
      message: "Orchestration accepted (noop)",
      goal,
      agentIds,
      context,
    });
  } catch (error: any) {
    console.error("❌ Orchestrate error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
