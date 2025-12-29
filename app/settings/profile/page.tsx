export default function ProfilePage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-black italic mb-10">OWNER PROFILE</h1>
      <div className="titan-card space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b border-white/5">
          <div className="w-20 h-20 rounded-full bg-brand-cyan/20 border-2 border-brand-cyan" />
          <button className="text-xs font-bold uppercase text-brand-cyan">Change Avatar</button>
        </div>
        <div>
          <label className="text-[10px] font-bold text-brand-slate uppercase block mb-2">Sovereign Identity</label>
          <input defaultValue="Admin Node #001" className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
