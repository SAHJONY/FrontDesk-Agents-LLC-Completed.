import React, { useState } from 'react';

export const SecretsManager = () => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const syncSecret = async () => {
    const res = await fetch('/api/wholesale/sync-secrets', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      },
      body: JSON.stringify({ key, value })
    });

    if (res.ok) alert(`Secret ${key} synced to Vercel and Platform.`);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mt-6">
      <h3 className="text-amber-500 font-bold mb-4 uppercase text-xs tracking-widest">Global Secrets Vault</h3>
      <div className="flex gap-2">
        <input 
          placeholder="VARIABLE_NAME" 
          className="bg-slate-800 border border-slate-700 p-2 rounded text-white w-full"
          onChange={(e) => setKey(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Value" 
          className="bg-slate-800 border border-slate-700 p-2 rounded text-white w-full"
          onChange={(e) => setValue(e.target.value)}
        />
        <button 
          onClick={syncSecret}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded font-bold transition-all"
        >
          Sync
        </button>
      </div>
    </div>
  );
};
