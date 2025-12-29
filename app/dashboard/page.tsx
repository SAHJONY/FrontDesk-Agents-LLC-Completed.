export default function DashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto relative z-10">
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black italic">FLEET OVERVIEW</h1>
          <p className="text-brand-cyan font-mono text-sm uppercase tracking-widest">Node Status: Active</p>
        </div>
        <div className="text-right">
          <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Elite Tier Session</p>
          <p className="text-white font-bold">Unlimited Fleet Active</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="titan-card border-brand-cyan/20">
          <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">Total Appointments</h3>
          <p className="text-5xl font-black">1,284</p>
        </div>
        <div className="titan-card">
          <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">Revenue Generated</h3>
          <p className="text-5xl font-black">$42,900</p>
        </div>
        <div className="titan-card">
          <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">AI Optimization</h3>
          <p className="text-5xl font-black">98.2%</p>
        </div>
      </div>
    </div>
  );
}
