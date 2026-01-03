'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export const AuditLog = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      // Consulta forense a la tabla de backups para monitorear el Vault
      const { data, error } = await supabase
        .from('secrets_backups')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);
      
      if (error) throw error;
      
      if (data) {
        setLogs(data);
        setLastUpdate(new Date());
      }
    } catch (err) {
      console.error("Error cargando logs de auditoría:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Carga inicial al montar el componente
    fetchLogs();

    // Ciclo de auto-actualización cada 30 segundos para soberanía en tiempo real
    const interval = setInterval(() => {
      fetchLogs();
    }, 30000);

    // Limpieza de memoria al desmontar para evitar fugas de datos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest px-2">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
          <span>Live Infrastructure Feed [pdx1]</span>
        </div>
        <span>Last Sync: {lastUpdate.toLocaleTimeString()}</span>
      </div>
      
      <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
        <table className="w-full text-left text-[11px] border-collapse">
          <thead className="text-slate-500 uppercase bg-white/5">
            <tr>
              <th className="p-4 font-bold tracking-tighter">Timestamp (UTC)</th>
              <th className="p-4 font-bold tracking-tighter">System Event</th>
              <th className="p-4 font-bold tracking-tighter text-right">Origin Node</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {loading ? (
              <tr>
                <td colSpan={3} className="p-10 text-center text-slate-600 animate-pulse font-mono uppercase tracking-widest">
                  Establishing Secure Connection...
                </td>
              </tr>
            ) : logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="border-b border-white/5 group hover:bg-cyan-500/[0.03] transition-colors">
                  <td className="p-4 font-mono text-cyan-400/80">
                    {new Date(log.created_at).toLocaleString('en-US', { hour12: false })}
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-white uppercase italic">Vault Sync:</span>
                    <span className="ml-2 text-slate-400">Backing up {Object.keys(log.backup_data || {}).length} variables</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[9px] font-mono text-slate-500 group-hover:text-white group-hover:border-cyan-500/30 transition-all">
                      SOVEREIGN-PDX1
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-10 text-center text-slate-600 italic">
                  No forensic records found in Portland node.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <p className="text-[9px] text-slate-600 italic px-2">
        * Cada registro incluye auditoría de IP y backup de infraestructura automática [cite: 2026-01-02].
      </p>
    </div>
  );
};
