import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

const WELCOME_ACTIVATION_PROMPT = `
Welcome to FrontDesk Agents LLC! This is [Owner_Name] from your new AI dispatch system.

I'm calling to confirm your activation. Your [CRM_Provider] integration is now live in [City].

For emergency transfers, we'll route to: [Emergency_Phone].

Your sovereign AI fleet is ready to handle incoming calls 24/7. Would you like me to walk you through the dashboard?
`;

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const supabase = createServerSupabase();

    // 1. Validate required fields
    if (!formData.businessName || !formData.crmProvider || !formData.crmApiKey) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Save CRM configuration to Supabase
    const { data: config, error: saveError } = await supabase
      .from('client_configurations')
      .insert({
        business_name: formData.businessName,
        crm_provider: formData.crmProvider,
        crm_api_key: formData.crmApiKey,
        emergency_phone: formData.emergencyPhone,
        owner_name: formData.ownerName,
        owner_mobile: formData.ownerMobile,
        city: formData.city,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (saveError) {
      console.error('Supabase error:', saveError);
      return NextResponse.json(
        { error: 'Failed to save configuration' },
        { status: 500 }
      );
    }

    // 3. Send welcome call via Bland AI (optional - only if phone provided)
    if (formData.ownerMobile && process.env.BLAND_AI_KEY) {
      try {
        await fetch('https://api.bland.ai/v1/calls', {
          method: 'POST',
          headers: { 
            'authorization': process.env.BLAND_AI_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone_number: formData.ownerMobile,
            task: WELCOME_ACTIVATION_PROMPT
              .replace('[Owner_Name]', formData.ownerName || 'there')
              .replace('[CRM_Provider]', formData.crmProvider)
              .replace('[City]', formData.city || 'your area')
              .replace('[Emergency_Phone]', formData.emergencyPhone || 'your emergency line'),
            voice: "nat",
            wait_for_greeting: true
          })
        });
      } catch (callError) {
        console.error('Welcome call failed:', callError);
        // Don't fail the entire request if welcome call fails
      }
    }

    return NextResponse.json({
      success: true,
      clientId: config.id,
      message: 'Configuration saved successfully'
    });

  } catch (error: any) {
    console.error('Configuration error:', error);
    return NextResponse.json(
      { error: error.message || 'Configuration failed' },
      { status: 500 }
    );
  }
}
