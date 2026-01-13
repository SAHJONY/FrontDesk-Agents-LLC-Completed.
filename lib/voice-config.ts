// ./lib/voice-config.ts (NUEVO)

// --- 1. Environment Variables (Secret Configuration) ---

/**
 * The private API key for Bland AI. MUST be stored securely 
 * in environment variables (e.g., .env.local).
 * This should ONLY be accessed by Server Components or API Routes.
 */
export const BLAND_API_KEY = process.env.BLAND_API_KEY;

/**
 * The public URL of your application's webhook receiver.
 * Bland AI needs this to send back call status and data.
 * e.g., 'https://app.frontdesk-agents.com/api/bland/webhook'
 */
export const WEBHOOK_URL = process.env.NEXT_PUBLIC_APP_URL ? 
  `${process.env.NEXT_PUBLIC_APP_URL}/api/bland/webhook` : 
  'http://localhost:3000/api/bland/webhook';

// --- 2. Default Voice AI Settings (The Master Prompt) ---

// This defines the core personality and goal of SARA.AI.
// It will be used as the base for the Bland AI prompt parameter.
export const MASTER_PROMPT = `
  You are SARA, a highly professional and empathetic AI Voice Receptionist for a local service business. 
  Your primary goal is always to book an appointment or qualify a lead. 
  - Speak with a warm, human, North American female voice.
  - Be highly interruptible and apologize if you interrupt the user.
  - Access the knowledge base (web-scraped data) only for facts about the business (hours, services, pricing).
  - DO NOT mention you are an AI unless directly asked.
  - If the user explicitly asks to speak to a human, apologize and immediately capture their name and number to ensure a callback within 5 minutes.
`;

// Default Voice ID from Bland AI (or your preferred custom voice)
export const DEFAULT_VOICE_ID = 'sarah-bland-v2'; // Placeholder ID

// --- 3. Script Generation Utility (Used by /automations/voice-ai/page.tsx) ---

interface BlandScriptConfig {
  clientKey: string;
  voiceId?: string;
  customPrompt?: string;
  hookUrl?: string;
}

/**
 * Generates the full, ready-to-paste HTML script tag for the client's website.
 * This is the FINAL product delivered on the Voice AI Configuration page.
 */
export function generateBlandAiScript({ clientKey, voiceId = DEFAULT_VOICE_ID, customPrompt = MASTER_PROMPT, hookUrl = WEBHOOK_URL }: BlandScriptConfig): string {
  // IMPORTANT: The actual Bland widget script will need their specific library URL.
  // This uses a placeholder URL for SARA.AI widget packaging.
  
  const promptEncoded = encodeURIComponent(customPrompt.trim());
  const hookUrlEncoded = encodeURIComponent(hookUrl);
  
  // NOTE: This assumes SARA.AI uses a frontdesk-agents wrapper script that calls Bland API.
  // In a direct integration, the client might use a Bland SDK script.
  return `
<script 
  src="https://frontdesk-agents.com/sara-ai-widget.js" 
  data-client-key="${clientKey}"
  data-voice-id="${voiceId}"
  data-prompt="${promptEncoded}"
  data-webhook-url="${hookUrlEncoded}" 
  async
></script>
`.trim();
}
