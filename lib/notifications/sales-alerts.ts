import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendSalesAlert(appointment: any) {
  const isHighValue = appointment.unit_age >= 10;
  const subject = isHighValue 
    ? `🚨 OPORTUNIDAD DE VENTA: Unidad de ${appointment.unit_age} años` 
    : `📅 Nueva Cita Agendada: ${appointment.customer_name}`;

  const html = `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0f172a;">${isHighValue ? '🔥 Lead de Reemplazo Detectado' : '✅ Nueva Cita'}</h2>
      <p><strong>Cliente:</strong> ${appointment.customer_name}</p>
      <p><strong>Teléfono:</strong> ${appointment.customer_phone}</p>
      <p><strong>Problema:</strong> ${appointment.problem_type}</p>
      ${isHighValue ? `<p style="color: #ea580c; font-weight: bold;">⚠️ La unidad tiene ${appointment.unit_age} años. ¡Es candidata para reemplazo!</p>` : ''}
      <hr />
      <p style="font-size: 12px; color: #64748b;">Enviado automáticamente por FrontDesk Agents LLC</p>
    </div>
  `;

  await resend.emails.send({
    from: 'Alertas <alerts@tu-dominio.com>',
    to: [appointment.owner_email], // Email del dueño de la empresa de HVAC
    subject: subject,
    html: html,
  });
}
