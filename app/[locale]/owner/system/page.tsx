'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Activity, Terminal, Database } from 'lucide-react';
import { 
  Card, 
  Table, 
  TableHead, 
  TableRow, 
  TableHeaderCell, 
  TableBody, 
  TableCell, 
  Badge, 
  Metric, 
  Flex 
} from '@tremor/react';
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

      if (!error && data) {
        setStats(data);
      }
      setLoading(false);
    };
    fetchGlobalData();
  }, [supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020408] flex items-center justify-center">
        <Activity className="w-12 h-12 text-red-500 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020408] text-white p-8 font-sans selection:bg-red-500/30">
      {/* --- OWNER HEADER --- */}
      <div className="flex items-center justify-between mb-12 border-b border-red-500/20 pb-8">
        <div>
          <Flex className="gap-2 items-center justify-start">
            <ShieldCheck className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">
              Sovereign <span className="text-red-500">Portal</span>
            </h1>
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
          <p className="text-slate-400 uppercase text-[10px] font-black tracking-widest mb-2">
            Global Nodes
          </p>
          <Metric className="text-white font-black">{stats.length}</Metric>
        </Card>
        
        <Card className="bg-white/[0.02] border-white/10 ring-0 border-s-4 border-s-red-500">
          <p className="text-slate-400 uppercase text-[10px] font-black tracking-widest mb-2">
            Total Sovereign MRR
          </p>
          <Metric className="text-white font-black tabular-nums">
            ${stats.reduce((acc, curr) => acc + (Number(curr.mrr) || 0), 0).toLocaleString()}
          </Metric>
        </Card>
        
        <Card className="bg-white/[0.02] border-white/10 ring-0">
          <p className="text-slate-400 uppercase text-[10px] font-black tracking-widest mb-2">
            Active Neural Sessions
          </p>
          <Metric className="text-white font-black">1,402</Metric>
        </Card>
      </div>

      {/* --- GLOBAL NODE MANAGEMENT --- */}
      <Card className="bg-white/[0.02] border-white/10 ring-0">
        <div className="flex items-center gap-2 mb-6">
          <Terminal className="w-4 h-4 text-red-500" />
          <h3 className="text-white uppercase text-xs font-black tracking-widest">
            Active Global Infrastructure
          </h3>
        </div>
        
        <Table>
          <TableHead>
            <TableRow className="border-white/5">
              <TableHeaderCell className="text-slate-500 uppercase text-[10px] font-black">
                Customer Node
              </TableHeaderCell>
              <TableHeaderCell className="text-slate-500 uppercase text-[10px] font-black">
                Status
              </TableHeaderCell>
              <TableHeaderCell className="text-slate-500 uppercase text-[10px] font-black">
                Region
              </TableHeaderCell>
              <TableHeaderCell className="text-slate-500 uppercase text-[10px] font-black">
                Actions
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {stats.map((item) => (
              <TableRow 
                key={item.id} 
                className="border-white/5 hover:bg-white/[0.01] transition-colors"
              >
                <TableCell className="text-white font-bold">
                  {item.email}
                </TableCell>
                <TableCell>
                  <Badge color={item.status === 'active' ? 'emerald' : 'yellow'}>
                    {(item.status || 'pending').toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-[10px] text-slate-400">
                  {item.locale || 'EN'}
                </TableCell>
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

      {/* --- RECENT NODE DEPLOYMENTS --- */}
      <Card className="bg-white/5 border-white/10 ring-0 mt-8">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-4 h-4 text-cyan-500" />
          <h3 className="text-white text-sm uppercase font-black tracking-widest">
            Recent Node Deployments
          </h3>
        </div>
        
        <Table>
          <TableHead>
            <TableRow className="border-b border-white/5">
              <TableHeaderCell className="text-slate-500 uppercase text-[10px] font-black">
                Node ID
              </TableHeaderCell>
              <TableHeaderCell className="text-slate-500 uppercase text-[10px] font-black">
                Tier
              </TableHeaderCell>
              <TableHeaderCell className="text-slate-500 uppercase text-[10px] font-black">
                Deployed
              </TableHeaderCell>
              <TableHeaderCell className="text-slate-500 uppercase text-[10px] font-black">
                Status
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {stats.slice(0, 5).map((item) => (
              <TableRow 
                key={item.id} 
                className="border-white/5 hover:bg-white/[0.01] transition-colors"
              >
                <TableCell className="font-mono text-xs text-white">
                  {item.id?.substring(0, 8)}
                </TableCell>
                <TableCell>
                  <Badge color="cyan">
                    {item.plan_tier || 'CORE_STATION'}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-400 text-xs">
                  {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell>
                  <Badge color="emerald">ACTIVE</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
