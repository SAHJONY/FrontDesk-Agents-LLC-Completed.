import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  
  // Clear the cookies that trigger 'Impersonation Mode' in your createClient
  cookieStore.delete('impersonate_id'); 
  cookieStore.delete('impersonated_owner_id');

  return NextResponse.json({ 
    success: true, 
    redirectUrl: '/admin/tenants' 
  });
}
