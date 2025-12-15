// ./lib/blandEvents.ts

import { syncLeadToCRM } from './crm-sync-utils';
import { setupNoShowPrevention } from './sms-scheduler';
import { db } from './db-simulation';

export type TenantContext = {
  tenantId?: string | null;
};

/**
 * 1. Loguea el evento de llamada (SAFE MODE)
 *    No usamos db.callLog porque no existe en la DB actual.
 */
export async function storeCallFromBland(
  payload: any,
  context?: TenantContext
) {
  const clientId = context?.tenantId || payload?.tenant_id || 'UNKNOWN';

  // 🔒 SAFE LOGGING (no dependencia estructural)
  console.log('[blandEvents][CALL]', {
    callId: payload.call_id,
    clientId,
    status: payload.status || 'failed',
    outcome: payload.outcome || 'hangup',
    duration: Math.round(payload.duration || 0),
  });

  return { ok: true };
}

/**
 * 1. Confirma lead
 * 2. Activa sincronización CRM (CORE VALUE)
 */
export async function storeLead(payload: any, context?: TenantContext) {
  const clientId = context?.tenantId || payload?.tenant_id || 'UNKNOWN';

  console.log('[blandEvents][LEAD]', { clientId });

  if (!payload?.lead) return;

  const simulatedEntry = {
    clientId,
    leadData: payload.lead,
    outcome: payload.outcome || 'qualified',
  } as any;

  await syncLeadToCRM(simulatedEntry);

  console.log('[blandEvents] CRM Sync triggered', {
    callId: payload.call_id,
  });
}

/**
 * 1. Registra cita
 * 2. Sincroniza CRM
 * 3. Programa SMS No-Show Prevention (CORE VALUE)
 */
export async function storeAppointment(
  payload: any,
  context?: TenantContext
) {
  const clientId = context?.tenantId || payload?.tenant_id || 'UNKNOWN';

  const appt = payload?.appointment;
  if (!appt) return;

  // --- CRM SYNC ---
  const simulatedEntry = {
    clientId,
    leadData: appt.lead || payload.lead,
    outcome: 'booked',
  } as any;

  await syncLeadToCRM(simulatedEntry);

  // --- NO-SHOW PREVENTION ---
  try {
    if (appt.lead && appt.appointment_time) {
      await setupNoShowPrevention(
        appt.lead.name || 'Prospect',
        appt.lead.phone || 'N/A',
        new Date(appt.appointment_time),
        appt.service_name || 'Service',
        clientId
      );
    }

    console.log('[blandEvents] SMS No-Show scheduled', {
      callId: payload.call_id,
    });
  } catch (err) {
    console.error('[blandEvents] SMS scheduling error', err);
  }
}
