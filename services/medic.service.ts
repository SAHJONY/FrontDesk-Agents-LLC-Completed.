import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * SYSTEM RELIABILITY AGENT (THE "MEDIC")
 * Purpose: Self-healing, failover management, and security scrubbing.
 */
export const medicAgent = {
  name: "System Medic",

  /**
   * Performs a health check on a specific service/product before the CEO acts.
   */
  async checkVitals(serviceName: string): Promise<boolean> {
    try {
      // Logic: Ping the service or check recent success rates in Supabase
      const { data, error } = await supabase
        .from('service_health')
        .select('status, latency')
        .eq('service_name', serviceName)
        .single();

      if (error || data?.status === 'DOWN') {
        console.warn(`[MEDIC] ${serviceName} is unstable. Triggering failover...`);
        return false;
      }

      // Performance Threshold: If latency > 2000ms, consider it "unhealthy"
      return data.latency < 2000;
    } catch (e) {
      return false;
    }
  },

  /**
   * Self-Healing Failover Logic
   */
  async getHealthyProvider(preferredProvider: string, backupProvider: string): Promise<string> {
    const isHealthy = await this.checkVitals(preferredProvider);
    if (isHealthy) return preferredProvider;
    
    console.log(`[MEDIC] Self-healing initiated: Switching to ${backupProvider}`);
    return backupProvider;
  },

  /**
   * HIPAA/GDPR Log Scrubber
   * Removes PII before logs are stored for Reinforcement Learning.
   */
  scrubSensitiveData(payload: any): any {
    const sensitiveFields = ['ssn', 'phone', 'email', 'patient_name', 'address'];
    const scrubbed = { ...payload };

    sensitiveFields.forEach(field => {
      if (scrubbed[field]) scrubbed[field] = '[REDACTED_BY_MEDIC]';
    });

    return scrubbed;
  },

  /**
   * Automatic Incident Reporting
   */
  async reportIncident(error: any, context: string) {
    console.error(`[MEDIC ALERT] ${context}:`, error);
    
    await supabase.from('incident_logs').insert({
      event: context,
      error_message: error.message,
      severity: 'HIGH',
      timestamp: new Date().toISOString()
    });

    // In a production environment, you would trigger a PagerDuty/Slack alert here
  }
};
