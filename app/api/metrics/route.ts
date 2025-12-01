// app/api/metrics/route.ts
import { NextResponse } from "next/server";
import { getTodayMetrics } from "@/lib/metrics";

export const runtime = "nodejs"; // usas Airtable SDK, mejor Node runtime

export async function GET() {
  try {
    const metrics = await getTodayMetrics();
    return NextResponse.json(metrics);
  } catch (err) {
    console.error("[API /metrics] Error generando métricas:", err);
    return NextResponse.json(
      { error: "Failed to load metrics" },
      { status: 500 }
    );
  }
}
