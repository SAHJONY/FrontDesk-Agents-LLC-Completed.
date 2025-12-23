'use client';

import React from 'react';
import { calculateLeadScore } from '@/lib/core/lead-scorer';
import { getProprietaryName } from '@/lib/core/brand-mask';

// 1. Define the exact shape expected by the calculateLeadScore function
interface LeadSignals {
  sentiment: "Hot 🔥" | "Warm" | "Cold";
  channelCount: number;
  interactionDuration: number;
}

interface Lead {
  id: string;
  name: string;
  source: string;
  signals: LeadSignals; // Updated from the generic index signature
}

interface PriorityQueueProps {
  leads: Lead[];
}

export default function PriorityQueue({ leads }: PriorityQueueProps) {
  return (
    <div className="bg-[#000d1a] border border-white/5 rounded-[45px] overflow-hidden shadow-2xl">
      <div className="px-10 py-8 bg-white/[0.02] border-b border-white/5 flex justify-between items-center">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white italic">Neural Priority Queue</h2>
        <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 text-[8px] font-black rounded-full uppercase">Top 10 High-Value Targets</span>
      </div>
      
      <table className="w-full text-left">
        <tbody className="divide-y divide-white/5">
          {leads.map((lead) => {
            // TypeScript now correctly maps lead.signals to the function parameters
            const { score, priority } = calculateLeadScore(lead.signals);
            return (
              <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors group">
                <td className="px-10 py-6">
                  <div className="font-black text-white uppercase italic text-sm">{lead.name}</div>
                  <div className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-1">
                    Via: {getProprietaryName(lead.source)}
                  </div>
                </td>
                <td className="px-10 py-6 text-right">
                  <div className={`text-[10px] font-black italic tracking-widest ${
                    priority === 'CRITICAL' ? 'text-red-500' : 'text-cyan-500'
                  }`}>
                    {priority} [SCORE: {score}]
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
