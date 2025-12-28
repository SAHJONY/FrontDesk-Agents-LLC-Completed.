'use client';

import { Card, Title, AreaChart, Text, Flex, Badge } from '@tremor/react';
import { Activity } from 'lucide-react';

interface TrendData {
  date: string;
  Positive: number;
  Neutral: number;
  Negative: number;
}

export default function SentimentTrend({ data }: { data: TrendData[] }) {
  return (
    <Card className="bg-white/[0.02] border-white/10 ring-0">
      <Flex className="items-start">
        <div className="space-y-1">
          <Title className="text-white uppercase text-xs font-black tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" /> Neural Sentiment Pulse
          </Title>
          <Text className="text-slate-400 text-[10px]">7-Day Emotional Trajectory</Text>
        </div>
        <Badge color="emerald">Live Telemetry</Badge>
      </Flex>
      
      <AreaChart
        className="mt-8 h-48"
        data={data}
        index="date"
        categories={["Positive", "Neutral", "Negative"]}
        colors={["emerald", "zinc", "rose"]}
        showLegend={true}
        showGridLines={false}
        curveType="monotone"
        valueFormatter={(number: number) => `${number} calls`}
      />
    </Card>
  );
}
