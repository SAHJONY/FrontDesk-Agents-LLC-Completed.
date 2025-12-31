import React from 'react';
import { Gavel, ShieldCheck, Scale } from 'lucide-react'; // Added Gavel here
import { LegalComplianceBadge } from '@/components/LegalComplianceBadge';

export default function LegalRiskAudit() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-2">
        <Gavel className="text-blue-500 w-6 h-6" />
        <LegalComplianceBadge />
      </div>
      <h1 className="text-4xl font-black tracking-tighter uppercase italic">
        Legal Risk Audit
      </h1>
      {/* Rest of your Sovereign Audit UI */}
    </div>
  );
}
