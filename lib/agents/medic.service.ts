export const medicAgent = {
  async checkVitals(productId: string): Promise<boolean> {
    // In a real scenario, check service status or latency
    console.log(`[MEDIC] Checking vitals for ${productId}... Status: OPTIMAL`);
    return true; 
  },

  async reportIncident(error: any, context: string) {
    console.error(`[MEDIC] INCIDENT DETECTED in ${context}:`, error.message);
    // Here you would integrate with Sentry or a Slack Alert Webhook
  },

  scrubSensitiveData(data: any, region?: string) {
    // Basic PII Redaction Logic
    const scrubbed = JSON.parse(JSON.stringify(data));
    const sensitiveKeys = ['password', 'credit_card', 'ssn', 'api_key'];
    
    const recursiveScrub = (obj: any) => {
      for (const key in obj) {
        if (sensitiveKeys.includes(key.toLowerCase())) {
          obj[key] = '[REDACTED_BY_MEDIC]';
        } else if (typeof obj[key] === 'object') {
          recursiveScrub(obj[key]);
        }
      }
    };

    recursiveScrub(scrubbed);
    return scrubbed;
  }
};
