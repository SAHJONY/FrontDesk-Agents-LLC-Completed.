// lib/blandEvents.ts

// Minimal stubs so your webhooks compile and you can go live.
// Later you can implement real logic to write into Supabase.

export async function storeLead(payload: any) {
  console.log("[blandEvents] storeLead stub called", payload);
}

export async function storeAppointment(payload: any) {
  console.log("[blandEvents] storeAppointment stub called", payload);
}
