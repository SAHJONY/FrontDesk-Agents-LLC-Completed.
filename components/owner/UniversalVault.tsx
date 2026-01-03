// components/owner/UniversalVault.tsx
'use client';

import React, { useState } from 'react';

export const UniversalVault = () => {
  const [secrets, setSecrets] = useState([{ key: '', value: '' }]);
  const [loading, setLoading] = useState(false);

  const addRow = () => setSecrets([...secrets, { key: '', value: '' }]);

  const updateSecret = (index: number, field: 'key' | 'value', val: string) => {
    const newSecrets = [...secrets];
    newSecrets[index][field] = val;
    setSecrets(newSecrets);
  };

  const syncAll = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/wholesale/sync-bulk-secrets', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ secrets })
      });
      if (response.ok) alert("Configuración global actualizada en Vercel y la plataforma.");
    } catch (error) {
      console.error("Error sincronizando secretos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Universal Secrets Vault</h2>
        <button onClick={addRow} className="text-amber-500 text-sm hover:underline">+ Añadir Servicio</button>
      </div>

      <div className="space-y-4">
        {secrets.map((s, i) => (
          <div key={i} className="flex gap-4">
            <input 
              placeholder="NOMBRE_DEL_API_KEY"
              className="flex-1 bg-slate-950 border border-slate-800 p-3 rounded-lg text-white font-mono text-sm"
              value={s.key}
              onChange={(e) => updateSecret(i, 'key', e.target.value)}
            />
            <input 
              type="password"
              placeholder="Valor secreto"
              className="flex-1 bg-slate-950 border border-slate-800 p-3 rounded-lg text-white text-sm"
              value={s.value}
              onChange={(e) => updateSecret(i, 'value', e.target.value)}
            />
          </div>
        ))}
      </div>

      <button 
        onClick={syncAll}
        disabled={loading}
        className="w-full mt-8 bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
      >
        {loading ? 'Sincronizando con Vercel...' : 'DESPLEGAR CAMBIOS GLOBALES'}
      </button>
    </div>
  );
};
