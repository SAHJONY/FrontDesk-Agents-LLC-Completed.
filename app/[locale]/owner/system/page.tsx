'use client';

import React from 'react';
// Updated Tremor Imports
import { 
  Card, 
  Title, 
  Table, 
  TableHead, 
  TableRow, 
  TableHeaderCell, 
  TableBody, 
  TableCell, 
  Badge,
  Text
} from '@tremor/react'; 
import { Activity, Shield, Cpu, Zap, Globe } from 'lucide-react';

export default function OwnerSystemPage() {
  // ... rest of your logic (fetch stats, etc)

  return (
    <main className="p-8 space-y-8 bg-[#020305] min-h-screen font-mono">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <Shield className="w-8 h-8 text-cyan-500" />
          <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">
            System <span className="text-cyan-500">Surveillance</span>
          </h1>
        </div>
        <Badge color="emerald" icon={Activity}>AEGIS ONLINE</Badge>
      </div>

      {/* The Section triggering the Error */}
      <Card className="bg-white/[0.02] border-white/10 ring-0 shadow-none">
        <Title className="text-white text-sm uppercase font-black tracking-widest mb-6">
          Recent Node Deployments
        </Title>
        <Table>
          <TableHead>
            <TableRow className="border-b border-white/5">
              <TableHeaderCell className="text-[10px] text-slate-500 uppercase tracking-widest">Node ID</TableHeaderCell>
              <TableHeaderCell className="text-[10px] text-slate-500 uppercase tracking-widest">Tier</TableHeaderCell>
              <TableHeaderCell className="text-[10px] text-slate-500 uppercase tracking-widest">Status</TableHeaderCell>
              <TableHeaderCell className="text-[10px] text-slate-500 uppercase tracking-widest">Region</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Example row to prevent empty table build warnings */}
            <TableRow className="hover:bg-white/[0.01]">
              <TableCell className="text-xs text-slate-400">#NODE-8821</TableCell>
              <TableCell><Badge color="cyan">ELITE</Badge></TableCell>
              <TableCell><Text className="text-emerald-500 text-[10px] font-bold">ACTIVE</Text></TableCell>
              <TableCell className="text-xs text-slate-500 italic uppercase">US-WEST-1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </main>
  );
}
