import OpenAI from 'openai';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Sentiment analysis result
 */
export interface SentimentAnalysis {
  score: number; // -1 (very negative) to +1 (very positive)
  magnitude: number; // 0 to 1 (intensity of emotion)
  emotion: EmotionType;
  confidence: number;
  urgency: UrgencyLevel;
  keywords: string[];
  reasoning: string;
}

/**
 * Emotion types
 */
export enum EmotionType {
  JOY = 'joy',
  SATISFACTION = 'satisfaction',
  NEUTRAL = 'neutral',
  CONFUSION = 'confusion',
  FRUSTRATION = 'frustration',
  ANGER = 'anger',
  DISAPPOINTMENT = 'disappointment',
  ANXIETY = 'anxiety',
}

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
 * Priority score result
 */
export interface PriorityScore {
  score: number; // 0-100
  level: 'low' | 'medium' | 'high' | 'critical';
  factors: {
    sentiment: number;
    urgency: number;
    customerValue: number;
    sla: number;
    complexity: number;
  };
  reasoning: string;
  suggestedResponseTime: string;
}

/**
 * Sentiment analysis agent
 */
export class SentimentAnalysisAgent {
  private model = 'gpt-4.1-mini';
  private analysisHistory: Map<string, SentimentAnalysis> = new Map();

  /**
   * Analyze email sentiment
   */
  async analyzeSentiment(emailData: {
    subject: string;
    body: string;
    from?: string;
  }): Promise<SentimentAnalysis> {
    try {
      const prompt = `Analyze the sentiment and emotion of this email:

SUBJECT: ${emailData.subject}
BODY: ${emailData.body}

Provide a detailed sentiment analysis including:
1. Sentiment score (-1 to +1, where -1 is very negative, 0 is neutral, +1 is very positive)
2. Magnitude (0 to 1, intensity of emotion)
3. Primary emotion (joy, satisfaction, neutral, confusion, frustration, anger, disappointment, anxiety)
4. Urgency level (low, medium, high, critical)
5. Key emotional keywords
6. Reasoning for your analysis

Consider:
- Tone and word choice
- Punctuation and capitalization
- Explicit urgency indicators
- Implicit emotional cues
- Context and intent

Respond in JSON format:
{
  "score": 0.5,
  "magnitude": 0.7,
  "emotion": "satisfaction",
  "urgency": "medium",
  "keywords": ["happy", "pleased", "thank you"],
  "reasoning": "explanation",
  "confidence": 0.9
}`;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert sentiment analysis agent. Always respond with valid JSON only.',
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

      const analysis: SentimentAnalysis = {
        score: result.score || 0,
        magnitude: result.magnitude || 0.5,
        emotion: result.emotion || EmotionType.NEUTRAL,
        confidence: result.confidence || 0.8,
        urgency: result.urgency || UrgencyLevel.MEDIUM,
        keywords: result.keywords || [],
        reasoning: result.reasoning || 'AI sentiment analysis',
      };

      // Store in history
      const historyKey = `${emailData.from}-${Date.now()}`;
      this.analysisHistory.set(historyKey, analysis);

      return analysis;
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      
      // Fallback to basic analysis
      return this.fallbackSentimentAnalysis(emailData);
    }
  }

  /**
   * Fallback sentiment analysis using keyword matching
   */
  private fallbackSentimentAnalysis(emailData: any): SentimentAnalysis {
    const text = `${emailData.subject} ${emailData.body}`.toLowerCase();

    // Positive keywords
    const positiveKeywords = ['thank', 'great', 'excellent', 'love', 'happy', 'pleased', 'appreciate', 'wonderful'];
    const positiveCount = positiveKeywords.filter(kw => text.includes(kw)).length;

    // Negative keywords
    const negativeKeywords = ['problem', 'issue', 'error', 'broken', 'not working', 'frustrated', 'angry', 'disappointed', 'terrible'];
    const negativeCount = negativeKeywords.filter(kw => text.includes(kw)).length;

    // Urgency keywords
    const urgencyKeywords = ['urgent', 'asap', 'immediately', 'critical', 'emergency', 'help', '!!!'];
    const urgencyCount = urgencyKeywords.filter(kw => text.includes(kw)).length;

    // Calculate score
    const score = (positiveCount - negativeCount) / Math.max(positiveCount + negativeCount, 1);
    const magnitude = (positiveCount + negativeCount) / 10;

    // Determine emotion
    let emotion = EmotionType.NEUTRAL;
    if (score > 0.5) emotion = EmotionType.JOY;
    else if (score > 0) emotion = EmotionType.SATISFACTION;
    else if (score < -0.5) emotion = EmotionType.ANGER;
    else if (score < 0) emotion = EmotionType.FRUSTRATION;

    // Determine urgency
    let urgency = UrgencyLevel.MEDIUM;
    if (urgencyCount >= 3) urgency = UrgencyLevel.CRITICAL;
    else if (urgencyCount >= 2) urgency = UrgencyLevel.HIGH;
    else if (urgencyCount === 1) urgency = UrgencyLevel.MEDIUM;
    else urgency = UrgencyLevel.LOW;

    return {
      score: Math.max(-1, Math.min(1, score)),
      magnitude: Math.min(1, magnitude),
      emotion,
      confidence: 0.6,
      urgency,
      keywords: [...positiveKeywords, ...negativeKeywords, ...urgencyKeywords].filter(kw => text.includes(kw)),
      reasoning: 'Fallback keyword-based analysis',
    };
  }

