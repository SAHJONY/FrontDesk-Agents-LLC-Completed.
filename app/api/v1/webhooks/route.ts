import { NextResponse } from 'next/server';
import { aiCeoAgent } from '@/services/ai-ceo.service';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const industryContext = req.headers.get('x-industry-type') || 'GENERAL';

    // The AI CEO takes the wheel
    const response = await aiCeoAgent.orchestrate({
      payload: body,
      industry: industryContext,
      region: req.headers.get('x-region')
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'CEO Handoff Failed' }, { status: 500 });
  }
}
