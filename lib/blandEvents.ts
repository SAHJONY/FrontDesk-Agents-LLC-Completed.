// lib/blandEvents.ts
import { syncLeadToCRM } from './crm-sync-utils';
import { setupNoShowPrevention } from './sms-scheduler';
// Se eliminó la importación de 'db' que causaba el error de compilación

export type TenantContext = {
  tenantId?: string | null;
  orgId?: string | null;
};

/**
 * PROCESADOR DE EVENTOS DE IA
 * Gestiona la sincronización de leads y prevención de inasistencias.
 */
export async function handleBlandEvent(payload: any, context: TenantContext) {
  const { tenantId, orgId } = context;

  console.log(`Procesando evento de IA para Tenant: ${tenantId || 'Global'} en nodo pdx1.`);

  // Sincronización con el CRM local del cliente
  if (payload.leadData) {
    await syncLeadToCRM(payload.leadData, tenantId);
  }

  // Programación de recordatorios SMS para maximizar el ROI del Tier Elite ($1,499)
  if (payload.appointmentTime) {
    await setupNoShowPrevention(payload.appointmentTime, tenantId);
  }

  return { status: 'success', processedAt: new Date().toISOString() };
}
