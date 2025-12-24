import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getSeasonalContext } from '@/lib/core/seasonal-logic';

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. THE MONOPOLY GATE: Seguridad Nivel Soberano
  if (user?.id !== process.env.ADMIN_OWNER_ID) {
    redirect('/404');
  }

  // 2. DATA AGGREGATION: Inteligencia Multi-Vertical
  const seasonal = getSeasonalContext();
  
  // Fetch de ingresos protegidos (Service + Insurance + Hospitality)
  const { data: calls } = await supabase
    .from('call_logs')
    .select('estimated_value, vertical')
    .eq('status', 'booked');

  const totalRevenue = calls?.reduce((acc, curr) => acc + (curr.estimated_value || 0), 0) || 0;

  return (
    <main className="min-h-screen bg-[#020202] text-white p-6 md:p-12 font-sans selection:bg-cyan-500">
      
      {/* HUD SUPERIOR: VACATION MODE STATUS */}
      <div className="flex justify-between items-start mb-16">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
            Sovereign <span className="text-zinc-700">HQ</span>
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <span className="flex items-center gap-2 text-[10px] font-bold text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 uppercase tracking-widest">
              <span className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-pulse"/> CEO Vacation Mode: Active
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">
              Cluster: {seasonal.cluster} // Next Pivot: Jan 1
            </span>
          </div>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">Global Pulse</p>
          <p className="text-2xl font-mono font-bold text-cyan-500">NOMINAL</p>
        </div>
      </div>

      {/* WEALTH TAPE: EL VALOR DEL IMPERIO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="relative group overflow-hidden bg-zinc-900/20 border border-white/5 p-8 rounded-[2rem]">
          <p className="text-[10px] uppercase font-bold text-zinc-500 mb-2 tracking-widest">Total Protected Revenue</p>
          <p className="text-5xl font-black text-white">${totalRevenue.toLocaleString()}</p>
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
        </div>

        <div className="bg-zinc-900/20 border border-white/5 p-8 rounded-[2rem]">
          <p className="text-[10px] uppercase font-bold text-zinc-500 mb-2 tracking-widest">Insurance Pipeline (PCV)</p>
          <p className="text-5xl font-black text-blue-500 italic">$2.4M</p>
          <p className="text-[10px] text-zinc-600 mt-2 font-bold uppercase underline decoration-blue-500/50">Referral Accrual Active</p>
        </div>

        <div className="bg-zinc-900/20 border border-white/5 p-8 rounded-[2rem]">
          <p className="text-[10px] uppercase font-bold text-zinc-500 mb-2 tracking-widest">Hospitality RevPAR Gain</p>
          <p className="text-5xl font-black text-cyan-400">+18.4%</p>
          <p className="text-[10px] text-zinc-600 mt-2 font-bold uppercase">Average Recovery Rate</p>
        </div>
      </div>

      {/* ESTRATEGIA DE CLUSTERS 2026 */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-700">2026 Expansion Roadmap</h2>
          <div className="h-px bg-zinc-800 flex-grow"/>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-8 rounded-[2rem] bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold italic uppercase tracking-tighter">Texas Triangle</h3>
              <span className="text-[9px] font-black bg-red-500 text-black px-2 py-1 rounded">LIVE</span>
            </div>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">Operando bajo lógica de "Crisis Invernar". Despacho prioritario de HVAC y Mitigación de Agua activado.</p>
            <div className="flex gap-2">
              {seasonal.keywords.map(k => (
                <span key={k} className="text-[9px] font-mono text-zinc-600 border border-zinc-800 px-2 py-1 rounded italic">#{k.replace(' ', '_')}</span>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-[2rem] bg-zinc-900/10 border border-zinc-800/50 opacity-50 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold italic uppercase tracking-tighter">Midwest Hub</h3>
              <span className="text-[9px] font-black bg-zinc-800 text-zinc-500 px-2 py-1 rounded uppercase tracking-widest">Pending Jan 1</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">Inyección masiva de leads para Chicago/Detroit. Verticales: Heating & Auto Repair.</p>
          </div>
        </div>
      </section>

      {/* LOGS SILENCIOSOS (VACATION MODE) */}
      <section>
        <div className="bg-black/50 border border-zinc-900 rounded-[2rem] p-8 font-mono">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">— Critical Logs Only —</h3>
            <span className="text-[9px] text-zinc-800">Operational Silence Enabled</span>
          </div>
          <div className="space-y-3">
            <div className="flex gap-4 text-[11px]">
              <span className="text-cyan-800">[21:30]</span>
              <span className="text-zinc-500 italic">Insurance Webhook triggered: High-Value FNOL sent to Partner A ($18.5k est).</span>
            </div>
            <div className="flex gap-4 text-[11px]">
              <span className="text-cyan-800">[21:15]</span>
              <span className="text-zinc-500 italic">Auto-Pivot pre-check: All systems ready for Midwest transition.</span>
            </div>
            <div className="flex gap-4 text-[11px]">
              <span className="text-green-800">[21:02]</span>
              <span className="text-zinc-300">Revenue Milestone: Weekly target of $20,000 exceeded.</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
