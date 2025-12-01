// app/api/metrics/route.ts
import { NextResponse } from "next/server";
import { getTodayMetrics } from "@/lib/metrics";

export const runtime = "nodejs";

export async function GET() {
  try {
    const data = await getTodayMetrics();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Error fetching dashboard metrics", err);
    return NextResponse.json(
      { error: "Failed to load metrics" },
      { status: 500 }
    );
  }
}
