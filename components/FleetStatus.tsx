export const FleetStatus = () => {
  return (
    <div className="titan-card bg-brand-cyan/5 border-brand-cyan/20">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-white font-bold">Fleet Synchronization</h4>
          <p className="text-slate-500 text-xs">AI Agents are currently mapping local markets.</p>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-black flex items-center justify-center text-[10px] font-bold text-brand-cyan">
              AI
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
