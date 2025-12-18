'use client';

import { useState, useEffect } from 'react';
import { Card, Title, Text, Flex, Badge, ProgressBar, Grid, Metric } from '@tremor/react';
import { supabase } from '@/lib/supabase-client';

export default function DashboardPage() {
  const [usedMinutes, setUsedMinutes] = useState(0);
  const [loading, setLoading] = useState(true);
  const totalMinutes = 1000; // Tu oferta de Fundadores (500 + 500)

  useEffect(() => {
    async function fetchUsage() {
      // 1. Obtener la sesión del usuario actual
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // 2. Sumar la duración de todas sus llamadas en la tabla 'CallLog'
        const { data: calls, error } = await supabase
          .from('CallLog')
          .select('duration')
          .eq('user_id', user.id);

        if (!error && calls) {
          // Calculamos el total (asumiendo que duration está en segundos)
          const totalSeconds = calls.reduce((acc, call) => acc + (call.duration || 0), 0);
          setUsedMinutes(Math.ceil(totalSeconds / 60)); // Convertir a minutos
        }
      }
      setLoading(false);
    }

    fetchUsage();
  }, []);

  // Calcular el porcentaje para la barra
  const percentage = Math.min((usedMinutes / totalMinutes) * 100, 100);

  return (
    <main className="p-8 bg-[#000814] min-h-screen text-white">
      <Title className="text-white mb-6">Panel de Control - Sahjony LLC</Title>

      <Grid numItemsMd={1} numItemsLg={3} className="gap-6">
        
        {/* LA BARRA DE PROGRESO REAL */}
        <Card className="bg-slate-900 border-cyan-500/50 lg:col-span-2">
          <Flex items="start">
            <div>
              <Text className="text-slate-400 uppercase text-xs font-bold tracking-widest">Estado de tu Cuenta</Text>
              <Title className="text-white">Plan Founding Member</Title>
            </div>
            <Badge color="cyan">BONO ACTIVO</Badge>
          </Flex>
          
          <div className="mt-6">
            <Flex>
              <Text className="text-cyan-400 font-bold">
                {loading ? 'Calculando...' : `${usedMinutes} de ${totalMinutes} minutos usados`}
              </Text>
              <Text className="text-slate-500">
                {totalMinutes - usedMinutes} min restantes
              </Text>
            </Flex>
            
            <ProgressBar value={percentage} color="cyan" className="mt-2" />
            
            <Text className="text-xs text-slate-400 mt-2 italic">
              *Tu beneficio de 500 minutos extra es vitalicio mientras mantengas tu suscripción activa.
            </Text>
          </div>
        </Card>

        {/* METRICA RAPIDA */}
        <Card className="bg-slate-900 border-slate-800">
           <Text className="text-slate-400">Estado de Agentes</Text>
           <div className="mt-2 flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <Metric className="text-white text-2xl">SARA & ALEX LIVE</Metric>
           </div>
           <Text className="text-xs text-slate-500 mt-4">Protegido por Sahjonyllc@outlook.com</Text>
        </Card>

      </Grid>
    </main>
  );
}
