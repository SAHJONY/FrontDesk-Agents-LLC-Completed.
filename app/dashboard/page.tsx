import { createClient } from '@/utils/supabase/server';
import { 
  Users, 
  CalendarCheck, 
  MessageSquare, 
  TrendingUp,
  PhoneIncoming 
} from 'lucide-react';

export default async function AdminDashboard() {
  const supabase = createClient();

  // 1. Fetch Key Metrics
  const { count: totalLeads } = await supabase.from('leads').select('*', { count: 'exact', head: true });
  const { count: totalMeetings } = await supabase.from('appointments').select('*', { count: 'exact', head: true });
  
  // 2. Fetch Recent Appointments with Lead Data
  const { data: recentMeetings } = await supabase
    .from('appointments')
    .select(`
      id,
      appointment_date,
      appointment_time,
      leads (full_name, email)
    `)
    .order('appointment_date', { ascending: false })
    .limit(5);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">FrontDesk Command Center</h1>
        <p className="text-slate-500">Real-time AI Performance & Lead Management</p>
      </header>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Leads" value={totalLeads || 0} icon={<Users className="text-blue-600" />} />
        <StatCard title="Meetings Booked" value={totalMeetings || 0} icon={<CalendarCheck className="text-green-600" />} />
        <StatCard title="AI Sentiment" value="88%" icon={<TrendingUp className="text-purple-600" />} subtitle="+12% from last week" />
        <StatCard title="Active Agents" value="1" icon={<MessageSquare className="text-orange-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Meetings Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PhoneIncoming size={20} /> Upcoming Meetings
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-sm uppercase border-b">
                  <th className="pb-3">Lead Name</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentMeetings?.map((mtg: any) => (
                  <tr key={mtg.id} className="text-slate-700">
                    <td className="py-4 font-medium">{mtg.leads?.full_name || 'Anonymous'}</td>
                    <td className="py-4">{mtg.appointment_date}</td>
                    <td className="py-4">{mtg.appointment_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Agent Status */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Live AI Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
              <span>SDR Agent</span>
              <span className="flex items-center gap-2 text-green-400 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
              </span>
            </div>
            <p className="text-xs text-slate-400 italic">
              "Currently scanning new leads and preparing outbound SMS outreach."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, subtitle }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      </div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      {subtitle && <p className="text-xs text-green-600 mt-1">{subtitle}</p>}
    </div>
  );
}
