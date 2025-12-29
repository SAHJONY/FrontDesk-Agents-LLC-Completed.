export default function GeneralSettings() {
  return (
    <div className="p-8 max-w-3xl mx-auto relative z-10">
      <h1 className="text-3xl font-black italic mb-8 uppercase">Node Identity</h1>
      
      <div className="space-y-8">
        <div className="titan-card">
          <h3 className="text-white font-bold mb-6">Global Branding</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-brand-slate uppercase block mb-2">Display Name</label>
              <input defaultValue="Sovereign Financial Node A" className="w-full bg-slate-900 border border-white/5 p-3 rounded-lg text-white" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-brand-slate uppercase block mb-2">Platform Language</label>
              <select className="w-full bg-slate-900 border border-white/5 p-3 rounded-lg text-white appearance-none">
                <option>English (US)</option>
                <option>Spanish (ES)</option>
                <option>Arabic (SA)</option>
              </select>
            </div>
          </div>
        </div>

        <button className="bg-brand-cyan text-black px-12 py-4 rounded-full font-black uppercase text-xs tracking-widest">
          Sync Node Settings
        </button>
      </div>
    </div>
  );
}
