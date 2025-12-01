// app/api/webhooks/call-events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { callEventsTable, CallEventFields } from "@/lib/airtable";

export const runtime = "nodejs";

function todayISO(): string {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

async function saveCallEvent(fields: CallEventFields) {
  const payloadString = fields.RawPayload ?? "";

  await callEventsTable().create([
    {
      fields: {
        ...fields,
        Date: fields.Date ?? todayISO(),
        RawPayload: payloadString,
      },
    },
  ]);
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let body: any = {};
    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.text();
      body = Object.fromEntries(new URLSearchParams(formData));
    }

    const source =
      (body.source as CallEventFields["Source"]) ||
      (body.From ? "twilio" : "bland");

    let fields: CallEventFields = {
      Source: source,
      RawPayload: JSON.stringify(body).slice(0, 15000),
    };

    if (source === "bland") {
      // Ajusta a tu payload real de Bland.ai
      fields = {
        ...fields,
        Phone: body.phone_number || body.to,
        Direction: body.direction || "outbound",
        Status: (body.status as any) || "completed",
        RecoveredFromMissed: Boolean(body.recovered_from_missed),
      };
    } else if (source === "twilio") {
      // Ajusta a tu payload real de Twilio
      fields = {
        ...fields,
        Phone: body.From || body.To,
        Direction: body.CallDirection || "inbound",
        Status:
          body.CallStatus === "completed"
            ? "completed"
            : body.CallStatus === "no-answer"
            ? "missed"
            : (body.CallStatus as any),
        RecoveredFromMissed: false,
      };
    }

    await saveCallEvent(fields);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Error handling call-events webhook", err);
    return NextResponse.json(
      { error: "Webhook error" },
      { status: 500 }
    );
  }
}
