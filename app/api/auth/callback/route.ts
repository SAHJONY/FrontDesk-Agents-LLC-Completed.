import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    // CRITICAL FIX: await cookies() for Next.js 15 compatibility
    const cookieStore = await cookies(); 
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Exchange the temporary code for a real User Session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const user = data.user;

      // 1. Fetch user profile to handle localization or Tier-based routing
      const { data: profile } = await supabase
        .from('profiles')
        .select('locale, region_tier')
        .eq('id', user.id)
        .single();

      const locale = profile?.locale || 'en';
      
      console.log(`✅ User ${user.email} authenticated. Region: ${profile?.region_tier || 'Standard'}`);
      
      // 2. You can trigger post-registration logic here (e.g. Welcome Email)
    }
  }

  // Always redirect back to the dashboard or a specific "Success" page
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
