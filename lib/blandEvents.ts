// lib/blandEvents.ts
import { syncLeadToCRM } from './crm-sync-utils';
import { setupNoShowPrevention } from './sms-scheduler';

/**
 * TENANT CONTEXT DEFINITION
 * Ensures the platform serves every market as a local entity [cite: 2025-12-24].
 */
export type TenantContext = {
  tenantId?: string | null;
  orgId?: string | null;
};

/**
 * AI EVENT HANDLER
 * Processes lead synchronization and SMS automation for the global workforce.
 */
export async function handleBlandEvent(payload: any, context: TenantContext) {
  const { tenantId, orgId } = context;

  // Activity logging for the Portland (pdx1) node
  console.log(`Processing AI event for Tenant: ${tenantId || 'Global'} | Org: ${orgId || 'N/A'}`);

  // 1. Synchronize lead data with the local CRM
  if (payload.leadData) {
    await syncLeadToCRM(payload.leadData, tenantId);
  }

  // 2. Schedule no-show prevention (Vital for high-tier performance metrics)
  if (payload.appointmentTime) {
    await setupNoShowPrevention(payload.appointmentTime, tenantId);
  }

  return { 
    status: 'success', 
    timestamp: new Date().toISOString(),
    node: 'pdx1' 
  };
}
