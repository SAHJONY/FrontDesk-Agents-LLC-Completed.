// Lógica para extraer el 20% de cada dólar que pase por la red
const { data: globalRevenue } = await supabase
  .from('revenue_attribution')
  .select('estimated_deal_value, clients(franchisee_id)')
  .gte('conversion_timestamp', startOfMonth);

const totalRoyalty = globalRevenue.reduce((acc, curr) => {
  return acc + (curr.estimated_deal_value * 0.20);
}, 0);
