// components/BookingCallsChart.tsx

"use client";

import React from 'react';
import { AreaChart, Card, Title, Text } from '@tremor/react';
import { TimeSeriesPoint } from '@/services/metrics.service';

interface BookingCallsChartProps {
    data: TimeSeriesPoint[];
}

// Formateador simple para números grandes (e.g., 150 -> 150)
const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

export const BookingCallsChart: React.FC<BookingCallsChartProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <Card className="h-full flex items-center justify-center">
                <Text>No hay suficientes datos de series de tiempo para mostrar el gráfico.</Text>
            </Card>
        );
    }

    return (
        <Card className="h-full">
            <Title>Performance de Agente (Últimos 7 Días)</Title>
            <Text>Llamadas atendidas y reservas realizadas por día.</Text>
            
            <AreaChart
                className="mt-6 h-80"
                data={data}
                index="timeLabel" // El eje X usa la etiqueta de tiempo
                categories={['callsHandled', 'bookingsMade']} // Las series de datos
                colors={['indigo', 'fuchsia']} // Colores para las dos series
                valueFormatter={dataFormatter}
                yAxisWidth={40}
            />
        </Card>
    );
};
