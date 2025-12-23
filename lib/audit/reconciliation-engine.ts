// 1. Import the Supabase client (adjust path if your client is elsewhere)
import { supabase } from '@/lib/supabase/client';

/**
 * Motor de Reconciliación: Cruce de llamadas vs. Atribución
 * Detects "Ghost Revenue" by comparing AI conversions against reported data.
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

  // Error handling for production stability
  if (callsError || revenueError) {
    console.error('Reconciliation fetch error:', callsError || revenueError);
    return [];
  }

  // 3. Identificar brechas (Llamadas convertidas no reportadas)
  // We use optional chaining and null-coalescing (?? []) to satisfy strict type checks
  const missingCalls = (successfulCalls ?? []).filter(call => 
    !(reportedRevenue ?? []).some(report => report.call_id === call.id)
  );

  return missingCalls; // Estos son los "ingresos fantasma" detectados
}
