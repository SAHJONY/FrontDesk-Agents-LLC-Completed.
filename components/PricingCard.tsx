export const PricingCard = ({ plan, multiplier }: any) => {
  const finalPrice = Math.round(plan.usd * multiplier); // Local market adjustment [cite: 2025-12-24]
  const isElite = plan.usd === 1499;

  return (
    <div className={`titan-card ${isElite ? 'border-brand-cyan shadow-lg shadow-cyan-900/20' : ''}`}>
      <h3 className="text-xs font-black uppercase tracking-widest text-brand-slate mb-2">
        {plan.name} Workforce
      </h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-black italic">${finalPrice}</span>
        <span className="text-slate-500 text-xs">/mo</span>
      </div>
      <ul className="space-y-3 mb-8 text-sm text-slate-400">
        {plan.features.map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-2">
            <div className="w-1 h-1 bg-brand-cyan rounded-full" /> {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-bold uppercase text-[10px] tracking-widest transition-all ${
        isElite ? 'bg-brand-cyan text-black hover:bg-cyan-400' : 'bg-white/5 text-white hover:bg-white/10'
      }`}>
        Activate Workforce
      </button>
    </div>
  );
};
