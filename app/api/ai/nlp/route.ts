/**
 * NLP Analysis API
 * 
 * Advanced natural language processing capabilities
 */

import { NextRequest, NextResponse } from 'next/server';
import { nlpEngine } from '@/lib/ai/nlp-engine';

/**
 * POST /api/ai/nlp
 * Analyze text with NLP
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, operations } = body;

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // If specific operations requested, run only those
    if (operations && Array.isArray(operations)) {
      const results: any = {};

      if (operations.includes('intent')) {
        results.intent = await nlpEngine.classifyIntent(text);
      }
      if (operations.includes('entities')) {
        results.entities = await nlpEngine.extractEntities(text);
      }
      if (operations.includes('sentiment')) {
        results.sentiment = await nlpEngine.analyzeSentiment(text);
      }
      if (operations.includes('language')) {
        results.language = await nlpEngine.detectLanguage(text);
      }
      if (operations.includes('keyPhrases')) {
        results.keyPhrases = await nlpEngine.extractKeyPhrases(text);
      }
      if (operations.includes('topics')) {
        results.topics = await nlpEngine.extractTopics(text);
      }

      return NextResponse.json({
        success: true,
        data: results,
      });
    }

    // Otherwise, run full analysis
    const analysis = await nlpEngine.analyze(text);

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error: any) {
    console.error('NLP analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze text' },
      { status: 500 }
    );
  }
}
