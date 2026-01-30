"use client";

import { supabase } from '@/lib/supabase';
import { ShieldAlert } from 'lucide-react';

export function SecurityControls() {
  const handleNuclearOption = async () => {
    const confirmed = confirm("WARNING: This will instantly kill every public share link. Continue?");
    
    if (confirmed) {
      // This calls the SQL function we just created
      const { error } = await supabase.rpc('revoke_system_wide_shares');

      if (error) {
        alert("Authorization failed: " + error.message);
      } else {
        alert("All public access links have been incinerated.");
      }
    }
  };

  return (
    <div className="p-6 border border-red-500/20 bg-red-500/[0.02] rounded-3xl">
      <h3 className="text-red-500 font-bold flex items-center gap-2">
        <ShieldAlert className="w-4 h-4" /> Danger Zone
      </h3>
      <button 
        onClick={handleNuclearOption}
        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-lg transition-colors"
      >
        REVOKE ALL PUBLIC TOKENS
      </button>
    </div>
  );
}
