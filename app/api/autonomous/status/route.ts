// app/api/autonomous/status/route.ts
import { NextResponse } from "next/server";

// Force Node.js runtime
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Return stub data for autonomous agent status
    return NextResponse.json({
      success: true,
      data: {
        status: "idle",
        enabled: false,
        lastActivity: null,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("❌ Autonomous status error:", error);
    return NextResponse.json(
      { error: "Failed to fetch autonomous status" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Handle POST requests (e.g., updating autonomous agent status)
    const body = await req.json().catch(() => ({}));

    return NextResponse.json({
      success: true,
      data: {
        status: body.status || "idle",
        enabled: body.enabled || false,
        lastActivity: new Date().toISOString(),
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("❌ Autonomous status POST error:", error);
    return NextResponse.json(
      { error: "Failed to update autonomous status" },
      { status: 500 }
    );
  }
}