  /**
   * Detect escalation triggers
   */
  detectEscalation(sentiment: SentimentAnalysis): {
    shouldEscalate: boolean;
    reason: string;
    priority: number;
  } {
    const triggers = [];
    let priority = 50;

    // Very negative sentiment
    if (sentiment.score < -0.6) {
      triggers.push('Very negative sentiment');
      priority += 30;
    }

    // High urgency
    if (sentiment.urgency === UrgencyLevel.CRITICAL) {
      triggers.push('Critical urgency');
      priority += 40;
    } else if (sentiment.urgency === UrgencyLevel.HIGH) {
      triggers.push('High urgency');
      priority += 25;
    }

    // Strong emotions (anger, frustration)
    if ([EmotionType.ANGER, EmotionType.FRUSTRATION].includes(sentiment.emotion)) {
      triggers.push(`Strong emotion: ${sentiment.emotion}`);
      priority += 20;
    }

    // High magnitude (intense emotion)
    if (sentiment.magnitude > 0.8) {
      triggers.push('High emotional intensity');
      priority += 15;
    }

    const shouldEscalate = triggers.length >= 2 || priority > 80;

    return {
      shouldEscalate,
      reason: triggers.join(', ') || 'No escalation triggers',
      priority: Math.min(100, priority),
    };
  }

  /**
   * Get sentiment statistics
   */
  getStatistics(): {
    totalAnalyzed: number;
    averageScore: number;
    emotionDistribution: Record<string, number>;
    urgencyDistribution: Record<string, number>;
  } {
    const entries = Array.from(this.analysisHistory.values());

    const averageScore = entries.length > 0
      ? entries.reduce((sum, e) => sum + e.score, 0) / entries.length
      : 0;

    const emotionDistribution: Record<string, number> = {};
    const urgencyDistribution: Record<string, number> = {};

    entries.forEach(e => {
      emotionDistribution[e.emotion] = (emotionDistribution[e.emotion] || 0) + 1;
      urgencyDistribution[e.urgency] = (urgencyDistribution[e.urgency] || 0) + 1;
    });

    return {
      totalAnalyzed: entries.length,
      averageScore,
      emotionDistribution,
      urgencyDistribution,
    };
  }
}

/**
 * Priority scoring agent with RL optimization
 */
export class PriorityScoringAgent {
  private scoringHistory: Map<string, { score: PriorityScore; actualResponseTime?: number }> = new Map();

  /**
   * Calculate priority score for email
   */
  calculatePriority(params: {
    sentiment: SentimentAnalysis;
    customerInfo?: {
      tier?: 'free' | 'pro' | 'enterprise';
      accountValue?: number;
      lifetimeValue?: number;
      churnRisk?: number;
    };
    slaInfo?: {
      responseTimeTarget?: number; // in minutes
      timeInQueue?: number;
    };
    complexity?: {
      requiresTechnical?: boolean;
      requiresMultipleDepartments?: boolean;
      hasAttachments?: boolean;
    };
  }): PriorityScore {
    const factors = {
      sentiment: 0,
      urgency: 0,
      customerValue: 0,
      sla: 0,
      complexity: 0,
    };

    // Sentiment factor (0-25 points)
    if (params.sentiment.score < -0.5) {
      factors.sentiment = 25;
    } else if (params.sentiment.score < 0) {
      factors.sentiment = 15;
    } else if (params.sentiment.score > 0.5) {
      factors.sentiment = 5;
    } else {
      factors.sentiment = 10;
    }

    // Urgency factor (0-30 points)
    const urgencyPoints: Record<string, number> = {
      [UrgencyLevel.CRITICAL]: 30,
      [UrgencyLevel.HIGH]: 22,
      [UrgencyLevel.MEDIUM]: 12,
      [UrgencyLevel.LOW]: 5,
    };
    factors.urgency = urgencyPoints[params.sentiment.urgency] || 12;

    // Customer value factor (0-25 points)
    if (params.customerInfo) {
      const { tier, accountValue, lifetimeValue, churnRisk } = params.customerInfo;
      
      if (tier === 'enterprise') factors.customerValue += 15;
      else if (tier === 'pro') factors.customerValue += 8;
      else factors.customerValue += 3;

      if (accountValue && accountValue > 50000) factors.customerValue += 5;
      else if (accountValue && accountValue > 10000) factors.customerValue += 3;

      if (churnRisk && churnRisk > 0.7) factors.customerValue += 5;
    } else {
      factors.customerValue = 5;
    }

    // SLA factor (0-15 points)
    if (params.slaInfo) {
      const { responseTimeTarget, timeInQueue } = params.slaInfo;
      
      if (responseTimeTarget && timeInQueue) {
        const slaProgress = timeInQueue / responseTimeTarget;
        
        if (slaProgress > 0.9) factors.sla = 15;
        else if (slaProgress > 0.7) factors.sla = 10;
        else if (slaProgress > 0.5) factors.sla = 6;
        else factors.sla = 3;
      } else {
        factors.sla = 5;
      }
    } else {
      factors.sla = 5;
    }

    // Complexity factor (0-5 points)
    if (params.complexity) {
      const { requiresTechnical, requiresMultipleDepartments, hasAttachments } = params.complexity;
      
      if (requiresTechnical) factors.complexity += 2;
      if (requiresMultipleDepartments) factors.complexity += 2;
      if (hasAttachments) factors.complexity += 1;
    }

    // Calculate total score (0-100)
    const totalScore = Math.min(100, 
      factors.sentiment + 
      factors.urgency + 
      factors.customerValue + 
      factors.sla + 
      factors.complexity
    );

    // Determine priority level
    let level: 'low' | 'medium' | 'high' | 'critical';
    if (totalScore >= 80) level = 'critical';
    else if (totalScore >= 60) level = 'high';
    else if (totalScore >= 35) level = 'medium';
    else level = 'low';

    // Suggest response time
    const suggestedResponseTime = this.calculateResponseTime(totalScore, params.customerInfo?.tier);

    const priorityScore: PriorityScore = {
      score: totalScore,
      level,
      factors,
      reasoning: this.generateReasoning(factors, level),
      suggestedResponseTime,
    };

    // Store in history for RL training
    const historyKey = `${Date.now()}-${Math.random()}`;
    this.scoringHistory.set(historyKey, { score: priorityScore });

    return priorityScore;
  }

