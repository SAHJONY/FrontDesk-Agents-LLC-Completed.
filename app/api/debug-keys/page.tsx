'use client';
import { useState } from 'react';

export default function DebugKeysPage() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkAPIs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/debug-check');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setResults({ error: "No se pudo conectar con la API de diagnóstico" });
    }
    setLoading(false);
  };

  return (
    <div className="p-10 bg-slate-900 min-h-screen text-white font-mono">
      <h1 className="text-2xl mb-6">🛠 Diagnóstico de FrontDesk Agents</h1>
      
      <button 
        onClick={checkAPIs}
        disabled={loading}
        className="bg-cyan-600 px-6 py-2 rounded-md hover:bg-cyan-500 disabled:opacity-50"
      >
        {loading ? "Verificando..." : "Ejecutar Prueba de Llaves"}
      </button>

      {results && (
        <div className="mt-10 space-y-4">
          <div className={`p-4 rounded ${results.openai ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
            OpenAI: {results.openai ? "✅ Funciona" : "❌ Error o falta llave"}
          </div>
          <div className={`p-4 rounded ${results.firecrawl ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
            Firecrawl: {results.firecrawl ? "✅ Funciona" : "❌ Error o falta llave"}
          </div>
          <div className="p-4 rounded bg-blue-900/30">
            Variables Twilio: {results.twilio ? "✅ Detectadas" : "❌ Ausentes"}
          </div>
        </div>
      )}
    </div>
  );
}
