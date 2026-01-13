/**
 * Autonomous Outbound Sales AI Agentic Workforce
 * Compliance-first worldwide sales automation with RL optimization
 */

interface CampaignPolicy {
  jurisdiction_id: string;
  country: string;
  city?: string;
  allowed_channels: ('email' | 'call' | 'sms' | 'whatsapp')[];
  opt_in_required_by_channel: Record<string, boolean>;
  dnc_required: boolean;
  quiet_hours_local: { start: string; end: string };
  required_disclosures: string[];
  rate_limits: {
    daily_emails?: number;
    daily_calls?: number;
    daily_sms?: number;
  };
  retention_days: number;
  risk_level: 'low' | 'medium' | 'high';
  enforcement_notes: string;
  policy_confidence: number; // 0-1
}

interface LeadCard {
  id: string;
  company_name: string;
  domain: string;
  geo: { country: string; city?: string; region?: string };
  industry: string;
  role_target: string;
  contact_email?: string;
  contact_phone?: string;
  source_type: 'licensed' | 'api' | 'permitted_crawl';
  source_proof: string;
  signals: Array<{ type: string; value: string; confidence: number }>;
  lead_score: number; // 0-100
  compliance_ok: boolean;
  next_best_action: string;
  created_at: Date;
  last_updated: Date;
}

interface SequencePack {
  id: string;
  name: string;
  language: string;
  variant: 'A' | 'B' | 'C';
  touches: Array<{
    day: number;
    channel: string;
    subject?: string;
    body: string;
    cta: string;
  }>;
  opt_out_text: string;
  sender_identity: {
    name: string;
    email: string;
    company: string;
  };
}

interface ComplianceLogEvent {
  id: string;
  timestamp: Date;
  action: string;
  lead_id?: string;
  campaign_id?: string;
  policy_check_result: 'pass' | 'block' | 'warning';
  reason: string;
  required_fix?: string;
  reviewer?: string;
}

interface ExperimentPlan {
  id: string;
  variable: 'subject' | 'timing' | 'cta' | 'segment' | 'landing';
  variants: string[];
  allocation: number[];
  reward_metrics: string[];
  guardrails: Record<string, number>;
  stop_rules: string[];
}

interface CampaignConfig {
  country: string;
  city?: string;
  industry: string;
  language: string;
  offer: string;
  target_plan: string;
  channel_constraints?: string[];
  weekly_volume_target?: number;
}

interface SalesAgent {
  id: string;
  role: 'orchestrator' | 'policy' | 'compliance' | 'icp' | 'sourcing' | 'validation' | 
        'personalization' | 'sequence' | 'scheduler' | 'closer' | 'onboarding' | 
        'deliverability' | 'rl_optimizer';
  name: string;
  status: 'active' | 'idle' | 'blocked';
  performance: {
    tasksCompleted: number;
    successRate: number;
    complianceViolations: number;
  };
}

type OperatingMode = 'MODE_SAFE' | 'MODE_SEMI' | 'MODE_AUTO';

class AutonomousSalesWorkforce {
  private agents: Map<string, SalesAgent> = new Map();
  private campaigns: Map<string, any> = new Map();
  private policies: Map<string, CampaignPolicy> = new Map();
  private leads: Map<string, LeadCard> = new Map();
  private complianceLogs: ComplianceLogEvent[] = [];
  private operatingMode: OperatingMode = 'MODE_SAFE';

  constructor() {
    this.initializeWorkforce();
    this.initializePolicyDatabase();
  }

