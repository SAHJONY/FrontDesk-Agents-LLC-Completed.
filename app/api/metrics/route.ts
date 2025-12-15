// ./app/api/metrics/route.ts

// Asegúrate de usar la importación correcta de Supabase
import { createClient } from '@supabase/supabase-js'; 
import { NextResponse } from 'next/server';

// Inicialización del cliente Supabase del lado del servidor
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_KEY || ''
);

// Definición de la función GET (Ejemplo de métricas)
export async function GET() {
    try {
        // Ejemplo de consulta para el dashboard
        const { data: metrics, error } = await supabase
            .from('calls') // Asegúrate de que tu tabla se llama 'calls' o usa el nombre correcto
            .select('count')
            .limit(1); // Solo un ejemplo para verificar la conexión

        if (error) {
            console.error("Error al obtener métricas de Supabase:", error);
            return NextResponse.json({ error: 'Fallo en la base de datos', details: error.message }, { status: 500 });
        }

        return NextResponse.json({ 
            status: 'ok', 
            data: metrics 
        });

    } catch (e) {
        console.error("Error inesperado en la API de métricas:", e);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
