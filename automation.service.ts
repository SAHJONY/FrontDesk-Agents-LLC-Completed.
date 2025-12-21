// Lógica interna para el Portal de Selección
async function handleClientSignup(option: 'FIXED' | 'COMMISSION', clientId: string) {
  if (option === 'COMMISSION') {
    // Activa el rastreo detallado en metrics.service.ts
    await metricsService.enablePerformanceTracking(clientId); //
    // Configura cobro por cita en billing.ts
    await billingService.setupUsageBasedBilling(clientId, 'PER_APPOINTMENT'); //
  } else {
    // Activa el plan de suscripción estándar
    await billingService.activateSubscription(clientId, 'GROWTH_PLAN'); //
  }
}
