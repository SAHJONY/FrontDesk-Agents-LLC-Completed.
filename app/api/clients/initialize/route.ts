import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Inicialización del cliente con variables de entorno
const supabase = createClient(
  process.env.SUPABASE_URL!, 
  process.env.SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { company_name, industry, avg_value, sauce_content } = body;

    // 1. Crear el Cliente Maestro
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .insert([{ 
        company_name: company_name || 'Sovereign Law Group',
        industry: industry || 'Legal',
        brand_color: '#00FFFF',
        average_deal_value: avg_value || 5000.00 
      }])
      .select()
      .single()

    if (clientError) throw clientError;

    // 2. Inyectar la primera "Salsa Secreta" (Objection Handling)
    const { error: sauceError } = await supabase
      .from('knowledge_blocks')
      .insert([{
        client_id: client.id,
        industry_type: industry?.toLowerCase() || 'legal',
        category: 'objection_handling',
        content: sauce_content || 'Si el prospecto dice que es caro, enfatizar el ROI.',
        priority: 10
      }])

    if (sauceError) throw sauceError;

    return NextResponse.json({ 
      success: true, 
      clientId: client.id,
      message: 'Infraestructura del cliente inicializada.' 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
