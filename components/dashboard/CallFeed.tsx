/**
 * FRONTDESK AGENTS: CALL FEED COMPONENT
 * Provides a live telemetry stream of RL-Agent activity.
 */

export const CallFeed = () => {
  return (
    <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 h-full min-h-[300px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Live RL-Agent Activity
        </h3>
        <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase font-bold">
          Stream: Active
        </span>
      </div>
      
      <div className="space-y-3">
        {/* Placeholder for real-time agentic events */}
        <div className="flex gap-3 items-start animate-pulse">
          <div className="w-1 h-10 bg-blue-500 rounded-full" />
          <div>
            <p className="text-xs text-zinc-300 font-medium">Node_01 engaging Lead_882...</p>
            <p className="text-[10px] text-zinc-600 font-mono mt-1">Status: Negotiating Recovery Yield</p>
          </div>
        </div>
        
        <div className="mt-4 py-8 text-center">
          <p className="text-sm text-zinc-600 italic">Waiting for next agentic trigger...</p>
        </div>
      </div>
    </div>
  );
};
