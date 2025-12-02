// app/api/webhooks/call-events/route.ts

import { NextRequest, NextResponse } from "next/server";
import {
  storeCallFromBland,
  storeLead,
  storeAppointment
} from "@/lib/blandEvents";

/**
 * Webhook de Bland.ai para eventos de llamada.
 *
 * v1: Solo enruta el payload a stubs que loguean y aceptan tenantId opcional.
 * Más adelante se conecta a Supabase para guardar calls, leads y citas.
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Ejemplo de payload esperado (simplificado):
    // {
    //   "event": "call.completed",
    //   "call_id": "...",
    //   "from": "+1...",
    //   "to": "+1...",
    //   "status": "answered" | "missed" | "voicemail",
    //   "lead": { ... },
    //   "appointment": { ... },
    //   "tenant_id": "..." (opcional)
    // }

    const event = body?.event as string | undefined;
    const tenantId: string | undefined =
      body?.tenant_id || body?.tenant || body?.tenantId || undefined;

    const basePayload = {
      call_id: body?.call_id,
      from: body?.from,
      to: body?.to,
      status: body?.status,
      raw: body
    };

    // 1) Siempre registramos el evento de llamada
    await storeCallFromBland(
      { ...basePayload, event },
      { tenantId }
    );

    // 2) Si Bland marca que hay lead asociado, lo pasamos a storeLead
    if (body?.lead) {
      await storeLead(
        {
          lead: body.lead,
          call_id: body.call_id,
          source: "bland_call"
        },
        { tenantId }
      );
    }

    // 3) Si hay información de cita, lo pasamos a storeAppointment
    if (body?.appointment) {
      await storeAppointment(
        {
          appointment: body.appointment,
          call_id: body.call_id,
          source: "bland_call"
        },
        { tenantId }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[call-events webhook] error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal error in call-events webhook" },
      { status: 500 }
    );
  }
}
