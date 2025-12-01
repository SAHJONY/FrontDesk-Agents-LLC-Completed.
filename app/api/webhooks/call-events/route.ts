// app/api/webhooks/call-events/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createCallEvent } from "@/lib/airtable";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const {
      from,
      to,
      status,
      direction,
      duration,
      recording_url,
      transcript,
      provider,
      ...rest
    } = body || {};

    await createCallEvent({
      from,
      to,
      status,
      direction,
      duration:
        typeof duration === "number"
          ? duration
          : typeof duration === "string"
          ? Number(duration)
          : undefined,
      recording_url,
      transcript,
      provider: provider || "bland.ai",
      raw: body
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[Webhook] Error en /api/webhooks/call-events:", error);
    return NextResponse.json(
      { ok: false, error: "Webhook processing error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "call-events" });
}
