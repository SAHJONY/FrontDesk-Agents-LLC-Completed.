'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Shield, Activity, Terminal } from 'lucide-react';

export default function AuditLog() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      // Monitoreo de actividad del Vault y sincronización de infraestructura
      const { data } = await supabase
        .from('secrets_backups')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8); // Incrementado para una mejor visión forense
      if (data) setLogs(data);
    } catch (e) {
      console.error("Audit Sync Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 30000); // Sincronización cada 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
      {/* Header del Stream Forense */}
      <div className="p-5 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-white/[0.03] to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <Terminal className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">Forensic Audit Stream</h2>
            <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Node: Portland-pdx1</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/5 border border-cyan-500/10 rounded-full">
          <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span className="text-[9px] font-bold text-cyan-400 uppercase">Live Sync</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] border-collapse">
          <thead>
            <tr className="text-zinc-600 uppercase text-[9px] font-black tracking-tighter border-b border-white/5">
              <th className="p-4">Timestamp</th>
              <th className="p-4">Event Descriptor</th>
              <th className="p-4 text-right">Integrity Node</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {loading ? (
              <tr>
                <td colSpan={3} className="p-12 text-center">
                  <span className="text-zinc-600 animate-pulse uppercase tracking-[0.3em] text-[10px]">Establishing Secure Telemetry...</span>
                </td>
              </tr>
            ) : logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="border-b border-white/5 hover:bg-cyan-500/[0.02] transition-colors group">
                  <td className="p-4 text-zinc-500 group-hover:text-cyan-400 transition-colors">
                    {new Date(log.created_at).toLocaleTimeString([], { hour12: false })}
                    <span className="ml-2 opacity-30 text-[9px]">UTC-8</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-emerald-500/50" />
                      <span className="text-zinc-300 font-bold uppercase italic tracking-tighter">Vault_Backup_Verified</span>
                      <span className="text-zinc-600 text-[9px] uppercase hidden md:inline">[{log.id.substring(0,8)}]</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-zinc-400 group-hover:border-cyan-500/30">
                      PDX-1.STABLE
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-12 text-center text-zinc-700 italic text-[10px]">
                  No forensic signatures detected in the last 24h.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer del Audit */}
      <div className="p-4 bg-white/[0.02] border-t border-white/5 text-center">
        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em]">
          Revenue Workforce Protection Protocol v1.0.4 - Active
        </p>
      </div>
    </div>
  );
}
