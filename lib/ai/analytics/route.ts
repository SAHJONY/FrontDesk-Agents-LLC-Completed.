// app/api/analytics/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { calculateROI } from '@/lib/ai/analytics';

export async function GET(req: Request) {
  try {
    // 1. Obtener el ID del negocio (usualmente de la sesión del usuario)
    const businessId = "id-del-negocio-actual"; 

    // 2. Traer los datos de la DB
    const business = await db.businessConfig.findUnique({
      where: { id: businessId },
      include: { calls: true } // Incluye todas las llamadas registradas
    });

    if (!business) return NextResponse.json({ error: "No data found" }, { status: 404 });

    // 3. Ejecutar la función de cálculo
    const stats = calculateROI(business.calls, business);

    // 4. Formatear datos para el gráfico de Tremor (ejemplo de últimos 7 días)
    const chartData = [
      { date: "Jan 21", "Llamadas": 12, "Citas": 3 },
      { date: "Jan 22", "Llamadas": 15, "Citas": 5 },
      // ... esto se puede generar dinámicamente con business.calls
    ];

    return NextResponse.json({ ...stats, chartData });

  } catch (error) {
    return NextResponse.json({ error: "Error fetching analytics" }, { status: 500 });
  }
}
