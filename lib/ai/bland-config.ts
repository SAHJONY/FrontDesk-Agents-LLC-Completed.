/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Orchestration: Bland.AI Voice & Logic Integration
 */

export interface BlandAIConfig {
  apiKey: string;
  apiUrl: string;
  webhookBaseUrl: string;
  webhookSecret: string;
  defaultVoice: string;
  defaultModel: string;
  maxCallDuration: number;
  recordCalls: boolean;
  transcribeCalls: boolean;
}

export function getBlandAIConfig(): BlandAIConfig {
  return {
    apiKey: process.env.BLAND_API_KEY!,
    apiUrl: process.env.BLAND_API_URL || 'https://api.bland.ai/v1',
    webhookBaseUrl: process.env.BLAND_WEBHOOK_BASE_URL!,
    webhookSecret: process.env.BLAND_WEBHOOK_SECRET!,
    defaultVoice: process.env.BLAND_DEFAULT_VOICE || 'maya',
    defaultModel: process.env.BLAND_DEFAULT_MODEL || 'enhanced',
    maxCallDuration: parseInt(process.env.BLAND_MAX_CALL_DURATION || '1800'),
    recordCalls: process.env.BLAND_RECORD_CALLS === 'true',
    transcribeCalls: process.env.BLAND_TRANSCRIBE_CALLS === 'true',
  };
}

/**
 * ELITE VOICE ROSTER
 * Optimized for high-trust professional environments
 */
export const BLAND_VOICES = {
  maya: {
    name: 'Maya',
    tone: 'Professional/Direct',
    bestFor: ['receptionist', 'qualification'],
  },
  ryan: {
    name: 'Ryan',
    tone: 'Authoritative/Corporate',
    bestFor: ['legal_agent', 'priority'],
  },
  james: {
    name: 'James',
    tone: 'Warm/British',
    bestFor: ['consultation', 'high-net-worth'],
  },
};

/**
 * THE SOVEREIGN PROMPT ARCHITECTURE
 * These templates drive the Agentic Workforce logic.
 */
export const NODE_PROMPTS = {
  receptionist: `You are a professional receptionist for {company_name}. 
  OBJECTIVE: Collect name, phone, and reason for call. 
  TONE: Efficient and welcoming. 
  MARKET: {market_context}.`,

  qualification: `You are a Sales Qualification Lead for {company_name}. 
  OBJECTIVE: Determine budget, timeline, and decision-maker status. 
  CRITICAL: If the lead mentions a claim value over $100k, flag as PRIORITY.`,

  legal_agent: `You are a Senior Legal Intake Specialist for {company_name}. 
  OBJECTIVE: Conduct a merits-first analysis of the caller's case. 
  TONE: Analytical, empathetic, and highly professional. 
  LOGIC: Gather case facts, injury/damage details, and statute of limitations indicators.`,

  priority: `You are an Elite Revenue Specialist for {company_name}. 
  OBJECTIVE: High-value conversion. 
  STRATEGY: Use the prospect's profile ({custom_context}) to present tailored ROI and legal recovery solutions. 
  CLOSING: Secure a commitment for a discovery session or contract review.`
};



/**
 * DYNAMIC PROMPT GENERATION
 * Injects market and company context into the AI's "brain."
 */
export function generateNodePrompt(
  nodeType: string,
  companyName: string,
  marketContext: string = 'United States',
  customContext?: Record<string, any>
): string {
  let basePrompt = NODE_PROMPTS[nodeType as keyof typeof NODE_PROMPTS] || NODE_PROMPTS.receptionist;
  
  // Injection: Identity & Local Market Awareness
  basePrompt = basePrompt.replace(/{company_name}/g, companyName);
  basePrompt = basePrompt.replace(/{market_context}/g, marketContext);
  
  if (customContext) {
    let contextStr = '\n\nCLIENT DOSSIER:\n';
    Object.entries(customContext).forEach(([key, value]) => {
      contextStr += `* ${key}: ${value}\n`;
    });
    basePrompt += contextStr;
  }
  
  return basePrompt;
}

/**
 * REVENUE ESTIMATION (Tier-Aware)
 * Calculates internal cost to ensure the 15% Success Fee remains profitable.
 */
export function estimateCallCost(
  durationSeconds: number,
  nodeType: string,
  tier: string
): number {
  const baseRate = 0.09; 
  const multipliers = { receptionist: 1.0, qualification: 1.2, legal_agent: 1.5, priority: 2.0 };
  const discounts = { basic: 1.0, professional: 0.95, growth: 0.90, elite: 0.85 };
  
  const minutes = durationSeconds / 60;
  return minutes * baseRate * (multipliers[nodeType as keyof typeof multipliers] || 1.0) * (discounts[tier as keyof typeof discounts] || 1.0);
}
