import { NextResponse } from 'next/server';
import { createClient } from "@/utils/supabase/server"; // Ensure this helper exists
import { PERMANENT_TIERS, REGIONAL_MULTIPLIERS } from '../../../services/pricing';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Verify Authentication (Optional but recommended)
    const { data: { user } } = await supabase.auth.getUser();
    
    const { tier, region } = await request.json();
    
    // 2. Validate Input
    if (!tier || !PERMANENT_TIERS[tier as keyof typeof PERMANENT_TIERS]) {
      return NextResponse.json({ error: 'Invalid Tier' }, { status: 400 });
    }

    // 3. Calculation Logic
    const basePrice = PERMANENT_TIERS[tier as keyof typeof PERMANENT_TIERS];
    const multiplier = REGIONAL_MULTIPLIERS[region as keyof typeof REGIONAL_MULTIPLIERS]?.multiplier || 1.0;
    
    let finalPrice = Math.round(basePrice * multiplier);

    // 4. Supabase Logic: Check for user-specific modifiers (example)
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('custom_discount')
        .eq('id', user.id)
        .single();
      
      if (profile?.custom_discount) {
        finalPrice = finalPrice * (1 - profile.custom_discount);
      }
    }

    return NextResponse.json({ 
      price: finalPrice,
      currency: 'USD',
      status: 'LOCAL_PARITY_ACTIVE',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Pricing Error:", error);
    return NextResponse.json({ error: 'Billing Calculation Failed' }, { status: 400 });
  }
}
