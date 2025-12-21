// Motor de Reconciliación: Cruce de llamadas vs. Atribución
export async function runFranchiseeAudit(franchiseeId: string) {
  // 1. Obtener llamadas que la IA marcó como "Exitosas/Venta"
  const { data: successfulCalls } = await supabase
    .from('ai_call_logs')
    .select('id, metadata')
    .eq('franchisee_id', franchiseeId)
    .eq('outcome', 'conversion');

  // 2. Cruzar con la tabla de ingresos reportados
  const { data: reportedRevenue } = await supabase
    .from('revenue_attribution')
    .select('call_id')
    .eq('franchisee_id', franchiseeId);

  // 3. Identificar brechas (Llamadas convertidas no reportadas)
  const missingCalls = successfulCalls.filter(call => 
    !reportedRevenue.some(report => report.call_id === call.id)
  );

  return missingCalls; // Estos son los "ingresos fantasma" detectados
}
