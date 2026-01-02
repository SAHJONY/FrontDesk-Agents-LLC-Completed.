import React from 'react';
import { Flame, PhoneCall, MessageSquare, ChevronRight } from 'lucide-react';

export const WarmedLeadsQueue = ({ leads }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Flame size={18} className="text-orange-500" />
          Warmed Leads Queue
        </h3>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ready for Handoff</span>
      </div>
      
      <div className="divide-y divide-slate-100">
        {leads.map((lead) => (
          <div key={lead.id} className="p-4 hover:bg-slate-50 transition flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {lead.name[0]}
              </div>
              <div>
                <p className="font-bold text-slate-900">{lead.name}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-emerald-600">
                    Intent Score: {lead.intentScore}%
                  </span>
                  <span>•</span>
                  <span>Qualified via {lead.channel}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition flex items-center gap-2 shadow-lg shadow-blue-500/20">
                <PhoneCall size={14} /> Claim & Call
              </button>
              <ChevronRight size={18} className="text-slate-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
