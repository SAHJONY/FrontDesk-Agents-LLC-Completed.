'use client';

import React from 'react';
// ADD THESE IMPORTS:
import { 
  Card, 
  Title, 
  Table, 
  TableHead, 
  TableRow, 
  TableHeaderCell, 
  TableBody, 
  TableCell, 
  Text, 
  Badge 
} from '@tremor/react'; 
import { Activity, Shield, Cpu } from 'lucide-react';

export default function OwnerSystemPage() {
  // ... rest of your component logic
  return (
    <div className="p-8 space-y-8 bg-[#020305] min-h-screen">
       {/* ... existing header code ... */}
       
       <Card className="bg-white/5 border-white/10">
         <Title className="text-white text-sm uppercase font-black tracking-widest mb-6">
           Recent Node Deployments
         </Title>
         <Table>
           <TableHead>
             <TableRow className="border-b border-white/5">
               <TableHeaderCell className="text-[10px] text-slate-500 uppercase">Node ID</TableHeaderCell>
               <TableHeaderCell className="text-[10px] text-slate-500 uppercase">Tier</TableHeaderCell>
               <TableHeaderCell className="text-[10px] text-slate-500 uppercase">Status</TableHeaderCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {/* Map your deployment data here */}
           </TableBody>
         </Table>
       </Card>
    </div>
  );
}
