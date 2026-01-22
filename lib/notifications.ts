export type WhatsAppConfirmationInput = {
  to: string; // E.164 preferred
  message: string;
  tenantId?: string;
  metadata?: Record<string, any>;
};

export type WhatsAppConfirmationResult = {
  ok: boolean;
  message: string;
};

export async function sendWhatsAppConfirmation(
  input: WhatsAppConfirmationInput
): Promise<WhatsAppConfirmationResult> {
  // Safe placeholder: prevents build/runtime crashes.
  // Wire this to Twilio WhatsApp or your provider when ready.
  if (!input?.to || !input?.message) {
    return { ok: false, message: "Missing 'to' or 'message'" };
  }

  // No-op (log-only) behavior in production-safe way.
  // Replace with real provider call later.
  return {
    ok: true,
    message: `WhatsApp confirmation queued (noop) to ${input.to}`,
  };
}
