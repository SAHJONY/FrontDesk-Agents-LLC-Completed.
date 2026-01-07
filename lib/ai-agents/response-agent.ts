import OpenAI from 'openai';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Response tone options
 */
export enum ResponseTone {
  PROFESSIONAL = 'professional',
  FRIENDLY = 'friendly',
  EMPATHETIC = 'empathetic',
  FORMAL = 'formal',
  CASUAL = 'casual',
  APOLOGETIC = 'apologetic',
}

/**
 * Response generation result
 */
export interface GeneratedResponse {
  content: string;
  subject?: string;
  confidence: number;
  tone: ResponseTone;
  requiresReview: boolean;
  suggestedActions: string[];
  reasoning: string;
  alternativeResponses?: string[];
}

/**
 * Conversation context
 */
export interface ConversationContext {
  threadId: string;
  previousEmails: Array<{
    from: string;
    to: string;
    subject: string;
    body: string;
    timestamp: Date;
  }>;
  customerInfo?: {
    name?: string;
    company?: string;
    tier?: 'free' | 'pro' | 'enterprise';
    accountValue?: number;
    previousInteractions?: number;
  };
  sentiment?: {
    score: number;
    emotion: string;
  };
}

/**
 * Response generation agent with context awareness
 */
export class ResponseGenerationAgent {
  private model = 'gpt-4.1';
  private confidenceThreshold = 0.85;
  private responseHistory: Map<string, { response: GeneratedResponse; accepted: boolean }> = new Map();

  /**
   * Generate email response
   */
  async generateResponse(params: {
    incomingEmail: {
      from: string;
      subject: string;
      body: string;
    };
    category: string;
    context?: ConversationContext;
    tone?: ResponseTone;
    knowledgeBase?: string[];
  }): Promise<GeneratedResponse> {
    try {
      const tone = params.tone || this.determineTone(params);
      const systemPrompt = this.buildSystemPrompt(params.category, tone);
      const userPrompt = this.buildUserPrompt(params);

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const generatedContent = response.choices[0].message.content || '';
      
      // Parse the response
      const parsedResponse = this.parseGeneratedResponse(generatedContent, tone);

      // Store in history for RL training
      const historyKey = `${params.incomingEmail.from}-${Date.now()}`;
      this.responseHistory.set(historyKey, {
        response: parsedResponse,
        accepted: false,
      });

      return parsedResponse;
    } catch (error) {
      console.error('Response generation error:', error);
      
      return {
        content: 'Thank you for contacting FrontDesk Agents. We have received your message and will respond shortly.',
        confidence: 0.5,
        tone: ResponseTone.PROFESSIONAL,
        requiresReview: true,
        suggestedActions: ['escalate_to_human'],
        reasoning: 'Generation error - requires human review',
      };
    }
  }

  /**
   * Build system prompt based on category and tone
   */
  private buildSystemPrompt(category: string, tone: ResponseTone): string {
    const basePrompt = `You are an expert customer service AI agent for FrontDesk Agents LLC, a company that provides AI-powered front office solutions.

Your role is to generate professional, helpful, and accurate email responses.

COMPANY INFORMATION:
- Company: FrontDesk Agents LLC
- Product: AI-powered front office automation platform
- Website: frontdeskagents.com
- Email: frontdeskllc@outlook.com

RESPONSE GUIDELINES:
- Be ${tone}, clear, and concise
- Provide accurate information
- Offer solutions and next steps
- Include relevant links when helpful
- Sign off professionally
- Never make promises you can't keep
- Escalate complex issues appropriately`;

    const categoryGuidelines: Record<string, string> = {
      sales: `
SALES SPECIFIC:
- Highlight product benefits and ROI
- Offer demo or consultation
- Provide pricing information when appropriate
- Create urgency without being pushy
- Include clear call-to-action`,
      
      support: `
SUPPORT SPECIFIC:
- Acknowledge the issue clearly
- Provide step-by-step solutions
- Offer additional help if needed
- Include relevant documentation links
- Set expectations for resolution time`,
      
      billing: `
BILLING SPECIFIC:
- Be clear about payment details
- Provide invoice/receipt information
- Explain charges transparently
- Offer payment assistance if needed
- Include billing contact for complex issues`,
      
      technical: `
TECHNICAL SPECIFIC:
- Provide detailed technical guidance
- Include code examples if relevant
- Link to API documentation
- Offer to escalate to engineering if needed
- Set realistic expectations for fixes`,
      
      complaint: `
COMPLAINT SPECIFIC:
- Acknowledge frustration empathetically
- Apologize sincerely for issues
- Take ownership of the problem
- Provide concrete resolution steps
- Offer compensation if appropriate
- Follow up commitment`,
    };

    return basePrompt + (categoryGuidelines[category] || '');
  }

