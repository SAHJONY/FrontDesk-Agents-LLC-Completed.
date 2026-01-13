import React from 'react';
import { BuyerMatchCard } from './BuyerMatchCard';

// Definimos la estructura del Lead para que TypeScript no de error
interface LeadProps {
  lead: {
    id: string;
    address: string;
    arv: number;
    repairs?: number;
    zip_code: string;
  };
}

export const LeadDetail = ({ lead }: LeadProps) => {
  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl">
      <h2 className="text-2xl font-bold mb-2">{lead.address}</h2>
      <div className="flex gap-4 text-sm text-slate-400 mb-6">
        <span>ARV: <span className="text-green-400 font-bold">${lead.arv?.toLocaleString()}</span></span>
        {lead.repairs && (
          <span>Reparaciones: <span className="text-red-400">${lead.repairs?.toLocaleString()}</span></span>
        )}
      </div>
      
      <hr className="my-6 border-slate-800" />
      
      <section>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold text-amber-500">Disposition Engine</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Buscando compradores institucionales activos en el Zip Code {lead.zip_code}
        </p>
        
        {/* Pasamos el ID correctamente al Matchmaker */}
        <BuyerMatchCard dealId={lead.id} />
      </section>
    </div>
  );
};
