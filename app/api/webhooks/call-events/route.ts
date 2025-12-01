import { storeCallFromBland } from "@/lib/blandEvents";
import { storeLead, storeAppointment } from "@/lib/blandEvents";

export async function POST(req: Request) {
  // ... validación de secret y parse de body como antes
  const body = (await req.json()) as any;

  const basePayload = {
    call_id: body.call_id ?? body.id,
    from: body.from ?? body.caller_number,
    to: body.to ?? body.destination_number,
    status: (body.status ?? "answered") as any,
    transcript: body.transcript ?? null,
    summary: body.summary ?? null,
    revenue_estimate: body.revenue_estimate ?? null
  };

  const tenantId: string | undefined = undefined; // TODO: resolve per client

  await storeCallFromBland(
    { ...basePayload },
    { tenantId }
  );

  // Si el evento de Bland incluye una bandera de "lead calificado"
  if (body.is_qualified_lead === true) {
    await storeLead({
      lead_id: body.lead_id ?? basePayload.call_id,
      tenantId,
      name: body.lead_name ?? null,
      phone: basePayload.from,
      email: body.lead_email ?? null,
      source: "bland_call",
      notes: body.lead_notes ?? basePayload.summary
    });
  }

  // Si el evento incluye una cita confirmada
  if (body.appointment && body.appointment.start_time) {
    await storeAppointment({
      appointment_id: body.appointment.id ?? undefined,
      tenantId,
      lead_id: body.lead_id ?? null,
      phone: basePayload.from,
      start_time: body.appointment.start_time, // ISO esperado
      duration_minutes: body.appointment.duration_minutes ?? null,
      channel: body.appointment.channel ?? "phone",
      notes: body.appointment.notes ?? null
    });
  }

  // Missed Call Rescue hook (como antes)
  if (basePayload.status === "missed") {
    console.log("[call-events] Missed call, Rescue SMS hook point.");
    // await sendRescueSms({ to: basePayload.from, callId: basePayload.call_id });
  }

  return NextResponse.json({ ok: true });
}
