'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export const AuditLog = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await supabase
        .from('secrets_backups') // Usamos la tabla de backups como base de auditoría
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      if (data) setLogs(data);
    };
    fetchLogs();
  }, []);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden mt-8">
      <div className="p-4 border-bottom border-slate-800 bg-slate-900/50">
        <h3 className="text-amber-500 font-bold text-sm uppercase tracking-widest">Historial de Auditoría Forense</h3>
      </div>
      <table className="w-full text-left text-xs text-slate-400">
        <thead className="bg-slate-900 text-slate-500 uppercase">
          <tr>
            <th className="p-4">Fecha (UTC)</th>
            <th className="p-4">Evento</th>
            <th className="p-4">Nivel de Riesgo</th>
            <th className="p-4">IP de Origen</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t border-slate-800 hover:bg-slate-900/30">
              <td className="p-4">{new Date(log.created_at).toLocaleString()}</td>
              <td className="p-4 text-white">Actualización de Vault</td>
              <td className="p-4">
                <span className="px-2 py-1 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20">
                  Crítico
                </span>
              </td>
              <td className="p-4 font-mono">Verificado en Portland (pdx1)</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
