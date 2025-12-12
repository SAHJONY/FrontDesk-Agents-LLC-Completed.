import { 
    CpuChipIcon, 
    UsersIcon, 
    ChartBarIcon,
    BoltIcon 
} from '@heroicons/react/24/outline';

export default function AgenticOrchestrationPage() {
  const agents = [
    {
      id: '1',
      name: 'Reception Agent',
      role: 'Primary Contact',
      icon: UsersIcon,
      status: 'active',
      utilization: 85,
      collaborationRate: 92,
      metrics: {
        callsHandled: 1247,
        avgDuration: '4m 32s',
        satisfaction: 4.8
      }
    },
    {
      id: '2',
      name: 'Scheduling Agent',
      role: 'Appointment Manager',
      icon: ChartBarIcon,
      status: 'active',
      utilization: 78,
      collaborationRate: 88,
      metrics: {
        callsHandled: 892,
        avgDuration: '3m 15s',
        satisfaction: 4.9
      }
    },
    {
      id: '3',
      name: 'Support Agent',
      role: 'Technical Support',
      icon: CpuChipIcon,
      status: 'idle',
      utilization: 45,
      collaborationRate: 75,
      metrics: {
        callsHandled: 456,
        avgDuration: '6m 48s',
        satisfaction: 4.7
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'idle':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 80) return 'bg-green-500';
    if (utilization >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Agentic Orchestration</h1>
          <p className="text-gray-600">Monitor and manage AI agent collaboration and performance</p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Agents</p>
              <UsersIcon className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{agents.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Active Now</p>
              <BoltIcon className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {agents.filter(a => a.status === 'active').length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Avg Utilization</p>
              <ChartBarIcon className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {Math.round(agents.reduce((sum, a) => sum + a.utilization, 0) / agents.length)}%
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Collaboration</p>
              <CpuChipIcon className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {Math.round(agents.reduce((sum, a) => sum + a.collaborationRate, 0) / agents.length)}%
            </p>
          </div>
        </div>

        {/* Agent Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <agent.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-600">{agent.role}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </span>
                </div>

                {/* Utilization Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Utilization</span>
                    <span className="text-sm font-bold text-gray-900">{agent.utilization}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getUtilizationColor(agent.utilization)}`}
                      style={{ width: `${agent.utilization}%` }}
                    ></div>
                  </div>
                </div>

                {/* Collaboration Rate */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Collaboration</span>
                    <span className="text-sm font-bold text-gray-900">{agent.collaborationRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${agent.collaborationRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Calls Handled</span>
                  <span className="text-sm font-bold text-gray-900">{agent.metrics.callsHandled.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg Duration</span>
                  <span className="text-sm font-bold text-gray-900">{agent.metrics.avgDuration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Satisfaction</span>
                  <span className="text-sm font-bold text-gray-900">{agent.metrics.satisfaction}/5.0</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collaboration Flow */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Agent Collaboration Flow</h2>
          <div className="flex items-center justify-center gap-8 py-8">
            {agents.map((agent, index) => (
              <div key={agent.id} className="flex items-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <agent.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{agent.name}</p>
                  <p className="text-xs text-gray-500">{agent.collaborationRate}%</p>
                </div>
                {index < agents.length - 1 && (
                  <div className="mx-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
