'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin/waitlist` }
    })
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-[#000814] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-white/10 p-10 rounded-[32px] text-center">
        <h1 className="text-2xl font-black text-white mb-4 uppercase italic">Admin Portal</h1>
        {sent ? (
          <p className="text-emerald-400 text-sm uppercase font-bold tracking-widest">Check your email.</p>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" 
              placeholder="ADMIN EMAIL" 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-4 bg-slate-800 border border-white/5 rounded-2xl text-white text-center text-xs tracking-widest"
            />
            <button className="w-full py-4 bg-white text-black font-black rounded-2xl uppercase text-xs tracking-widest">
              Get Magic Link
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
