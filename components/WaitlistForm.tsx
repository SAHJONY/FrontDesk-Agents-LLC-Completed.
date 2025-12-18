'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // Initialize the Supabase client for the browser
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // This matches the 'waitlist' table you just created
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }])

    if (error) {
      console.error('Error:', error.message)
      setStatus('error')
    } else {
      setStatus('success')
      setEmail('') // Clear the input after success
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      {status === 'success' ? (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center animate-in fade-in zoom-in duration-300">
          <p className="font-semibold">You're on the list!</p>
          <p className="text-sm opacity-90">We'll notify you as soon as an agent is ready for your desk.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            placeholder="Enter your work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
          >
            {status === 'loading' ? 'Joining...' : 'Get Early Access'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="mt-3 text-sm text-red-400 text-center animate-shake">
          Something went wrong. You might already be on the list!
        </p>
      )}
    </div>
  )
}
