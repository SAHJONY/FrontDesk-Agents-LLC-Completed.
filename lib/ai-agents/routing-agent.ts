import OpenAI from 'openai';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Email routing categories and departments
 */
export const EMAIL_CATEGORIES = {
  SALES: 'sales',
  SUPPORT: 'support',
  BILLING: 'billing',
  TECHNICAL: 'technical',
  GENERAL: 'general',
  HR: 'hr',
  LEGAL: 'legal',
  PARTNERSHIPS: 'partnerships',
  PRESS: 'press',
  FEEDBACK: 'feedback',
  COMPLAINT: 'complaint',
  SPAM: 'spam',
} as const;

export type EmailCategory = typeof EMAIL_CATEGORIES[keyof typeof EMAIL_CATEGORIES];

/**
 * Urgency levels
 */
export enum UrgencyLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

/**
 * Email classification result
 */
export interface EmailClassification {
  category: EmailCategory;
  confidence: number;
  urgency: UrgencyLevel;
  isVIP: boolean;
  isSpam: boolean;
  requiresHuman: boolean;
  suggestedDepartment: string;
  suggestedHandler?: string;
  reasoning: string;
  keywords: string[];
}

/**
 * Email routing agent with RL-based optimization
 */
export class EmailRoutingAgent {
  private model = 'gpt-4.1-mini';
  private confidenceThreshold = 0.85;
  private routingHistory: Map<string, { classification: EmailClassification; feedback?: 'correct' | 'incorrect' }> = new Map();

  /**
   * Classify and route incoming email
   */
  async classifyEmail(emailData: {
    from: string;
    subject: string;
    body: string;
    metadata?: {
      customerTier?: 'free' | 'pro' | 'enterprise';
      previousInteractions?: number;
      accountValue?: number;
    };
  }): Promise<EmailClassification> {
    try {
      // Check for spam patterns first
      const spamCheck = await this.checkSpam(emailData);
      if (spamCheck.isSpam) {
        return spamCheck;
      }

      // Check VIP status
      const isVIP = this.checkVIPStatus(emailData);

      // Use GPT-4.1-mini for intelligent classification
      const classification = await this.performAIClassification(emailData, isVIP);

      // Store in routing history for RL training
      const historyKey = `${emailData.from}-${Date.now()}`;
      this.routingHistory.set(historyKey, { classification });

      return classification;
    } catch (error) {
      console.error('Email classification error:', error);
      
      // Fallback to general category with human review
      return {
        category: EMAIL_CATEGORIES.GENERAL,
        confidence: 0.5,
        urgency: UrgencyLevel.MEDIUM,
        isVIP: false,
        isSpam: false,
        requiresHuman: true,
        suggestedDepartment: 'support',
        reasoning: 'Classification error - requires human review',
        keywords: [],
      };
    }
  }

