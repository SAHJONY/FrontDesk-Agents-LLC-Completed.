import Sidebar from '@/components/Layout/Sidebar';
import {
  ShieldCheckIcon,
  DocumentCheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export default function ComplianceCenterPage() {
  const complianceItems = [
    {
      title: 'HIPAA Audit Trail',
      status: 'Compliant',
      lastCheck: '2 hours ago',
      icon: ShieldCheckIcon,
      color: 'green',
    },
    {
      title: 'Data Retention Policy',
      status: 'Compliant',
      lastCheck: '1 day ago',
      icon: DocumentCheckIcon,
      color: 'green',
    },
    {
      title: 'Security Certificates',
      status: 'Expiring Soon',
      lastCheck: '3 days ago',
      icon: ExclamationTriangleIcon,
      color: 'yellow',
    },
    {
      title: 'Access Logs',
      status: 'Compliant',
      lastCheck: '1 hour ago',
      icon: ClockIcon,
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#0f1e2e] to-[#000814]">
      <Sidebar />
      
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Compliance Center
            </h1>
            <p className="text-gray-400">
              Monitor and manage compliance across all systems
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-green-400" />
                <span className="text-sm text-green-400 font-medium">Active</span>
              </div>
              <p className="text-3xl font-bold text-white mb-1">98.5%</p>
              <p className="text-sm text-gray-400">Compliance Score</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <DocumentCheckIcon className="w-8 h-8 text-blue-400" />
                <span className="text-sm text-blue-400 font-medium">Current</span>
              </div>
              <p className="text-3xl font-bold text-white mb-1">24</p>
              <p className="text-sm text-gray-400">Active Policies</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <ClockIcon className="w-8 h-8 text-purple-400" />
                <span className="text-sm text-purple-400 font-medium">Updated</span>
              </div>
              <p className="text-3xl font-bold text-white mb-1">2h</p>
              <p className="text-sm text-gray-400">Last Audit</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <ExclamationTriangleIcon className="w-8 h-8 text-yellow-400" />
                <span className="text-sm text-yellow-400 font-medium">Action</span>
              </div>
              <p className="text-3xl font-bold text-white mb-1">2</p>
              <p className="text-sm text-gray-400">Items Need Review</p>
            </div>
          </div>

          {/* Compliance Items */}
          <div className="glass-card p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Compliance Status
            </h2>
            <div className="space-y-4">
              {complianceItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-${item.color}-500/20 flex items-center justify-center`}>
                      <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-400">Last checked: {item.lastCheck}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        item.color === 'green'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}
                    >
                      {item.status}
                    </span>
                    <button className="text-cyan-400 hover:text-cyan-300 font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Audits */}
          <div className="mt-8 glass-card p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Recent Audit Logs
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <p className="text-sm text-white flex-1">HIPAA compliance check completed</p>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <p className="text-sm text-white flex-1">Security audit report generated</p>
                <span className="text-xs text-gray-400">1 day ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <p className="text-sm text-white flex-1">Data retention policy updated</p>
                <span className="text-xs text-gray-400">3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
