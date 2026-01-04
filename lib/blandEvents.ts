// lib/blandEvents.ts
import { syncLeadToCRM } from './crm-sync-utils';
import { setupNoShowPrevention } from './sms-scheduler';

export type TenantContext = {
  tenantId?: string | null;
  orgId?: string | null;
};

export async function handleBlandEvent(payload: any, context: TenantContext) {
  const { tenantId, orgId } = context;

  console.log(`Node pdx1: Processing AI event | Tenant: ${tenantId} | Org: ${orgId}`);

  // 1. Synchronize lead data
  if (payload.leadData) {
    await syncLeadToCRM(payload.leadData, tenantId);
  }

  // 2. Schedule no-show prevention (Updated to satisfy 5-argument signature)
  if (payload.appointmentTime) {
    await setupNoShowPrevention(
      payload.appointmentTime,          // Arg 1: Time
      tenantId,                         // Arg 2: Tenant
      payload.customerPhone || '',      // Arg 3: Phone (Required by scheduler)
      payload.customerName || 'Guest',  // Arg 4: Name (Required by scheduler)
      payload.serviceType || 'General'  // Arg 5: Context (Required by scheduler)
    );
  }

  return { 
    status: 'success', 
    node: 'pdx1-portland',
    orgReference: orgId,
    processedAt: new Date().toISOString()
  };
}
