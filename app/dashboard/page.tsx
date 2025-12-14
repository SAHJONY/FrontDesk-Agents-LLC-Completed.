// ./app/dashboard/page.tsx

import {
  ArrowTrendingUpIcon,
  PhoneIcon,
  UsersIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

// --- Components ---

interface KpiCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ElementType;
  color: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, trend, icon: Icon, color }) => (
  <div className={`bg-white shadow-lg rounded-xl p-6 border-t-4 border-${color}-500 transition hover:shadow-xl`}>
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className={`text-sm font-semibold flex items-center ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
        {trend}
      </span>
    </div>
    <div className="mt-4">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  </div>
);

interface CallLogEntry {
  id: number;
  time: string;
  duration: string;
  status: 'Completed' | 'Missed' | 'Transferred';
  agent: string;
  result: string;
}

// --- Mock Data ---

const kpis = [
  { title: 'Total Calls Handled', value: '7,452', trend: '+12.5%', icon: PhoneIcon, color: 'indigo' },
  { title: 'New Leads Captured', value: '1,890', trend: '+8.1%', icon: UsersIcon, color: 'blue' },
  { title: 'Appointments Booked', value: '624', trend: '+15.2%', icon: CalendarDaysIcon, color: 'teal' },
  { title: 'Est. Revenue Generated', value: '$45,800', trend: '+10.9%', icon: ArrowTrendingUpIcon, color: 'amber' },
];

const callLog: CallLogEntry[] = [
  { id: 1, time: '22:35:12', duration: '4:15', status: 'Completed', agent: 'SARA-v3', result: 'Booking Confirmed' },
  { id: 2, time: '22:30:45', duration: '0:00', status: 'Missed', agent: 'SARA-v3', result: 'No Answer' },
  { id: 3, time: '22:25:01', duration: '1:59', status: 'Transferred', agent: 'SARA-v3', result: 'Emergency Handoff' },
  { id: 4, time: '22:20:20', duration: '5:30', status: 'Completed', agent: 'SARA-v3', result: 'Information Provided' },
  { id: 5, time: '22:15:40', duration: '0:00', status: 'Missed', agent: 'SARA-v3', result: 'Busy Signal' },
];

// --- Main Page Component ---

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <ChartBarSquareIcon className="w-7 h-7 mr-3 text-indigo-600" />
          Operational Command Center
        </h1>
        <p className="text-gray-500 mt-1">Real-time performance and audit log for SARA AI Agents.</p>
      </header>

      {/* KPI Grid (Matching the corporate look) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </section>

      {/* Recent Activity Table */}
      <section className="bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-4">
          <PhoneIcon className="w-5 h-5 mr-2 inline text-indigo-500" />
          Recent Call Audit Log (Last Hour)
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {callLog.map((call) => (
                <tr key={call.id} className="hover:bg-indigo-50/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{call.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-semibold">{call.agent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{call.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {call.status === 'Completed' && (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                        {call.status}
                      </span>
                    )}
                    {call.status === 'Missed' && (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircleIcon className="w-4 h-4 mr-1" />
                        {call.status}
                      </span>
                    )}
                    {call.status === 'Transferred' && (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                        {call.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{call.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
