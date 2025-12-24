import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getSeasonalContext } from '@/lib/core/seasonal-logic';

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. THE MONOPOLY GATE
  if (user?.id !== process.env.ADMIN_OWNER_ID) {
    redirect('/404');
  }

  const seasonal = getSeasonalContext();
  
  // Agregación de métricas comerciales y de hospitalidad
  const { data: metrics } = await supabase.from('global_stats').select('*').single();

  return (
    <main className="min-h-screen bg-[#020202] text-white p-6 md:p-12 font-sans">
      
      {/* HEADER: VACATION MODE HUD */}
      <div className="flex justify-between items-start mb-16">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none text-white">
            Sovereign <span className="text-zinc-800">HQ</span>
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <span className="flex items-center gap-2 text-[10px] font-bold text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 uppercase tracking-widest">
              <span className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-pulse"/> CEO Vacation Mode: Active
            </span>
            <span className="text-[10px] text-zinc-600 font-mono italic">
              Commercial Engine: Online // Multi-Vertical Sync Active
            </span>
          </div>
        </div>
        <div className="hidden md:block bg-zinc-900/50 p-4 rounded-xl border border-white/5">
          <p className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em]">Next Automated Pivot</p>
          <p className="text-sm font-bold text-cyan-500 mt-1">Jan 1: Midwest Deep Freeze</p>
        </div>
      </div>

      {/* WEALTH & UPTIME TAPE */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-zinc-900/20 border border-white/5 p-6 rounded-3xl">
          <p className="text-[9px] uppercase font-black text-zinc-500 mb-1">Total Protected Rev</p>
          <p className="text-3xl font-black text-white">$543,200</p>
        </div>
        <div className="bg-zinc-900/20 border border-white/5 p-6 rounded-3xl">
          <p className="text-[9px] uppercase font-black text-zinc-500 mb-1">Insurance PCV</p>
          <p className="text-3xl font-black text-blue-500 italic">$2.4M</p>
        </div>
        <div className="bg-zinc-900/20 border border-white/5 p-6 rounded-3xl">
          <p className="text-[9px] uppercase font-black text-zinc-500 mb-1">Restaurant Uptime</p>
          <p className="text-3xl font-black text-green-500">99.8%</p>
        </div>
        <div className="bg-zinc-900/20 border border-white/5 p-6 rounded-3xl border-l-cyan-500/50 border-l-2">
          <p className="text-[9px] uppercase font-black text-zinc-500 mb-1">Hospitality RevPAR</p>
          <p className="text-3xl font-black text-cyan-400">+18.4%</p>
        </div>
      </div>

      {/* SECCIÓN DE RESTAURANTES Y COMERCIAL */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-700 font-mono">Commercial Sector Guard</h2>
          <div className="h-px bg-zinc-900 flex-grow"/>
        </div>

        <div className="bg-gradient-to-r from-zinc-900/40 to-black border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold italic uppercase tracking-tighter mb-2">Emergency Facility Bridge</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Monitoreando fallos críticos en cámaras de refrigeración y sistemas de extracción 24/7. 
              Despacho de emergencia activado para el clúster <span className="text-white font-bold">{seasonal.cluster}</span>.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-black p-4 rounded-2xl border border-zinc-800 text-center w-32">
              <p className="text-[9px] text-zinc-600 font-black uppercase">Active Sites</p>
              <p className="text-xl font-bold mt-1 text-white">42</p>
            </div>
            <div className="bg-black p-4 rounded-2xl border border-zinc-800 text-center w-32">
              <p className="text-[9px] text-zinc-600 font-black uppercase">High-Value Ref</p>
              <p className="text-xl font-bold mt-1 text-blue-500">12</p>
            </div>
          </div>
        </div>
      </section>

      {/* LOGS CRÍTICOS (VACATION MODE) */}
      <section className="bg-black/50 border border-zinc-900 rounded-[2rem] p-8 font-mono text-[10px]">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-zinc-600 uppercase tracking-widest italic">— Global Sovereign Feed —</h3>
            <span className="text-zinc-800">Operational Silence: Active</span>
          </div>
          <div className="space-y-3 opacity-60">
            <p><span className="text-blue-500">[INSURANCE]</span> 21:42: FNOL Generated for Commercial Client #202 (Roofing Damage - $24k est).</p>
            <p><span className="text-green-500">[REST_DISPATCH]</span> 21:10: Emergency HVAC response completed for Dallas Bistro Group.</p>
            <p><span className="text-cyan-500">[HOSPITALITY]</span> 20:55: Automated Late Checkout Upsell processed for 14 rooms.</p>
            <p className="text-zinc-700 italic mt-4">// No further critical anomalies detected.</p>
          </div>
      </section>
    </main>
  );
}
