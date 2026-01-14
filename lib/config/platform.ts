/**
 * FRONTDESK AGENTS — CANONICAL IDENTITY
 * Deployment Node: pdx1 | 2026-01-02
 */

export const PLATFORM_CONFIG = {
  name: "FrontDesk Agents",
  identity: "Autonomous Front Office",
  tagline: "The Operating Layer for Revenue, Support, and Growth",
  pricing: {
    anchor: 2499,
    currency: "USD",
    category: "Infrastructure Operating Fee"
  },
  salesEnhancement: {
    intentThreshold: 0.85, // Only hot leads reach human agents
    handoffMode: "Direct-to-CRM",
    speedToLeadTarget: "< 5 seconds"
  }
};
