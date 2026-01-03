const sendDeal = async (buyerId: string) => {
  const res = await fetch('/api/wholesale/send-deal', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` 
    },
    body: JSON.stringify({ buyerId, leadId: dealId })
  });
  if (res.ok) alert('Deal Flyer sent successfully!');
};

// Inside the JSX mapping:
<button 
  onClick={() => sendDeal(buyer.id)} 
  className="text-blue-400 hover:underline font-medium"
>
  Enviar Deal
</button>
