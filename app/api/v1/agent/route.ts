import { aiSDR } from '@/services/aiSDR';
import { blandAiService } from '@/services/blandAiService';

export async function POST(req: Request) {
  const body = await req.json();
  
  // Si la petición es para una llamada de venta activa
  if (body.type === 'OUTBOUND_SALES') {
    return await aiSDR.executeCampaign(body.leads);
  }
  
  // Si es para configurar el cerebro de la recepcionista
  return await blandAiService.configureAgent(body.config);
}
