// 1. Explicit import for the production compiler
import { supabase } from '@/lib/supabase/client';

/**
 * Motor de Reconciliación: Cruce de llamadas vs. Atribución
 * Identifies gaps between AI conversions and reported revenue.
 */
export async function runFranchiseeAudit(franchiseeId: string) {
  // 1. Obtener llamadas que la IA marcó como "Exitosas/Venta"
  const { data: successfulCalls, error: callsError } = await supabase
    .from('ai_call_logs')
    .select('id, metadata')
    .eq('franchisee_id', franchiseeId)
    .eq('outcome', 'conversion');

  // 2. Cruzar con la tabla de ingresos reportados
  const { data: reportedRevenue, error: revenueError } = await supabase
    .from('revenue_attribution')
    .select('call_id')
    .eq('franchisee_id', franchiseeId);

  // 3. Error handling for pdx1 build stability
  if (callsError || revenueError) {
    console.error('Audit Engine Error:', callsError || revenueError);
    return [];
  }

  // 4. Identificar brechas (Llamadas convertidas no reportadas)
  // We use (?? []) to prevent ".filter of undefined" errors during strict type checking
  const missingCalls = (successfulCalls ?? []).filter(call => 
    !(reportedRevenue ?? []).some(report => report.call_id === call.id)
  );

  return missingCalls; 
}
