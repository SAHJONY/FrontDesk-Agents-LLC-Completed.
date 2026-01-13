import React from 'react';
import { ShieldCheck, Globe } from 'lucide-react';

export const LegalComplianceBadge = () => {
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-green-900/20 border border-green-500/30 rounded-full">
      <ShieldCheck className="w-4 h-4 text-green-500" />
      <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">
        Sovereign Secure
      </span>
      <Globe className="w-4 h-4 text-green-500 ml-1" />
    </div>
  );
};
