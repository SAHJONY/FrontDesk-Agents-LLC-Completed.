export default function PhoneNumbersPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto relative z-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black italic">TELEPHONY NODES</h1>
        <button className="bg-brand-cyan text-black px-6 py-2 rounded-lg font-bold text-xs uppercase">
          Provision New Number
        </button>
      </div>
      
      <div className="titan-card">
        <div className="flex justify-between items-center p-4 border-b border-white/5">
          <div>
            <p className="text-white font-mono">+1 (555) 012-3456</p>
            <p className="text-[10px] text-brand-slate uppercase font-bold">Western Node (1.0x)</p>
          </div>
          <span className="text-green-400 text-[10px] font-bold uppercase">Active</span>
        </div>
      </div>
    </div>
  );
}
