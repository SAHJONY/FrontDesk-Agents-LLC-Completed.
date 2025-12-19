import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
// CEO Move: Import the new Language Button
import LanguageButton from './LanguageButton' 

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
    <nav className="flex justify-between items-center p-4 border-b bg-white">
      <Link href="/" className="font-bold text-xl flex items-center gap-2">
        <span className="text-blue-600">🚀</span> FrontDesk Agents LLC
      </Link>
      
      <div className="flex gap-4 md:gap-6 items-center">
        {/* Public Features */}
        <Link href="/ai-agents" className="text-sm font-medium hover:text-blue-600 transition-colors">
          AI Agents
        </Link>
        <Link href="/pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
          Pricing
        </Link>

        {/* 1. WORLDWIDE LANGUAGE SELECTOR */}
        <LanguageButton />

        <div className="h-6 w-[1px] bg-gray-200 mx-1 hidden md:block" />
        
        {/* 2. AUTHENTICATION LOGIC */}
        {user ? (
          <>
            <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/settings" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Settings
            </Link>
            <form action={signOut}>
              <button className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                Logout
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Login
            </Link>
            <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
