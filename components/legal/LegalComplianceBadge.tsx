import React from 'react';

export const LegalComplianceBadge = ({ tier = 'Elite' }) => {
  return (
    <div className="p-2 bg-green-900/20 border border-green-500 rounded text-xs text-green-400">
      <span className="font-bold">PROVISIONAL STATUS:</span> 
      Verified Global Hub - Tier: {tier} | Success Fee: 15% 
     
    </div>
  );
};

export default LegalComplianceBadge;
