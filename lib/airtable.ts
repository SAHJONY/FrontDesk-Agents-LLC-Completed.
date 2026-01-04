// lib/airtable.ts

import Airtable, { FieldSet, Records } from "airtable"

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  throw new Error("Missing Airtable environment variables")
}

const airtable = new Airtable({
  apiKey: AIRTABLE_API_KEY,
})

const airtableBase = airtable.base(AIRTABLE_BASE_ID)

/**
 * Generic-safe Airtable fetch.
 * Airtable returns dynamic schemas at runtime, so we intentionally
 * cast through `unknown` to satisfy TypeScript strictness.
 */
export async function fetchTableRecords<T extends FieldSet>(
  table: string
): Promise<Records<T>> {
  const records = await airtableBase(table).select().all()

  // TypeScript-safe escape hatch (intentional)
  return records as unknown as Records<T>
}
