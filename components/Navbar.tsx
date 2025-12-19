import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
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
    <nav className="flex justify-between items-center p-4 border-b bg-white relative z-[100]">
      <Link href="/" className="font-bold text-xl">
        FrontDesk Agents
      </Link>
      
      <div className="flex gap-4 items-center">
        <LanguageButton />
        {user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <form action={signOut}>
              <button className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            </form>
          </>
        ) : (
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
