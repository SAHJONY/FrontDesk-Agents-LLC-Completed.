// Telephony/blandai-config.ts
// Configuration for the Global Revenue Workforce nodes via Bland.AI

export interface BlandAIConfig {
  apiKey: string;
  defaultVoice: string;
  interruptionThreshold: number;
  model: 'base' | 'enhanced' | 'turbo';
  temperature: number;
}

export const blandAIConfig: BlandAIConfig = {
  // Pulls from your Phase 1 Environment Configuration
  apiKey: process.env.BLAND_AI_API_KEY || '',
  
  // Professional default voice for the 'Professional' ($399) tier
  defaultVoice: "maya", 
  
  // High-performance settings for the pdx1 build
  interruptionThreshold: 100,
  model: "enhanced",
  temperature: 0.7,
};

/**
 * Prompt mapping for the 4 workforce levels [cite: 2025-12-28]
 */
export const NODE_PROMPTS = {
  basic: "You are a professional receptionist. Answer questions and take messages.",
  professional: "You are a sales qualification agent. Identify lead value and book meetings.",
  growth: "You are a scaling agent. Handle high-volume outbound outreach.",
  elite: "You are a priority revenue recovery agent. Focus on closing and retention."
};
