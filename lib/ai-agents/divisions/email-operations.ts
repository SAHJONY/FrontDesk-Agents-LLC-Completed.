/**
 * Email Operations Division
 * Handles all email-related operations with AI-powered agents
 */

import { Division, Mission, MissionStatus } from '../supreme-commander';

export interface EmailClassification {
  category: 'support' | 'sales' | 'billing' | 'general' | 'urgent' | 'spam';
  confidence: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  isVIP: boolean;
  routing: string;
}

export interface SentimentAnalysis {
  emotion: 'positive' | 'neutral' | 'negative' | 'angry' | 'frustrated';
  score: number; // -1 to 1
  keywords: string[];
}

export interface EmailResponse {
  content: string;
  confidence: number;
  requiresReview: boolean;
  suggestedActions: string[];
}

export interface EmailProcessingResult {
  classification: EmailClassification;
  sentiment: SentimentAnalysis;
  priorityScore: number; // 0-100
  response?: EmailResponse;
  enrichedData?: any;
}

/**
 * Email Routing Agent
 * Classifies and routes incoming emails
 */
export class EmailRoutingAgent {
  async classifyEmail(email: {
    from: string;
    subject: string;
    body: string;
  }): Promise<EmailClassification> {
    // Analyze email content
    const lowerBody = email.body.toLowerCase();
    const lowerSubject = email.subject.toLowerCase();

    let category: EmailClassification['category'] = 'general';
    let urgency: EmailClassification['urgency'] = 'medium';
    let confidence = 0.7;

    // Classification logic
    if (lowerSubject.includes('urgent') || lowerBody.includes('asap') || lowerBody.includes('emergency')) {
      urgency = 'critical';
      confidence = 0.95;
    }

    if (lowerSubject.includes('support') || lowerBody.includes('help') || lowerBody.includes('issue')) {
      category = 'support';
      confidence = 0.85;
    } else if (lowerSubject.includes('sales') || lowerBody.includes('pricing') || lowerBody.includes('demo')) {
      category = 'sales';
      confidence = 0.85;
    } else if (lowerSubject.includes('billing') || lowerBody.includes('invoice') || lowerBody.includes('payment')) {
      category = 'billing';
      confidence = 0.9;
    }

    // VIP detection
    const isVIP = email.from.includes('ceo') || email.from.includes('founder') || email.from.includes('director');

    return {
      category,
      confidence,
      urgency,
      isVIP,
      routing: this.determineRouting(category, urgency, isVIP),
    };
  }

  private determineRouting(
    category: string,
    urgency: string,
    isVIP: boolean
  ): string {
    if (urgency === 'critical' || isVIP) {
      return 'PRIORITY_QUEUE';
    }

    switch (category) {
      case 'support':
        return 'SUPPORT_TEAM';
      case 'sales':
        return 'SALES_TEAM';
      case 'billing':
        return 'BILLING_TEAM';
      default:
        return 'GENERAL_QUEUE';
    }
  }
}

/**
 * Sentiment Analysis Agent
 * Analyzes emotional tone and sentiment
 */
export class SentimentAnalysisAgent {
  async analyzeSentiment(text: string): Promise<SentimentAnalysis> {
    const lowerText = text.toLowerCase();

    // Positive indicators
    const positiveWords = ['thank', 'great', 'excellent', 'love', 'happy', 'appreciate', 'wonderful'];
    const positiveCount = positiveWords.filter((word) => lowerText.includes(word)).length;

    // Negative indicators
    const negativeWords = ['disappointed', 'frustrated', 'angry', 'terrible', 'worst', 'hate', 'unacceptable'];
    const negativeCount = negativeWords.filter((word) => lowerText.includes(word)).length;

    // Urgent/angry indicators
    const angryWords = ['furious', 'outraged', 'disgraceful', 'lawsuit', 'complaint'];
    const angryCount = angryWords.filter((word) => lowerText.includes(word)).length;

    let emotion: SentimentAnalysis['emotion'] = 'neutral';
    let score = 0;

    if (angryCount > 0) {
      emotion = 'angry';
      score = -0.8;
    } else if (negativeCount > positiveCount) {
      emotion = negativeCount > 2 ? 'frustrated' : 'negative';
      score = -0.5;
    } else if (positiveCount > negativeCount) {
      emotion = 'positive';
      score = 0.7;
    }

    return {
      emotion,
      score,
      keywords: [...positiveWords, ...negativeWords, ...angryWords].filter((word) =>
        lowerText.includes(word)
      ),
    };
  }
}

/**
 * Response Generation Agent
 * Generates AI-powered email responses
 */