  /**
   * Initialize sales workforce agents
   */
  private initializeWorkforce(): void {
    // Orchestrator Agent
    this.createAgent({
      role: 'orchestrator',
      name: 'Master Sales Orchestrator',
    });

    // Policy Engine Agent
    this.createAgent({
      role: 'policy',
      name: 'Policy Engine',
    });

    // Compliance Gate Agent
    this.createAgent({
      role: 'compliance',
      name: 'Compliance Gate',
    });

    // ICP Agent
    this.createAgent({
      role: 'icp',
      name: 'ICP Definition Agent',
    });

    // Lead Sourcing Agents (3)
    for (let i = 1; i <= 3; i++) {
      this.createAgent({
        role: 'sourcing',
        name: `Lead Sourcing Agent ${i}`,
      });
    }

    // Validation Agent
    this.createAgent({
      role: 'validation',
      name: 'Lead Validator Agent',
    });

    // Personalization Agent
    this.createAgent({
      role: 'personalization',
      name: 'Personalization Agent',
    });

    // Sequence Agent
    this.createAgent({
      role: 'sequence',
      name: 'Sequence Builder Agent',
    });

    // Scheduler Agent
    this.createAgent({
      role: 'scheduler',
      name: 'Demo Scheduler Agent',
    });

    // Closer Agent
    this.createAgent({
      role: 'closer',
      name: 'Deal Closer Agent',
    });

    // Onboarding Agent
    this.createAgent({
      role: 'onboarding',
      name: 'Customer Onboarding Agent',
    });

    // Deliverability Guard Agent
    this.createAgent({
      role: 'deliverability',
      name: 'Deliverability Guard',
    });

    // RL Optimizer Agent
    this.createAgent({
      role: 'rl_optimizer',
      name: 'RL Optimizer',
    });

    console.log(`Sales workforce initialized: ${this.agents.size} agents ready`);
  }

