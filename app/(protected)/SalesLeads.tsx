// 1. Add this state to your SalesLeads component
const [selectedLead, setSelectedLead] = useState<any>(null);

// 2. Add this Modal UI inside your return statement (bottom of the JSX)
{selectedLead && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
    <div className="bg-[#000814] border border-white/10 w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl">
      
      {/* Modal Header */}
      <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
        <div>
          <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter">
            Resumen de Llamada
          </h3>
          <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mt-1">
            Lead: {selectedLead.full_name}
          </p>
        </div>
        <button 
          onClick={() => setSelectedLead(null)}
          className="text-gray-500 hover:text-white transition-colors"
        >
          ✕ Cerrar
        </button>
      </div>

      {/* Modal Content */}
      <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
        {/* Sentiment Badge */}
        <div className="flex items-center gap-4">
           <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Resultado:</span>
           <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-black italic uppercase">
             {selectedLead.call_results?.[0]?.sentiment_score || 'Neutral'}
           </span>
        </div>

        {/* Summary Section */}
        <div className="space-y-2">
          <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Análisis del AI SDR</h4>
          <p className="text-sm text-gray-300 leading-relaxed italic bg-white/5 p-4 rounded-2xl border border-white/5">
            {selectedLead.call_results?.[0]?.summary || "No hay resumen disponible aún. El agente está procesando la llamada."}
          </p>
        </div>

        {/* Transcript Section */}
        <div className="space-y-2">
          <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Transcripción Completa</h4>
          <div className="text-[11px] font-mono text-gray-500 bg-black/40 p-4 rounded-2xl border border-white/5 h-40 overflow-y-auto">
            {selectedLead.call_results?.[0]?.transcript || "La transcripción aparecerá aquí una vez finalizada la llamada."}
          </div>
        </div>
      </div>
    </div>
  </div>
)}
