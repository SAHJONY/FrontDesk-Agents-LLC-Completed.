'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Activity, Users, Zap, Terminal, Database } from 'lucide-react';
import { Card, Title, AreaChart, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Metric, Flex } from '@tremor/react';
import { createClient } from '@/utils/supabase/client';

export default function SovereignPortal() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchGlobalData = async () => {
      // Fetching all customers - only possible for you (The Owner)
      const { data, error } = await supabase
        .from('customers')
        .select('*, provisioning_logs(count)')
        .order('created_at', { ascending: false });

      if (!error) setStats(data);
      setLoading(false);
    };
    fetchGlobalData();
  }, []);

  return (
    <div className="min-h-screen bg-[#020408] text-white p-8 font-sans selection:bg-red-500/30">
      {/* --- OWNER HEADER --- */}
      <div className="flex items-center justify-between mb-12 border-b border-red-500/20 pb-8">
        <div>
          <Flex className="gap-2 items-center">
            <ShieldCheck className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Sovereign <span className="text-red-500">Portal</span></h1>
          </Flex>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2">
            System Identity: sahjonyllc@outlook.com // Authority: ROOT_ACCESS
          </p>
        </div>
        <div className="flex gap-4">
          <Badge color="red" icon={Activity}>All Systems Nominal</Badge>
          <Badge color="emerald" icon={Database}>Supabase Connected</Badge>
        </div>
      </div>

      {/* --- TOP METRICS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white/[0.02] border-white/10 ring-0">
          <Text className="text-slate-400 uppercase text-[10px] font-black tracking-widest">Global Nodes</Text>
          <Metric className="text-white font-black">{stats.length}</Metric>
        </Card>
        <Card className="bg-white/[0.02] border-white/10 ring-0 border-s-4 border-s-red-500">
          <Text className="text-slate-400 uppercase text-[10px] font-black tracking-widest">Total Sovereign MRR</Text>
          <Metric className="text-white font-black tabular-nums">
            ${stats.reduce((acc, curr) => acc + (curr.mrr || 0), 0).toLocaleString()}
          </Metric>
        </Card>
        <Card className="bg-white/[0.02] border-white/10 ring-0">
          <Text className="text-slate-400 uppercase text-[10px] font-black tracking-widest">Active Neural Sessions</Text>
          <Metric className="text-white font-black">1,402</Metric>
        </Card>
      </div>

      {/* --- GLOBAL NODE MANAGEMENT --- */}
      <Card className="bg-white/[0.02] border-white/10 ring-0">
        <Title className="text-white uppercase text-xs font-black tracking-widest mb-6 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-red-500" /> Active Global Infrastructure
        </Title>
        <Table>
          <TableHead>
            <TableRow className="border-white/5">
              <TableHeaderCell className="text-slate-500 uppercase text-[10px] font-black">Customer Node</TableHeaderCell>
              <TableHeaderCell className="text-slate-500 uppercase text-[10px] font-black">Status</TableHeaderCell>
              <TableHeaderCell className="text-slate-500 uppercase text-[10px] font-black">Region</TableHeaderCell>
              <TableHeaderCell className="text-slate-500 uppercase text-[10px] font-black">Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((item) => (
              <TableRow key={item.id} className="border-white/5 hover:bg-white/[0.01] transition-colors">
                <TableCell className="text-white font-bold">{item.email}</TableCell>
                <TableCell>
                  <Badge color={item.status === 'active' ? 'emerald' : 'yellow'}>
                    {item.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-[10px] text-slate-400">{item.locale || 'EN'}</TableCell>
                <TableCell>
                  <button className="text-[9px] font-black uppercase text-red-500 hover:text-white border border-red-500/20 px-3 py-1 rounded transition-all">
                    Deactivate Node
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
