'use client';

import React, { useState, useEffect } from 'react';
import AnalyticsView from '@/components/dashboard/AnalyticsView'; // Importamos tu componente visual de Tremor

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/analytics');
        if (!response.ok) throw new Error('Error al cargar analíticas');
        
        const data = await response.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  // 1. Estado de carga con estilo
  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#020817]">
      <div className="text-cyan-400 animate-pulse font-medium">
        Cargando datos del Recepcionista IA...
      </div>
    </div>
  );

  // 2. Estado de error
  if (error) return (
    <div className="p-10 text-red-500 bg-[#020817] h-screen">
      Error: {error}
    </div>
  );

  // 3. Renderizado final
  return (
    <div className="min-h-screen bg-[#020817] p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Panel de Rendimiento</h1>
          <p className="text-gray-400">Resultados generados por tu IA basados en las llamadas reales.</p>
        </header>

        {/* Pasamos los datos calculados al componente de Tremor */}
        <AnalyticsView stats={stats} />
      </div>
    </div>
  );
}
