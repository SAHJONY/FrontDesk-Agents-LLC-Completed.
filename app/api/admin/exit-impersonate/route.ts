import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const cookieStore = await cookies()
  
  // Clear the impersonation cookie
  cookieStore.delete('impersonate_id')
  
  // Redirect back to the Admin control center
  return NextResponse.redirect(new URL('/admin/tenants', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
}
