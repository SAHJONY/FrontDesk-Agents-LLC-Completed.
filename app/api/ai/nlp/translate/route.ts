/**
 * Translation API
 * 
 * Translate text between languages
 */

import { NextRequest, NextResponse } from 'next/server';
import { nlpEngine } from '@/lib/ai/nlp-engine';

/**
 * POST /api/ai/nlp/translate
 * Translate text to target language
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, targetLanguage } = body;

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Text and target language are required' },
        { status: 400 }
      );
    }

    // Detect source language
    const sourceLanguage = await nlpEngine.detectLanguage(text);

    // Translate
    const translatedText = await nlpEngine.translate(text, targetLanguage);

    return NextResponse.json({
      success: true,
      data: {
        originalText: text,
        translatedText,
        sourceLanguage: sourceLanguage.language,
        targetLanguage,
      },
    });
  } catch (error: any) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to translate text' },
      { status: 500 }
    );
  }
}
