import React from 'react';
// Corrected: Removed unused 'MessageSquare' to satisfy strict production build
import { Flame, PhoneCall, ChevronRight } from 'lucide-react';

export const WarmedLeadsQueue = ({ leads }: { leads: any[] }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b bg-orange-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-600" />
          <h2 className="font-bold text-gray-900">Live Warmed Leads</h2>
        </div>
        <span className="text-xs font-bold text-orange-700 bg-orange-200 px-2 py-1 rounded-full">
          {leads?.length || 0} Ready
        </span>
      </div>
      
      <div className="divide-y">
        {leads && leads.length > 0 ? (
          leads.map((lead, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <PhoneCall className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{lead.customer_name || 'Anonymous'}</p>
                  <p className="text-xs text-gray-500">{lead.intent_summary || 'Interested in Elite Plan'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-bold text-green-600">{lead.intent_score}/100</p>
                  <p className="text-[10px] text-gray-400">Score</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-400 text-sm">
            Waiting for high-intent traffic...
          </div>
        )}
      </div>
    </div>
  );
};
