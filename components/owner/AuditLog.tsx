'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export const AuditLog = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      // Monitoreo de actividad del Vault y sincronización de infraestructura
      const { data, error: supabaseError } = await supabase
        .from('secrets_backups')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);
      
      if (supabaseError) throw supabaseError;
      
      if (data) {
        setLogs(data);
        setLastUpdate(new Date());
      }
    } catch (err: any) {
      console.error("Error en Auditoría:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Solo ejecutamos la lógica en el cliente para no bloquear el Build de Vercel
    fetchLogs();

    // Auto-refresh cada 30 segundos para mantener soberanía informativa
    const interval = setInterval(fetchLogs, 30000);

    // Limpieza al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-xl text-red-500 text-xs font-mono">
        ⚠️ ERROR DE CONEXIÓN: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header de Estado Live */}
      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest px-2">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
          <span>Live Infrastructure Feed [pdx1]</span>
        </div>
        <span>Sync: {lastUpdate.toLocaleTimeString()}</span>
      </div>
      
      {/* Tabla de Registros Forenses */}
      <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md">
        <table className="w-full text-left text-[11px] border-collapse">
          <thead className="text-slate-500 uppercase bg-white/5">
            <tr>
              <th className="p-4 font-bold tracking-tighter border-b border-white/5">Timestamp (UTC)</th>
              <th className="p-4 font-bold tracking-tighter border-b border-white/5">System Event</th>
              <th className="p-4 font-bold tracking-tighter border-b border-white/5 text-right">Origin</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {loading ? (
              <tr>
                <td colSpan={3} className="p-12 text-center text-slate-600 animate-pulse font-mono uppercase tracking-widest text-[9px]">
                  Encrypting Connection to Portland Node...
                </td>
              </tr>
            ) : logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="border-b border-white/5 group hover:bg-cyan-500/[0.03] transition-colors">
                  <td className="p-4 font-mono text-cyan-400/80">
                    {new Date(log.created_at).toLocaleString('en-US', { hour12: false })}
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-white uppercase italic tracking-tighter">Vault Sync</span>
                    <span className="ml-2 text-slate-500">
                      Protected {Object.keys(log.backup_data || {}).length} variables
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[9px] font-mono text-slate-600 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all">
                      SOVEREIGN-NODE
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-12 text-center text-slate-600 italic border-b border-white/5">
                  No forensic records found. Awaiting system activity.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer Legal/Técnico */}
      <div className="flex justify-between items-center px-2">
        <p className="text-[9px] text-slate-600 italic">
          * Auditoría de IP automática activa para todos los niveles de tiers [cite: 2026-01-02].
        </p>
        <div className="flex gap-2">
          <div className="h-1 w-1 bg-cyan-500/20 rounded-full"></div>
          <div className="h-1 w-1 bg-cyan-500/40 rounded-full"></div>
          <div className="h-1 w-1 bg-cyan-500/60 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
