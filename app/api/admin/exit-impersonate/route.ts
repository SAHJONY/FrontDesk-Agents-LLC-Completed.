import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  
  // Remove the impersonation cookie
  cookieStore.delete('impersonated_owner_id');

  return NextResponse.json({ 
    success: true, 
    redirectUrl: '/admin/tenants' 
  });
}
