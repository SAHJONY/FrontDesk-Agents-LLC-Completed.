import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function onboardNewSovereignClient(name: string, industry: 'legal' | 'medical_aesthetic', avgValue: number) {
  // 1. Creación Atómica del Cliente
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .insert([{ company_name: name, industry, average_deal_value: avgValue }])
    .select()
    .single();

  if (clientError) throw clientError;

  // 2. Inyección Automática de Conocimiento por Nicho
  const blocks = industry === 'medical_aesthetic' 
    ? [
        { category: 'conversion_logic', content: 'Crear urgencia mencionando espacios limitados para tratamientos.', priority: 10 },
        { category: 'safety_assurance', content: 'Enfatizar protocolos de grado médico y certificación.', priority: 9 }
      ]
    : [
        { category: 'objection_handling', content: 'Enfatizar el ROI y el costo de oportunidad legal.', priority: 10 }
      ];

  const { error: sauceError } = await supabase
    .from('knowledge_blocks')
    .insert(blocks.map(b => ({ ...b, client_id: client.id, industry_type: industry })));

  if (sauceError) throw sauceError;

  return { success: true, clientId: client.id };
}
