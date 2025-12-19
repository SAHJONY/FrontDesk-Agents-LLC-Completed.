'use client'

import { useEffect, useState } from 'react'
// CEO Fix: Use the centralized client we created earlier
import { createClient } from '@/lib/supabase/client'
import LogoutButton from '@/components/LogoutButton'

export default function CallLogsDashboard() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Initialize standard client
  const supabase = createClient()

  useEffect(() => {
    const fetchLogs = async () => {
      // CEO Move: Standardize table naming. Your previous admin page used 'CallLog'
      // Ensure this matches your Supabase table name (CallLog vs call_logs)
      const { data, error } = await supabase
        .from('CallLog') 
        .select('*')
        .order('createdAt', { ascending: false })
      
      if (!error) {
        setLogs(data)
      } else {
        console.error('Build/Fetch Error:', error.message)
      }
      setLoading(false)
    }
    fetchLogs()
  }, []) // Remove 'supabase' from dependency array to prevent infinite loops

  return (
    <div className="min-h-screen bg-[#000814] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
              Call Intelligence
            </h1>
            <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-1">
              FrontDesk Agents LLC • Global Infrastructure
            </p>
          </div>
          <LogoutButton />
        </div>

        {loading ? (
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            <span className="text-slate-500 uppercase text-[10px] font-bold tracking-widest">
              Decrypting Global Logs...
            </span>
          </div>
        ) : (
          <div className="grid gap-6">
            {logs.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-[32px]">
                <p className="text-slate-500 text-sm">No recent intelligence data detected.</p>
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="group bg-slate-900/40 backdrop-blur-md border border-white/5 p-8 rounded-[32px] hover:bg-slate-900/60 hover:border-blue-500/20 transition-all duration-500">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[9px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">
                          Live Agent
                        </span>
                        <span className="text-slate-500 text-[10px] font-mono uppercase">
                          ID: {log.id.toString().slice(0, 8)}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight">{log.phoneNumber || log.phone_number}</h2>
                      <p className="text-[11px] text-slate-500 font-medium uppercase mt-1">
                        {new Date(log.createdAt || log.created_at).toLocaleString()}
                      </p>
                    </div>
                    
                    {log.recordingUrl && (
                      <div className="bg-black/40 p-2 rounded-2xl border border-white/5">
                        <audio controls className="h-8 opacity-60 hover:opacity-100 transition-opacity">
                          <source src={log.recordingUrl} type="audio/mpeg" />
                        </audio>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                    <p className="text-slate-300 leading-relaxed font-medium">
                      {log.summary || 'Summary analysis pending...'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
