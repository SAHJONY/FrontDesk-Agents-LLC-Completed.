export default function PricingCard({ region }: { region: string }) {
  const isGrowthMarket = region === 'GROWTH';
  
  // Permanent Platform Pricing Logic
  // Growth Markets see the 'Professional' price as their Enterprise anchor
  // Global Markets see the 'Elite' price as their Enterprise anchor
  const price = isGrowthMarket ? "399" : "1,499";
  const minutes = isGrowthMarket ? "1,000" : "5,000";

  return (
    <div className="p-8 rounded-3xl border border-emerald-500 bg-white/[0.02] backdrop-blur-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-white">Sovereign Enterprise</h3>
        {isGrowthMarket && (
          <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-1 rounded uppercase">
            Local Growth Rate
          </span>
        )}
      </div>

      <p className="text-5xl font-black text-white my-4">
        ${price}<span className="text-sm font-normal text-slate-400">/mo</span>
      </p>
      
      <div className="flex items-center gap-2 mb-6">
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">
          {minutes} Neural Minutes Included
        </span>
      </div>
      
      <ul className="space-y-4 mb-8">
        <li className="text-sm text-slate-300 flex items-center gap-2">
          <div className="w-1 h-1 bg-emerald-500 rounded-full" /> 
          Full Neural Ingest Engine
        </li>
        <li className="text-sm text-slate-300 flex items-center gap-2">
          <div className="w-1 h-1 bg-emerald-500 rounded-full" /> 
          24/7 Autonomous Voice Node
        </li>
        <li className="text-sm text-slate-300 flex items-center gap-2">
          <div className="w-1 h-1 bg-emerald-500 rounded-full" /> 
          Global ROI Analytics Dashboard
        </li>
      </ul>
      
      <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-black transition-all transform hover:scale-[1.02] uppercase tracking-widest text-xs">
        Initialize Node
      </button>
      
      <p className="text-[10px] text-slate-500 mt-4 text-center">
        Permanent Platform Pricing • Secure Stripe Encryption
      </p>
    </div>
  );
}