  /**
   * Build user prompt with context
   */
  private buildUserPrompt(params: any): string {
    let prompt = `Generate a response to this email:

FROM: ${params.incomingEmail.from}
SUBJECT: ${params.incomingEmail.subject}
BODY:
${params.incomingEmail.body}

`;

    // Add conversation context
    if (params.context?.previousEmails?.length > 0) {
      prompt += `\nPREVIOUS CONVERSATION:\n`;
      params.context.previousEmails.slice(-3).forEach((email: any, idx: number) => {
        prompt += `[${idx + 1}] ${email.from}: ${email.body.substring(0, 200)}...\n`;
      });
    }

    // Add customer context
    if (params.context?.customerInfo) {
      const info = params.context.customerInfo;
      prompt += `\nCUSTOMER INFO:\n`;
      if (info.name) prompt += `Name: ${info.name}\n`;
      if (info.company) prompt += `Company: ${info.company}\n`;
      if (info.tier) prompt += `Tier: ${info.tier}\n`;
    }

    // Add sentiment context
    if (params.context?.sentiment) {
      prompt += `\nSENTIMENT: ${params.context.sentiment.emotion} (${params.context.sentiment.score})\n`;
    }

    // Add knowledge base
    if (params.knowledgeBase?.length > 0) {
      prompt += `\nRELEVANT KNOWLEDGE:\n`;
      params.knowledgeBase.forEach((kb: string, idx: number) => {
        prompt += `[${idx + 1}] ${kb}\n`;
      });
    }

    prompt += `\nGenerate a complete email response including:
1. Appropriate greeting
2. Acknowledgment of their message
3. Clear, helpful response addressing all points
4. Next steps or call-to-action
5. Professional sign-off

Also provide:
- Confidence score (0-1)
- Whether it requires human review
- Suggested follow-up actions
- Brief reasoning for your response

Format as JSON:
{
  "subject": "Re: [original subject]",
  "content": "full email content",
  "confidence": 0.95,
  "requiresReview": false,
  "suggestedActions": ["action1", "action2"],
  "reasoning": "explanation"
}`;

    return prompt;
  }

  /**
   * Parse generated response
   */
  private parseGeneratedResponse(content: string, tone: ResponseTone): GeneratedResponse {
    try {
      // Try to parse as JSON
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          content: parsed.content || content,
          subject: parsed.subject,
          confidence: parsed.confidence || 0.8,
          tone,
          requiresReview: parsed.requiresReview || parsed.confidence < this.confidenceThreshold,
          suggestedActions: parsed.suggestedActions || [],
          reasoning: parsed.reasoning || 'AI generated response',
        };
      }
    } catch (error) {
      // If parsing fails, use the raw content
    }

    return {
      content,
      confidence: 0.7,
      tone,
      requiresReview: true,
      suggestedActions: [],
      reasoning: 'Response generated without structured output',
    };
  }

  /**
   * Determine appropriate tone based on context
   */
  private determineTone(params: any): ResponseTone {
    const { category, context } = params;

    // Complaint or negative sentiment -> Empathetic/Apologetic
    if (category === 'complaint' || context?.sentiment?.score < -0.3) {
      return ResponseTone.APOLOGETIC;
    }

    // VIP customer -> Professional
    if (context?.customerInfo?.tier === 'enterprise') {
      return ResponseTone.PROFESSIONAL;
    }

    // Legal/Billing -> Formal
    if (category === 'legal' || category === 'billing') {
      return ResponseTone.FORMAL;
    }

    // Support -> Empathetic
    if (category === 'support') {
      return ResponseTone.EMPATHETIC;
    }

    // Sales -> Friendly
    if (category === 'sales') {
      return ResponseTone.FRIENDLY;
    }

    // Default
    return ResponseTone.PROFESSIONAL;
  }

  /**
   * Generate multiple response variations
   */
  async generateVariations(params: any, count: number = 3): Promise<GeneratedResponse[]> {
    const variations: GeneratedResponse[] = [];

    for (let i = 0; i < count; i++) {
      const response = await this.generateResponse({
        ...params,
        tone: [ResponseTone.PROFESSIONAL, ResponseTone.FRIENDLY, ResponseTone.EMPATHETIC][i],
      });
      variations.push(response);
    }

    return variations;
  }

  /**
   * Provide feedback for RL training
   */
  provideFeedback(responseId: string, wasAccepted: boolean, customerSatisfaction?: number): void {
    const entry = this.responseHistory.get(responseId);
    if (entry) {
      entry.accepted = wasAccepted;
      
      // Update model based on feedback
      this.updateModelPerformance(wasAccepted, customerSatisfaction);
    }
  }

  /**
   * Update model performance metrics
   */
  private updateModelPerformance(wasAccepted: boolean, satisfaction?: number): void {
    // Calculate acceptance rate
    const entries = Array.from(this.responseHistory.values());
    const acceptanceRate = entries.filter(e => e.accepted).length / entries.length;

    // Adjust confidence threshold
    if (acceptanceRate > 0.95) {
      this.confidenceThreshold = Math.max(0.75, this.confidenceThreshold - 0.01);
    } else if (acceptanceRate < 0.85) {
      this.confidenceThreshold = Math.min(0.95, this.confidenceThreshold + 0.01);
    }
  }

  /**
   * Get response statistics
   */
  getStatistics(): {
    totalGenerated: number;
    acceptanceRate: number;
    averageConfidence: number;
    toneDistribution: Record<string, number>;
  } {
    const entries = Array.from(this.responseHistory.values());

    const acceptanceRate = entries.length > 0
      ? entries.filter(e => e.accepted).length / entries.length
      : 0;

    const averageConfidence = entries.length > 0
      ? entries.reduce((sum, e) => sum + e.response.confidence, 0) / entries.length
      : 0;

    const toneDistribution: Record<string, number> = {};
    entries.forEach(e => {
      const tone = e.response.tone;
      toneDistribution[tone] = (toneDistribution[tone] || 0) + 1;
    });

    return {
      totalGenerated: entries.length,
      acceptanceRate,
      averageConfidence,
      toneDistribution,
    };
  }
}

