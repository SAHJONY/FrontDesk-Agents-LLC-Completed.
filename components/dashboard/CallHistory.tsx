'use client';

import React, { useState } from 'react';
import { 
  FileText, Calendar, Clock, PhoneIncoming, 
  ChevronRight, BadgeCheck, MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { TranscriptModal } from './TranscriptModal';

interface CallLog {
  id: string;
  timestamp: string;
  phoneNumber: string;
  duration: string;
  status: 'completed' | 'transferred' | 'missed';
  outcome: string;
}

// Simulated forensic data for the global 2025 market
const SAMPLE_LOGS: CallLog[] = [
  { id: 'c_123', timestamp: '2025-12-24 14:30', phoneNumber: '+1 (555) 012-3456', duration: '2:45', status: 'completed', outcome: 'Appointment Booked' },
  { id: 'c_456', timestamp: '2025-12-24 12:15', phoneNumber: '+1 (555) 987-6543', duration: '1:12', status: 'transferred', outcome: 'Transferred to Admin' },
  { id: 'c_789', timestamp: '2025-12-23 09:45', phoneNumber: '+1 (555) 444-5555', duration: '0:45', status: 'missed', outcome: 'Voicemail Left' },
];

export const CallHistory = () => {
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);

  return (
    <div className="bg-[#050505] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
      {/* HEADER: TELEMETRY CONTROL */}
      <div className="p-8 border-b border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black uppercase italic tracking-tighter text-white flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-500" />
            Neural Audit Logs
          </h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Forensic Interaction History • 2025 Protocol</p>
        </div>
        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-300 flex items-center gap-2 transition-all">
          Generate PDF Report <FileText className="w-3 h-3 text-cyan-500" />
        </button>
      </div>

      {/* FORENSIC TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-white/5 bg-white/[0.01]">
              <th className="p-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Node Timestamp</th>
              <th className="p-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Linguistic Origin</th>
              <th className="p-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Telemetry</th>
              <th className="p-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Neural Outcome</th>
              <th className="p-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {SAMPLE_LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-cyan-500/[0.02] transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-[11px] font-bold text-slate-300 font-mono">{log.timestamp}</span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <PhoneIncoming className="w-4 h-4 text-cyan-500/50 group-hover:text-cyan-500 transition-colors" />
                    <span className="text-[11px] font-black text-white tracking-tight">{log.phoneNumber}</span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-3 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-[10px] font-mono tracking-tighter">{log.duration}</span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    {log.status === 'completed' && <BadgeCheck className="w-4 h-4 text-emerald-500" />}
                    {log.status === 'transferred' && <MessageSquare className="w-4 h-4 text-cyan-500" />}
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      log.status === 'completed' ? 'text-emerald-500' : 'text-slate-400'
                    }`}>
                      {log.outcome}
                    </span>
                  </div>
                </td>
                <td className="p-6 text-right">
                  <button 
                    onClick={() => setSelectedCall(log)}
                    className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TRANSCRIPT MODAL INTEGRATION */}
      {selectedCall && (
        <TranscriptModal 
          isOpen={!!selectedCall}
          onClose={() => setSelectedCall(null)}
          callId={selectedCall.id}
          phoneNumber={selectedCall.phoneNumber}
          // The transcript would be dynamically pulled from the DB in a real scenario
          transcript={[
            { role: 'assistant', content: 'Greeting protocols active. Thank you for calling. I am SARA, your AI coordinator. How may I assist?' },
            { role: 'user', content: 'Hi, I need to schedule a surgery follow-up for next Tuesday at 3 PM.' },
            { role: 'assistant', content: 'Analyzing availability... Tuesday at 15:00 is currently clear. Shall I finalize this booking in the system?' }
          ]}
        />
      )}
    </div>
  );
};
