export function LiveSessionPanel({ activeSession }: { activeSession: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 w-96 bg-slate-900 border border-sky-500/50 rounded-3xl shadow-2xl z-50 overflow-hidden"
    >
      <div className="p-4 bg-sky-500 text-black flex justify-between items-center">
        <span className="text-[10px] font-black uppercase italic">Live Session: {activeSession.customer_name}</span>
        <div className="flex gap-2">
          <div className="h-2 w-2 rounded-full bg-black animate-pulse" />
        </div>
      </div>
      <div className="h-64 p-4 bg-slate-950/50 overflow-y-auto">
        {/* Render recent messages here */}
        <p className="text-[10px] text-slate-500 text-center italic uppercase font-bold">Communication Bridged to Human</p>
      </div>
      <div className="p-4 border-t border-slate-800">
        <input 
          className="w-full bg-slate-800 border-none rounded-xl px-4 py-2 text-xs text-white" 
          placeholder="Type your response..."
        />
      </div>
    </motion.div>
  );
}
