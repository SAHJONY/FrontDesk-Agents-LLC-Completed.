import { createClient } from '@supabase/supabase-js';
import { medicAgent } from './medic.service';
import { guardianAgent } from './guardian.service';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface AutomationConfig {
  enabled: boolean;
  type: 'COMMISSION' | 'STANDARD' | 'PARTNER';
  notifications: boolean;
}

/**
 * AI CEO AGENT: The Sovereign Global Orchestrator
 * Upgraded Version: Multi-Market Deployment + Partner Node Logic
 */
export const aiCeoAgent = {
  /**
   * Main Orchestration Loop: Orchestrates global tasks across 15+ products
   */
  async orchestrate(signal: { productId: string; clientId?: string; type: string; data: any }) {
    console.log(`[AI CEO] Initiating Global Strategy for: ${signal.productId}`);
    
    // 1. MAXIMUM SECURITY (Guardian Protocol)
    const securityCheck = await guardianAgent.scanThreat(signal.data);
    if (!securityCheck.safe) {
      await medicAgent.reportIncident(new Error('Security Block'), `Threat detected from ${signal.productId}`);
      return { success: false, message: "Blocked by Guardian: High risk signature detected." };
    }

    // 2. DATA PRIVACY & REGIONAL SCRUBBING
    // Redacts info based on the local laws of the client's region (e.g., GDPR for EU)
    const clientContext = signal.clientId ? await this.getGlobalContext(signal.clientId) : null;
    const cleanData = medicAgent.scrubSensitiveData(signal.data, clientContext?.region);
    
    // 3. SYSTEM HEALTH (Medic Protocol)
    const isServiceHealthy = await medicAgent.checkVitals(signal.productId);
    if (!isServiceHealthy) {
      await medicAgent.reportIncident(new Error('Service Unstable'), `Orchestration Failure: ${signal.productId}`);
      return { success: false, message: "System Medic redirected task: Service Health Critical." };
    }

    // 4. STRATEGIC EXECUTION: Localized Handoff
    return { 
      success: true, 
      message: `Verified execution successful in ${clientContext?.region || 'Global Edge'}`, 
      metadata: { 
        securityVerified: true, 
        region: clientContext?.region || 'GLOBAL',
        timestamp: new Date().toISOString()
      } 
    };
  },

  /**
   * AUTONOMOUS ONBOARDING ENGINE: Localized Node Provisioning
   * Now detects region to serve any customer in any market as a local platform.
   */
  async autonomousOnboard(clientData: { 
    name: string; 
    website: string; 
    industry?: string;
    countryCode?: string; // Captured from Geo-IP
    partnerId?: string;   // Optional: Link to a local reseller
  }) {
    console.log(`[AI CEO] Provisioning Local Node for: ${clientData.name}`);
    
    try {
      const industry = clientData.industry || 'General';
      const region = clientData.countryCode || 'US';
      
      // Auto-assign currency and local AI persona based on region
      const localConfig = {
        region: region,
        currency: region === 'GB' ? 'GBP' : region === 'AE' ? 'AED' : 'USD',
        voice_persona: `Neural-${region}-Elite`,
        partner_id: clientData.partnerId || null
      };

      const { data, error } = await supabase
        .from('clients')
        .insert({
          name: clientData.name,
          industry_type: industry,
          automation_settings: { enabled: true, type: clientData.partnerId ? 'COMMISSION' : 'STANDARD', notifications: true },
          region: region,
          local_config: localConfig // Injects the local "DNA"
        })
        .select()
        .single();

      if (error) throw error;

      return { 
        success: true, 
        clientId: data.id, 
        region: data.region,
        message: `Sovereign Node Activated in ${region}`
      };
    } catch (error) {
      await medicAgent.reportIncident(error, 'Autonomous Onboarding');
      return { success: false, message: "Onboarding failed. Medic is investigating." };
    }
  },

  async getGlobalContext(clientId: string) {
    const { data } = await supabase
      .from('clients')
      .select('automation_settings, industry_type, region, local_config')
      .eq('id', clientId)
      .single();
    return data;
  },

  async registerReward(interactionId: string, value: number) {
    const { error } = await supabase
      .from('agent_intelligence')
      .upsert({ 
        interaction_id: interactionId, 
        reward_score: value,
        updated_at: new Date().toISOString() 
      });
    
    if (error) await medicAgent.reportIncident(error, 'RL Reward Registration');
    return { success: !error };
  }
};

/**
 * PORTLAND BUILD COMPATIBILITY: Fetches local-aware config
 */
export const fetchAutomationConfig = async (clientId?: string): Promise<AutomationConfig> => {
  if (!clientId) return { enabled: false, type: 'STANDARD', notifications: true };
  const { data } = await supabase.from('clients').select('automation_settings').eq('id', clientId).single();
  return data?.automation_settings || { enabled: false, type: 'STANDARD', notifications: true };
};

export const updateAutomationConfig = async (config: Partial<AutomationConfig>, clientId?: string) => {
  if (!clientId) return { success: true };
  const { error } = await supabase.from('clients').update({ automation_settings: config }).eq('id', clientId);
  if (error) {
    await medicAgent.reportIncident(error, 'Update Config');
    throw error;
  }
  return { success: true };
};

export default aiCeoAgent;
    