  /**
   * Perform AI-based classification using GPT-4.1-mini
   */
  private async performAIClassification(
    emailData: any,
    isVIP: boolean
  ): Promise<EmailClassification> {
    const prompt = `You are an expert email classification agent for FrontDesk Agents LLC, a company that provides AI-powered front office solutions.

Analyze this email and classify it:

FROM: ${emailData.from}
SUBJECT: ${emailData.subject}
BODY: ${emailData.body.substring(0, 1000)}
${emailData.metadata ? `CUSTOMER TIER: ${emailData.metadata.customerTier || 'unknown'}` : ''}
${isVIP ? 'VIP CUSTOMER: Yes' : ''}

Classify this email into ONE of these categories:
- sales: Sales inquiries, pricing, demos, product information
- support: Technical support, how-to questions, troubleshooting
- billing: Payment issues, invoices, subscription changes
- technical: API issues, integration problems, technical errors
- general: General inquiries, information requests
- hr: Job applications, recruiting, employee inquiries
- legal: Legal matters, compliance, contracts
- partnerships: Partnership opportunities, collaborations
- press: Media inquiries, press releases
- feedback: Product feedback, feature requests, suggestions
- complaint: Customer complaints, dissatisfaction

Also determine:
1. Urgency level (low/medium/high/critical)
2. Whether it requires human review (based on complexity and confidence)
3. Suggested department to handle it
4. Key keywords from the email
5. Your reasoning for the classification

Respond in JSON format:
{
  "category": "category_name",
  "confidence": 0.95,
  "urgency": "medium",
  "requiresHuman": false,
  "suggestedDepartment": "department_name",
  "reasoning": "explanation",
  "keywords": ["keyword1", "keyword2"]
}`;

    const response = await openai.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: 'system',
          content: 'You are an expert email classification agent. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    return {
      category: result.category || EMAIL_CATEGORIES.GENERAL,
      confidence: result.confidence || 0.7,
      urgency: result.urgency || UrgencyLevel.MEDIUM,
      isVIP,
      isSpam: false,
      requiresHuman: result.requiresHuman || result.confidence < this.confidenceThreshold,
      suggestedDepartment: result.suggestedDepartment || 'support',
      reasoning: result.reasoning || 'AI classification',
      keywords: result.keywords || [],
    };
  }

  /**
   * Check for spam patterns
   */
  private async checkSpam(emailData: any): Promise<EmailClassification> {
    const spamIndicators = [
      /viagra|cialis|pharmacy/i,
      /nigerian prince|inheritance|lottery/i,
      /click here now|act now|limited time/i,
      /congratulations! you've won/i,
      /increase your income|work from home|make money fast/i,
      /unsubscribe.*click here.*now/i,
    ];

    const bodyLower = emailData.body.toLowerCase();
    const subjectLower = emailData.subject.toLowerCase();
    const combinedText = `${subjectLower} ${bodyLower}`;

    const spamScore = spamIndicators.reduce((score, pattern) => {
      return score + (pattern.test(combinedText) ? 1 : 0);
    }, 0);

    const isSpam = spamScore >= 2;

    if (isSpam) {
      return {
        category: EMAIL_CATEGORIES.SPAM,
        confidence: 0.95,
        urgency: UrgencyLevel.LOW,
        isVIP: false,
        isSpam: true,
        requiresHuman: false,
        suggestedDepartment: 'spam',
        reasoning: `Spam detected with score ${spamScore}/6`,
        keywords: ['spam'],
      };
    }

    return { isSpam: false } as any;
  }

  /**
   * Check VIP customer status
   */
  private checkVIPStatus(emailData: any): boolean {
    if (!emailData.metadata) return false;

    const { customerTier, accountValue, previousInteractions } = emailData.metadata;

    // VIP criteria
    const isEnterprise = customerTier === 'enterprise';
    const isHighValue = accountValue && accountValue > 10000;
    const isFrequent = previousInteractions && previousInteractions > 50;

    return isEnterprise || isHighValue || isFrequent || false;
  }

  /**
   * Get routing destination based on classification
   */
  getRoutingDestination(classification: EmailClassification): {
    email: string;
    department: string;
    priority: number;
  } {
    const departmentEmails: Record<string, string> = {
      sales: 'sales@frontdeskagents.com',
      support: 'support@frontdeskagents.com',
      billing: 'billing@frontdeskagents.com',
      technical: 'technical@frontdeskagents.com',
      general: 'info@frontdeskagents.com',
      hr: 'hr@frontdeskagents.com',
      legal: 'legal@frontdeskagents.com',
      partnerships: 'partnerships@frontdeskagents.com',
      press: 'press@frontdeskagents.com',
      feedback: 'product@frontdeskagents.com',
      complaint: 'support@frontdeskagents.com',
      spam: 'spam@frontdeskagents.com',
    };

    // Calculate priority score (0-100)
    let priority = 50;

    // Urgency adjustments
    if (classification.urgency === UrgencyLevel.CRITICAL) priority += 40;
    else if (classification.urgency === UrgencyLevel.HIGH) priority += 25;
    else if (classification.urgency === UrgencyLevel.MEDIUM) priority += 10;

    // VIP boost
    if (classification.isVIP) priority += 20;

    // Confidence adjustment
    if (classification.confidence > 0.95) priority += 5;

    // Cap at 100
    priority = Math.min(100, priority);

    return {
      email: departmentEmails[classification.category] || departmentEmails.general,
      department: classification.suggestedDepartment,
      priority,
    };
  }

  /**
   * Provide feedback for RL training
   */
  provideFeedback(emailId: string, wasCorrect: boolean): void {
    const entry = this.routingHistory.get(emailId);
    if (entry) {
      entry.feedback = wasCorrect ? 'correct' : 'incorrect';
      
      // Update confidence threshold based on feedback
      this.updateConfidenceThreshold();
    }
  }

  /**
   * Update confidence threshold based on historical accuracy
   */
  private updateConfidenceThreshold(): void {
    const feedbackEntries = Array.from(this.routingHistory.values()).filter(e => e.feedback);
    
    if (feedbackEntries.length < 10) return;

    const correctCount = feedbackEntries.filter(e => e.feedback === 'correct').length;
    const accuracy = correctCount / feedbackEntries.length;

    // Adjust threshold based on accuracy
    if (accuracy > 0.95) {
      this.confidenceThreshold = Math.max(0.75, this.confidenceThreshold - 0.02);
    } else if (accuracy < 0.85) {
      this.confidenceThreshold = Math.min(0.95, this.confidenceThreshold + 0.02);
    }
  }

  /**
   * Get routing statistics
   */
  getStatistics(): {
    totalClassified: number;
    accuracy: number;
    averageConfidence: number;
    categoryDistribution: Record<string, number>;
  } {
    const entries = Array.from(this.routingHistory.values());
    const withFeedback = entries.filter(e => e.feedback);

    const accuracy = withFeedback.length > 0
      ? withFeedback.filter(e => e.feedback === 'correct').length / withFeedback.length
      : 0;

    const averageConfidence = entries.length > 0
      ? entries.reduce((sum, e) => sum + e.classification.confidence, 0) / entries.length
      : 0;

    const categoryDistribution: Record<string, number> = {};
    entries.forEach(e => {
      const cat = e.classification.category;
      categoryDistribution[cat] = (categoryDistribution[cat] || 0) + 1;
    });

    return {
      totalClassified: entries.length,
      accuracy,
      averageConfidence,
      categoryDistribution,
    };
  }

  /**
   * Export routing history for RL training
   */
  exportTrainingData(): Array<{
    input: any;
    classification: EmailClassification;
    feedback?: 'correct' | 'incorrect';
  }> {
    return Array.from(this.routingHistory.entries()).map(([id, data]) => ({
      input: id,
      classification: data.classification,
      feedback: data.feedback,
    }));
  }
}

// Singleton instance
export const emailRoutingAgent = new EmailRoutingAgent();
