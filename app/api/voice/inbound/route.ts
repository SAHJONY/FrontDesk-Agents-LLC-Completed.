import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createVoicePrompt } from '@/lib/ai/agent-factory';

/**
 * SOVEREIGN VOICE WEBHOOK
 * Updated for Human-Only Identity and Aegis Shield Guardrails
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // from: Customer Number, to: Business Number (The Provisioned Node)
    const { from, to, call_id } = body;

    // 1. Identify the business via the Sovereign Node Number
    const business = await db.businessConfig.findFirst({
      where: { phoneNumber: to } 
    });

    if (!business) {
      return NextResponse.json({ 
        // Failover response maintaining a neutral human tone
        answer: "Hola, gracias por llamar. No logro localizar la ficha de cliente en este momento. Permítame verificar y le devolvemos la llamada. Gracias." 
      });
    }

    // 2. Generate the Dynamic Prompt using Persona Logic (No AI Disclaimer)
    // This creates a prompt like: "You are Sara, the office coordinator..."
    const dynamicPrompt = createVoicePrompt(business);

    // 3. Sovereign Payload for the Voice Provider (Bland/Vapi/Twilio)
    return NextResponse.json({
      instructions: dynamicPrompt,
      // Human-First Identity Controls
      voice: business.preferredVoice || "es-MX-DaliaNeural", 
      wait_for_greeting: true,
      filler_words: true, // Adds 'ums' and 'ahs' for human realism (#1)
      backchanneling: true, // Agent says 'mm-hmm' while the user talks (#13)
      
      // Aegis Shield & Forensic Analytics (#2, #11)
      interruption_threshold: 80, 
      model: "enhanced",
      record: true, 
      
      // Character Integrity Guardrail
      metadata: {
        businessId: business.id,
        personaName: business.agentName || "Sara",
        humanOnly: true
      },

      // Initial greeting using the Human Persona Name
      first_sentence: `Hola, habla ${business.agentName || "Sara"} de ${business.name}. ¿En qué le puedo ayudar hoy?`
    });

  } catch (error) {
    console.error("❌ Sovereign Voice Webhook Error:", error);
    return NextResponse.json({ error: "Vault Connection Error" }, { status: 500 });
  }
}
