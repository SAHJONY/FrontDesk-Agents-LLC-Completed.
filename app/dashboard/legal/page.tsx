import React from 'react';
import { Gavel, ShieldCheck, Scale } from 'lucide-react';

// CORRECT RELATIVE PATH:
// legal -> dashboard -> app -> components
import { LegalComplianceBadge } from '../../components/LegalComplianceBadge';

export default function LegalRiskAudit() {
  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Gavel className="text-blue-500 w-8 h-8" />
          <h1 className="text-4xl font-black uppercase italic">Legal Risk Audit</h1>
        </div>
        <LegalComplianceBadge />
      </div>
    </div>
  );
}
