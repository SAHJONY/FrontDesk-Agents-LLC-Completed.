// lib/call_identity_router.ts

import { frontdeskAgentsSystem } from "./frontdesk_agents_system";

export type IdentityMode = "client_white_label" | "company_public";

export interface CallIdentityInput {
  fromNumber: string;
  toNumber: string;
}

export interface CallIdentityResult {
  mode: IdentityMode;
  representedBusiness: "FrontDesk Agents" | "Client";
  metadata: {
    isCompanyNumber: boolean;
    rawFrom: string;
    rawTo: string;
  };
}

/**
 * Decide si ALEX debe hablar como:
 * - "ALEX with FrontDesk Agents"  (company_public)
 * - "ALEX from [Client Business Name]" (client_white_label)
 *
 * Basado en los números configurados en identity_policy.mode_selection_logic.
 */
export function resolveCallIdentity(
  input: CallIdentityInput
): CallIdentityResult {
  const policy = frontdeskAgentsSystem.identity_policy;
  const modeConfig = policy.mode_selection_logic;

  const dialedFrom = normalizeNumber(input.fromNumber);
  const dialedTo = normalizeNumber(input.toNumber);

  // 👇 Cast explícito para evitar el error de TS:
  const companyNumbers = modeConfig
    .company_numbers as readonly string[];

  const isCompanyNumber =
    companyNumbers.includes(dialedFrom) ||
    companyNumbers.includes(dialedTo);

  const mode: IdentityMode = isCompanyNumber
    ? "company_public"
    : modeConfig.default_mode;

  return {
    mode,
    representedBusiness: isCompanyNumber ? "FrontDesk Agents" : "Client",
    metadata: {
      isCompanyNumber,
      rawFrom: input.fromNumber,
      rawTo: input.toNumber
    }
  };
}

function normalizeNumber(num: string): string {
  return num.replace(/[\s\-()]/g, "");
}
