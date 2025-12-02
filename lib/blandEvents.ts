// lib/blandEvents.ts

// Tipo común para contexto multi-tenant (opcional por ahora)
export type TenantContext = {
  tenantId?: string | null;
};

// Minimal stubs para que los webhooks compilen y puedas ir a producción.
// Más adelante se reemplazan por lógica real que escriba en Supabase.

export async function storeCallFromBland(
  payload: any,
  context?: TenantContext
) {
  console.log("[blandEvents] storeCallFromBland stub called", {
    payload,
    context
  });
}

export async function storeLead(payload: any, context?: TenantContext) {
  console.log("[blandEvents] storeLead stub called", { payload, context });
}

export async function storeAppointment(
  payload: any,
  context?: TenantContext
) {
  console.log("[blandEvents] storeAppointment stub called", {
    payload,
    context
  });
}
