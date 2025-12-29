export default function RetentionPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto relative z-10">
      <h1 className="text-4xl font-black italic mb-8">RETENTION FLEET</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="titan-card">
          <h3 className="text-brand-cyan font-bold mb-4 uppercase text-xs">Churn Prevention</h3>
          <p className="text-slate-400 text-sm">AI agents are currently scanning for inactive nodes to trigger recovery calls.</p>
        </div>
        <div className="titan-card">
          <h3 className="text-white font-bold mb-4 uppercase text-xs">Retention Stats</h3>
          <div className="text-4xl font-black italic text-white">94.2%</div>
        </div>
      </div>
    </div>
  );
}
