import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { ownerId } = await req.json();

    // 1. Security Check: Verify requester is the Super Admin
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email !== process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // 2. Logic: Here you could set a custom cookie or update 
    // metadata to signify the admin is "acting as" this owner.
    // For now, we'll return success so the frontend can redirect.
    
    return NextResponse.json({ success: true, redirectUrl: `/dashboard?as=${ownerId}` });
  } catch (error) {
    console.error('Impersonation Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
