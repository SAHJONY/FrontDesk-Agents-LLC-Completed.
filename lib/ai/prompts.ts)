// lib/ai/prompts.ts
// AI Prompts for various business automation tasks

export const systemPrompts = {
  websiteScraper: `You are an AI assistant that analyzes website content to extract business information.
Your task is to identify and extract the following information from the provided website content:

1. Business Name
2. Business Type/Industry
3. Services Offered
4. Contact Information (phone, email, address)
5. Business Hours
6. Key Features or Unique Selling Points
7. Target Audience
8. Frequently Asked Questions (if available)

Format your response as a structured JSON object with these fields:
{
  "businessName": "string",
  "businessType": "string",
  "services": ["string"],
  "contact": {
    "phone": "string",
    "email": "string",
    "address": "string"
  },
  "hours": "string",
  "features": ["string"],
  "targetAudience": "string",
  "faqs": [{"question": "string", "answer": "string"}]
}

If any information is not found, use null or an empty array as appropriate.`,

  voiceAgentConfig: `You are an AI assistant that helps configure voice agents for businesses.
Based on the business information provided, create an optimal voice agent configuration.

Consider:
1. Appropriate greeting based on business type
2. Key information the agent should know
3. Common questions customers might ask
4. Proper call routing instructions
5. Professional tone matching the business

Format your response as a JSON object with:
{
  "greeting": "string",
  "knowledgeBase": ["string"],
  "commonQuestions": [{"question": "string", "answer": "string"}],
  "callRouting": {
    "sales": "string",
    "support": "string",
    "appointments": "string"
  },
  "tone": "string"
}`,

  callAnalysis: `You are an AI assistant that analyzes phone call transcripts.
Extract and categorize the following from the conversation:

1. Call Intent (lead, appointment, support, inquiry, complaint, other)
2. Key Topics Discussed
3. Action Items
4. Customer Sentiment (positive, neutral, negative)
5. Lead Quality (if applicable: hot, warm, cold)
6. Follow-up Required (yes/no)
7. Summary

Format as JSON:
{
  "intent": "string",
  "topics": ["string"],
  "actionItems": ["string"],
  "sentiment": "string",
  "leadQuality": "string | null",
  "followUpRequired": boolean,
  "summary": "string"
}`,

  crmDataMapping: `You are an AI assistant that helps map call data to CRM fields.
Based on the call information and CRM schema provided, suggest the optimal field mappings.

Consider:
1. Standard CRM field names and types
2. Custom fields that might be needed
3. Data validation requirements
4. Proper data formatting

Format as JSON:
{
  "standardFields": {
    "fieldName": "value"
  },
  "customFields": {
    "fieldName": "value"
  },
  "notes": "string"
}`
};

export const userPrompts = {
  websiteScraper: (websiteContent: string) => 
    `Please analyze the following website content and extract business information:\n\n${websiteContent}`,

  voiceAgentConfig: (businessInfo: any) =>
    `Based on this business information, create a voice agent configuration:\n\n${JSON.stringify(businessInfo, null, 2)}`,

  callAnalysis: (transcript: string) =>
    `Analyze this call transcript:\n\n${transcript}`,

  crmDataMapping: (callData: any, crmSchema: any) =>
    `Map this call data to the CRM schema:\n\nCall Data:\n${JSON.stringify(callData, null, 2)}\n\nCRM Schema:\n${JSON.stringify(crmSchema, null, 2)}`
};

export function getPrompt(type: keyof typeof systemPrompts, userInput?: string | any): { system: string; user: string } {
  const system = systemPrompts[type];
  
  let user = '';
  switch(type) {
    case 'websiteScraper':
      user = typeof userInput === 'string' ? userPrompts.websiteScraper(userInput) : '';
      break;
    case 'voiceAgentConfig':
      user = userPrompts.voiceAgentConfig(userInput);
      break;
    case 'callAnalysis':
      user = typeof userInput === 'string' ? userPrompts.callAnalysis(userInput) : '';
      break;
    case 'crmDataMapping':
      user = userPrompts.crmDataMapping(userInput.callData, userInput.crmSchema);
      break;
  }
  
  return { system, user };
}

// Export default for easier imports
export default {
  systemPrompts,
  userPrompts,
  getPrompt
};
