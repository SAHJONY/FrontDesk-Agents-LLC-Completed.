// lib/blandEvents.ts

// Minimal stubs so webhooks compile and you can go live.
// Later you can replace these with real Supabase writes.

export async function storeCallFromBland(payload: any) {
  console.log("[blandEvents] storeCallFromBland stub called", payload);
}

export async function storeLead(payload: any) {
  console.log("[blandEvents] storeLead stub called", payload);
}

export async function storeAppointment(payload: any) {
  console.log("[blandEvents] storeAppointment stub called", payload);
}
