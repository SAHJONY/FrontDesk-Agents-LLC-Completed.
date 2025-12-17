'use client';
import { Card, Grid, Title, Text, Metric, TabGroup, TabList, Tab, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from '@tremor/react';
import { useEffect, useState } from 'react';

export default function MainDashboard() {
  const [stats, setStats] = useState({ calls: 0, bookings: 0, revenue: 0 });
  const [calls, setCalls] = useState([]);

  // Aquí conectaríamos con Supabase para traer la data real
  return (
    <main className="p-10 bg-slate-950 min-h-screen">
      <Title className="text-white text-3xl font-bold mb-8">Panel de FrontDesk Agents</Title>

      {/* 1. MÉTRICAS DE IMPACTO */}
      <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
        <Card className="bg-slate-900 border-slate-800" decoration="top" decorationColor="blue">
          <Text className="text-slate-400">Total de Llamadas Atendidas</Text>
          <Metric className="text-white">{stats.calls}</Metric>
        </Card>
        <Card className="bg-slate-900 border-slate-800" decoration="top" decorationColor="emerald">
          <Text className="text-slate-400">Citas Agendadas por IA</Text>
          <Metric className="text-white">{stats.bookings}</Metric>
        </Card>
        <Card className="bg-slate-900 border-slate-800" decoration="top" decorationColor="amber">
          <Text className="text-slate-400">Ingresos Estimados (ROI)</Text>
          <Metric className="text-white">${stats.revenue}</Metric>
        </Card>
      </Grid>

      {/* 2. REGISTRO RECIENTE DE LLAMADAS */}
      <div className="mt-10">
        <Card className="bg-slate-900 border-slate-800">
          <Title className="text-white">Registro de Actividad Reciente</Title>
          <Table className="mt-5">
            <TableHead>
              <TableRow className="border-slate-800">
                <TableHeaderCell className="text-slate-400">Cliente</TableHeaderCell>
                <TableHeaderCell className="text-slate-400">Resultado</TableHeaderCell>
                <TableHeaderCell className="text-slate-400">Resumen de la IA</TableHeaderCell>
                <TableHeaderCell className="text-slate-400">Sentimiento</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calls.map((item: any) => (
                <TableRow key={item.id} className="border-slate-800">
                  <TableCell className="text-white">{item.customerPhone}</TableCell>
                  <TableCell>
                    <Badge color={item.wasBooked ? "emerald" : "slate"}>
                      {item.wasBooked ? "Cita Cerrada" : "Consulta"}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-slate-300">
                    {item.summary}
                  </TableCell>
                  <TableCell>
                     <Badge color={item.sentiment === 'positive' ? 'green' : 'gray'}>
                        {item.sentiment}
                     </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </main>
  );
}
