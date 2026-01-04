// lib/blandEvents.ts
import { syncLeadToCRM } from './crm-sync-utils';
import { setupNoShowPrevention } from './sms-scheduler';

export type TenantContext = {
  tenantId?: string | null;
  orgId?: string | null;
};

/**
 * AI EVENT HANDLER
 * Core processing for the global revenue workforce.
 */
export async function handleBlandEvent(payload: any, context: TenantContext) {
  const { tenantId, orgId } = context;

  console.log(`Node pdx1: Processing AI event | Tenant: ${tenantId}`);

  // 1. Synchronize lead data (Now correctly passing 2 arguments)
  if (payload.leadData) {
    await syncLeadToCRM(payload.leadData, tenantId);
  }

  // 2. Schedule no-show prevention
  if (payload.appointmentTime) {
    // Ensuring this also matches its definition (assuming 2 args here)
    await setupNoShowPrevention(payload.appointmentTime, tenantId);
  }

  return { 
    status: 'success', 
    node: 'pdx1-portland',
    tierRef: 'active' 
  };
}
