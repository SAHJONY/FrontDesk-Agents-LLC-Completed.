export default function CommandDeck() {
  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 font-sans">
      {/* Header with System Sovereignty Status */}
      <header className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter text-cyan-400">FRONTDESK AGENTS // SOVEREIGN HUB</h1>
          <p className="text-[10px] uppercase tracking-[0.5em] text-slate-500 font-bold">Neural Infrastructure Status: Nominal</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/5 px-6 py-2 rounded-full border border-white/10 text-xs font-bold uppercase italic">
            ARR Projection: <span className="text-emerald-400">$1.2M</span>
          </div>
        </div>
      </header>

      {/* Main Grid: 10-Product Oversight */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 space-y-6">
          <div className="bg-white/[0.02] border border-white/5 h-96 rounded-[40px] p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 italic">Global Sentiment Heatmap</h3>
            {/* Map/Chart Visualization would go here */}
            <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 to-transparent rounded-3xl animate-pulse" />
          </div>
          {/* Priority Queue & Live Feed components we built earlier */}
        </div>
        
        <div className="col-span-4 space-y-6">
          <div className="bg-cyan-500 p-8 rounded-[40px] text-black">
            <h3 className="font-black text-xl italic mb-2">QUICK ACTION</h3>
            <p className="text-sm font-bold opacity-80 mb-6 italic">Deploy new Sales Swarm to Texas Territory</p>
            <button className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest">Authorize Uplink</button>
          </div>
        </div>
      </div>
    </div>
  );
}
