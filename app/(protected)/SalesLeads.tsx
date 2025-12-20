'use client';

import React from 'react';
import { PhoneIcon } from '@heroicons/react/24/outline';

export default function SalesLeads() {
  
  // --- PASTE THE FUNCTION HERE ---
  const callLead = async (lead: any) => {
    const userId = '42c9eda0-81fd-4d7a-b9f7-49bba359d6ce'; 
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
      if (response.ok) alert(`🚀 Llamada iniciada para ${lead.full_name}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-slate-900/50 rounded-[32px] p-8 border border-white/5">
      {/* Table implementation where you call the function */}
      <button 
        onClick={() => callLead(someLeadData)}
        className="flex items-center gap-2 bg-cyan-500 text-black px-4 py-2 rounded-xl font-bold text-xs"
      >
        <PhoneIcon className="w-4 h-4" /> LLAMAR
      </button>
    </div>
  );
}
