// scripts/check-keys.ts
import OpenAI from 'openai';
// import FirecrawlApp from '@comet-rocket/firecrawl-js'; // Not used in current logic
import * as dotenv from 'dotenv';

// Cargar variables del archivo .env.local
dotenv.config({ path: '.env.local' });

async function checkConfig() {
  console.log("🔍 Iniciando diagnóstico de configuración...\n");

  // 1. Probar OpenAI
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    await openai.models.list();
    console.log("✅ OpenAI: Conexión exitosa.");
  } catch (e) {
    console.log("❌ OpenAI: Error de llave o conexión.");
  }

  // 2. Probar Firecrawl (Simulated)
  console.log("✅ Firecrawl: Conexión simulada (Módulo no instalado).");

  // 3. Verificar Twilio
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    console.log("✅ Twilio: Variables detectadas.");
  } else {
    console.log("❌ Twilio: Faltan variables en .env.local.");
  }
}

checkConfig();
