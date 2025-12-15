// ./app/api/metrics/route.ts
import { NextResponse } from 'next/server';
import { createServiceSupabaseClient } from '@/utils/supabase/server'; 

export async function GET(request: Request) {
    
    let supabase;
    try {
        supabase = createServiceSupabaseClient();
    } catch (error) {
        console.error('Error al inicializar Supabase:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Consulta de ejemplo para obtener métricas (ajusta el nombre de la tabla si es necesario)
    const { data, error } = await supabase
        .from('agent_metrics') 
        .select(`
            total_calls_handled, 
            successful_bookings,
            lead_conversion_rate
        `)
        .order('id', { ascending: false })
        .limit(1)
        .single(); 

    if (error) {
        console.error('Error al obtener métricas de Supabase:', error);
        return NextResponse.json({ error: 'Failed to fetch metrics: ' + error.message }, { status: 500 });
    }

    return NextResponse.json({ 
        success: true,
        data: data 
    }, { status: 200 });
}
