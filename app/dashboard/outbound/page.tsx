import React from 'react';

export default function OutboundCampaigns() {
  return (
    <div className="p-8 max-w-7xl mx-auto relative z-10">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Outbound Fleet</h1>
          <p className="text-brand-cyan font-mono text-sm">Status: 4 Active Campaigns</p>
        </div>
        <button className="bg-brand-cyan text-black px-6 py-2 rounded-lg font-bold uppercase text-xs">
          Launch New Campaign
        </button>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="titan-card flex justify-between items-center py-6">
            <div>
              <h3 className="text-white font-bold">Q4 Lead Recovery #00{i}</h3>
              <p className="text-slate-500 text-xs">Targeting: Inactive CRM Contacts</p>
            </div>
            <div className="text-right">
              <p className="text-brand-cyan font-bold">84% Conversion</p>
              <p className="text-slate-600 text-[10px] uppercase">AI Managed</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
