export class BillingService {
  async reportUsage(subscriptionId: string, metric: 'sms' | 'minutes') {
    // Reporta uso a Stripe para facturación dinámica
    console.log(`Reporting ${metric} usage for ${subscriptionId}`);
  }
}
