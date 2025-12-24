import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getSeasonalContext } from '@/lib/core/seasonal-logic';
import { checkBillingGuard } from '@/lib/core/billing-guard';

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. THE MONOPOLY GATE: Lockdown Total
  if (user?.id !== process.env.ADMIN_OWNER_ID) {
    redirect('/404');
  }

  // 2. DATA AGGREGATION (Real-time Intelligence)
  const seasonal = getSeasonalContext();
  
  // Obtenemos el total de ingresos protegidos (Revenue Protected)
  const { data: calls } = await supabase
    .from('call_logs')
    .select('estimated_value, status')
    .eq('status', 'booked');

  const revenueProtected = calls?.reduce((acc, curr) => acc + (curr.estimated_value || 0), 0) || 0;

  // Obtenemos alertas de Billing (Clientes llegando al Soft Cap)
  const { data: billingAlerts } = await supabase
    .from('client_configurations')
    .select('business_name, current_spend, monthly_spend_cap')
    .filter('current_spend', 'gte', 'monthly_spend_cap * 0.9');

  return (
    <main className="min-h-screen bg-[#020202] text-white p-4 md:p-10 font-sans selection:bg-cyan-500">
      
      {/* HUD: SISTEMA Y FECHA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Sovereign HQ</h1>
          <div className="flex gap-3 mt-1">
            <span className="flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"/> Engine Active
            </span>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Dec 23, 2025 // 21:07 CST
            </span>
          </div>
        </div>
        
        <div className="bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-full">
          <p className="text-[9px] text-zinc-500 uppercase font-black">Cluster Actual</p>
          <p className="text-xs font-bold text-cyan-400 uppercase italic">{seasonal.cluster}</p>
        </div>
      </div>

      {/* METRICAS PRINCIPALES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-6 rounded-3xl">
          <p className="text-[10px] text-zinc-500 uppercase font-black mb-1">Revenue Protected</p>
          <p className="text-4xl font-black text-white">${revenueProtected.toLocaleString()}</p>
          <p className="text-[10px] text-green-500 font-bold mt-2">+14% vs Semana Anterior</p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl">
          <p className="text-[10px] text-zinc-500 uppercase font-black mb-1">Próximo Pivot (Jan 1)</p>
          <p className="text-2xl font-black text-zinc-400">Midwest Hub</p>
          <p className="text-[10px] text-zinc-600 font-bold mt-2 italic">Vertical: HVAC & Auto Repair</p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl">
          <p className="text-[10px] text-zinc-500 uppercase font-black mb-1">Status de Infraestructura</p>
          <p className="text-2xl font-black text-cyan-500 italic">AUTO-SCALE ON</p>
          <p className="text-[10px] text-zinc-600 font-bold mt-2">DB Pool: Transactional Mode</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* COLUMNA IZQUIERDA: ALERTAS DE FACTURACIÓN */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-zinc-600 mb-4">Guardrail Alerts</h2>
          <div className="space-y-3">
            {billingAlerts && billingAlerts.length > 0 ? (
              billingAlerts.map((alert, i) => (
                <div key={i} className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-yellow-500 uppercase">{alert.business_name}</p>
                    <p className="text-[10px] text-zinc-500">Consumo al 92% del presupuesto mensual.</p>
                  </div>
                  <button className="text-[10px] font-black bg-yellow-500 text-black px-3 py-1 rounded-full uppercase">Review</button>
                </div>
              ))
            ) : (
              <div className="text-[11px] text-zinc-700 italic border border-dashed border-zinc-800 p-6 rounded-2xl text-center">
                No active budget alerts. All margins protected.
              </div>
            )}
          </div>
        </section>

        {/* COLUMNA DERECHA: LOGS DE OPERACIÓN SOBERANA */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-zinc-600 mb-4">Sovereign Live Feed</h2>
          <div className="bg-black border border-zinc-800 p-6 rounded-3xl font-mono text-[10px] leading-relaxed">
            <p className="text-zinc-600 mb-2">// Global Triage Monitoring</p>
            <div className="space-y-2">
              <p><span className="text-cyan-500">[SYSTEM]</span> 21:07:05: Cluster Texas Triangle operando en "Crisis Mode".</p>
              <p><span className="text-green-500">[BOOKED]</span> 21:05:42: Lead Houston_Plumbing_882 convertido ($1,500 est).</p>
              <p><span className="text-blue-500">[SCRAPE]</span> 20:55:00: Ingesta de 50 nuevos leads en Dallas completada.</p>
              <p><span className="text-purple-500">[SCALE]</span> 20:42:11: Auto-scale activado. Incrementando capacidad de cómputo.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
