// Inside your EscalationHub component...
// Add 'onTakeOver' to the component props

export function EscalationHub({ 
  escalations, 
  onTakeOver 
}: { 
  escalations: any[], 
  onTakeOver: (session: any) => void 
}) {
  return (
    <div className="space-y-4">
      {/* ... header code ... */}
      
      <div className="grid gap-4">
        {escalations.map((item) => (
          <motion.div key={item.id} /* ... styling ... */>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* ... customer info ... */}

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onTakeOver(item)} // This triggers the bridge
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-rose-400 transition-all shadow-lg"
                >
                  Take Over <PhoneForwarded size={14} />
                </button>
                {/* ... secondary buttons ... */}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
