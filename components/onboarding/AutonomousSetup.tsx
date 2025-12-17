// components/onboarding/AutonomousSetup.tsx
'use client';

import React, { useState } from 'react';

export default function AutonomousSetup() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'crawling' | 'synthesizing' | 'completed'>('idle');

  const startSetup = async () => {
    setStatus('crawling');
    try {
      const res = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      setStatus('synthesizing');
      const result = await res.json();
      
      if (result.success) {
        setStatus('completed');
        // Redirigir al dashboard después de 2 segundos
      }
    } catch (error) {
      alert("Hubo un error en la configuración autónoma");
      setStatus('idle');
    }
  };

  return (
    <div className="p-8 bg-[#0a1929] border border-white/10 rounded-2xl max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Configuración Autónoma</h2>
      <p className="text-gray-400 mb-6">Introduce tu sitio web y nuestra IA configurará tu recepcionista en segundos.</p>
      
      <div className="flex gap-2 mb-8">
        <input 
          type="url" 
          placeholder="https://tu-negocio.com"
          className="flex-1 bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button 
          onClick={startSetup}
          disabled={status !== 'idle'}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-bold transition-all disabled:opacity-50"
        >
          {status === 'idle' ? 'Iniciar Magia' : 'Procesando...'}
        </button>
      </div>

      {status !== 'idle' && (
        <div className="space-y-4">
          <Step label="Rastreando sitio web (Firecrawl)" isActive={status === 'crawling'} isDone={status !== 'crawling'} />
          <Step label="Analizando especificaciones (GPT-4o)" isActive={status === 'synthesizing'} isDone={status === 'completed'} />
          <Step label="Configurando Recepcionista IA" isActive={status === 'completed'} isDone={status === 'completed'} />
        </div>
      )}
    </div>
  );
}

function Step({ label, isActive, isDone }: { label: string, isActive: boolean, isDone: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${isActive ? 'text-cyan-400' : isDone ? 'text-green-500' : 'text-gray-600'}`}>
      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-cyan-400 animate-pulse' : isDone ? 'bg-green-500' : 'bg-gray-600'}`} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
                                            }
