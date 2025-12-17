// components/dashboard/AnalyticsView.tsx
'use client';

import React from 'react';
import { Card, Title, AreaChart, Metric, Text, Flex, BadgeDelta, Grid } from '@tremor/react';

export default function AnalyticsView({ stats }: any) {
  return (
    <div className="p-6 space-y-6 bg-[#020817]">
      <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
        <Card decoration="top" decorationColor="cyan">
          <Text>Citas Agendadas</Text>
          <Metric>{stats.totalBookings}</Metric>
          <BadgeDelta deltaType="moderateIncrease" className="mt-2">+12% vs mes pasado</BadgeDelta>
        </Card>
        
        <Card decoration="top" decorationColor="blue">
          <Text>Llamadas Atendidas</Text>
          <Metric>{stats.totalCalls}</Metric>
          <Text className="mt-2 italic">0 llamadas perdidas</Text>
        </Card>

        <Card decoration="top" decorationColor="emerald">
          <Text>Ingreso Estimado</Text>
          <Metric>${stats.estimatedRevenue}</Metric>
          <Text className="mt-2">Basado en servicios detectados</Text>
        </Card>
      </Grid>

      <Card className="mt-6">
        <Title>Rendimiento del Recepcionista IA</Title>
        <Text>Volumen de llamadas y conversiones en los últimos 30 días</Text>
        <AreaChart
          className="h-72 mt-4"
          data={stats.chartData}
          index="date"
          categories={["Llamadas", "Citas"]}
          colors={["blue", "cyan"]}
          valueFormatter={(number) => `${number}`}
        />
      </Card>
    </div>
  );
}
