export function generateAutonomousPrompt(industry: string, language: string, businessName: string) {
  const isMedical = industry.toLowerCase().includes('medical') || industry.toLowerCase().includes('clinic');
  
  const basePrompts: Record<string, string> = {
    en: `You are the front desk for ${businessName}.`,
    es: `Eres la recepción de ${businessName}.`,
    ar: `أنت موظف الاستقبال في ${businessName}.`
  };

  const clinicalAddon = isMedical 
    ? " Focus on HIPAA-compliant intake and emergency triage protocols." 
    : " Focus on lead capture and service scheduling.";

  return `${basePrompts[language] || basePrompts['en']}${clinicalAddon}`;
}
