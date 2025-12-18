'use client';
import { useState, useEffect } from 'react';
import { Card, Title, Text, Metric, Grid, AreaChart, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Flex } from '@tremor/react';
import { supabase } from '@/lib/supabase-client';

export default function AdminControlCenter() {
  const [globalStats, setGlobalStats] = useState({ users: 0, calls: 0, revenue: 0 });
  const [recentBusinesses, setRecentBusinesses] = useState<any[]>([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  async function fetchAdminData() {
    // 1. Obtener total de clientes y llamadas
    const { count: userCount } = await supabase.from('BusinessConfig').select('*', { count: 'exact', head: true });
    const { data: calls } = await supabase.from('CallLog').select('estimatedValue');
    
    const totalRevenue = calls?.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0) || 0;

    setGlobalStats({
      users: userCount || 0,
      calls: calls?.length || 0,
      revenue: totalRevenue
    });

    // 2. Obtener negocios recientes
    const { data: businesses } = await supabase
      .from('BusinessConfig')
      .select('businessName, status, createdAt, phoneNumber')
      .order('createdAt', { ascending: false })
      .limit(10);
    
    setRecentBusinesses(businesses || []);
  }

  return (
    <main className="p-10 bg-slate-950 min-h-screen">
      <Flex className="mb-8">
        <div>
          <Title className="text-white text-3xl font-bold">Admin Control Center</Title>
          <Text className="text-slate-400">Visión global de FrontDesk Agents LLC</Text>
        </div>
        <Badge color="red" size="xl">Admin Mode</Badge>
      </Flex>

      <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mb-10">
        <Card className="bg-slate-900 border-slate-800" decoration="top" decorationColor="cyan">
          <Text className="text-slate-400">Clientes Totales</Text>
          <Metric className="text-white">{globalStats.users}</Metric>
        </Card>
        <Card className="bg-slate-900 border-slate-800" decoration="top" decorationColor="purple">
          <Text className="text-slate-400">Llamadas Procesadas</Text>
          <Metric className="text-white">{globalStats.calls}</Metric>
        </Card>
        <Card className="bg-slate-900 border-slate-800" decoration="top" decorationColor="emerald">
          <Text className="text-slate-400">MRR Estimado (Mensual)</Text>
          <Metric className="text-white">${globalStats.revenue.toLocaleString()}</Metric>
        </Card>
      </Grid>

      {/* Tabla de nuevos clientes */}
      <Card className="bg-slate-900 border-slate-800">
        <Title className="text-white mb-4">Negocios Registrados Recientemente</Title>
        <Table>
          <TableHead>
            <TableRow className="border-slate-800">
              <TableHeaderCell className="text-slate-400">Empresa</TableHeaderCell>
              <TableHeaderCell className="text-slate-400">Teléfono Asignado</TableHeaderCell>
              <TableHeaderCell className="text-slate-400">Estado</TableHeaderCell>
              <TableHeaderCell className="text-slate-400">Fecha de Registro</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentBusinesses.map((biz, i) => (
              <TableRow key={i} className="border-slate-800">
                <TableCell className="text-white font-medium">{biz.businessName || 'Sin nombre'}</TableCell>
                <TableCell className="text-slate-300">{biz.phoneNumber}</TableCell>
                <TableCell>
                  <Badge color={biz.status === 'active' ? 'emerald' : 'amber'}>
                    {biz.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-400">
                  {new Date(biz.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </main>
  );
}
