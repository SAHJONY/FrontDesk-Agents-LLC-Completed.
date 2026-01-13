import React from 'react';
import { UserCheck, Flame, Zap, ArrowRightLeft } from 'lucide-react';

export const SalesEnhancementWidget = ({ warmedLeads = 12, totalAppointments = 8 }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Zap size={18} className="text-amber-500" />
          Sales Agent Enhancement
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
          <div className="flex items-center gap-2 text-orange-600 mb-1">
            <Flame size={16} />
            <span className="text-xs font-bold uppercase">Warmed Leads</span>
          </div>
          <p className="text-3xl font-black text-orange-700">{warmedLeads}</p>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <UserCheck size={16} />
            <span className="text-xs font-bold uppercase">Appts Booked</span>
          </div>
          <p className="text-3xl font-black text-blue-700">{totalAppointments}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500 flex items-center gap-2">
            <ArrowRightLeft size={14} /> AI-to-Human Handoffs
          </span>
          <span className="font-bold text-slate-900">94% Success</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full w-[94%]" />
        </div>
      </div>
    </div>
  );
};