  /**
   * Create sales agent
   */
  private createAgent(config: { role: SalesAgent['role']; name: string }): SalesAgent {
    const agent: SalesAgent = {
      id: `agent_${config.role}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role: config.role,
      name: config.name,
      status: 'active',
      performance: {
        tasksCompleted: 0,
        successRate: 1.0,
        complianceViolations: 0,
      },
    };

    this.agents.set(agent.id, agent);
    return agent;
  }

  /**
   * Initialize policy database with worldwide policies
   */
  private initializePolicyDatabase(): void {
    // United States
    this.policies.set('US', {
      jurisdiction_id: 'US',
      country: 'United States',
      allowed_channels: ['email', 'call'],
      opt_in_required_by_channel: {
        email: false, // CAN-SPAM allows B2B email
        call: true, // TCPA requires consent
        sms: true,
        whatsapp: true,
      },
      dnc_required: true,
      quiet_hours_local: { start: '21:00', end: '08:00' },
      required_disclosures: [
        'Sender identity',
        'Physical address',
        'Opt-out mechanism',
      ],
      rate_limits: {
        daily_emails: 1000,
        daily_calls: 100,
      },
      retention_days: 365,
      risk_level: 'medium',
      enforcement_notes: 'CAN-SPAM Act, TCPA, DNC Registry',
      policy_confidence: 0.95,
    });

    // European Union (GDPR)
    this.policies.set('EU', {
      jurisdiction_id: 'EU',
      country: 'European Union',
      allowed_channels: ['email'],
      opt_in_required_by_channel: {
        email: true, // GDPR requires explicit consent
        call: true,
        sms: true,
        whatsapp: true,
      },
      dnc_required: true,
      quiet_hours_local: { start: '20:00', end: '09:00' },
      required_disclosures: [
        'Data controller identity',
        'Legal basis for processing',
        'Right to withdraw consent',
        'Right to erasure',
        'Data protection officer contact',
      ],
      rate_limits: {
        daily_emails: 500,
      },
      retention_days: 180,
      risk_level: 'high',
      enforcement_notes: 'GDPR, ePrivacy Directive',
      policy_confidence: 0.90,
    });

    // United Kingdom
    this.policies.set('UK', {
      jurisdiction_id: 'UK',
      country: 'United Kingdom',
      allowed_channels: ['email'],
      opt_in_required_by_channel: {
        email: true, // UK GDPR + PECR
        call: true,
        sms: true,
        whatsapp: true,
      },
      dnc_required: true,
      quiet_hours_local: { start: '20:00', end: '09:00' },
      required_disclosures: [
        'Sender identity',
        'Opt-out mechanism',
        'Privacy notice',
      ],
      rate_limits: {
        daily_emails: 500,
      },
      retention_days: 180,
      risk_level: 'high',
      enforcement_notes: 'UK GDPR, PECR, ICO guidelines',
      policy_confidence: 0.90,
    });

    // Canada
    this.policies.set('CA', {
      jurisdiction_id: 'CA',
      country: 'Canada',
      allowed_channels: ['email'],
      opt_in_required_by_channel: {
        email: true, // CASL requires express consent
        call: true,
        sms: true,
        whatsapp: true,
      },
      dnc_required: true,
      quiet_hours_local: { start: '21:00', end: '09:00' },
      required_disclosures: [
        'Sender identity',
        'Contact information',
        'Unsubscribe mechanism',
      ],
      rate_limits: {
        daily_emails: 500,
      },
      retention_days: 365,
      risk_level: 'high',
      enforcement_notes: 'CASL (Canada Anti-Spam Law)',
      policy_confidence: 0.90,
    });

    // Australia
    this.policies.set('AU', {
      jurisdiction_id: 'AU',
      country: 'Australia',
      allowed_channels: ['email'],
      opt_in_required_by_channel: {
        email: false, // Spam Act allows B2B with opt-out
        call: true,
        sms: true,
        whatsapp: true,
      },
      dnc_required: true,
      quiet_hours_local: { start: '21:00', end: '09:00' },
      required_disclosures: [
        'Sender identity',
        'Unsubscribe facility',
      ],
      rate_limits: {
        daily_emails: 1000,
      },
      retention_days: 365,
      risk_level: 'medium',
      enforcement_notes: 'Spam Act 2003, Do Not Call Register',
      policy_confidence: 0.85,
    });

    console.log(`Policy database initialized: ${this.policies.size} jurisdictions`);
  }

  /**
   * Create new campaign
   */
  async createCampaign(config: CampaignConfig): Promise<{
    campaignId: string;
    policy: CampaignPolicy;
    mode: OperatingMode;
    status: string;
  }> {
    // Step 1: Policy lookup
    const policy = await this.lookupPolicy(config.country, config.city);

    // Step 2: Determine operating mode
    const mode = this.determineOperatingMode(policy);

    // Step 3: Compliance check
    const complianceCheck = await this.complianceGate(config, policy);

    if (complianceCheck.result === 'block') {
      throw new Error(`Campaign blocked: ${complianceCheck.reason}`);
    }

    // Step 4: Create campaign
    const campaignId = `campaign_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const campaign = {
      id: campaignId,
      config,
      policy,
      mode,
      status: 'active',
      created_at: new Date(),
      metrics: {
        leads_sourced: 0,
        emails_sent: 0,
        replies: 0,
        demos_booked: 0,
        deals_closed: 0,
        bounce_rate: 0,
        complaint_rate: 0,
      },
    };

    this.campaigns.set(campaignId, campaign);

    // Log compliance event
    this.logComplianceEvent({
      action: 'campaign_created',
      campaign_id: campaignId,
      policy_check_result: 'pass',
      reason: 'Campaign approved by compliance gate',
    });

    return {
      campaignId,
      policy,
      mode,
      status: 'active',
    };
  }

  /**
   * Lookup policy for jurisdiction
   */
  private async lookupPolicy(country: string, city?: string): Promise<CampaignPolicy> {
    // Try exact match
    const countryCode = this.getCountryCode(country);
    const policy = this.policies.get(countryCode);

    if (policy) {
      return policy;
    }

    // Return unknown policy (safe mode)
    return {
      jurisdiction_id: 'UNKNOWN',
      country,
      city,
      allowed_channels: ['email'], // Email only for unknown
      opt_in_required_by_channel: {
        email: true, // Assume strictest
        call: true,
        sms: true,
        whatsapp: true,
      },
      dnc_required: true,
      quiet_hours_local: { start: '20:00', end: '09:00' },
      required_disclosures: [
        'Sender identity',
        'Opt-out mechanism',
        'Privacy notice',
      ],
      rate_limits: {
        daily_emails: 100, // Conservative limit
      },
      retention_days: 90,
      risk_level: 'high',
      enforcement_notes: 'Unknown jurisdiction - using strictest rules',
      policy_confidence: 0.0,
    };
  }

  /**
   * Get country code from country name
   */
  private getCountryCode(country: string): string {
    const mapping: Record<string, string> = {
      'United States': 'US',
      'USA': 'US',
      'US': 'US',
      'United Kingdom': 'UK',
      'UK': 'UK',
      'Canada': 'CA',
      'Australia': 'AU',
      'European Union': 'EU',
      'EU': 'EU',
    };

    return mapping[country] || country.toUpperCase().substring(0, 2);
  }

  /**
   * Determine operating mode based on policy
   */
  private determineOperatingMode(policy: CampaignPolicy): OperatingMode {
    // Unknown jurisdiction => MODE_SAFE
    if (policy.policy_confidence < 0.5) {
      return 'MODE_SAFE';
    }

    // High risk => MODE_SAFE
    if (policy.risk_level === 'high') {
      return 'MODE_SAFE';
    }

    // Medium risk with high confidence => MODE_SEMI
    if (policy.risk_level === 'medium' && policy.policy_confidence >= 0.8) {
      return 'MODE_SEMI';
    }

    // Low risk with high confidence => MODE_AUTO
    if (policy.risk_level === 'low' && policy.policy_confidence >= 0.9) {
      return 'MODE_AUTO';
    }

    // Default to safe
    return 'MODE_SAFE';
  }

  /**
   * Compliance gate - mandatory check before any action
   */
  private async complianceGate(
    config: CampaignConfig,
    policy: CampaignPolicy
  ): Promise<{ result: 'pass' | 'block' | 'warning'; reason: string }> {
    // Check if channels are allowed
    const requestedChannels = config.channel_constraints || ['email'];

    for (const channel of requestedChannels) {
      if (!policy.allowed_channels.includes(channel as any)) {
        return {
          result: 'block',
          reason: `Channel ${channel} not allowed in ${policy.country}`,
        };
      }
    }

    // Check if required inputs are provided
    if (!config.country || !config.industry || !config.language) {
      return {
        result: 'block',
        reason: 'Missing required campaign inputs',
      };
    }

    // Check if policy confidence is acceptable
    if (policy.policy_confidence < 0.3) {
      return {
        result: 'warning',
        reason: 'Low policy confidence - recommend manual review',
      };
    }

    return {
      result: 'pass',
      reason: 'All compliance checks passed',
    };
  }

  /**
   * Log compliance event
   */
  private logComplianceEvent(event: {
    action: string;
    lead_id?: string;
    campaign_id?: string;
    policy_check_result: 'pass' | 'block' | 'warning';
    reason: string;
    required_fix?: string;
    reviewer?: string;
  }): void {
    const logEvent: ComplianceLogEvent = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      ...event,
    };

    this.complianceLogs.push(logEvent);
  }

