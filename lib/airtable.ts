// lib/airtable.ts
import Airtable, { FieldSet, Records } from 'airtable'

export const runtime = 'nodejs'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  throw new Error('Missing Airtable environment variables')
}

Airtable.configure({
  apiKey: AIRTABLE_API_KEY,
})

export const airtableBase = Airtable.base(AIRTABLE_BASE_ID)

export async function fetchRecords<T extends FieldSet>(
  table: string
): Promise<Records<T>> {
  const records = await airtableBase(table).select().all()
  return records as Records<T>
}