/**
 * Conversation management agent
 */
export class ConversationManagementAgent {
  private conversations: Map<string, ConversationContext> = new Map();

  /**
   * Track email in conversation thread
   */
  addToConversation(threadId: string, email: {
    from: string;
    to: string;
    subject: string;
    body: string;
    timestamp: Date;
  }): void {
    let context = this.conversations.get(threadId);
    
    if (!context) {
      context = {
        threadId,
        previousEmails: [],
      };
      this.conversations.set(threadId, context);
    }

    context.previousEmails.push(email);
  }

  /**
   * Get conversation context
   */
  getContext(threadId: string): ConversationContext | undefined {
    return this.conversations.get(threadId);
  }

  /**
   * Update customer info in conversation
   */
  updateCustomerInfo(threadId: string, customerInfo: any): void {
    const context = this.conversations.get(threadId);
    if (context) {
      context.customerInfo = { ...context.customerInfo, ...customerInfo };
    }
  }

  /**
   * Update sentiment in conversation
   */
  updateSentiment(threadId: string, sentiment: { score: number; emotion: string }): void {
    const context = this.conversations.get(threadId);
    if (context) {
      context.sentiment = sentiment;
    }
  }

  /**
   * Check if conversation is resolved
   */
  isResolved(threadId: string): boolean {
    const context = this.conversations.get(threadId);
    if (!context || context.previousEmails.length === 0) return false;

    const lastEmail = context.previousEmails[context.previousEmails.length - 1];
    const resolutionKeywords = [
      'thank you',
      'resolved',
      'fixed',
      'working now',
      'appreciate',
      'solved',
    ];

    return resolutionKeywords.some(keyword => 
      lastEmail.body.toLowerCase().includes(keyword)
    );
  }

  /**
   * Get conversation summary
   */
  getSummary(threadId: string): string {
    const context = this.conversations.get(threadId);
    if (!context) return 'No conversation found';

    const emailCount = context.previousEmails.length;
    const participants = new Set(context.previousEmails.map(e => e.from));
    
    return `Thread ${threadId}: ${emailCount} emails, ${participants.size} participants`;
  }

  /**
   * Clean up old conversations
   */
  cleanupOldConversations(daysOld: number = 30): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    this.conversations.forEach((context, threadId) => {
      const lastEmail = context.previousEmails[context.previousEmails.length - 1];
      if (lastEmail && lastEmail.timestamp < cutoffDate) {
        this.conversations.delete(threadId);
      }
    });
  }
}

// Singleton instances
export const responseGenerationAgent = new ResponseGenerationAgent();
export const conversationManagementAgent = new ConversationManagementAgent();
