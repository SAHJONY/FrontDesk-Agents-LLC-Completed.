import { 
    ClockIcon, 
    ChartBarIcon, 
    CogIcon,
    CheckCircleIcon 
} from '@heroicons/react/24/outline';

export default function CalibrationEnginePage() {
  const mockMetrics = {
    lastCalibration: '2 hours ago',
    accuracy: '98.5%',
    modelsCalibrated: 12,
    pendingReviews: 3
  };

  const calibrationHistory = [
    {
      id: 1,
      timestamp: '2024-01-15 14:30',
      model: 'GPT-4 Turbo',
      accuracy: '98.5%',
      status: 'completed'
    },
    {
      id: 2,
      timestamp: '2024-01-15 10:15',
      model: 'Claude 3',
      accuracy: '97.8%',
      status: 'completed'
    },
    {
      id: 3,
      timestamp: '2024-01-14 16:45',
      model: 'Llama 3',
      accuracy: '96.2%',
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Calibration Engine</h1>
          <p className="text-gray-600">Monitor and optimize AI model performance</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <ClockIcon className="h-8 w-8 text-green-600" />
              <span className="text-sm font-semibold text-gray-500">Last Sync</span>
            </div>
            <p className="text-xl font-bold text-gray-900 mt-2">{mockMetrics.lastCalibration}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <ChartBarIcon className="h-8 w-8 text-blue-600" />
              <span className="text-sm font-semibold text-gray-500">Accuracy</span>
            </div>
            <p className="text-xl font-bold text-gray-900 mt-2">{mockMetrics.accuracy}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <CogIcon className="h-8 w-8 text-purple-600" />
              <span className="text-sm font-semibold text-gray-500">Models</span>
            </div>
            <p className="text-xl font-bold text-gray-900 mt-2">{mockMetrics.modelsCalibrated}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <CheckCircleIcon className="h-8 w-8 text-yellow-600" />
              <span className="text-sm font-semibold text-gray-500">Pending</span>
            </div>
            <p className="text-xl font-bold text-gray-900 mt-2">{mockMetrics.pendingReviews}</p>
          </div>
        </div>

        {/* Calibration History */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Calibration History</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Accuracy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {calibrationHistory.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.accuracy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Run Calibration
          </button>
          <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}
