// lib/call_identity_router.ts
import { frontdeskAgentsSystem } from "./frontdesk_agents_system";

type ClientBusiness = {
  id: string;
  name: string;
  domain?: string;
};

export function resolveCallIdentity(params: {
  dialedFrom: string;
  dialedTo: string;
  clientBusiness?: ClientBusiness | null;
}) {
  const { dialedFrom, dialedTo, clientBusiness } = params;
  const policy = frontdeskAgentsSystem.identity_policy;

  const isCompanyNumber =
    policy.mode_selection_logic.company_numbers.includes(dialedFrom) ||
    policy.mode_selection_logic.company_numbers.includes(dialedTo);

  if (isCompanyNumber) {
    return {
      mode: "company_public" as const,
      representing: "FrontDesk Agents",
      displayName: "ALEX with FrontDesk Agents",
      inboundGreeting: policy.voice.inbound_templates.company_public,
      outboundTemplate: policy.voice.outbound_templates.company_public,
      complianceNotice: policy.voice.compliance_notice,
      allowBrandReference:
        policy.modes.company_public.allowBrandReference
    };
  }

  const clientName = clientBusiness?.name ?? "our office";

  return {
    mode: "client_white_label" as const,
    representing: clientName,
    displayName: `ALEX from ${clientName}`,
    inboundGreeting:
      policy.voice.inbound_templates.client_white_label.replace(
        "[CLIENT_NAME]",
        clientName
      ),
    outboundTemplate:
      policy.voice.outbound_templates.client_white_label.replace(
        "[CLIENT_NAME]",
        clientName
      ),
    complianceNotice: policy.voice.compliance_notice,
    allowBrandReference:
      policy.modes.client_white_label.allowBrandReference
  };
}

// Opcional: checklist interno (no se habla al cliente)
export const preCallVerification = [
  "Determine mode based on phone number mapping.",
  "Load client business profile if in client_white_label mode.",
  "Assemble correct outbound/inbound script.",
  "Attach brand-neutral recording notice when required.",
  "Log mode and represented business into CRM."
];
