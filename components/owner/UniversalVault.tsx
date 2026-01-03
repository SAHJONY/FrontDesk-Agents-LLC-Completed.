'use client';

import React, { useState } from 'react';

const CRITICAL_KEYS = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE', 'VERCEL_AUTH_TOKEN', 'RESEND_API_KEY'];

export const UniversalVault = () => {
  const [secrets, setSecrets] = useState([{ key: '', value: '' }]);
  const [loading, setLoading] = useState(false);

  const updateSecret = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...secrets];
    updated[index][field] = val;
    setSecrets(updated);
  };

  const handleSync = async () => {
    const hasCritical = secrets.some(s => CRITICAL_KEYS.includes(s.key.toUpperCase()));
    
    if (hasCritical) {
      if (!window.confirm("¡ATENCIÓN! Estás modificando claves críticas que sostienen la plataforma. ¿Confirmas esta acción de nivel Owner?")) return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/wholesale/sync-bulk-secrets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secrets })
      });
      if (res.ok) alert("Sincronización y Notificación completadas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 p-8 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-amber-500 font-bold tracking-tighter text-xl uppercase">Universal Vault</h2>
        <button onClick={() => setSecrets([...secrets, { key: '', value: '' }])} className="text-slate-400 hover:text-white text-sm">+ Add Key</button>
      </div>
      <div className="space-y-3">
        {secrets.map((s, i) => (
          <div key={i} className="flex gap-3">
            <input 
              placeholder="SERVICE_KEY_NAME"
              className="bg-slate-900 border border-slate-800 p-3 rounded w-1/2 text-white font-mono text-xs"
              onChange={(e) => updateSecret(i, 'key', e.target.value)}
            />
            <input 
              type="password"
              placeholder="Value"
              className="bg-slate-900 border border-slate-800 p-3 rounded w-1/2 text-white text-xs"
              onChange={(e) => updateSecret(i, 'value', e.target.value)}
            />
          </div>
        ))}
      </div>
      <button 
        onClick={handleSync}
        disabled={loading}
        className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded transition-all disabled:opacity-50"
      >
        {loading ? 'DESPLEGANDO EN PDX1...' : 'SINCRONIZAR Y NOTIFICAR'}
      </button>
    </div>
  );
};
