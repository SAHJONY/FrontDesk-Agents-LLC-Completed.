// services/automation.service.ts

// 1. Add these stubs at the top to satisfy the compiler
const metricsService = {
  enablePerformanceTracking: async (id: string) => console.log("Tracking:", id),
};
const billingService = {
  setupUsageBasedBilling: async (id: string, type: string) => console.log("Billing:", type),
};

export const automationService = {
  // ... other methods ...

  // 2. Wrap that stray logic into a proper method
  async setupCommissionModel(clientId: string, option: string) {
    if (option === 'COMMISSION') {
      await metricsService.enablePerformanceTracking(clientId);
      await billingService.setupUsageBasedBilling(clientId, 'PER_APPOINTMENT');
    }
    return { success: true };
  },
};
