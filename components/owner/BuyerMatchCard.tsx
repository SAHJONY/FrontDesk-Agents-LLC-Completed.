import React, { useState } from 'react';

export const BuyerMatchCard = ({ dealId }: { dealId: string }) => {
  const [matches, setMatches] = useState([]);

  // Función 1: Buscar compradores (Matchmaker)
  const findBuyers = async () => {
    const res = await fetch(`/api/wholesale/matchmaker?leadId=${dealId}`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }
    });
    const data = await res.json();
    setMatches(data.matching_buyers || []);
  };

  // Función 2: Enviar el deal (Solución al Error de Compilación)
  const sendDeal = async (buyerId: string) => {
    const res = await fetch('/api/wholesale/send-deal', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      },
      // Ahora dealId es accesible porque está dentro del scope del componente
      body: JSON.stringify({ buyerId, leadId: dealId })
    });
    
    if (res.ok) {
      alert('¡Flyer del Deal enviado con éxito!');
    } else {
      alert('Error al enviar el deal. Revisa la consola.');
    }
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-amber-500 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-amber-400 font-bold text-sm">Compradores Cash Disponibles</h4>
        <button 
          onClick={findBuyers} 
          className="text-xs bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded transition-colors"
        >
          Ejecutar Matchmaker
        </button>
      </div>

      {matches.length > 0 ? (
        <ul className="space-y-2">
          {matches.map((buyer: any) => (
            <li key={buyer.id} className="flex justify-between items-center bg-slate-700 p-2 rounded text-sm text-white">
              <div className="flex flex-col">
                <span className="font-medium">{buyer.name}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">{buyer.type}</span>
              </div>
              <button 
                onClick={() => sendDeal(buyer.id)} 
                className="text-blue-400 hover:text-blue-300 font-semibold text-xs border border-blue-400/30 px-2 py-1 rounded"
              >
                Enviar Deal
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-slate-500 italic">Haz clic para buscar compradores compatibles con este Buy Box.</p>
      )}
    </div>
  );
};

