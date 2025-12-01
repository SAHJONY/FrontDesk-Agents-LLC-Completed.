// app/api/webhooks/call-events/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createCallEvent } from "@/lib/airtable";

export const runtime = "nodejs"; // Necesario para usar el SDK de Airtable (Node APIs)

/**
 * Webhook para eventos de llamadas (Bland.ai / Twilio / etc.).
 * Espera un JSON en el body con información de la llamada.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Campos comunes que suelen mandar Bland.ai / Twilio
    const from: string =
      body.from ||
      body.caller_number ||
      body.customer_number ||
      body.from_number ||
      "";
    const to: string =
      body.to ||
      body.called_number ||
      body.agent_number ||
      body.to_number ||
      "";
    const status: string = body.status || body.event || body.call_status || "";
    const direction: string = body.direction || "";

    const durationSeconds: number | undefined =
      typeof body.duration === "number"
        ? body.duration
        : typeof body.call_duration === "number"
        ? body.call_duration
        : undefined;

    const recordingUrl: string =
      body.recording_url ||
      body.recordingUrl ||
      body.recording ||
      body.recording_url_https ||
      "";

    const transcript: string =
      body.transcript || body.transcription || body.summary || "";

    // Guardar en Airtable (si está configurado)
    await createCallEvent({
      from,
      to,
      status,
      direction,
      durationSeconds,
      recordingUrl,
      transcript,
      provider: "Bland.ai",
      meta: body,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[call-events webhook] Error:", err);
    return NextResponse.json(
      { ok: false, error: "webhook-error" },
      { status: 500 }
    );
  }
}

/**
 * Opcional: soportar GET para ver que la ruta está viva.
 */
export async function GET() {
  return NextResponse.json({ ok: true, message: "Call events webhook live" });
}
