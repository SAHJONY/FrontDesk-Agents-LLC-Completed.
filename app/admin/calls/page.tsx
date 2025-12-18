'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import LogoutButton from '@/components/LogoutButton'

export default function CallLogsDashboard() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchLogs = async () => {
      const { data, error } = await supabase
        .from('call_logs')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error) setLogs(data)
      setLoading(false)
    }
    fetchLogs()
  }, [supabase])

  return (
    <div className="min-h-screen bg-[#000814] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Call Intelligence</h1>
            <p className="text-slate-500 text-xs uppercase tracking-[0.3em]">FrontDesk Agents LLC Internal</p>
          </div>
          <LogoutButton />
        </div>

        {loading ? (
          <div className="animate-pulse text-slate-500 uppercase text-xs">Loading encrypted logs...</div>
        ) : (
          <div className="grid gap-4">
            {logs.map((log) => (
              <div key={log.id} className="bg-slate-900/50 border border-white/5 p-6 rounded-[24px] hover:border-blue-500/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full font-bold uppercase tracking-widest">
                      {log.status}
                    </span>
                    <h2 className="text-lg font-bold mt-2">{log.phone_number}</h2>
                    <p className="text-xs text-slate-500">{new Date(log.created_at).toLocaleString()}</p>
                  </div>
                  
                  {log.recording_url && (
                    <audio controls className="h-8 opacity-80 hover:opacity-100 transition-opacity">
                      <source src={log.recording_url} type="audio/mpeg" />
                    </audio>
                  )}
                </div>

                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                  <p className="text-sm text-slate-300 italic">"{log.summary || 'Summary pending...'}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
