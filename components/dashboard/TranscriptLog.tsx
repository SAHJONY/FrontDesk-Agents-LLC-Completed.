'use client';

import React from 'react';
import { Badge, Text, Card } from '@tremor/react';
import { MessageSquare, Clock, User, Bot, ShieldCheck, Zap } from 'lucide-react';

export default function TranscriptLog() {
  const logData = [
    {
      id: "HTX-9921",
      timestamp: "02:14:05 AM",
      sentiment: "URGENT",
      caller: "+1 (713) 555-0192",
      messages: [
        { role: 'caller', text: "Hello? My water heater just exploded, there's water everywhere in the garage!" },
        { role: 'ai', text: "I understand this is an emergency. I am looking at the schedule for our lead technician, Marcus. I can have him at your location in Pearland within 45 minutes. Shall I secure that slot for you?" },
        { role: 'caller', text: "Yes, please! Does he take credit cards?" },
        { role: 'ai', text: "Yes, Marcus is equipped for all mobile payments. I have locked in your dispatch. Marcus is being notified now. Please locate your main water shut-off valve if it is safe to do so." }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-cyan-500 w-6 h-6" />
          <h3 className="text-xl font-black uppercase italic tracking-tighter">Forensic <span className="text-cyan-500">Audio Synthesis</span></h3>
        </div>
        <Badge color="red" icon={Zap} className="animate-pulse bg-red-500/10 text-red-500 border-none">Live Surge Event</Badge>
      </div>

      {logData.map((log) => (
        <Card key={log.id} className="bg-black/40 border-white/5 ring-0 rounded-[32px] overflow-hidden p-0">
          {/* LOG HEADER */}
          <div className="bg-white/5 p-6 border-b border-white/5 flex justify-between items-center">
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Incident ID</span>
                <span className="text-xs font-mono text-cyan-500">{log.id}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Origin</span>
                <span className="text-xs font-bold uppercase">{log.caller}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[8px] font-black text-red-500 uppercase tracking-widest block">Sentiment Analysis</span>
              <span className="text-xs font-black italic">{log.sentiment}</span>
            </div>
          </div>

          {/* CHAT INTERFACE */}
          <div className="p-8 space-y-6 max-h-[400px] overflow-y-auto scrollbar-hide">
            {log.messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 ${msg.role === 'ai' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white'}`}>
                  {msg.role === 'ai' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-medium leading-relaxed ${msg.role === 'ai' ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-50 mist-700' : 'bg-white/5 border border-white/10 text-slate-300'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* LOG FOOTER */}
          <div className="p-4 bg-green-500/5 border-t border-white/5 flex items-center justify-center gap-2">
             <ShieldCheck className="w-3 h-3 text-green-500" />
             <span className="text-[8px] font-black text-green-500 uppercase tracking-[0.2em]">Transaction Verified: Booking Injected to Jobber</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
