import { createClient } from '@supabase/supabase-js'; // Use the JS client for Admin tasks
import { createClient as createServerClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const adminSupabase = await createServerClient();
    const { ownerId } = await req.json();

    // 1. SECURITY GATE: Ensure requester is the Super Admin
    const { data: { user } } = await adminSupabase.auth.getUser();
    if (user?.email !== process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // 2. INITIALIZE SERVICE ROLE CLIENT (Admin Bypass)
    // You need your SUPABASE_SERVICE_ROLE_KEY in your Vercel env variables
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 3. FETCH TARGET USER DATA
    const { data: targetUser, error: userError } = await supabaseAdmin.auth.admin.getUserById(ownerId);

    if (userError || !targetUser) {
      return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
    }

    // 4. SET IMPERSONATION COOKIE
    // We set a cookie that the dashboard middleware/pages will check for
    const cookieStore = await cookies();
    cookieStore.set('impersonate_id', ownerId, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour duration
    });

    return NextResponse.json({ 
      success: true, 
      redirectUrl: `/dashboard?mode=impersonate&user=${ownerId}` 
    });
  } catch (error) {
    console.error('Impersonation Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
