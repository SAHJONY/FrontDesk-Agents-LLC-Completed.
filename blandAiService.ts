import { db } from './db/client'; // Tu cliente de DB
import { loadSecret } from './config/secrets'; // Tu función para cargar secrets (Vercel/AWS)

async function getIntegration(provider: string) {
  // 1. Consulta la Fuente de Verdad (DB)
  const integration = await db.integrations_control.findUnique({
    where: { provider: provider }
  });

  if (!integration) {
    throw new Error(`Integration provider '${provider}' not found in registry.`);
  }
  
  // 2. Aplicar la Regla de Ejecución Principal (Activation Gate)
  if (!integration.active) {
    console.warn(`Attempt to use ${provider} failed. Status: DISABLED by CEO.`);
    // Esta excepción detiene la ejecución del endpoint
    throw new Error(`Voice AI disabled by CEO. Status: ${integration.mode}`);
  }

  // 3. Aplicar Límites Duros
  if (integration.daily_limit <= 0) {
      console.error(`Daily limit exceeded for ${provider}. Setting hard stop.`);
      throw new Error(`Integration daily limit reached: ${integration.daily_limit}`);
  }
  
  return integration;
}
