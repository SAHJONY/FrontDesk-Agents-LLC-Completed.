import React from 'react';

export const ClosingAction = ({ leadId, buyerId, fee }: any) => {
  const handleClosing = async () => {
    const res = await fetch('/api/wholesale/record-closing', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      },
      body: JSON.stringify({
        leadId,
        buyerId,
        fee,
        closingDate: new Date().toISOString().split('T')[0]
      })
    });

    if (res.ok) {
      alert(`Deal Secured! Assignment fee of $${fee} recorded.`);
      window.location.reload();
    }
  };

  return (
    <button 
      onClick={handleClosing}
      className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded shadow-lg"
    >
      Confirmar Cierre y Cobrar Comisión
    </button>
  );
};
