'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [count, setCount] = useState<number | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchCount = async () => {
      const { count: total, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
      if (!error && total !== null) setCount(total)
    }
    fetchCount()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const { error } = await supabase.from('waitlist').insert([{ email }])
    if (error) {
      setStatus('error')
    } else {
      setStatus('success')
      if (count !== null) setCount(count + 1)
      setEmail('')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {count !== null && (
        <div className="mb-6 text-[11px] font-bold text-blue-400 uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          Join {count} businesses in line
        </div>
      )}

      {status === 'success' ? (
        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase italic tracking-widest">
          Success. You are #{(count || 0)} on the list.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="WORK EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-6 py-4 rounded-2xl bg-slate-900 border border-white/10 text-white text-xs uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-4 bg-white text-black font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-slate-200 transition-all active:scale-95"
          >
            {status === 'loading' ? 'Processing...' : 'Request Early Access'}
          </button>
        </form>
      )}
    </div>
  )
}
