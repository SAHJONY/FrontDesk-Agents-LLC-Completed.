'use client';

/**
 * Sovereign Global Financial Hub
 * Legal Compliance & Tier Verification Badge
 * Location: /app/components/LegalComplianceBadge.tsx
 */

import React from 'react';
import { ShieldCheck, Globe, Scale } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LegalComplianceBadge: React.FC = () => {
  const { profile, user } = useAuth();

  // Logic to determine if the user is the Sovereign Exempt Owner
  const isOwner = user?.email === 'frontdeskllc@outlook.com';
  
  // Mapping the permanent pricing tiers
  const tierDisplay = profile?.tier ? profile.tier.charAt(0).toUpperCase() + profile.tier.slice(1) : 'Basic';

  return (
    <div className="flex flex-col items-end space-y-2">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full shadow-sm">
        <ShieldCheck className="w-4 h-4 text-green-600" />
        <span className="text-xs font-semibold text-green-800 uppercase tracking-wider">
          {isOwner ? 'Sovereign Exempt' : `${tierDisplay} Tier Verified`}
        </span>
      </div>
      
      <div className="flex items-center gap-3 text-[10px] text-gray-500 font-medium">
        <div className="flex items-center gap-1">
          <Globe className="w-3 h-3" />
          <span>Local Market Parity Active</span>
        </div>
        <div className="flex items-center gap-1">
          <Scale className="w-3 h-3" />
          <span>GDPR/CCPA Compliant</span>
        </div>
      </div>
    </div>
  );
};

export default LegalComplianceBadge;

