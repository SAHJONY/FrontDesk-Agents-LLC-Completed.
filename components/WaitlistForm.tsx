'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // Initialize the Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // --- INSERT THE CODE HERE ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // This matches the 'waitlist' table you created in Supabase
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (error) {
      console.error('Error:', error.message);
      setStatus('error');
    } else {
      setStatus('success');
      setEmail(''); // Clear the input on success
    }
  };
  // ----------------------------

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      {status === 'success' ? (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          Success! You've been added to the waitlist.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
           {/* Your input and button code here */}
        </form>
      )}
    </div>
  )
}
