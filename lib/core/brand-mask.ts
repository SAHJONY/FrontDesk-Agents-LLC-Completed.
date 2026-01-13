/** * FRONTDESK AGENTS - PROPRIETARY ENGINE MASKING
 * Rebrands third-party APIs as "Secret Sauce" Neural Nodes.
 */

const SECRET_SAUCE_MAP: Record<string, string> = {
  'vapi': 'FrontDesk Neural Vocal Node',
  'bland': 'FrontDesk Hyper-Scale Sales Swarm',
  'openai': 'FrontDesk Cognitive Intelligence Core',
  'stripe': 'FrontDesk Secure Financial Uplink',
  'twilio': 'FrontDesk Global PSTN Bridge',
  'resend': 'FrontDesk Transmission Protocol'
};

export function getProprietaryName(provider: string): string {
  return SECRET_SAUCE_MAP[provider.toLowerCase()] || 'FrontDesk Proprietary Node';
}
