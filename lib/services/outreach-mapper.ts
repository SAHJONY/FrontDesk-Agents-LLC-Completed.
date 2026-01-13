function formatCurrency(amount: number, currency: string): string {
  return `${currency} ${amount.toFixed(2)}`;
}

export function getLocalizedTemplate(lead: any) {
  const templates = {
    en: { body: "...", subject: "..." },
    ar: { body: "...", subject: "..." },
    es: { body: "...", subject: "..." },
    // ... logic for fr and de
  };

  const template = templates[lead.language as keyof typeof templates] || templates['en'];
  
  return {
    subject: template.subject.replace('{business_name}', lead.name),
    body: template.body
      .replace('{recovery_value}', formatCurrency(lead.roi.leakage, lead.currency))
      .replace('[Link]', `https://frontdeskagents.com/initialize/${lead.id}`)
  };
}
