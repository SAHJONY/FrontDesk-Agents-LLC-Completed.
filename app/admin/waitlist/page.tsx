import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminWaitlist() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
      },
    }
  )

  // Protect the route - only logged-in users can see the list
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: entries } = await supabase
    .from('waitlist')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-slate-900">Waitlist Management</h1>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-slate-600">Email Address</th>
                <th className="px-6 py-3 text-sm font-semibold text-slate-600">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {entries?.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 text-slate-900">{entry.email}</td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
