import { supabase } from '../lib/supabase/client';

const seedSimulatedData = async () => {
  console.log("🚀 Iniciando simulación de actividad económica...");

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // 1. Simular Ventas por Tiers
  const simulatedSales = [
    { amount: 199, plan: 'Basic', customer: 'test1@example.com' },
    { amount: 399, plan: 'Professional', customer: 'test2@example.com' },
    { amount: 799, plan: 'Growth', customer: 'test3@example.com' },
    { amount: 1499, plan: 'Elite', customer: 'test4@example.com' },
    { amount: 1499, plan: 'Elite', customer: 'test5@example.com' }
  ];

  const { error: salesError } = await supabase.from('subscriptions').insert(
    simulatedSales.map(sale => ({
      amount: sale.amount,
      status: 'active',
      customer_email: sale.customer,
      created_at: yesterday.toISOString()
    }))
  );

  // 2. Simular Leads de Wholesale
  const simulatedLeads = [
    { address: '123 Ocean Drive', price: 450000, type: 'Off-Market' },
    { address: '742 Evergreen Terrace', price: 280000, type: 'Wholesale' },
    { address: '10 Downing St', price: 1200000, type: 'Institutional' }
  ];

  const { error: leadsError } = await supabase.from('leads').insert(
    simulatedLeads.map(lead => ({
      address: lead.address,
      estimated_value: lead.price,
      status: 'new',
      created_at: yesterday.toISOString()
    }))
  );

  if (salesError || leadsError) {
    console.error("❌ Error en la simulación:", salesError || leadsError);
  } else {
    console.log("✅ Simulación completada: $4,395 en ingresos y 3 nuevos leads inyectados.");
  }
};

seedSimulatedData();
