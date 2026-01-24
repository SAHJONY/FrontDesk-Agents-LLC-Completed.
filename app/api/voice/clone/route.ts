/**
 * Voice Cloning API
 * * Create and manage custom voices
 */

import { NextRequest, NextResponse } from 'next/server';
import { voiceCloningSystem } from '@/lib/voice/voice-cloning';

/**
 * POST /api/voice/clone
 * Create custom voice or generate speech
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'create_voice') {
      const { name, description, customerId, samples, characteristics } = body;
      const voice = await voiceCloningSystem.createCustomVoice(
        name,
        description,
        customerId,
        samples,
        characteristics
      );
      return NextResponse.json({ success: true, data: voice });
    }

    if (action === 'generate_speech') {
      const { text, voiceId, characteristics, format, sampleRate } = body;
      const result = await voiceCloningSystem.generateSpeech({
        text,
        voiceId,
        characteristics,
        format,
        sampleRate,
      });
      return NextResponse.json({ success: true, data: result });
    }

    if (action === 'clone_from_url') {
      const { name, customerId, audioUrls, transcripts } = body;
      const voice = await voiceCloningSystem.cloneFromUrl(
        name,
        customerId,
        audioUrls,
        transcripts
      );
      return NextResponse.json({ success: true, data: voice });
    }

    if (action === 'test_quality') {
      const { voiceId, testText } = body;
      const quality = await voiceCloningSystem.testVoiceQuality(voiceId, testText);
      return NextResponse.json({ success: true, data: quality });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Voice cloning API error:', error);
    return NextResponse.json(
      { error: error.message || 'Voice cloning operation failed' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/voice/clone
 * List available voices
 */
export async function GET(_request: NextRequest) { // Prefijo '_' añadido para evitar error de variable no utilizada
  try {
    const voices = await voiceCloningSystem.listPrebuiltVoices();
    return NextResponse.json({ success: true, data: voices });
  } catch (error: any) {
    console.error('Failed to list voices:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to list voices' },
      { status: 500 }
    );
  }
}
