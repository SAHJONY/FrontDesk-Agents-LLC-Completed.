import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Ensure these exist or comment them out if not ready
// import { welcomePack, languages } from '@/lib/constants';
// import { sendEmail } from '@/lib/mail';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Exchange code for session
    const { data: { user } } = await supabase.auth.exchangeCodeForSession(code);

    if (user) {
      // Logic moved INSIDE the async function
      const { data: profile } = await supabase
        .from('profiles')
        .select('locale, region_tier')
        .eq('id', user.id)
        .single();

      const locale = profile?.locale || 'en';
      const region_tier = profile?.region_tier || 'Standard';

      console.log(`User ${user.email} signed in with locale: ${locale}`);
      
      // Add your email sending logic here if needed
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
