export async function checkBillingGuard(clientId: string) {
  const supabase = createClient();
  
  // 1. Obtener el límite mensual y el gasto actual del cliente
  const { data: config } = await supabase
    .from('client_billing')
    .select('monthly_spend_cap, current_spend')
    .eq('client_id', clientId)
    .single();

  if (!config) return true; // Si no hay límite, procede (Sovereign Mode)

  // 2. Si el gasto supera el 90%, disparar alerta al CEO Command Center
  if (config.current_spend >= config.monthly_spend_cap * 0.9) {
    await triggerCEOAlert(`⚠️ SOFT CAP: Cliente ${clientId} al 90% de su presupuesto.`);
  }

  // 3. Bloqueo preventivo si supera el 100%
  return config.current_spend < config.monthly_spend_cap;
}
