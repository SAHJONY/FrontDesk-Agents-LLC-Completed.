import { NextResponse } from 'next/server';
import { PERMANENT_TIERS, REGIONAL_MULTIPLIERS } from '../../../services/pricing';

export async function POST(request: Request) {
  try {
    const { tier, region } = await request.json();
    
    // Access the number directly from the PERMANENT_TIERS object
    const basePrice = PERMANENT_TIERS[tier as keyof typeof PERMANENT_TIERS];
    const multiplier = REGIONAL_MULTIPLIERS[region as keyof typeof REGIONAL_MULTIPLIERS] || 1.0;
    
    const finalPrice = Math.round(basePrice * multiplier);

    return NextResponse.json({ 
      price: finalPrice,
      currency: 'USD',
      status: 'LOCAL_PARITY_ACTIVE'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Billing Calculation Failed' }, { status: 400 });
  }
}
