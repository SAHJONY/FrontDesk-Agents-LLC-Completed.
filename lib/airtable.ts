// lib/airtable.ts

import Airtable from "airtable";

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

if (!apiKey || !baseId) {
  console.warn(
    "[Airtable] AIRTABLE_API_KEY o AIRTABLE_BASE_ID no están configurados. Se omitirán las escrituras."
  );
}

const base = apiKey && baseId ? new Airtable({ apiKey }).base(baseId) : null;

/**
 * Obtiene la instancia de base de Airtable o lanza error si no está configurada.
 */
export function getAirtableBase() {
  if (!base) {
    throw new Error(
      "[Airtable] Base no configurada. Revisa AIRTABLE_API_KEY y AIRTABLE_BASE_ID."
    );
  }
  return base;
}

/**
 * Crea un registro en la tabla "Call Events" con la info de una llamada
 * (Bland.ai / Twilio / etc.).
 */
export async function createCallEvent(record: {
  from?: string;
  to?: string;
  direction?: string;
  status?: string;
  durationSeconds?: number;
  recordingUrl?: string;
  transcript?: string;
  provider?: string;
  meta?: any;
}) {
  if (!base) {
    console.warn(
      "[Airtable] Base no configurada. createCallEvent() se omite en runtime."
    );
    return;
  }

  const safeMeta =
    record.meta && typeof record.meta === "object"
      ? JSON.stringify(record.meta)
      : "{}";

  await base("Call Events").create([
    {
      fields: {
        From: record.from ?? "",
        To: record.to ?? "",
        Direction: record.direction ?? "",
        Status: record.status ?? "",
        DurationSeconds: record.durationSeconds ?? null,
        RecordingUrl: record.recordingUrl ?? "",
        Transcript: record.transcript ?? "",
        Provider: record.provider ?? "Bland.ai",
        MetaJson: safeMeta,
      },
    },
  ]);
}
