'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart, Wallet, Users, Activity, 
  ArrowUpRight, Globe, ShieldAlert, Zap 
} from 'lucide-react';
import { Card, Metric, Text, AreaChart, BadgeDelta, Flex, Grid, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from '@tremor/react';

// Platform Economics (Your wholesale cost is ~$0.12/min)
const WHOLESALE_COST_PER_MIN = 0.12;

export default function OwnerDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 14580,
    totalMinutesUsed: 22400,
    activeNodes: 42,
    margin: 0
  });

  // Calculate Net Profit: Revenue - (Minutes * Wholesale Cost)
  const netProfit = stats.totalRevenue - (stats.totalMinutesUsed * WHOLESALE_COST_PER_MIN);

  return (
    <div className="min-h-screen bg-[#020305] p-12 text-white">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-16">
        <div>
          <Badge color="red" icon={ShieldAlert} className="mb-4">ROOT ACCESS: LEVEL 0</Badge>
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">Sovereign <span className="text-red-500">Command</span></h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">Global Revenue & Node Distribution</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">System Protocol</p>
          <p className="text-xl font-mono text-cyan-500">v2.1.0-AEGIS-LIVE</p>
        </div>
      </div>

      {/* KPI GRID */}
      <Grid numItemsLg={4} className="gap-6 mb-12">
        <Card className="bg-white/5 border-white/10 decoration-top decoration-cyan-500">
          <Text className="text-slate-400 uppercase text-[10px] font-bold tracking-widest">Gross Revenue (MRR)</Text>
          <Metric className="text-white">${stats.totalRevenue.toLocaleString()}</Metric>
          <BadgeDelta deltaType="moderateIncrease" className="mt-4">Permanent Tiers Active</BadgeDelta>
        </Card>

        <Card className="bg-white/5 border-white/10 decoration-top decoration-emerald-500">
          <Text className="text-slate-400 uppercase text-[10px] font-bold tracking-widest">Net Profit (Est.)</Text>
          <Metric className="text-emerald-400">${netProfit.toLocaleString()}</Metric>
          <Text className="text-[9px] mt-4 text-slate-500 italic">After $0.12/min Neural Cost</Text>
        </Card>

        <Card className="bg-white/5 border-white/10 decoration-top decoration-red-500">
          <Text className="text-slate-400 uppercase text-[10px] font-bold tracking-widest">Active Workforce Nodes</Text>
          <Metric className="text-white">{stats.activeNodes}</Metric>
          <Flex className="mt-4">
            <Text className="text-[10px] text-slate-500">Global Distribution</Text>
            <Globe className="w-3 h-3 text-cyan-500" />
          </Flex>
        </Card>

        <Card className="bg-white/5 border-white/10 decoration-top decoration-amber-500">
          <Text className="text-slate-400 uppercase text-[10px] font-bold tracking-widest">Platform Efficiency</Text>
          <Metric className="text-white">74.2%</Metric>
          <Text className="text-[10px] mt-4 text-slate-500 uppercase font-bold tracking-widest">Margin Optimization</Text>
        </Card>
      </Grid>

      {/* RECENT NODE PROVISIONING */}
      <Card className="bg-white/5 border-white/10">
        <Title className="text-white text-sm uppercase font-black tracking-widest mb-6">Recent Node Deployments</Title>
        <Table>
          <TableHead>
            <TableRow className="border-b border-white/5">
              <TableHeaderCell className="text-slate-500 text-[9px] uppercase tracking-widest">Organization</TableHeaderCell>
              <TableHeaderCell className="text-slate-500 text-[9px] uppercase tracking-widest">Tier</TableHeaderCell>
              <TableHeaderCell className="text-slate-500 text-[9px] uppercase tracking-widest">Region</TableHeaderCell>
              <TableHeaderCell className="text-slate-500 text-[9px] uppercase tracking-widest">Usage</TableHeaderCell>
              <TableHeaderCell className="text-slate-500 text-[9px] uppercase tracking-widest">Net Margin</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { org: "Viper Barbershop", tier: "BASIC", region: "WESTERN", usage: "412/500", margin: "$149" },
              { org: "Apex Dental Clinic", tier: "PROFESSIONAL", region: "WESTERN", usage: "890/1000", margin: "$292" },
              { org: "Global MedSpa", tier: "GROWTH", region: "GROWTH", usage: "1200/2500", margin: "$135" },
              { org: "Prime Legal Group", tier: "ELITE", region: "WESTERN", usage: "3400/5000", margin: "$1,091" },
            ].map((node) => (
              <TableRow key={node.org} className="border-b border-white/5">
                <TableCell className="text-white font-bold text-[11px]">{node.org}</TableCell>
                <TableCell>
                  <Badge size="xs" color={node.tier === 'ELITE' ? 'red' : 'cyan'}>{node.tier}</Badge>
                </TableCell>
                <TableCell className="text-slate-400 text-[10px]">{node.region}</TableCell>
                <TableCell className="text-slate-400 text-[10px] font-mono">{node.usage}</TableCell>
                <TableCell className="text-emerald-400 font-black text-[11px]">{node.margin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="mt-12 text-center">
        <p className="text-[9px] font-bold text-slate-800 uppercase tracking-[0.5em]">
          End of Sovereign Command Feed // Total Capital Dominance Enabled
        </p>
      </div>
    </div>
  );
}
