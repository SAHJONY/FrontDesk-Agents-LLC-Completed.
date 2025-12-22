'use client';

import React from 'react';

interface AuditEntry {
  id: string;
  timestamp: string;
  agent: string;
  decision: string;
  status: 'approved' | 'rejected' | 'pending';
  resolvedBy: string;
}

export const AuditLog = ({ logs }: { logs: AuditEntry[] }) => {
  return (
    <div className="w-full bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
        <h3 className="text-lg font-bold text-white">Intervention Audit Log</h3>
        <p className="text-xs text-zinc-500">Historical record of all Human-in-the-Loop escalations.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-900/30 text-zinc-500 uppercase text-[10px] tracking-widest">
            <tr>
              <th className="px-6 py-3 font-medium">Timestamp</th>
              <th className="px-6 py-3 font-medium">Agent</th>
              <th className="px-6 py-3 font-medium">Decision Context</th>
              <th className="px-6 py-3 font-medium">Outcome</th>
              <th className="px-6 py-3 font-medium">Resolved By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-zinc-900/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-mono text-xs">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs border border-blue-500/20">
                    {log.agent}
                  </td>
                <td className="px-6 py-4 max-w-xs truncate">
                  {log.decision}
                </td>
                <td className="px-6 py-4">
                  <span className={`font-bold ${
                    log.status === 'approved' ? 'text-emerald-500' : 
                    log.status === 'rejected' ? 'text-red-500' : 'text-amber-500'
                  }`}>
                    {log.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-300">
                  {log.resolvedBy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
            
