import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <Link href="/" className="font-bold text-xl">
        FrontDesk Agents LLC
      </Link>
      
      <div className="flex gap-6 items-center">
        {/* Public Features */}
        <Link href="/ai-agents">AI Agents</Link>
        <Link href="/pricing">Pricing</Link>
        
        {/* Conditional Navigation Features */}
        {user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/settings">Settings</Link>
            <form action={signOut}>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

