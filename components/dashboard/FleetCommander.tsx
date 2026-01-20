'use client';

import React from 'react';
import { PhoneIncoming, DollarSign, Clock, Zap, ArrowUpRight } from 'lucide-react';

/**
 * FLEET COMMANDER: REAL-TIME REVENUE TRACKING
 * Integrated with Section 3 Performance Royalties
 */

const mockLeads = [
  {
    id: '1',
    contact: '+1 (555) 012-3456',
    intent: 'High - Booking Scheduled',
    duration: '4.2m',
    cost: '$1.89',
    revenue: '$450.00',
    royalty: '$13.50',
    time: '2 mins ago'
  },
  {
    id: '2',
    contact: '+1 (555) 987-6543',
    intent: 'Medium - Follow-up Required',
    duration: '2.8m',
    cost: '$1.26',
    revenue: '$0.00',
    royalty: '$0.00',
    time: '14 mins ago'
  }
];

export const FleetCommander = () => {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/20">
        <div>
          <h3 className="text-xs font-black text-cyan-500 uppercase tracking-[0.3em] mb-1">
            Fleet Commander
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono uppercase">
            Live Traffic // Global Node PDX1
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[9px] font-bold text-zinc-600 uppercase">Avg. Conv. Rate</p>
            <p className="text-sm font-black text-emerald-400 italic">28.4%</p>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-900">
              <th className="p-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest">Inbound Source</th>
              <th className="p-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest">AI Intent Score</th>
              <th className="p-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest text-center">Duration/Cost</th>
              <th className="p-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest text-right">Revenue Recovered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/50">
            {mockLeads.map((lead) => (
              <tr key={lead.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-cyan-500/10 transition-colors">
                      <PhoneIncoming className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white tracking-tighter">{lead.contact}</p>
                      <p className="text-[9px] text-zinc-600 uppercase font-medium">{lead.time}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter ${
                    lead.intent.includes('High') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {lead.intent}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-[10px] text-zinc-300 font-mono">
                      <Clock className="w-3 h-3 text-zinc-600" /> {lead.duration}
                    </div>
                    <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                      Node Cost: {lead.cost}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-sm font-black text-white italic">
                      <Zap className="w-3 h-3 text-cyan-400" /> {lead.revenue}
                    </div>
                    {parseFloat(lead.royalty.replace('$', '')) > 0 && (
                      <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-tighter">
                        Royalty: {lead.royalty} (Sec. 3)
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / ROI Summary */}
      <div className="p-4 bg-zinc-900/40 border-t border-zinc-900 flex justify-between items-center">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Total Recovery: $24,450.00</span>
          </div>
        </div>
        <button className="flex items-center gap-2 text-[9px] font-black text-cyan-500 uppercase tracking-widest hover:text-white transition-colors">
          Export Sovereign Audit <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
