// ./lib/blandEvents.ts

// Importar las utilidades de valor que hemos desarrollado
import { syncLeadToCRM } from './crm-sync-utils'; 
import { setupNoShowPrevention } from './sms-scheduler'; 
import { db } from './db-simulation'; // Para persistencia de logs

// Tipo común para contexto multi-tenant (opcional por ahora)
export type TenantContext = {
  tenantId?: string | null;
};

/**
 * 1. Loguea el evento de llamada en nuestra DB para auditoría.
 */
export async function storeCallFromBland(
  payload: any,
  context?: TenantContext
) {
  const clientId = context?.tenantId || payload?.tenant_id || 'UNKNOWN';

  // --- PERSISTENCIA DE DATOS CRÍTICA ---
  // Guardar el log en nuestra DB (usando la simulación para este ejemplo)
  const newCallLog = db.callLog.create({
      callId: payload.call_id,
      clientId: clientId,
      status: payload.status || 'failed',
      outcome: payload.outcome || 'hangup', // Asumiendo que Bland pasa el outcome aquí
      durationSeconds: Math.round(payload.duration || 0),
      transcript: payload.transcript || 'No transcript available.',
      // Asumimos que el leadData se extrae en los stubs de lead/appointment si existe.
      leadData: payload.lead || payload.appointment?.lead || { name: 'N/A', phone: 'N/A', email: 'N/A' },
  });

  console.log(`[blandEvents] Stored Call ID ${newCallLog.callId} for Tenant: ${clientId}`);
}

/**
 * 1. Confirma el almacenamiento del lead en la DB.
 * 2. Activa la sincronización con el CRM externo del cliente.
 */
export async function storeLead(payload: any, context?: TenantContext) {
  const clientId = context?.tenantId || payload?.tenant_id || 'UNKNOWN';
  console.log(`[blandEvents] Storing Lead for Tenant: ${clientId}`);

  // --- ACTIVACIÓN DE VALOR: CRM SYNC ---
  if (payload.lead) {
      // Creamos un objeto que simula la entrada de DB para la función de sincronización.
      const simulatedCallLogEntry = {
          clientId: clientId,
          leadData: payload.lead, 
          outcome: payload.outcome || 'qualified', // Asumimos un lead calificado
      } as any; 

      await syncLeadToCRM(simulatedCallLogEntry);
      console.log(`[blandEvents] Lead CRM Sync triggered for Call ${payload.call_id}`);
  }
}

/**
 * 1. Confirma el almacenamiento de la cita en la DB.
 * 2. Activa la Prevención de Ausencias (SMS Scheduler).
 */
export async function storeAppointment(
  payload: any,
  context?: TenantContext
) {
  const clientId = context?.tenantId || payload?.tenant_id || 'UNKNOWN';
  console.log(`[blandEvents] Storing Appointment for Tenant: ${clientId}`);

  // 1. Realizar una sincronización de lead/cita para el CRM (para asegurar que la cita se registra).
  if (payload.appointment) {
      const simulatedCallLogEntry = {
          clientId: clientId,
          leadData: payload.appointment.lead || payload.lead,
          outcome: 'booked',
      } as any; 
      await syncLeadToCRM(simulatedCallLogEntry);
  }

  // --- ACTIVACIÓN DE VALOR: NO-SHOW PREVENTION (SMS) ---
  try {
      const appt = payload.appointment;
      
      if (appt && appt.lead && appt.appointment_time) {
        
          const apptTime = new Date(appt.appointment_time);
          
          await setupNoShowPrevention(
              appt.lead.name || 'Prospecto', 
              appt.lead.phone || 'N/A', 
              apptTime, 
              appt.service_name || 'Servicio Genérico', 
              clientId
          );
      }
      console.log(`[blandEvents] Appointment SMS Prevention scheduled for Call ${payload.call_id}`);
  } catch (e) {
      console.error("[blandEvents] Error scheduling SMS:", e);
  }
            }
