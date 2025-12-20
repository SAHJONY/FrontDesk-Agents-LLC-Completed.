import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { record } = await req.json(); // Triggered when a new lead is added

  const response = await fetch('https://api.bland.ai/v1/sms', {
    method: 'POST',
    headers: {
      'authorization': Deno.env.get('BLAND_API_KEY')!,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone_number: record.phone_number,
      text: `Hi ${record.full_name}, I'm the AI assistant from FrontDesk Agents. I just tried calling you. When is a good time to chat?`,
    })
  });

  return new Response(JSON.stringify({ status: 'SMS Sent' }));
});
