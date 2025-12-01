// app/api/webhooks/call-events/route.ts
import { NextResponse } from "next/server";
import { storeCallFromBland } from "@/lib/blandEvents";
// import { sendRescueSms } from "@/lib/missedCallRescue"; // lo definiremos luego

// Env var simple para autenticar el webhook
const WEBHOOK_SECRET = process.env.BLAND_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    if (!WEBHOOK_SECRET) {
      console.warn(
        "[call-events] BLAND_WEBHOOK_SECRET not set; rejecting webhook."
      );
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Sencillo shared-secret en header, puedes usar también firma HMAC si Bland lo soporta
    const authHeader = req.headers.get("x-webhook-secret");
    if (authHeader !== WEBHOOK_SECRET) {
      console.warn("[call-events] Invalid webhook secret");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as any;

    // Mapea el payload de Bland a nuestro tipo
    const payload = {
      call_id: body.call_id ?? body.id,
      from: body.from ?? body.caller_number,
      to: body.to ?? body.destination_number,
      status: (body.status ?? "answered") as any,
      transcript: body.transcript ?? null,
      summary: body.summary ?? null,
      revenue_estimate: body.revenue_estimate ?? null
    };

    // Si ya tienes multi-tenant: resuelve tenantId (por número, por API key, etc.)
    const tenantId: string | undefined = undefined;

    await storeCallFromBland(payload, { tenantId });

    // Missed Call Rescue (hook point)
    if (payload.status === "missed") {
      // TODO: descomenta cuando tengas Twilio u otro proveedor
      // await sendRescueSms({
      //   to: payload.from,
      //   callId: payload.call_id
      // });
      console.log(
        "[call-events] Missed call detected, Rescue SMS would be triggered here."
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[call-events] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal error processing call event" },
      { status: 500 }
    );
  }
}