export class ResponseGenerationAgent {
  async generateResponse(params: {
    incomingEmail: { from: string; subject: string; body: string };
    category: string;
    sentiment: SentimentAnalysis;
    context?: any;
  }): Promise<EmailResponse> {
    const { incomingEmail, category, sentiment } = params;

    let content = '';
    let confidence = 0.8;
    let requiresReview = false;
    const suggestedActions: string[] = [];

    // Adjust tone based on sentiment
    const greeting = sentiment.emotion === 'angry' || sentiment.emotion === 'frustrated'
      ? `Dear ${this.extractName(incomingEmail.from)},\n\nI sincerely apologize for the frustration you've experienced. `
      : `Hi ${this.extractName(incomingEmail.from)},\n\nThank you for reaching out! `;

    // Generate category-specific response
    switch (category) {
      case 'support':
        content = greeting + `I understand you need assistance. Our support team has been notified and will respond within 2 hours. In the meantime, you can check our help center at help.frontdeskagents.com for immediate answers.\n\nBest regards,\nFrontDesk Agents Support`;
        suggestedActions.push('Escalate to support team', 'Track response time');
        break;

      case 'sales':
        content = greeting + `I'd be happy to discuss how FrontDesk Agents can help your business. Would you be available for a 15-minute demo call this week? You can also explore our pricing at frontdeskagents.com/pricing.\n\nLooking forward to connecting,\nFrontDesk Agents Sales Team`;
        suggestedActions.push('Schedule demo', 'Send pricing information');
        confidence = 0.9;
        break;

      case 'billing':
        content = greeting + `I can help with your billing inquiry. Our billing team will review your account and respond within 24 hours. For immediate assistance, you can access your billing portal at app.frontdeskagents.com/billing.\n\nBest regards,\nFrontDesk Agents Billing`;
        suggestedActions.push('Review account', 'Check payment status');
        requiresReview = true; // Billing always requires human review
        break;

      default:
        content = greeting + `Thank you for your message. We've received your inquiry and will respond within 24 hours.\n\nBest regards,\nFrontDesk Agents Team`;
        suggestedActions.push('Route to appropriate team');
        confidence = 0.7;
    }

    // Flag for review if negative sentiment
    if (sentiment.emotion === 'angry' || sentiment.emotion === 'frustrated') {
      requiresReview = true;
      suggestedActions.push('Urgent: Human review required');
    }

    return {
      content,
      confidence,
      requiresReview,
      suggestedActions,
    };
  }

  private extractName(email: string): string {
    const match = email.match(/^([^@]+)/);
    if (match) {
      const name = match[1].replace(/[._-]/g, ' ');
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return 'there';
  }
}

/**
 * Email Operations Division
 * Coordinates all email agents
 */
export class EmailOperationsDivision {
  private routingAgent = new EmailRoutingAgent();
  private sentimentAgent = new SentimentAnalysisAgent();
  private responseAgent = new ResponseGenerationAgent();

  private stats = {
    totalProcessed: 0,
    totalClassified: 0,
    totalResponses: 0,
    averageConfidence: 0,
    autonomousResolutions: 0,
  };

  /**
   * Process incoming email end-to-end
   */
  async processEmail(email: {
    from: string;
    subject: string;
    body: string;
    metadata?: any;
  }): Promise<EmailProcessingResult> {
    console.log(`📧 Processing email from ${email.from}: "${email.subject}"`);

    // Step 1: Classify and route
    const classification = await this.routingAgent.classifyEmail(email);
    this.stats.totalClassified++;

    // Step 2: Analyze sentiment
    const sentiment = await this.sentimentAgent.analyzeSentiment(email.body);

    // Step 3: Calculate priority score
    const priorityScore = this.calculatePriorityScore(classification, sentiment);

    // Step 4: Generate response (if appropriate)
    let response: EmailResponse | undefined;
    if (classification.category !== 'spam' && priorityScore > 30) {
      response = await this.responseAgent.generateResponse({
        incomingEmail: email,
        category: classification.category,
        sentiment,
        context: email.metadata,
      });
      this.stats.totalResponses++;

      if (!response.requiresReview) {
        this.stats.autonomousResolutions++;
      }
    }

    this.stats.totalProcessed++;
    this.updateAverageConfidence(classification.confidence);

    console.log(`✅ Email processed: ${classification.category} (${classification.confidence * 100}% confidence)`);

    return {
      classification,
      sentiment,
      priorityScore,
      response,
    };
  }

  /**
   * Calculate priority score (0-100)
   */
  private calculatePriorityScore(
    classification: EmailClassification,
    sentiment: SentimentAnalysis
  ): number {
    let score = 50; // Base score

    // Urgency multiplier
    switch (classification.urgency) {
      case 'critical':
        score += 40;
        break;
      case 'high':
        score += 25;
        break;
      case 'medium':
        score += 10;
        break;
    }

    // VIP bonus
    if (classification.isVIP) {
      score += 20;
    }

    // Sentiment adjustment
    if (sentiment.emotion === 'angry') {
      score += 30;
    } else if (sentiment.emotion === 'frustrated') {
      score += 15;
    }

    return Math.min(100, Math.max(0, score));
  }

  /**
   * Update average confidence
   */
  private updateAverageConfidence(newConfidence: number) {
    this.stats.averageConfidence =
      (this.stats.averageConfidence * (this.stats.totalClassified - 1) + newConfidence) /
      this.stats.totalClassified;
  }

  /**
   * Get division statistics
   */
  getStats() {
    return {
      ...this.stats,
      autonomyRate: this.stats.totalResponses > 0
        ? (this.stats.autonomousResolutions / this.stats.totalResponses) * 100
        : 0,
    };
  }
}

// Export singleton instance
export const emailOperationsDivision = new EmailOperationsDivision();
