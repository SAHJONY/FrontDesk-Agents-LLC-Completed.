'use client';

import { motion } from "framer-motion";
import { PhoneIncoming, PhoneOutgoing, Clock, MessageSquare, Play } from "lucide-react";

interface CallLog {
  id: string;
  from: string;
  duration: string;
  status: 'completed' | 'missed' | 'failed';
  timestamp: string;
  summary: string;
}

export function CallLogTable({ calls }: { calls: CallLog[] }) {
  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/20 overflow-hidden">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/40">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Registro de Actividad Reciente
        </h3>
        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest bg-sky-500/10 px-2 py-1 rounded">
          Live Sync
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[9px] font-black uppercase tracking-widest text-slate-600 border-b border-slate-800">
              <th className="px-6 py-4">Origen</th>
              <th className="px-6 py-4">Duración</th>
              <th className="px-6 py-4">Resultado</th>
              <th className="px-6 py-4">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {calls.map((call) => (
              <motion.tr 
                key={call.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-white/[0.02] transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-sky-400">
                      <PhoneIncoming size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-200">{call.from}</p>
                      <p className="text-[9px] text-slate-500 uppercase tracking-tighter">{call.timestamp}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock size={12} />
                    <span className="text-xs font-mono">{call.duration}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${
                    call.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {call.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors">
                    <MessageSquare size={14} />
                    Ver Transcripción
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
