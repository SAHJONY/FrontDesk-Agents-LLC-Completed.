'use client';

import React, { useState } from 'react';
import { Card, Title, Metric, Text, AreaChart, Badge, Flex } from '@tremor/react';
import { TrendingUp, DollarSign, Target } from 'lucide-react';

export default function RevenueProjection({ tierCost }: { tierCost: number }) {
  const [avgLTV, setAvgLTV] = useState(500); // Average Customer Lifetime Value
  const [capturedLeads, setCapturedLeads] = useState(12); // Leads AI booked

  const projectedRevenue = avgLTV * capturedLeads;
  const netROI = projectedRevenue - tierCost;

  const chartData = [
    { month: 'Week 1', Revenue: projectedRevenue * 0.25 },
    { month: 'Week 2', Revenue: projectedRevenue * 0.50 },
    { month: 'Week 3', Revenue: projectedRevenue * 0.75 },
    { month: 'Week 4', Revenue: projectedRevenue },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* INPUT CONTROLS */}
        <Card className="bg-[#080a0f] border-white/10">
          <Title className="text-white text-[10px] font-black uppercase tracking-widest mb-8">Economic Calibration</Title>
          
          <div className="space-y-8">
            <div>
              <Flex>
                <Text className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Avg. Customer Value</Text>
                <Text className="text-cyan-500 font-mono">${avgLTV}</Text>
              </Flex>
              <input 
                type="range" min="100" max="5000" step="50" 
                value={avgLTV} onChange={(e) => setAvgLTV(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500 mt-4"
              />
            </div>

            <div>
              <Flex>
                <Text className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Leads Captured by Node</Text>
                <Text className="text-cyan-500 font-mono">{capturedLeads}</Text>
              </Flex>
              <input 
                type="range" min="1" max="100" 
                value={capturedLeads} onChange={(e) => setCapturedLeads(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500 mt-4"
              />
            </div>
          </div>
        </Card>

        {/* ROI DISPLAY */}
        <Card className="bg-[#080a0f] border-white/10 flex flex-col justify-center text-center">
          <Text className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Net Projected ROI</Text>
          <Metric className="text-emerald-400 text-5xl font-black italic tracking-tighter">
            +${netROI.toLocaleString()}
          </Metric>
          <div className="mt-6 flex justify-center gap-4">
            <Badge color="emerald" icon={TrendingUp}>PROFITABLE</Badge>
            <Badge color="cyan" icon={Target}>{(projectedRevenue / tierCost).toFixed(1)}x Multiple</Badge>
          </div>
        </Card>
      </div>

      {/* PROJECTION CHART */}
      <Card className="bg-[#080a0f] border-white/10">
        <Title className="text-white text-[10px] font-black uppercase tracking-widest mb-4">Cumulative Revenue Extraction</Title>
        <AreaChart
          className="h-48 mt-4"
          data={chartData}
          index="month"
          categories={["Revenue"]}
          colors={["cyan"]}
          showXAxis={true}
          showGridLines={false}
          startEndOnly={true}
        />
      </Card>
    </div>
  );
}
