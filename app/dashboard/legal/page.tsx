import React from 'react';
import { Gavel, ShieldCheck, Scale } from 'lucide-react';
import { LegalComplianceBadge } from '../components/LegalComplianceBadge';

export default function LegalRiskAudit() {
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
            <h2 className="font-bold uppercase">Sovereign Protection</h2>
          </div>
          <p className="text-zinc-400 text-sm">
            Automatic compliance monitoring is active for all global market telephony routes.
          </p>
        </div>

        <div className="p-6 border border-white/10 rounded-xl bg-zinc-900/50">
          <div className="flex items-center gap-2 mb-4 text-blue-500">
            <Scale className="w-5 h-5" />
            <h2 className="font-bold uppercase">Jurisdiction Logic</h2>
          </div>
          <p className="text-zinc-400 text-sm">
            Platform parity is set to 1.0 for local market serving across all tiers.
          </p>
        </div>
      </div>
    </div>
  );
}
