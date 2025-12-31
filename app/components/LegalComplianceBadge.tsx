import React from 'react';
import { ShieldCheck, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LegalComplianceBadge = () => {
  // We call useAuth to ensure the component is context-aware, 
  // but we remove the 'user' variable to pass the Portland linting gate.
  useAuth(); 

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-green-900/20 border border-green-500/30 rounded-full">
      <ShieldCheck className="w-4 h-4 text-green-500" />
      <span className="text-xs font-medium text-green-400 uppercase tracking-wider">
        Sovereign Secure
      </span>
      <Globe className="w-4 h-4 text-green-500 ml-1" />
    </div>
  );
};
