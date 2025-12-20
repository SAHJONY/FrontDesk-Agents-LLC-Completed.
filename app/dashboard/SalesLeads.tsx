const callLead = async (lead: any) => {
  const userId = '42c9eda0-81fd-4d7a-b9f7-49bba359d6ce'; // Your verified UID

  try {
    const response = await fetch('https://awzczbaarskqjgdatefv.supabase.co/functions/v1/bland-call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization is handled via the Service Role Key in the Edge Function
      },
      body: JSON.stringify({
        record: lead,
        metadata: { user_id: userId }
      }),
    });

    if (response.ok) {
      alert(`Llamada iniciada para ${lead.full_name}`);
    } else {
      console.error('Error al iniciar la llamada');
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
};
