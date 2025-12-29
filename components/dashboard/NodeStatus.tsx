/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Node Status Component - Monitors active tier health.
 */

interface NodeStatusProps {
  tier: 'basic' | 'professional' | 'growth' | 'elite' | string;
}

export const NodeStatus = ({ tier }: NodeStatusProps) => {
  // Logic to highlight the high-performance Elite Tier
  const isElite = tier.toLowerCase() === 'elite';

  return (
    <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 transition-all hover:border-zinc-700">
      <div className="flex justify-between items-center">
        <span className="text-zinc-500 italic uppercase text-[10px] tracking-widest">
          Node Fleet Health
        </span>
        <span 
          className={`h-2 w-2 rounded-full animate-pulse ${
            isElite ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-green-500'
          }`} 
        />
      </div>
      
      <div className="mt-3">
        <p className="text-2xl font-black capitalize tracking-tight text-white">
          {tier} Workforce
        </p>
        <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase">
          {isElite 
            ? "15% Recovery Yield Active" 
            : "Standard Autonomous Mode"}
        </p>
      </div>
    </div>
  );
};
