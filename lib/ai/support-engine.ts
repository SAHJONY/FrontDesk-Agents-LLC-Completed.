// Motor de Soporte: Diagnóstico en tiempo real
export async function supportDiagnostic(franchiseeId: string, query: string) {
  // 1. Contexto: ¿Qué clientes tiene activos este franquiciado?
  const { data: activeClients } = await supabase
    .from('clients')
    .select('id, company_name, industry')
    .eq('franchisee_id', franchiseeId);

  // 2. Respuesta de IA basada en la documentación del sistema
  const response = await ai.generateResponse({
    context: `Eres el Soporte Técnico de FrontDesk Agents. El franquiciado tiene estos clientes: ${JSON.stringify(activeClients)}`,
    prompt: query
  });

  return response;
}
