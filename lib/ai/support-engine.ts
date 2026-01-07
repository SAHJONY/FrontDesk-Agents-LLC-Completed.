// 1. Import necessary clients for the Portland Node
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// Initialize Supabase (Ensure these ENV variables are set in Vercel)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize OpenAI/AI Utility

/**
 * Motor de Soporte: Diagnóstico en tiempo real
 * Optimized for Next.js 15 production environment.
 */
export async function supportDiagnostic(franchiseeId: string, query: string) {
  // 1. Contexto: ¿Qué clientes tiene activos este franquiciado?
  const { data: activeClients, error } = await supabase
    .from('clients')
    .select('id, company_name, industry')
    .eq('franchisee_id', franchiseeId);

  if (error) {
    console.error('Database fetch error in support-engine:', error);
  }

  // 2. Respuesta de IA basada en la documentación del sistema
  // Note: Adjusting 'ai.generateResponse' to a standard OpenAI call if that was a custom wrapper
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { 
        role: "system", 
        content: `Eres el Soporte Técnico de FrontDesk Agents. El franquiciado tiene estos clientes: ${JSON.stringify(activeClients || [])}` 
      },
      { role: "user", content: query }
    ],
  });

  return completion.choices[0].message.content;
}