  /**
   * Calculate suggested response time
   */
  private calculateResponseTime(score: number, tier?: string): string {
    let minutes: number;

    if (score >= 80) {
      minutes = tier === 'enterprise' ? 5 : 15;
    } else if (score >= 60) {
      minutes = tier === 'enterprise' ? 15 : 30;
    } else if (score >= 35) {
      minutes = tier === 'enterprise' ? 30 : 60;
    } else {
      minutes = tier === 'enterprise' ? 60 : 120;
    }

    if (minutes < 60) {
      return `${minutes} minutes`;
    } else {
      const hours = Math.round(minutes / 60);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
  }

  /**
   * Generate reasoning for priority score
   */
  private generateReasoning(factors: any, level: string): string {
    const reasons: string[] = [];

    if (factors.sentiment > 20) reasons.push('Negative customer sentiment');
    if (factors.urgency > 25) reasons.push('Critical urgency level');
    if (factors.customerValue > 20) reasons.push('High-value customer');
    if (factors.sla > 12) reasons.push('SLA deadline approaching');
    if (factors.complexity > 3) reasons.push('Complex issue requiring expertise');

    const baseReason = `Priority level: ${level.toUpperCase()}`;
    
    if (reasons.length > 0) {
      return `${baseReason}. Factors: ${reasons.join(', ')}.`;
    }

    return `${baseReason}. Standard priority based on overall assessment.`;
  }

  /**
   * Update priority based on actual response time (RL feedback)
   */
  provideFeedback(scoreId: string, actualResponseTime: number, outcome: 'success' | 'sla_missed' | 'escalated'): void {
    const entry = this.scoringHistory.get(scoreId);
    if (entry) {
      entry.actualResponseTime = actualResponseTime;
      
      // Update scoring algorithm based on feedback
      this.updateScoringAlgorithm(outcome);
    }
  }

  /**
   * Update scoring algorithm based on outcomes
   */
  private updateScoringAlgorithm(outcome: string): void {
    // This would implement RL-based optimization
    // For now, just log the outcome
    console.log(`Priority scoring outcome: ${outcome}`);
  }

  /**
   * Get priority statistics
   */
  getStatistics(): {
    totalScored: number;
    levelDistribution: Record<string, number>;
    averageScore: number;
    averageResponseTime?: number;
  } {
    const entries = Array.from(this.scoringHistory.values());

    const levelDistribution: Record<string, number> = {};
    let totalScore = 0;
    let totalResponseTime = 0;
    let responseTimeCount = 0;

    entries.forEach(e => {
      levelDistribution[e.score.level] = (levelDistribution[e.score.level] || 0) + 1;
      totalScore += e.score.score;
      
      if (e.actualResponseTime) {
        totalResponseTime += e.actualResponseTime;
        responseTimeCount++;
      }
    });

    return {
      totalScored: entries.length,
      levelDistribution,
      averageScore: entries.length > 0 ? totalScore / entries.length : 0,
      averageResponseTime: responseTimeCount > 0 ? totalResponseTime / responseTimeCount : undefined,
    };
  }
}

// Singleton instances
export const sentimentAnalysisAgent = new SentimentAnalysisAgent();
export const priorityScoringAgent = new PriorityScoringAgent();
