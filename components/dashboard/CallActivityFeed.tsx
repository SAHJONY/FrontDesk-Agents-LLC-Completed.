"use client";

import React from 'react';
import { 
  PhoneIncoming, 
  PhoneOutgoing, 
  CheckCircle2, 
  Clock, 
  Gavel, 
  Activity,
  User
} from 'lucide-react';

/**
 * SOVEREIGN GLOBAL FINANCIAL HUB
 * Feed: Real-time Call Activity
 * Infrastructure: Portland, USA (West) [pdx1]
 * Verification: 1.0 Global Market Parity
 */

const activities = [
  {
    id: 1,
    type: 'incoming',
    contact: 'Global Registry Node',
    duration: '4m 32s',
    status: 'completed',
    timestamp: '2 mins ago',
    icon: PhoneIncoming,
    color: 'text-brand-cyan'
  },
  {
    id: 2,
    type: 'legal',
    contact: 'Parity Verification',
    duration: '12m 45s',
    status: 'in-progress',
    timestamp: '5 mins ago',
    icon: Gavel,
    color: 'text-zinc-400'
  }
];

export const CallActivityFeed = () => {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-cyan" />
          <h3 className="text-sm font-black uppercase tracking-widest text-white">
            Live Activity Feed
          </h3>
        </div>
        <div className="px-2 py-1 bg-brand-cyan/10 border border-brand-cyan/20 rounded text-[10px] font-bold text-brand-cyan uppercase">
          Node: PDX1
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/30 border border-white/5 group hover:border-brand-cyan/30 transition-all">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg bg-zinc-800 ${item.color}`}>
                <item.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{item.contact}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-zinc-500" />
                  <span className="text-[10px] text-zinc-500 font-medium">{item.timestamp}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono font-bold text-brand-cyan">{item.duration}</p>
              <div className="flex items-center gap-1 justify-end mt-1">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span className="text-[9px] font-black uppercase text-zinc-400 tracking-tighter">
                  Verified
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 border border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-brand-cyan hover:border-brand-cyan/40 transition-all italic">
        View Full System Logs
      </button>
    </div>
  );
};
