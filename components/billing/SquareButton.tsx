// components/billing/SquareButton.tsx
'use client';

export default function SquareButton({ userId, email }: { userId: string, email: string }) {
  const handleSquarePayment = async () => {
    const res = await fetch('/api/checkout/square', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, email }),
    });
    
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Error al iniciar pago con Square");
    }
  };

  return (
    <button 
      onClick={handleSquarePayment}
      className="bg-[#2a2a2a] hover:bg-black text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all border border-gray-700"
    >
      <span className="text-xl">■</span> Pagar con Square
    </button>
  );
}
