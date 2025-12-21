export default function PartnerPortal() {
  return (
    <div className="p-12 bg-[#020617] rounded-[50px] border border-white/10 shadow-3xl">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-black italic text-white uppercase italic">Partner Infrastructure Control</h2>
        <span className="bg-emerald-500/10 text-emerald-500 text-[9px] font-black px-4 py-1 rounded-full uppercase">API Status: Active</span>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Partner Licenses</p>
          <p className="text-3xl font-black text-white mt-2">12</p>
        </div>
        {/* Additional partner metrics... */}
      </div>
      <button className="mt-8 w-full py-4 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl italic hover:bg-cyan-500 transition-colors">
        Provision New Agency License
      </button>
    </div>
  );
}
