import Airtable, { FieldSet, Records } from "airtable";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  // We log a warning instead of throwing during build to prevent Vercel CI failure
  console.warn("⚠️ Airtable environment variables are missing. Sync will be disabled.");
}

const airtable = new Airtable({
  apiKey: AIRTABLE_API_KEY || 'placeholder',
});

const airtableBase = airtable.base(AIRTABLE_BASE_ID || 'placeholder');

/**
 * Generic-safe Airtable fetch.
 */
export async function fetchTableRecords<T extends FieldSet>(
  table: string
): Promise<Records<T>> {
  const records = await airtableBase(table).select().all();
  return records as unknown as Records<T>;
}

/**
 * Creates a new record in a specified table.
 * Used for injecting leads or call logs directly from the AI webhook.
 */
export async function createRecord<T extends FieldSet>(
  table: string,
  fields: T
): Promise<any> {
  try {
    const record = await airtableBase(table).create([{ fields }]);
    return record[0];
  } catch (error) {
    console.error(`❌ Airtable Create Error in [${table}]:`, error);
    throw error;
  }
}

/**
 * High-level helper for the Bland.ai integration.
 * Maps webhook data to your 'Call Events' table.
 */
export async function logCallEvent(data: {
  call_id: string;
  phone: string;
  duration: number;
  summary: string;
  outcome: string;
}) {
  return createRecord('Call Events', {
    "Call ID": data.call_id,
    "Phone Number": data.phone,
    "Duration (sec)": data.duration,
    "Summary": data.summary,
    "Status": data.outcome,
    "Timestamp": new Date().toISOString()
  });
}

/**
 * Fetches today's stats.
 */
export async function getTodayStats() {
  // Implementation note: Consider adding a formula filter here like:
  // { filterByFormula: "IS_SAME({Created Date}, TODAY())" }
  return fetchTableRecords('Call Events');
}
