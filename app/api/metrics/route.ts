// ./app/api/metrics/route.ts
import { NextResponse } from 'next/server';
import { createServiceSupabaseClient } from '@/utils/supabase/server'; // <-- Importación corregida

export async function GET(request: Request) {
    
    // 1. Inicialización del Cliente de Servidor
    let supabase;
    try {
        supabase = createServiceSupabaseClient();
    } catch (error) {
        console.error('Error al inicializar Supabase:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Consulta a la base de datos (Ejemplo: Obtener métricas generales)
    const { data, error } = await supabase
        .from('agent_metrics') // Nombre de tu tabla de métricas
        .select(`
            total_calls_handled, 
            successful_bookings,
            lead_conversion_rate
        `)
        .order('id', { ascending: false })
        .limit(1)
        .single(); // Esperamos el registro de métricas más reciente

    if (error) {
        console.error('Error al obtener métricas de Supabase:', error);
        return NextResponse.json({ error: 'Failed to fetch metrics: ' + error.message }, { status: 500 });
    }

    // 3. Respuesta exitosa
    return NextResponse.json({ 
        success: true,
        data: data 
    }, { status: 200 });
}

// Nota: No se requiere exportar POST, PUT, etc., a menos que las uses.
