import React, { useEffect, useState } from 'react';

export const FinancialSummary = () => {
  const [data, setData] = useState({ paid: 0, pending: 0, total_pipeline: 0 });

  useEffect(() => {
    fetch('/api/owner/revenue-summary', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Dinero en Banco */}
      <div className="bg-slate-900 border-l-4 border-green-500 p-5 rounded-r shadow-xl">
        <p className="text-slate-400 text-xs uppercase font-bold">Cobrado (Funded)</p>
        <p className="text-3xl font-black text-white">${data.paid.toLocaleString()}</p>
      </div>

      {/* Pipeline en Cierre */}
      <div className="bg-slate-900 border-l-4 border-amber-500 p-5 rounded-r shadow-xl">
        <p className="text-slate-400 text-xs uppercase font-bold">En Cierre (Pending)</p>
        <p className="text-3xl font-black text-white">${data.pending.toLocaleString()}</p>
      </div>

      {/* Valor Total del Negocio */}
      <div className="bg-slate-900 border-l-4 border-blue-500 p-5 rounded-r shadow-xl">
        <p className="text-slate-400 text-xs uppercase font-bold">Pipeline Total</p>
        <p className="text-3xl font-black text-white">${data.total_pipeline.toLocaleString()}</p>
      </div>
    </div>
  );
};
