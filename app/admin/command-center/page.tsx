import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getSeasonalContext } from '@/lib/core/seasonal-logic';

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. THE MONOPOLY GATE: Strict Ownership Lockdown
  if (user?.id !== process.env.ADMIN_OWNER_ID) {
    redirect('/404');
  }

  // 2. FETCH REAL-TIME SOVEREIGN METRICS
  const seasonal = getSeasonalContext();
  
  // Aggregate revenue from your call_logs (Protected Revenue)
  const { data: metrics } = await supabase
    .from('call_logs')
    .select('estimated_value')
    .eq('status', 'booked');

  const totalProtected = metrics?.reduce((acc, curr) => acc + (curr.estimated_value || 0), 0) || 0;

  return (
    <main className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter italic uppercase">Sovereign Command</h1>
          <p className="text-cyan-500 font-mono text-xs mt-2 tracking-widest">
            SYSTEM STATUS: ONLINE // MODE: {seasonal.season} ({seasonal.cluster})
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Last Sync</p>
          <p className="font-mono text-sm">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* REVENUE TAPE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-[10px] uppercase font-bold text-white/40 mb-1">Total Protected Revenue</p>
          <p className="text-3xl font-black text-green-500">${totalProtected.toLocaleString()}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-[10px] uppercase font-bold text-white/40 mb-1">Active AI Units</p>
          <p className="text-3xl font-black text-cyan-500">24/7</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-[10px] uppercase font-bold text-white/40 mb-1">Current Pivot</p>
          <p className="text-xl font-bold uppercase italic">{seasonal.focus}</p>
        </div>
      </div>

      {/* CLUSTER CONTROL PANEL */}
      <section className="mb-12">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4 italic">Active Regional Clusters</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between bg-red-500/10 border border-red-500/30 p-6 rounded-2xl">
            <div>
              <p className="font-bold text-red-500 uppercase tracking-tighter">Texas Triangle (Houston/Dallas/Austin)</p>
              <p className="text-xs text-red-400/60 mt-1">Priority Logic: {seasonal.keywords.join(' • ')}</p>
            </div>
            <button className="bg-red-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase hover:bg-red-500 transition-colors">
              Trigger Manual Override
            </button>
          </div>
          <div className="flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-2xl opacity-40">
            <div>
              <p className="font-bold uppercase tracking-tighter">Midwest Hub (Chicago/Detroit)</p>
              <p className="text-xs mt-1">Status: Scheduled for Jan 1st Expansion</p>
            </div>
            <p className="text-[10px] font-bold uppercase italic">Pending</p>
          </div>
        </div>
      </section>

      {/* SYSTEM LOGS (FUTURISTIC UI) */}
      <section className="bg-black border border-white/10 rounded-2xl p-6 font-mono text-[10px]">
        <h3 className="text-white/40 mb-4">— Global Dispatch Logs —</h3>
        <div className="space-y-1 text-white/60">
          <p><span className="text-cyan-500">[OK]</span> 2025-12-23 21:05: Auto-Scale deployed for Texas Surge.</p>
          <p><span className="text-green-500">[OK]</span> 2025-12-23 21:02: Lead #9982 booked in Dallas ($1,800 Est).</p>
          <p><span className="text-yellow-500">[WA]</span> 2025-12-23 20:58: Client ID #442 approaching Soft-Cap (92%).</p>
        </div>
      </section>
    </main>
  );
}
