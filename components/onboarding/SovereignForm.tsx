export default function SovereignOnboarding() {
  return (
    <div className="max-w-2xl bg-[#000d1a] border border-cyan-500/20 p-12 rounded-[40px] shadow-2xl">
      <h2 className="text-xl font-black text-white italic italic mb-8 uppercase tracking-widest">
        Neural Intelligence Injection
      </h2>
      <form className="space-y-6">
        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Company Knowledge Base (URL or PDF)</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white mt-2" placeholder="https://..." />
        </div>
        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Objection Handling Protocol</label>
          <textarea className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white mt-2 h-32" placeholder="If they ask about price, we focus on ROI..." />
        </div>
        <button className="w-full py-5 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-2xl italic">
          Finalize Node Calibration
        </button>
      </form>
    </div>
  );
}
