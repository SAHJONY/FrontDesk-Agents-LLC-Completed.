// lib/blandEvents.ts
import { syncLeadToCRM } from './crm-sync-utils';
import { setupNoShowPrevention } from './sms-scheduler';

/**
 * CONTEXTO DE TENANT GLOBAL
 * Permite que la plataforma sirva a cada mercado como una entidad local [cite: 2025-12-24]
 */
export type TenantContext = {
  tenantId?: string | null;
  orgId?: string | null;
};

/**
 * PROCESADOR DE EVENTOS DE IA
 * Gestiona la sincronización de leads y prevención de inasistencias para maximizar el ROI.
 */
export async function handleBlandEvent(payload: any, context: TenantContext) {
  const { tenantId, orgId } = context;

  console.log(`Procesando evento de IA para el Tenant: ${tenantId || 'Global'} en nodo pdx1.`);

  // Sincronización con el CRM del cliente local
  if (payload.leadData) {
    await syncLeadToCRM(payload.leadData, tenantId);
  }

  // Programación de recordatorios SMS para evitar 'no-shows'
  if (payload.appointmentTime) {
    await setupNoShowPrevention(payload.appointmentTime, tenantId);
  }

  return { 
    status: 'success', 
    processedAt: new Date().toISOString(),
    orgRef: orgId 
  };
}
