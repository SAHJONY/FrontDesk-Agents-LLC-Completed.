'use client';

import React from 'react';
import { 
  FileText, Calendar, Clock, PhoneIncoming, 
  ChevronRight, BadgeCheck, MessageSquare 
} from 'lucide-react';

interface CallLog {
  id: string;
  timestamp: string;
  phoneNumber: string;
  duration: string;
  status: 'completed' | 'transferred' | 'missed';
  outcome: string;
}

// Dummy data for visual representation
const SAMPLE_LOGS: CallLog[] = [
  { id: '1', timestamp: '2025-12-24 14:30', phoneNumber: '+1 (555) 012-3456', duration: '2:45', status: 'completed', outcome: 'Appointment Booked' },
  { id: '2', timestamp: '2025-12-24 12:15', phoneNumber: '+1 (555) 987-6543', duration: '1:12', status: 'transferred', outcome: 'Transferred to Admin' },
  { id: '3', timestamp: '2025-12-23 09:45', phoneNumber: '+1 (555) 444-5555', duration: '0:45', status: 'missed', outcome: 'Voicemail Left' },
];

export const CallHistory = () => {
  return (
    <div className="bg-[#050505] border border-white/5 rounded-[32px] overflow-hidden">
      <div className="p-8 border-b border-white/5 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">Call Logs</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Forensic Activity Audit</p>
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest text-cyan-500 flex items-center gap-2 hover:opacity-70">
          Export Data <FileText className="w-3 h-3" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-white/5 bg-white/[0.01]">
              <th className="p-6 text-[9px] font-black uppercase tracking-widest text-slate-500">Timestamp</th>
              <th className="p-6 text-[9px] font-black uppercase tracking-widest text-slate-500">Lead Contact</th>
              <th className="p-6 text-[9px] font-black uppercase tracking-widest text-slate-500">Duration</th>
              <th className="p-6 text-[9px] font-black uppercase tracking-widest text-slate-500">Neural Outcome</th>
              <th className="p-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {SAMPLE_LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-slate-600" />
                    <span className="text-[11px] font-bold text-slate-300">{log.timestamp}</span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <PhoneIncoming className="w-4 h-4 text-cyan-500" />
                    <span className="text-[11px] font-black text-white">{log.phoneNumber}</span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-3 text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px] font-mono">{log.duration}</span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    {log.status === 'completed' && <BadgeCheck className="w-4 h-4 text-green-500" />}
                    {log.status === 'transferred' && <MessageSquare className="w-4 h-4 text-cyan-500" />}
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      log.status === 'completed' ? 'text-green-500' : 'text-slate-400'
                    }`}>
                      {log.outcome}
                    </span>
                  </div>
                </td>
                <td className="p-6 text-right">
                  <button className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
