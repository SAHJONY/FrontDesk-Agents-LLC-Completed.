'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export const AuditLog = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchLogs = async () => {
    const { data } = await supabase
      .from('secrets_backups')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(8);
    
    if (data) {
      setLogs(data);
      setLastUpdate(new Date());
    }
  };

  useEffect(() => {
    // Carga inicial
    fetchLogs();

    // Configurar el intervalo de auto-actualización (30 segundos)
    const interval = setInterval(() => {
      fetchLogs();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest">
        <span>Monitorización en Vivo</span>
        <span>Último Sync: {lastUpdate.toLocaleTimeString()}</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead className="text-slate-500 uppercase border-b border-white/5">
            <tr>
              <th className="pb-3 font-bold">Timestamp (UTC)</th>
              <th className="pb-3 font-bold">Evento</th>
              <th className="pb-3 font-bold text-right">Origen</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                <td className="py-4 font-mono text-cyan-400/70">
                  {new Date(log.created_at).toLocaleTimeString()}
                </td>
                <td className="py-4 font-bold">
                  Vault Sync: {Object.keys(log.backup_data || {}).length} llaves protegidas
                </td>
                <td className="py-4 text-right text-slate-500 group-hover:text-white transition-colors">
                  PDX-1-NODE
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={3} className="py-8 text-center text-slate-600 italic">
                  Esperando datos de la infraestructura...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
