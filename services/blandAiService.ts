// services/blandAiService.ts

import { Bland } from 'blandai';
import { db, IntegrationControl } from '../db/client';
import { loadSecret } from '../config/secrets';

// ----------------------------------------------------
// 1. Obtiene el estado y aplica el CEO Activation Gate
// ----------------------------------------------------

async function getIntegration(provider: string): Promise<IntegrationControl> {
  const integration = await db.integrations_control.findUnique({
    where: { provider: provider }
  });

  if (!integration) {
    throw new Error(`Integration provider '${provider}' not found in registry.`);
  }

  // === CEO ACTIVATION GATE ===
  if (!integration.active) {
    console.warn(`[Activation Gate] Attempt to use ${provider} failed. Status: DISABLED by CEO.`);
    throw new Error(`Voice AI disabled by CEO.`);
  }

  // === LÍMITE DE FACTURACIÓN DURO ===
  if (integration.daily_limit <= 0) {
      console.error(`[Activation Gate] Daily limit exceeded for ${provider}. HARD STOP.`);
      throw new Error(`Integration daily limit reached: ${integration.daily_limit}`);
  }
  
  return integration;
}

// ----------------------------------------------------
// 2. Inicializa el cliente Bland.ai con credenciales condicionadas
// ----------------------------------------------------

async function initializeBlandClient(integration: IntegrationControl) {
  let apiKey: string;
  let agentId: string | undefined;

  // Carga la clave y el Agente ID basado en el modo (Sandbox/Live)
  if (integration.mode === 'live') {
    apiKey = loadSecret('BLAND_AI_LIVE_KEY');
    agentId = integration.metadata.liveAgentId;
    
  } else if (integration.mode === 'sandbox') {
    apiKey = loadSecret('BLAND_AI_SANDBOX_KEY');
    agentId = integration.metadata.sandboxAgentId;
    
  } else {
    throw new Error(`Invalid mode configured for Bland.ai: ${integration.mode}`);
  }

  if (!apiKey || !agentId) {
    // Falla si la configuración de Secrets o Metadata está incompleta para el modo activo.
    throw new Error(`Bland.ai API Key or Agent ID not configured for mode: ${integration.mode}`);
  }
  
  const blandClient = new Bland(apiKey);
  
  return { blandClient, agentId };
}

// ----------------------------------------------------
// 3. Función de Ejecución Principal
// ----------------------------------------------------

/**
 * Función principal para iniciar una llamada de Bland.ai.
 * @param to El número de teléfono a llamar.
 */
export async function makeCall(to: string) {
  try {
    // PASO 1: Consulta y Validación del Activation Gate
    const blandConfig = await getIntegration('bland_ai');

    // PASO 2: Inicialización Condicional de Credenciales
    const { blandClient, agentId } = await initializeBlandClient(blandConfig);

    console.log(`[Bland AI Service] Executing call in ${blandConfig.mode} mode. Agent ID: ${agentId}.`);
    
    // PASO 3: Ejecución de la llamada
    const callResult = await blandClient.call({
      to: to,
      agent_id: agentId,
      // Otras configuraciones del request...
    });
    
    // PASO 4: Auditoría y Consumo (Pendiente de implementación)
    // await logConsumption('bland_ai', 1, blandConfig.daily_limit); 
    // ^ Aquí iría la lógica para decrementar el límite en la DB

    return { success: true, callResult, mode: blandConfig.mode };

  } catch (error) {
    // Captura los errores del Activation Gate y los propaga.
    throw error; 
  }
}

// ----------------------------------------------------
// Ejemplo de Uso (para testing)
// ----------------------------------------------------

// Descomenta y configura las variables de entorno para probar:
/*
async function runTest() {
    try {
        const result = await makeCall('5551234567');
        console.log('Call executed successfully:', result);
    } catch (e) {
        console.error('Call execution stopped:', e.message);
    }
}
runTest();
*/
