export async function sendCommissionAlert(data: {
  customerName: string;
  unitAge: number;
  estimatedCommission: number;
  companyName: string;
}) {
  const message = {
    text: `💰 ¡NUEVA COMISIÓN DETECTADA!\n\n` +
           `🏢 Cliente: ${data.companyName}\n` +
           `👤 Prospecto: ${data.customerName}\n` +
           `🏗️ Unidad: ${data.unitAge} años\n` +
           `💸 Tu Comisión (5%): $${data.estimatedCommission}\n\n` +
           `Ver en el Founder Dashboard: https://frontdeskagents.com/admin`
  };

  // Puedes usar Slack Webhooks o Discord Webhooks aquí
  await fetch(process.env.SLACK_COMMISSION_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  });
}
