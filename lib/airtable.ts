import Airtable, { FieldSet, Records } from "airtable"

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  // Warn instead of throw in dev/build to prevent pipeline blockage
  console.warn("⚠️ Airtable environment variables missing. Features will be limited.")
}

const airtable = new Airtable({
  apiKey: AIRTABLE_API_KEY || 'key_placeholder',
})

const airtableBase = airtable.base(AIRTABLE_BASE_ID || 'app_placeholder')

/**
 * Generic-safe Airtable fetch.
 */
export async function fetchTableRecords<T extends FieldSet>(
  table: string
): Promise<Records<T>> {
  const records = await airtableBase(table).select().all()
  return records as unknown as Records<T>
}

/**
 * NEW: Create a record in Airtable.
 * Essential for the Bland.ai webhook to "deposit" leads.
 */
export async function createRecord<T extends FieldSet>(
  table: string,
  fields: T
) {
  try {
    const records = await airtableBase(table).create([{ fields }])
    return records[0]
  } catch (error) {
    console.error(`❌ Airtable Create Error in [${table}]:`, error)
    throw error
  }
}

/**
 * High-level helper for the Bland.ai integration.
 * Maps webhook data to your 'Call Events' table.
 */
export async function logCallEvent(payload: {
  call_id: string;
  phone: string;
  summary: string;
  outcome: string;
}) {
  return createRecord('Call Events', {
    "Call ID": payload.call_id,
    "Phone Number": payload.phone,
    "Summary": payload.summary,
    "Outcome": payload.outcome,
    "Created At": new Date().toISOString()
  });
}

/**
 * Fetches today's call events from the "Call Events" table.
 */
export async function getTodayStats() {
  return fetchTableRecords('Call Events');
}
