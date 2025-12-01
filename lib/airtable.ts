// lib/airtable.ts

import Airtable, { FieldSet, Records } from "airtable";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

// Nombre de la tabla donde guardamos los eventos
const CALL_EVENTS_TABLE = "Call Events";

// Validación mínima
if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  console.warn("[Airtable] Faltan las variables de entorno requeridas.");
}

let base: Airtable.Base | null = null;

/**
 * Inicializa Airtable (lazy-load)
 */
function getAirtableBase(): Airtable.Base | null {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return null;

  if (!base) {
    Airtable.configure({ apiKey: AIRTABLE_API_KEY });
    base = Airtable.base(AIRTABLE_BASE_ID);
  }

  return base;
}

/**
 * Payload del Webhook (Bland.ai / Twilio)
 */
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
 * Inserta un registro en Airtable con el evento completo
 */
export async function createCallEvent(payload: CallEventPayload) {
  const base = getAirtableBase();

  if (!base) {
    console.warn("[Airtable] No hay configuración válida. No se guardó el evento.");
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
    MetaJson: raw ? JSON.stringify(raw).slice(0, 100000) : ""
  };

  try {
    await base(CALL_EVENTS_TABLE).create([
      {
        fields
      }
    ]);
  } catch (err) {
    console.error("[Airtable] Error creando registro:", err);
  }
}

/**
 * Recuperar llamadas del día → para el Dashboard
 */
export async function getTodayStats() {
  const base = getAirtableBase();
  if (!base) return null;

  const today = new Date().toISOString().split("T")[0];

  try {
    const records: Records<FieldSet> = await base(CALL_EVENTS_TABLE)
      .select({
        filterByFormula: `IS_AFTER({Created}, "${today}")`
      })
      .all();

    return records;
  } catch (err) {
    console.error("[Airtable] Error obteniendo estadísticas:", err);
    return null;
  }
}
