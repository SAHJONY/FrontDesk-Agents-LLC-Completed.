// lib/blandEvents.ts
import { syncLeadToCRM } from './crm-sync-utils';
import { setupNoShowPrevention } from './sms-scheduler';

export type TenantContext = {
  tenantId?: string | null;
  orgId?: string | null;
};

/**
 * AI EVENT HANDLER
 * Final type-safe version for production deployment.
 */
export async function handleBlandEvent(payload: any, context: TenantContext) {
  // Extract with fallbacks to avoid 'undefined' type errors
  const tenantId = context.tenantId ?? 'default-tenant';
  const orgId = context.orgId ?? 'default-org';

  console.log(`Node pdx1: Processing AI event | Tenant: ${tenantId} | Org: ${orgId}`);

  // 1. Synchronize lead data
  if (payload.leadData) {
    await syncLeadToCRM(payload.leadData, tenantId);
  }

  // 2. Schedule no-show prevention
  if (payload.appointmentTime) {
    await setupNoShowPrevention(
      payload.appointmentTime,
      tenantId,                         // Now guaranteed to be a string
      payload.customerPhone ?? '',      
      payload.customerName ?? 'Guest',  
      payload.serviceType ?? 'General'  
    );
  }

  return { 
    status: 'success', 
    node: 'pdx1-portland',
    orgReference: orgId,
    processedAt: new Date().toISOString()
  };
}
