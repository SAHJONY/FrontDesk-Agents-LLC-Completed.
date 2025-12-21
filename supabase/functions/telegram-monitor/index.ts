// supabase/functions/telegram-monitor/index.ts
const TELEGRAM_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
const CHAT_ID = Deno.env.get('MY_TELEGRAM_CHAT_ID');

Deno.serve(async (req) => {
  const payload = await req.json();
  const { record, table, type } = payload;

  let message = `🚀 **Sovereign Alert**\n`;
  
  if (table === 'clients' && type === 'INSERT') {
    message += `New Client: ${record.company_name}\nIndustry: ${record.industry}\nID: ${record.id}`;
  } else if (table === 'knowledge_blocks') {
    message += `Brain Updated: ${record.category}\nClient ID: ${record.client_id}`;
  }

  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' }),
  });

  return new Response("Alert Sent");
})
