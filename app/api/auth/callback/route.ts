import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Exchange the code for a session
    const { data: { user } } = await supabase.auth.exchangeCodeForSession(code);

    if (user) {
      // --- START OF YOUR CODE ---
      // This is now inside an "async" function, so "await" will work!
      const { data: profile } = await supabase
        .from('profiles')
        .select('locale, region_tier')
        .eq('id', user.id)
        .single();

      const locale = profile?.locale || 'en';
      const region_tier = profile?.region_tier || 'Standard';

      // Assuming welcomePack and languages are imported at the top
      // await sendEmail({ ... }); 
      // --- END OF YOUR CODE ---
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
