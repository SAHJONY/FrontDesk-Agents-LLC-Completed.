export function buildUniversalPrompt(lead: {
  name: string,
  industry: string,
  language: string,
  intent: 'sales' | 'support' | 'triage'
}) {
  const toneMap = {
    ar: "Maintain high-protocol professional courtesy (Adab).",
    es: "Be warm, helpful, and highly communicative (Cercanía).",
    en: "Be efficient, direct, and solution-oriented."
  };

  const industryLogic = {
    high_stakes: ["legal", "medical", "insurance", "finance"],
    technical: ["construction", "hvac", "it", "logistics"],
    hospitality: ["retail", "restaurant", "hotel", "salon"]
  };

  let constraint = "Handle general inquiries.";
  if (industryLogic.high_stakes.some(i => lead.industry.toLowerCase().includes(i))) {
    constraint = "Prioritize confidentiality and urgent triage. Do not give advice; collect data.";
  } else if (industryLogic.technical.some(i => lead.industry.toLowerCase().includes(i))) {
    constraint = "Identify project scope, location, and urgency immediately.";
  }

  return `
    SYSTEM_IDENTITY: Sovereign FrontDesk Agent for ${lead.name}.
    LANGUAGE_CONTEXT: ${lead.language}. ${toneMap[lead.language as keyof typeof toneMap] || ""}
    INDUSTRY_LOGIC: ${lead.industry}. ${constraint}
    GOAL: ${lead.intent}.
  `.trim();
}
