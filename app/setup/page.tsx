export default function SetupPage() {
  return (
    <div className="p-12 max-w-4xl mx-auto relative z-10">
      <h1 className="text-4xl font-black italic mb-8">PLATFORM SETUP</h1>
      <div className="space-y-6">
        <div className="titan-card">
          <h3 className="text-white font-bold mb-4">Step 1: Node Synchronization</h3>
          <p className="text-slate-400 text-sm mb-6">Select your primary market region to apply the correct multiplier logic.</p>
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-brand-cyan w-1/3" />
          </div>
        </div>
        <div className="titan-card opacity-50">
          <h3 className="text-white font-bold mb-4">Step 2: AI Voice Mapping</h3>
          <p className="text-slate-400 text-sm">Configure tone and language settings for your industry.</p>
        </div>
      </div>
    </div>
  );
}
