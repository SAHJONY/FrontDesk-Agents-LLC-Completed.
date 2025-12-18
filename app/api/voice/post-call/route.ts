import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * POST /api/voice/post-call
 * Guarda el resumen final de una llamada de voz
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      businessId,
      customerPhone,
      agentName,
      callDuration,
      transcript,
      outcome,
    } = body;

    if (!businessId || !customerPhone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Guardamos el resultado final en la Base de Datos
    await db.callLogs.create({
      data: {
        businessId,
        customerPhone,
        agentName,
        callDuration,
        transcript,
        outcome,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Post-call error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
