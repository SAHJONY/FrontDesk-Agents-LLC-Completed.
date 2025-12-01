// lib/airtable.ts

import Airtable from "airtable";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

// Nombre de la tabla donde vamos a guardar los eventos de llamadas
const CALL_EVENTS_TABLE = "Call Events";

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  console.warn(
    "[Airtable] Falta AIRTABLE_API_KEY o AIRTABLE_BASE_ID en las variables de entorno. " +
      "La integración con Airtable no funcionará hasta que se configuren."
  );
}

let base: Airtable.Base | null = null;

function getAirtableBase() {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return null;
  }

  if (!base) {
    Airtable.configure({
      apiKey: AIRTABLE_API_KEY
    });
    base = Airtable.base(AIRTABLE_BASE_ID);
  }

  return base;
}

export interface CallEventPayload {
  from?: string;
  to?: string;
  status?: string;
  direction?: string;
  duration?: number;
  recording_url?: string;
  transcript?: string;
  provider?: string;
  raw?: any;
}

/**
 * Crea un registro en Airtable con la info de una llamada (Bland, Twilio, etc.)
 */
export async function createCallEvent(payload: CallEventPayload) {
  const base = getAirtableBase();

  if (!base) {
    console.warn(
      "[Airtable] No hay configuración válida. No se puede crear Call Event."
    );
    return;
  }

  const {
    from,
    to,
    status,
    direction,
    duration,
    recording_url,
    transcript,
    provider,
    raw
  } = payload;

  const fields: Record<string, any> = {
    From: from || "",
    To: to || "",
    Status: status || "",
    Direction: direction || "",
    DurationSeconds: duration ?? null,
    RecordingUrl: recording_url || "",
    Transcript: transcript || "",
    Provider: provider || "unknown",
    MetaJson: raw ? JSON.stringify(raw).slice(0, 50000) : ""
  };

  try {
    await base(CALL_EVENTS_TABLE).create([
      {
        fields
      }
    ]);
  } catch (err) {
    console.error("[Airtable] Error creando Call Event:", err);
  }
}
