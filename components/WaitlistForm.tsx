'use client'

import { useState, useEffect } from 'react' // Add useEffect
import { createBrowserClient } from '@supabase/ssr'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [count, setCount] = useState<number | null>(null) // State for the counter

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Fetch the count on component mount
  useEffect(() => {
    const fetchCount = async () => {
      const { count: total, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
      
      if (!error && total !== null) {
        setCount(total)
      }
    }
    fetchCount()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }])

    if (error) {
      setStatus('error')
    } else {
      setStatus('success')
      // Optimistically update count for the user
      if (count !== null) setCount(count + 1)
      setEmail('')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      {/* --- The Waitlist Counter UI --- */}
      {count !== null && count > 0 && (
        <div className="mb-6 text-sm text-slate-400 flex items-center justify-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Join {count} other businesses already on the list
        </div>
      )}

      {status === 'success' ? (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center">
          Success! You're business #{count} in line.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            placeholder="Enter your work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-white"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
          >
            {status === 'loading' ? 'Joining...' : 'Get Early Access'}
          </button>
        </form>
      )}
    </div>
  )
}
