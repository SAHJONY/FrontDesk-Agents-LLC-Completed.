'use client';

import { useEffect, useState } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  UserPlusIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const proprietaryEvents = [
  { id: 1, type: 'SMS', label: 'Neural Text Uplink', desc: 'Concierge responded to lead in Houston', time: 'Just now' },
  { id: 2, type: 'SDR', label: 'Sales Swarm Active', desc: 'Outbound Node qualified high-intent prospect', time: '2m ago' },
  { id: 3, type: 'Email', label: 'Cognitive Inbox Relay', desc: 'Masked executive reply transmitted', time: '5m ago' },
  { id: 4, type: 'WhatsApp', label: 'Global Node Sync', desc: 'International query resolved (Spanish)', time: '12m ago' },
];

export default function LiveFeed() {
  return (
    <div className="bg-[#000d1a] border border-white/5 rounded-[40px] p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 bg-cyan-500 rounded-full animate-ping" />
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white italic">Omni-Channel Live Stream</h2>
        </div>
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active Nodes: 1,402</span>
      </div>

      <div className="space-y-6">
        {proprietaryEvents.map((event) => (
          <div key={event.id} className="flex items-start gap-5 group transition-all">
            <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-cyan-500/10 transition-colors">
              {event.type === 'SMS' && <ChatBubbleLeftRightIcon className="w-5 h-5 text-cyan-500" />}
              {event.type === 'SDR' && <UserPlusIcon className="w-5 h-5 text-emerald-500" />}
              {event.type === 'Email' && <EnvelopeIcon className="w-5 h-5 text-purple-500" />}
              {event.type === 'WhatsApp' && <ShieldCheckIcon className="w-5 h-5 text-amber-500" />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-black text-white uppercase tracking-wider">{event.label}</p>
                <span className="text-[9px] font-bold text-slate-600 uppercase">{event.time}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
