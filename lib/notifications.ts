import { Resend } from 'resend';

type LeadNotificationPayload = {
  leadId?: string;
  customerId?: string;
  name?: string;
  phone?: string;
  email?: string;
  source?: string;
  notes?: string;
  [key: string]: any;
};

type CapacityAlertPayload = {
  customerId?: string;
  agentId?: string;
  locationId?: string;
  message?: string;
  severity?: 'info' | 'warning' | 'critical';
  [key: string]: any;
};

type WhatsAppConfirmationPayload = {
  to?: string; // E.164 preferred: +1678346628
  customerId?: string;
  leadId?: string;
  message?: string;
  templateName?: string;
  templateVars?: Record<string, string | number | boolean | null>;
  [key: string]: any;
};

function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function getFromEmail(): string {
  return (
    process.env.NOTIFICATIONS_FROM_EMAIL ||
    'FrontDesk Agents <no-reply@frontdeskagents.com>'
  );
}

function getToEmailFallback(): string | null {
  // Owner/admin inbox for alerts
  return (
    process.env.NOTIFICATIONS_TO_EMAIL ||
    process.env.SUPPORT_INBOX_EMAIL ||
    process.env.OWNER_EMAIL ||
    null
  );
}

/**
 * Sends a "new lead" notification.
 * Safe default: if RESEND_API_KEY is missing, it will NO-OP (log only) so builds and webhooks won't break.
 */
export async function sendLeadNotification(payload: LeadNotificationPayload) {
  try {
    const resend = getResendClient();
    const to = getToEmailFallback();

    if (!resend || !to) {
      console.log(
        '[notifications] sendLeadNotification NO-OP (missing RESEND_API_KEY or TO email)',
        {
          hasResendKey: Boolean(process.env.RESEND_API_KEY),
          hasTo: Boolean(to),
          payload,
        }
      );
      return { success: true, noop: true };
    }

    const subject = `New Lead${payload?.name ? `: ${payload.name}` : ''}`;
    const text = JSON.stringify(payload ?? {}, null, 2);

    const result = await resend.emails.send({
      from: getFromEmail(),
      to,
      subject,
      text,
    });

    return { success: true, result };
  } catch (error: any) {
    console.error('[notifications] sendLeadNotification error:', error);
    // Do not throw: webhooks should not fail hard on notification issues
    return { success: false, error: error?.message || 'Unknown error' };
  }
}

/**
 * Sends an "agent capacity" alert.
 * Safe default: if RESEND_API_KEY is missing, it will NO-OP (log only).
 */
export async function sendCapacityAlert(payload: CapacityAlertPayload) {
  try {
    const resend = getResendClient();
    const to = getToEmailFallback();

    if (!resend || !to) {
      console.log(
        '[notifications] sendCapacityAlert NO-OP (missing RESEND_API_KEY or TO email)',
        {
          hasResendKey: Boolean(process.env.RESEND_API_KEY),
          hasTo: Boolean(to),
          payload,
        }
      );
      return { success: true, noop: true };
    }

    const sev = payload?.severity?.toUpperCase?.() || 'INFO';
    const subject = `[${sev}] Capacity Alert`;
    const text = JSON.stringify(payload ?? {}, null, 2);

    const result = await resend.emails.send({
      from: getFromEmail(),
      to,
      subject,
      text,
    });

    return { success: true, result };
  } catch (error: any) {
    console.error('[notifications] sendCapacityAlert error:', error);
    return { success: false, error: error?.message || 'Unknown error' };
  }
}

/**
 * Sends a WhatsApp confirmation (placeholder).
 * Safe default: NO-OP unless you wire a provider (Twilio/Meta) and env vars.
 * This exists to prevent build failures when webhook routes import it.
 */
export async function sendWhatsAppConfirmation(
  payload: WhatsAppConfirmationPayload
) {
  try {
    // If you later implement Twilio/Meta, gate by env vars here.
    // Example env gates:
    // - TWILIO_ACCOUNT_SID
    // - TWILIO_AUTH_TOKEN
    // - TWILIO_WHATSAPP_FROM (e.g. "whatsapp:+14155238886")
    const hasProvider =
      Boolean(process.env.TWILIO_ACCOUNT_SID) &&
      Boolean(process.env.TWILIO_AUTH_TOKEN) &&
      Boolean(process.env.TWILIO_WHATSAPP_FROM);

    if (!hasProvider) {
      console.log(
        '[notifications] sendWhatsAppConfirmation NO-OP (provider not configured)',
        { payload }
      );
      return { success: true, noop: true };
    }

    // Provider implementation intentionally omitted for now.
    // Keep webhook stable even if WhatsApp is not configured.
    console.log(
      '[notifications] sendWhatsAppConfirmation SKIPPED (provider stub)',
      { payload }
    );
    return { success: true, noop: true, skipped: true };
  } catch (error: any) {
    console.error('[notifications] sendWhatsAppConfirmation error:', error);
    return { success: false, error: error?.message || 'Unknown error' };
  }
}
