// services/blandAiService.ts (Actualización Completa)

import { Bland } from 'blandai';
import { db, IntegrationControl } from '../db/client';
import { loadSecret } from '../config/secrets';

// ----------------------------------------------------
// 0. Funciones Auxiliares de Límite
// ----------------------------------------------------

async function checkDailyLimit(integration: IntegrationControl): Promise<void> {
    // Si el límite es 0 o negativo, siempre hay un stop (aunque active sea true)
    if (integration.daily_limit <= 0) {
        throw new Error(`Integration ${integration.provider} is restricted by a hard limit of ${integration.daily_limit}.`);
    }

    const usageToday = await db.consumption.getDailyUsage(integration.provider);
    
    if (usageToday >= integration.daily_limit) {
        console.error(`[Limit Check] HARD STOP: ${integration.provider} exceeded limit. Used: ${usageToday}, Limit: ${integration.daily_limit}`);
        throw new Error(`402 Payment Required: Daily limit reached (${integration.daily_limit} units).`);
    }
    
    console.log(`[Limit Check] OK. Used: ${usageToday}/${integration.daily_limit}.`);
}

// ----------------------------------------------------
// 1. Activation Gate (El primer Failsafe)
// ----------------------------------------------------

async function getIntegration(provider: string): Promise<IntegrationControl> {
  // === A. KILL SWITCH GLOBAL (Check de Env Var) ===
  if (process.env.GLOBAL_KILL_SWITCH === 'OFF') {
      console.error("[GLOBAL KILL SWITCH] All external systems are halted.");
      throw new Error("System is currently disabled by OWNER (Global Kill Switch).");
  }

  // === B. CEO ACTIVATION GATE (Check de DB) ===
  const integration = await db.integrations_control.findUnique({
    where: { provider: provider }
  });

  if (!integration || !integration.active) {
    throw new Error(`Voice AI disabled by CEO.`);
  }

  return integration;
}

// ----------------------------------------------------
// 2. Inicialización Condicional (Omitido por ser idéntico al anterior)
// ----------------------------------------------------

async function initializeBlandClient(integration: IntegrationControl) {
  // ... (código para cargar la API key y el agentId, igual al anterior)
  let apiKey: string;
  let agentId: string | undefined;
  if (integration.mode === 'live') {
    apiKey = loadSecret('BLAND_AI_LIVE_KEY');
    agentId = integration.metadata.liveAgentId;
  } else { // sandbox
    apiKey = loadSecret('BLAND_AI_SANDBOX_KEY');
    agentId = integration.metadata.sandboxAgentId;
  }
  if (!apiKey || !agentId) throw new Error(`Bland.ai config missing for mode: ${integration.mode}`);
  
  return { blandClient: new Bland(apiKey), agentId };
}


// ----------------------------------------------------
// 3. Función de Ejecución Principal con Control de Límites
// ----------------------------------------------------

export async function makeCall(to: string, units_to_use: number = 1) {
  try {
    // 1. VALIDACIÓN A: Activation Gate
    const blandConfig = await getIntegration('bland_ai');

    // 2. VALIDACIÓN B: Límite Diario de Costos
    await checkDailyLimit(blandConfig); // Lanza un error si el límite se excede

    // 3. Inicialización
    const { blandClient, agentId } = await initializeBlandClient(blandConfig);
    
    console.log(`[Bland AI Service] Executing call in mode: ${blandConfig.mode}.`);
    
    // 4. EJECUCIÓN
    const callResult = await blandClient.call({
      to: to,
      agent_id: agentId,
      // ... otros parámetros
    });
    
    // 5. POST-EJECUCIÓN: Registro de Consumo
    await db.consumption.logUsage('bland_ai', units_to_use); 

    return { success: true, callResult, mode: blandConfig.mode };

  } catch (error) {
    // Asegura que todos los errores (Gate, Límite, o Conexión API) sean atrapados.
    throw error; 
  }
}
