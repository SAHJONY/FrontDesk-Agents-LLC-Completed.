import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(_req: Request) {
  try {
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const today = new Date().toISOString().split('T')[0];
    
    // 1. Cálculos de Revenue basados en el Triage HVAC
    const revenueToday = appointments
      .filter(a => a.created_at.startsWith(today))
      .reduce((sum, a) => sum + (Number(a.estimated_value) || 0), 0);

    const goldLeads = appointments.filter(a => a.unit_age >= 10);
    const emergencyCount = appointments.filter(a => a.is_emergency).length;
    
    // 2. Cálculo de Comisión Proyectada (Tu 5% sobre Gold Leads)
    // Asumimos ticket de reemplazo promedio de $10,000
    const projectedCommission = goldLeads.length * (10000 * 0.05);

    return NextResponse.json({
      success: true,
      data: {
        systemHealth: { status: 'operational', apiUptime: '99.9%' },
        metrics: {
          totalCalls: appointments.length,
          emergencyRate: `${((emergencyCount / (appointments.length || 1)) * 100).toFixed(1)}%`,
          goldLeadCount: goldLeads.length, // Vital para la oferta del 5%
        },
        revenue: {
          today: revenueToday,
          totalCaptured: appointments.reduce((sum, a) => sum + (Number(a.estimated_value) || 0), 0),
          projectedAgencyCommission: projectedCommission, // Cuánto has ganado tú
          mrr: 499,
          breakdown: [
            { label: 'Urgencias ($450)', value: emergencyCount },
            { label: 'Oportunidades de Reemplazo', value: goldLeads.length }
          ]
        },
        recentActivity: appointments.slice(0, 8).map(a => ({
          id: a.id,
          // Etiqueta dinámica para el UI
          type: a.unit_age >= 10 ? 'GOLD_LEAD' : (a.is_emergency ? 'EMERGENCY' : 'STANDARD'),
          title: a.customer_name,
          value: `$${Number(a.estimated_value).toLocaleString()}`,
          isOldUnit: a.unit_age >= 10,
          time: a.created_at
        })),
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('❌ Dashboard live error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
