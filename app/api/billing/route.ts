import { NextResponse } from 'next/server';
import { PERMANENT_TIERS, REGIONAL_MULTIPLIERS } from '../../../services/pricing';

export async function POST(request: Request) {
  const { tier, region } = await request.json();
  
  const basePrice = PERMANENT_TIERS[tier as keyof typeof PERMANENT_TIERS].usd;
  const multiplier = REGIONAL_MULTIPLIERS[region as keyof typeof REGIONAL_MULTIPLIERS];
  const finalPrice = Math.round(basePrice * multiplier);

  return NextResponse.json({
    success: true,
    amount: finalPrice,
    currency: 'USD',
    tier: tier
  });
}
