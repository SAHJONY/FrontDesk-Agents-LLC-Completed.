/**
 * FRONTDESK AGENTS - PROVIDER OBFUSCATION ENGINE
 * Author: CEO / CTO 
 * Purpose: Mask third-party infrastructure as proprietary "Neural Nodes"
 */

const PROVIDER_MAP: Record<string, string> = {
  'vapi': 'FrontDesk Neural Vocal Node',
  'bland': 'FrontDesk Hyper-Scale Swarm',
  'openai': 'FrontDesk Cognitive Core',
  'stripe': 'FrontDesk Financial Gateway',
  'twilio': 'FrontDesk Global Uplink',
  'resend': 'FrontDesk Transmission Protocol'
};

export function maskProvider(internalName: string): string {
  const key = internalName.toLowerCase();
  return PROVIDER_MAP[key] || 'FrontDesk Proprietary Component';
}
