import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendLeadNotification, sendCapacityAlert, sendWhatsAppConfirmation } from '@/lib/notifications';
import { syncTenantStatus } from '@/lib/sovereign-sync';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { 
    call_id, 
    customer_number, 
    duration, 
    summary, 
    completed, 
    tenant_id,
    transcript // Bland AI envía el texto completo aquí
  } = body;

  if (!completed) return NextResponse.json({ status: 'ignored' });

  try {
    // 1. Log the Call and Update Minutes
    const { data: tenant, error } = await supabaseAdmin
      .from('tenants')
      .select('email, used_minutes, max_minutes, tier, whatsapp_enabled')
      .eq('id', tenant_id)
      .single();

    if (error || !tenant) throw new Error('Tenant not found');

    const callDurationMinutes = duration / 60;
    const newUsedMinutes = tenant.used_minutes + callDurationMinutes;

    await supabaseAdmin
      .from('tenants')
      .update({ used_minutes: newUsedMinutes })
      .eq('id', tenant_id);

    // 2. LEAD INTELLIGENCE & AUTO-CONVERSION
    // Si la llamada dura más de 30s, es un lead potencial.
    if (duration > 30) {
      await sendLeadNotification(tenant.email, {
        call_id,
        customer_number,
        summary,
        duration
      });

      // Lógica de Cierre: Detectar si se agendó una cita en el transcript
      const successKeywords = ['agendado', 'confirmado', 'cita', 'appointment', 'booked', 'listo'];
      const isBooked = successKeywords.some(key => transcript?.toLowerCase().includes(key));

      if (isBooked && tenant.whatsapp_enabled) {
        await sendWhatsAppConfirmation(customer_number, {
          type: 'APPOINTMENT_CONFIRMATION',
          tenant_name: tenant.name || 'La Clínica',
          summary: summary
        });
        
        // Registrar conversión en la tabla de analíticas para el ROI del dashboard
        await supabaseAdmin.from('conversions').insert({
          tenant_id,
          call_id,
          type: 'APPOINTMENT',
          value: 50 // Valor estimado de la cita para el Revenue Pipeline
        });
      }
    }

    // 3. Automated Capacity Monitoring (80% and 95% thresholds)
    const usageRatio = newUsedMinutes / tenant.max_minutes;
    if (usageRatio >= 0.95) {
      await sendCapacityAlert(tenant.email, tenant.tier, 95);
    } else if (usageRatio >= 0.80) {
      await sendCapacityAlert(tenant.email, tenant.tier, 80);
    }

    // 4. Sync status to Redis for Middleware (Real-time enforcement)
    await syncTenantStatus(tenant_id);

    return NextResponse.json({ 
      success: true, 
      processed_at: new Date().toISOString(),
      conversion_detected: !!isBooked 
    });

  } catch (err: any) {
    console.error('Webhook processing failed:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
