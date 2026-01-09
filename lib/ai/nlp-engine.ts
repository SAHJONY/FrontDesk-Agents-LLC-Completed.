/**
 * Advanced NLP Engine
 * 
 * Natural Language Processing capabilities including:
 * - Intent classification
 * - Entity extraction
 * - Sentiment analysis
 * - Emotion detection
 * - Language detection and translation
 */

import { OpenAI } from 'openai';

// Lazy initialization of OpenAI client
let openaiClient: OpenAI | null = null;
function getOpenAI() {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
  }
  return openaiClient;
}

export interface IntentClassification {
  intent: string;
  confidence: number;
  subIntents: string[];
}

export interface Entity {
  type: string;
  value: string;
  confidence: number;
  position: { start: number; end: number };
}

export interface SentimentAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number; // -1 to 1
  confidence: number;
  emotions: EmotionScore[];
}

export interface EmotionScore {
  emotion: 'joy' | 'anger' | 'sadness' | 'fear' | 'surprise' | 'disgust' | 'trust' | 'anticipation';
  score: number; // 0 to 1
}

export interface LanguageDetection {
  language: string;
  confidence: number;
  script?: string;
}

export interface NLPAnalysis {
  text: string;
  intent: IntentClassification;
  entities: Entity[];
  sentiment: SentimentAnalysis;
  language: LanguageDetection;
  keyPhrases: string[];
  topics: string[];
}

/**
 * NLP Engine for advanced text analysis
 */
export class NLPEngine {
  /**
   * Perform comprehensive NLP analysis on text
   */
  async analyze(text: string): Promise<NLPAnalysis> {
    const [intent, entities, sentiment, language, keyPhrases, topics] = await Promise.all([
      this.classifyIntent(text),
      this.extractEntities(text),
      this.analyzeSentiment(text),
      this.detectLanguage(text),
      this.extractKeyPhrases(text),
      this.extractTopics(text),
    ]);

    return {
      text,
      intent,
      entities,
      sentiment,
      language,
      keyPhrases,
      topics,
    };
  }

  /**
   * Classify user intent
   */
  async classifyIntent(text: string): Promise<IntentClassification> {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are an intent classification expert. Classify user intents into categories:
- inquiry (asking for information)
- complaint (expressing dissatisfaction)
- request (asking for action)
- feedback (providing opinion)
- greeting (social interaction)
- farewell (ending conversation)
- confirmation (agreeing/confirming)
- rejection (disagreeing/declining)
- technical_support (technical help)
- sales (purchase interest)
- billing (payment/invoice questions)
- other

Return JSON with intent, confidence (0-1), and subIntents array.`,
        },
        {
          role: 'user',
          content: `Classify intent: "${text}"`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return {
      intent: result.intent || 'other',
      confidence: result.confidence || 0.5,
      subIntents: result.subIntents || [],
    };
  }

  /**
   * Extract named entities from text
   */
  async extractEntities(text: string): Promise<Entity[]> {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `Extract named entities from text. Entity types:
- PERSON (names of people)
- ORGANIZATION (companies, institutions)
- LOCATION (cities, countries, addresses)
- DATE (dates, times)
- MONEY (monetary amounts)
- PRODUCT (product names)
- EMAIL (email addresses)
- PHONE (phone numbers)
- URL (web addresses)

Return JSON array: [{"type": "...", "value": "...", "confidence": 0.9, "position": {"start": 0, "end": 5}}]`,
        },
        {
          role: 'user',
          content: `Extract entities: "${text}"`,
        },
      ],
      temperature: 0.2,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return result.entities || [];
  }

  /**
   * Analyze sentiment and emotions
   */
  async analyzeSentiment(text: string): Promise<SentimentAnalysis> {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `Analyze sentiment and emotions in text.

Sentiment: positive, negative, or neutral
Score: -1 (very negative) to 1 (very positive)
Confidence: 0 to 1

Emotions (Plutchik's wheel): joy, anger, sadness, fear, surprise, disgust, trust, anticipation
Each emotion score: 0 (absent) to 1 (strong)

Return JSON: {"sentiment": "...", "score": 0.5, "confidence": 0.9, "emotions": [{"emotion": "joy", "score": 0.8}]}`,
        },
        {
          role: 'user',
          content: `Analyze: "${text}"`,
        },
      ],
      temperature: 0.2,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return {
      sentiment: result.sentiment || 'neutral',
      score: result.score || 0,
      confidence: result.confidence || 0.5,
      emotions: result.emotions || [],
    };
  }

  /**
   * Detect language
   */
  async detectLanguage(text: string): Promise<LanguageDetection> {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Detect the language of text. Return JSON: {"language": "en", "confidence": 0.95, "script": "Latin"}',
        },
        {
          role: 'user',
          content: `Detect language: "${text}"`,
        },
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return {
      language: result.language || 'en',
      confidence: result.confidence || 0.5,
      script: result.script,
    };
  }

  /**
   * Extract key phrases
   */
  async extractKeyPhrases(text: string): Promise<string[]> {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Extract 3-5 key phrases that capture the main points. Return JSON: {"keyPhrases": ["phrase1", "phrase2"]}',
        },
        {
          role: 'user',
          content: `Extract key phrases: "${text}"`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return result.keyPhrases || [];
  }

  /**
   * Extract topics
   */
  async extractTopics(text: string): Promise<string[]> {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Identify main topics discussed. Return JSON: {"topics": ["topic1", "topic2"]}',
        },
        {
          role: 'user',
          content: `Extract topics: "${text}"`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return result.topics || [];
  }

  /**
   * Translate text to target language
   */
  async translate(text: string, targetLanguage: string): Promise<string> {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `Translate text to ${targetLanguage}. Maintain tone and context.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.3,
    });

