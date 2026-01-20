import React from 'react';

interface UsageProps {
  usedMins: number;
  maxMins: number;
  tier: string;
}

export const UsageMeter = ({ usedMins, maxMins, tier }: UsageProps) => {
  const percentage = Math.min(Math.round((usedMins / maxMins) * 100), 100);
  
  // Logic: Change color based on "Burn" levels
  const getStatusColor = () => {
    if (percentage > 85) return 'bg-red-500';
    if (percentage > 60) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
      <div className="flex justify-between items-end mb-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">System Capacity</p>
          <h3 className="text-2xl font-black text-white">{tier} Node</h3>
        </div>
        <div className="text-right">
          <span className="text-sm font-mono text-zinc-400">{usedMins} / {maxMins} MINS</span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ease-out ${getStatusColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-[10px] text-zinc-500 italic">
          {percentage >= 100 
            ? "Overage rates ($0.45/min) currently active." 
            : `${100 - percentage}% infrastructure capacity remaining.`}
        </p>
        
        {percentage > 80 && (
          <button className="px-3 py-1 bg-white text-black text-xs font-bold uppercase hover:bg-cyan-500 transition-colors">
            Upgrade Tier
          </button>
        )}
      </div>
    </div>
  );
};
