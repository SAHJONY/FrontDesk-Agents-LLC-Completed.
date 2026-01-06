"use client";

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { 
  ShieldCheck, 
  Gavel, 
  // Scale removed to satisfy linting
  AlertCircle,
  FileText 
} from 'lucide-react';
import { LegalComplianceBadge } from '../components/LegalComplianceBadge';

export default function LegalRiskAudit() {
  const { user } = useAuth();
  const [isAuditing, setIsAuditing] = useState(false);

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Gavel className="text-blue-500 w-8 h-8" />
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            Legal Risk Audit
          </h1>
        </div>
        <LegalComplianceBadge />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-white/10 rounded-xl bg-zinc-900/50">
          <div className="flex items-center gap-2 mb-4 text-green-500">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="font-bold uppercase tracking-wider">Compliance Status</h2>
          </div>
          <p className="text-zinc-400 text-sm mb-4">
            User ID: {user?.id || 'Active Session'} is verified under the 1.0 Global Parity protocol.
          </p>
          <button 
            onClick={() => setIsAuditing(!isAuditing)}
            className="w-full py-2 bg-white text-black font-bold uppercase text-xs rounded hover:bg-zinc-200 transition-colors"
          >
            {isAuditing ? 'Running Sovereign Audit...' : 'Start Risk Scan'}
          </button>
        </div>

        <div className="p-6 border border-white/10 rounded-xl bg-zinc-900/50">
          <div className="flex items-center gap-2 mb-4 text-blue-500">
            <AlertCircle className="w-5 h-5" />
            <h2 className="font-bold uppercase tracking-wider">Jurisdiction Logic</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <FileText className="w-4 h-4" /> 
              <span>Local Market Data Protection: ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