    return completion.choices[0].message.content || text;
  }

  /**
   * Real-time sentiment tracking for conversations
   */
  async trackConversationSentiment(messages: Array<{ text: string; timestamp: Date }>): Promise<{
    overallSentiment: SentimentAnalysis;
    sentimentTrend: 'improving' | 'declining' | 'stable';
    criticalMoments: Array<{ index: number; reason: string }>;
  }> {
    // Analyze each message
    const sentiments = await Promise.all(
      messages.map(msg => this.analyzeSentiment(msg.text))
    );

    // Calculate overall sentiment
    const avgScore = sentiments.reduce((sum, s) => sum + s.score, 0) / sentiments.length;
    const avgConfidence = sentiments.reduce((sum, s) => sum + s.confidence, 0) / sentiments.length;

    // Determine overall sentiment
    let overallSentiment: 'positive' | 'negative' | 'neutral';
    if (avgScore > 0.2) overallSentiment = 'positive';
    else if (avgScore < -0.2) overallSentiment = 'negative';
    else overallSentiment = 'neutral';

    // Calculate trend
    const firstHalf = sentiments.slice(0, Math.floor(sentiments.length / 2));
    const secondHalf = sentiments.slice(Math.floor(sentiments.length / 2));
    
    const firstHalfAvg = firstHalf.reduce((sum, s) => sum + s.score, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, s) => sum + s.score, 0) / secondHalf.length;
    
    let sentimentTrend: 'improving' | 'declining' | 'stable';
    if (secondHalfAvg - firstHalfAvg > 0.2) sentimentTrend = 'improving';
    else if (secondHalfAvg - firstHalfAvg < -0.2) sentimentTrend = 'declining';
    else sentimentTrend = 'stable';

    // Identify critical moments (sudden sentiment drops)
    const criticalMoments: Array<{ index: number; reason: string }> = [];
    for (let i = 1; i < sentiments.length; i++) {
      const drop = sentiments[i].score - sentiments[i - 1].score;
      if (drop < -0.5) {
        criticalMoments.push({
          index: i,
          reason: 'Sudden negative sentiment shift',
        });
      }
      if (sentiments[i].emotions.some(e => e.emotion === 'anger' && e.score > 0.7)) {
        criticalMoments.push({
          index: i,
          reason: 'High anger detected',
        });
      }
    }

    // Aggregate emotions
    const emotionAggregates = new Map<string, number>();
    sentiments.forEach(s => {
      s.emotions.forEach(e => {
        const current = emotionAggregates.get(e.emotion) || 0;
        emotionAggregates.set(e.emotion, current + e.score);
      });
    });

    const avgEmotions: EmotionScore[] = Array.from(emotionAggregates.entries()).map(([emotion, total]) => ({
      emotion: emotion as any,
      score: total / sentiments.length,
    }));

    return {
      overallSentiment: {
        sentiment: overallSentiment,
        score: avgScore,
        confidence: avgConfidence,
        emotions: avgEmotions,
      },
      sentimentTrend,
      criticalMoments,
    };
  }
}

// Export singleton instance
export const nlpEngine = new NLPEngine();
