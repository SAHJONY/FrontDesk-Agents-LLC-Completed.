'use client';

import React, { useState } from 'react';
import { PhoneIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function SalesLeads() {
  // Track which specific lead is currently being called
  const [loadingLeadId, setLoadingLeadId] = useState<string | null>(null);

  const callLead = async (lead: any) => {
    // Verified UID for J. Gonzalez
    const userId = '42c9eda0-81fd-4d7a-b9f7-49bba359d6ce'; 
    
    setLoadingLeadId(lead.id); // Start loading for this specific lead

    try {
      const response = await fetch('https://awzczbaarskqjgdatefv.supabase.co/functions/v1/bland-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}` 
        },
        body: JSON.stringify({
          record: {
            id: lead.id,
            full_name: lead.full_name,
            phone_number: lead.phone_number
          },
          metadata: { user_id: userId, lead_id: lead.id }
        }),
      });

      if (response.ok) {
        alert(`🚀 Llamada iniciada para ${lead.full_name}`);
      } else {
        alert('Error al iniciar la llamada. Revisa la consola.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingLeadId(null); // Stop loading regardless of outcome
    }
  };

  return (
    <div className="bg-slate-900/50 rounded-[32px] p-8 border border-white/5 backdrop-blur-sm">
      <h3 className="text-xl font-bold italic uppercase tracking-tight mb-6">Sales Leads</h3>
      
      {/* Example Table Row Button */}
      <button 
        disabled={loadingLeadId === "test-lead-id"} // Replace with dynamic ID from your map
        onClick={() => callLead({ id: "test-lead-id", full_name: "Test Lead", phone_number: "+1..." })}
        className={`flex items-center gap-2 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
          loadingLeadId === "test-lead-id" 
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
            : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
        }`}
      >
        {loadingLeadId === "test-lead-id" ? (
          <ArrowPathIcon className="w-4 h-4 animate-spin" />
        ) : (
          <PhoneIcon className="w-4 h-4" />
        )}
        {loadingLeadId === "test-lead-id" ? 'Llamando...' : 'Llamar'}
      </button>
    </div>
  );
}
