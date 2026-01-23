// lib/notifications.ts
import "server-only";

type LeadNotification = {
  email?: string | null;
  tenant_id?: string | null;
  call_id?: string | null;
  customer_number?: string | null;
  summary?: string | null;
  duration_seconds?: number | null;

  // Backward-compatible fields (if used elsewhere)
  leadId?: string | number | null;
  name?: string | null;
  phone?: string | null;
  source?: string | null;
  notes?: string | null;
};

type CapacityAlert = {
  email?: string | null;
  tenant_id?: string | null;
  tier?: string | null;
  threshold?: 80 | 95 | number;
  used_minutes?: number | null;
  max_minutes?: number | null;
};

type WhatsAppConfirmation = {
  to: string; // E.164 (+1...)
  type: "APPOINTMENT_CONFIRMATION" | "GENERIC" | string;
  tenant_name?: string | null;
  summary?: string | null;

  // Optional extra fields supported
  customerName?: string | null;
  appointmentTime?: string | null;
  address?: string | null;
};

function getEnv(k: string) {
  return process.env[k];
}

async function postToSlack(text: string) {
  const url = getEnv("SLACK_WEBHOOK_URL");
  if (!url) return;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch (e) {
    console.error("Slack notify failed:", e);
  }
}

export async function sendLeadNotification(payload: LeadNotification) {
  const msg =
    `LEAD EVENT\n` +
    `tenant_id=${payload.tenant_id ?? ""}\n` +
    `email=${payload.email ?? ""}\n` +
    `call_id=${payload.call_id ?? ""}\n` +
    `customer=${payload.customer_number ?? payload.phone ?? ""}\n` +
    `duration=${payload.duration_seconds ?? ""}\n` +
    `summary=${payload.summary ?? payload.notes ?? ""}\n` +
    `source=${payload.source ?? "bland"}\n`;

  await postToSlack(msg);
}

export async function sendCapacityAlert(payload: CapacityAlert) {
  const msg =
    `CAPACITY ALERT\n` +
    `tenant_id=${payload.tenant_id ?? ""}\n` +
    `email=${payload.email ?? ""}\n` +
    `tier=${payload.tier ?? ""}\n` +
    `threshold=${payload.threshold ?? ""}%\n` +
    `used=${payload.used_minutes ?? ""}\n` +
    `max=${payload.max_minutes ?? ""}\n`;

  await postToSlack(msg);
}

export async function sendWhatsAppConfirmation(payload: WhatsAppConfirmation) {
  // Twilio WhatsApp config (optional)
  const sid = getEnv("TWILIO_ACCOUNT_SID");
  const token = getEnv("TWILIO_AUTH_TOKEN");
  const from = getEnv("TWILIO_WHATSAPP_FROM"); // e.g. whatsapp:+14155238886

  const bodyLines = [
    payload.type === "APPOINTMENT_CONFIRMATION"
      ? `✅ Confirmación de cita — ${payload.tenant_name ?? "FrontDesk"}`
      : `📩 Mensaje — ${payload.tenant_name ?? "FrontDesk"}`,
    payload.summary ? `Resumen: ${payload.summary}` : "",
    payload.customerName ? `Cliente: ${payload.customerName}` : "",
    payload.appointmentTime ? `Hora: ${payload.appointmentTime}` : "",
    payload.address ? `Dirección: ${payload.address}` : "",
  ].filter(Boolean);

  const body = bodyLines.join("\n");

  // Fallback: if Twilio not configured, at least log to Slack.
  if (!sid || !token || !from) {
    await postToSlack(`WHATSAPP (fallback)\nTO=${payload.to}\n${body}`);
    return;
  }

  try {
    const twilioMod = await import("twilio");
    const client = twilioMod.default(sid, token);

    await client.messages.create({
      from,
      to: `whatsapp:${payload.to}`,
      body,
    });
  } catch (e) {
    console.error("WhatsApp send failed:", e);
    await postToSlack(`WHATSAPP SEND FAILED\nTO=${payload.to}\n${body}`);
  }
}
