'use client';

import React from 'react';
import { ShieldAlert, Globe, XCircle, ZapOff } from 'lucide-react';

export default function AegisSecurityLog({ logs }: { logs: any[] }) {
  return (
    <div className="mt-12 space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <ShieldAlert className="text-red-500 w-5 h-5" />
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white">Aegis Interception Logs</h2>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/5 bg-black/40">
        <table className="w-full text-[10px] font-mono text-left">
          <thead className="bg-white/5 text-slate-500 uppercase">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Source IP</th>
              <th className="p-4">Market/Node</th>
              <th className="p-4">Violation Type</th>
              <th className="p-4 text-red-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 text-slate-400">{new Date(log.created_at).toLocaleString()}</td>
                <td className="p-4 font-bold">{log.ip_address}</td>
                <td className="p-4">
                  <span className="flex items-center gap-2">
                    <Globe className="w-3 h-3 text-cyan-500" /> {log.node_name}
                  </span>
                </td>
                <td className="p-4 italic text-slate-300">"{log.violation_snippet}..."</td>
                <td className="p-4 font-black">
                  <span className="flex items-center gap-1 text-red-500">
                    <ZapOff className="w-3 h-3" /> KILLED & BLOCKED
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
