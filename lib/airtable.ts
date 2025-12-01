// lib/airtable.ts
import Airtable from "airtable";

if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
  throw new Error("AIRTABLE_API_KEY and AIRTABLE_BASE_ID must be set");
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

export const callEventsTable = () => base("CallEvents");

// Ajusta estos tipos a tu esquema real si quieres
export type CallDirection = "inbound" | "outbound";
export type CallStatus = "completed" | "missed" | "voicemail" | "booked";

export interface CallEventFields {
  Phone?: string;
  Direction?: CallDirection;
  Status?: CallStatus;
  Source?: "bland" | "twilio";
  Date?: string; // ISO date string (YYYY-MM-DD)
  RecoveredFromMissed?: boolean;
  RawPayload?: string;
}
