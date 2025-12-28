'use client';

import React from 'react';
import { Badge, Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Text } from '@tremor/react';
import { PhoneIncoming, User, BarChart3, TrendingUp } from 'lucide-react';

export const LeadFeed = ({ leads }: { leads: any[] }) => {
  return (
    <Card className="bg-white/[0.02] border-white/10 ring-0 mt-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <PhoneIncoming className="w-5 h-5 text-emerald-500" />
          <h3 className="text-white font-black uppercase italic tracking-widest text-sm">Strategic Lead Feed</h3>
        </div>
        <Badge color="emerald" icon={TrendingUp}>Conversion Active</Badge>
      </div>

      <Table>
        <TableHead>
          <TableRow className="border-white/5">
            <TableHeaderCell className="text-[10px] font-black uppercase text-slate-500">Subject</TableHeaderCell>
            <TableHeaderCell className="text-[10px] font-black uppercase text-slate-500">Intent</TableHeaderCell>
            <TableHeaderCell className="text-[10px] font-black uppercase text-slate-500">Quality</TableHeaderCell>
            <TableHeaderCell className="text-[10px] font-black uppercase text-slate-500">Sentiment</TableHeaderCell>
            <TableHeaderCell className="text-[10px] font-black uppercase text-slate-500 text-right">Yield Date</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id} className="border-white/5 hover:bg-white/[0.01] transition-colors group">
              <TableCell className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <User className="w-4 h-4 text-slate-400 group-hover:text-cyan-500" />
                </div>
                <span className="text-white font-bold text-xs uppercase">{lead.client_name || 'Anonymous Node'}</span>
              </TableCell>
              <TableCell>
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-tighter italic">{lead.intent}</span>
              </TableCell>
              <TableCell>
                <Badge color={lead.quality === 'hot' ? 'red' : 'orange'} size="xs">
                  {lead.quality?.toUpperCase() || 'EVALUATING'}
                </Badge>
              </TableCell>
              <TableCell>
                 <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${lead.sentiment === 'positive' ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                    <span className="text-[9px] font-black uppercase text-slate-300">{lead.sentiment}</span>
                 </div>
              </TableCell>
              <TableCell className="text-right text-slate-500 font-mono text-[10px]">
                {new Date(lead.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
