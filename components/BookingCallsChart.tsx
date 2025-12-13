'use client';

import React from 'react';
import { AreaChart, Card, Title, Text } from '@tremor/react';

// Define the type locally instead of importing
interface TimeSeriesPoint {
  date: string;
  value: number;
  [key: string]: string | number;
}

interface BookingCallsChartProps {
  data: TimeSeriesPoint[];
}

export default function BookingCallsChart({ data }: BookingCallsChartProps) {
  // Transform data for Tremor chart
  const chartData = data.map(point => ({
    date: new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Calls: point.value
  }));

  return (
    <Card>
      <Title>Booking Calls Over Time</Title>
      <Text>Track your daily call volume</Text>
      <AreaChart
        className="mt-4 h-72"
        data={chartData}
        index="date"
        categories={["Calls"]}
        colors={["blue"]}
        valueFormatter={(value) => `${value} calls`}
        showLegend={false}
        showGridLines={true}
        showAnimation={true}
      />
    </Card>
  );
}
