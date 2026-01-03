import React, { useEffect, useState } from 'react';
import { LeadDetail } from './LeadDetailModal';

interface Lead {
  id: string;
  address: string;
  arv: number;
  zip_code: string;
  status: string;
}

export const AcquisitionTable = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    // Aquí llamarías a tu API de leads
    fetch('/api/leads/get-all', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => setLeads(data.leads || []));
  }, []);

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-800 text-slate-400 uppercase text-[10px] tracking-widest">
          <tr>
            <th className="px-4 py-3">Dirección</th>
            <th className="px-4 py-3">Zip Code</th>
            <th className="px-4 py-3">ARV</th>
            <th className="px-4 py-3">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors">
              <td className="px-4 py-3 font-medium text-white">{lead.address}</td>
              <td className="px-4 py-3">{lead.zip_code}</td>
              <td className="px-4 py-3 text-green-400">${lead.arv.toLocaleString()}</td>
              <td className="px-4 py-3">
                <button 
                  onClick={() => setSelectedLead(lead)}
                  className="text-amber-500 hover:text-amber-400 font-bold"
                >
                  Analizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Detalle que creamos anteriormente */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full bg-slate-900 rounded-2xl border border-slate-700 relative">
            <button 
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
            >
              ✕
            </button>
            <LeadDetail lead={selectedLead} />
          </div>
        </div>
      )}
    </div>
  );
};