  /**
   * Get workforce metrics
   */
  getMetrics(): {
    agents: number;
    campaigns: number;
    leads: number;
    complianceLogs: number;
    operatingMode: OperatingMode;
  } {
    return {
      agents: this.agents.size,
      campaigns: this.campaigns.size,
      leads: this.leads.size,
      complianceLogs: this.complianceLogs.length,
      operatingMode: this.operatingMode,
    };
  }

  /**
   * Get all agents
   */
  getAgents(): SalesAgent[] {
    return Array.from(this.agents.values());
  }

  /**
   * Get all campaigns
   */
  getCampaigns(): any[] {
    return Array.from(this.campaigns.values());
  }

  /**
   * Get compliance logs
   */
  getComplianceLogs(limit: number = 100): ComplianceLogEvent[] {
    return this.complianceLogs.slice(-limit);
  }

  /**
   * Get policies
   */
  getPolicies(): CampaignPolicy[] {
    return Array.from(this.policies.values());
  }
}

// Export singleton instance
export const autonomousSalesWorkforce = new AutonomousSalesWorkforce();
export type {
  CampaignPolicy,
  LeadCard,
  SequencePack,
  ComplianceLogEvent,
  ExperimentPlan,
  CampaignConfig,
  SalesAgent,
  OperatingMode,
};
