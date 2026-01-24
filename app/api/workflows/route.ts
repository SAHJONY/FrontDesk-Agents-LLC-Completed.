import { NextRequest, NextResponse } from 'next/server';
// Hemos comentado o eliminado las importaciones no utilizadas para satisfacer al linter de Next.js 15
// import { workflowEngine, Workflow } from '@/lib/automation/workflow-engine';
import { requireSupabaseServer } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  try {
    const supabase = await requireSupabaseServer();
    
    const { data: workflows, error } = await supabase
      .from('workflows')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(workflows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Si tienes un método POST que aún no usa el engine, asegúrate de que no declare variables que no use
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Lógica para guardar el workflow...
    return NextResponse.json({ success: true, body });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
