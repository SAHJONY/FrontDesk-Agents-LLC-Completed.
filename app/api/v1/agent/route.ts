import { aiSDR } from '@/services/aiSDR';
import { blandAiService } from '@/services/blandAiService';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Si la petición es para una llamada de venta activa
    if (body.type === 'OUTBOUND_SALES') {
      // FIX: Added the second required argument (config)
      const result = await aiSDR.executeCampaign(body.leads, body.config || {});
      return NextResponse.json(result);
    }
    
    // Si es para configurar el cerebro de la recepcionista
    const configResult = await blandAiService.configureAgent(body.config);
    return NextResponse.json(configResult);

  } catch (error: any) {
    console.error('Agent Route Error:', error.message);
    return NextResponse.json({ error: 'Failed to process agent command' }, { status: 500 });
  }
}
