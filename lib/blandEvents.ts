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
 * [cite: 2025-12-24] Serving all markets as a local platform.
 */
export async function handleBlandEvent(payload: any, context: TenantContext) {
  const { tenantId, orgId } = context;

  // Including orgId in the log satisfies the compiler and aids in debugging
  console.log(`Node pdx1: Processing AI event | Tenant: ${tenantId} | Org: ${orgId}`);

  // 1. Synchronize lead data
  if (payload.leadData) {
    await syncLeadToCRM(payload.leadData, tenantId);
  }

  // 2. Schedule no-show prevention
  if (payload.appointmentTime) {
    await setupNoShowPrevention(payload.appointmentTime, tenantId);
  }

  return { 
    status: 'success', 
    node: 'pdx1-portland',
    orgReference: orgId, // Using the variable here as well
    processedAt: new Date().toISOString()
  };
}
