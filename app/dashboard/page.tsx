'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { Card, Grid, Title, Text, Metric, Badge, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from '@tremor/react';

export default function MainDashboard() {
  const [calls, setCalls] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, bookings: 0, revenue: 0 });

  useEffect(() => {
    // 1. Carga inicial de datos
    fetchDashboardData();

    // 2. ESCUCHA EN TIEMPO REAL: Si se inserta una llamada nueva, actualiza la lista
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'CallLog' }, (payload) => {
        setCalls((prev) => [payload.new, ...prev]);
        fetchDashboardData(); // Recalcular métricas
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function fetchDashboardData() {
    const { data: callData } = await supabase
      .from('CallLog')
      .select('*')
      .order('createdAt', { ascending: false });

    if (callData) {
      setCalls(callData);
      const bookings = callData.filter(c => c.wasBooked).length;
      setStats({
        total: callData.length,
        bookings: bookings,
        revenue: bookings * 100 // Asumiendo $100 por cita ganada
      });
    }
  }

  return (
    <main className="p-10 bg-slate-950 min-h-screen text-white">
      <div className="flex justify-between items-center mb-10">
        <Title className="text-white text-3xl font-bold">Panel de Control en Vivo</Title>
        <Badge color="emerald">Conectado a Supabase</Badge>
      </div>

      <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mb-10">
        <Card className="bg-slate-900 border-slate-800">
          <Text className="text-slate-400">Llamadas Totales</Text>
          <Metric className="text-white">{stats.total}</Metric>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <Text className="text-slate-400">Citas Cerradas</Text>
          <Metric className="text-emerald-400">{stats.bookings}</Metric>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <Text className="text-slate-400">ROI Estimado</Text>
          <Metric className="text-amber-400">${stats.revenue}</Metric>
        </Card>
      </Grid>

      <Card className="bg-slate-900 border-slate-800">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="text-slate-400">Teléfono</TableHeaderCell>
              <TableHeaderCell className="text-slate-400">Resultado</TableHeaderCell>
              <TableHeaderCell className="text-slate-400">Resumen IA</TableHeaderCell>
              <TableHeaderCell className="text-slate-400">Fecha</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {calls.map((call) => (
              <TableRow key={call.id} className="border-slate-800">
                <TableCell className="text-white font-mono">{call.customerPhone}</TableCell>
                <TableCell>
                  <Badge color={call.wasBooked ? "emerald" : "gray"}>
                    {call.wasBooked ? "CITA AGENDADA" : "CONSULTA"}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-300 max-w-md italic text-sm">
                  "{call.summary}"
                </TableCell>
                <TableCell className="text-slate-500">
                  {new Date(call.createdAt).toLocaleTimeString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </main>
  );
}
