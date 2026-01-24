import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Definimos las interfaces para mantener el tipado fuerte de TypeScript
interface Closing {
  status: string;
  assignment_fee: string | number;
}

interface RevenueSummary {
  paid: number;
  pending: number;
}

/**
 * Usamos '_request' con guion bajo para indicar a TypeScript que el parámetro 
 * está disponible por la firma de Next.js pero no se utiliza en esta lógica,
 * evitando así el error de compilación en Vercel.
 */
export async function GET(_request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Consultamos los datos de la tabla 'closings'
    const { data: closings, error } = await supabase
      .from('closings')
      .select('status, assignment_fee');

    if (error) throw error;

    // Calculamos el resumen de ingresos de forma eficiente
    const summary: RevenueSummary = (closings as Closing[] || []).reduce(
      (acc: RevenueSummary, curr: Closing) => {
        const fee = Number(curr.assignment_fee) || 0;
        
        if (curr.status === 'FUNDED') {
          acc.paid += fee;
        } else if (curr.status === 'PENDING') {
          acc.pending += fee;
        }
        return acc;
      },
      { paid: 0, pending: 0 }
    );

    return NextResponse.json({
      success: true,
      data: {
        totalPaid: summary.paid,
        totalPending: summary.pending,
        totalRevenue: summary.paid + summary.pending,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('❌ Revenue summary error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch revenue summary',
      },
      { status: 500 }
    );
  }
}
