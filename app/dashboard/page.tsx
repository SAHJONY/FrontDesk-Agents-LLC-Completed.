'use client';

import { useState } from 'react';
import {
  LineChart,
  AreaChart,
  Gauge,
  Card,
  Title,
  Text,
  Metric,
  Badge,
} from '@tremor/react';
import { 
  CheckCircleIcon, 
  CurrencyDollarIcon, 
  RocketLaunchIcon,
  SparklesIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  PhoneIcon,
  ClockIcon,
  CalendarIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

// Mock Data (Replace with actual data fetching logic)
const automationData = [
  { date: 'Jan 1', 'Calls Handled': 100, 'Converted': 20 },
  { date: 'Jan 7', 'Calls Handled': 250, 'Converted': 60 },
  { date: 'Jan 14', 'Calls Handled': 380, 'Converted': 95 },
  { date: 'Jan 21', 'Calls Handled': 520, 'Converted': 140 },
  { date: 'Jan 28', 'Calls Handled': 650, 'Converted': 185 },
  { date: 'Feb 4', 'Calls Handled': 780, 'Converted': 230 },
  { date: 'Feb 11', 'Calls Handled': 890, 'Converted': 275 },
];

const roiData = [
  { name: 'Human Ops Cost', value: 10000 },
  { name: 'Agent Cost', value: 3000 },
];

const recentCalls = [
  {
    id: '1',
    caller: 'John Smith',
    phone: '+1 (555) 123-4567',
    time: '2 minutes ago',
    duration: '4:32',
    status: 'completed',
    outcome: 'Appointment scheduled for Dec 18, 2:00 PM'
  },
  {
    id: '2',
    caller: 'Maria Garcia',
    phone: '+1 (555) 234-5678',
    time: '8 minutes ago',
    duration: '2:18',
    status: 'completed',
    outcome: 'General inquiry - Insurance coverage'
  },
  {
    id: '3',
    caller: 'David Chen',
    phone: '+1 (555) 345-6789',
    time: '15 minutes ago',
    duration: '3:45',
    status: 'completed',
    outcome: 'Prescription refill requested'
  },
  {
    id: '4',
    caller: 'Sarah Johnson',
    phone: '+1 (555) 456-7890',
    time: '23 minutes ago',
    duration: '5:12',
    status: 'transferred',
    outcome: 'Transferred to Dr. Williams'
  },
  {
    id: '5',
    caller: 'Michael Brown',
    phone: '+1 (555) 567-8901',
    time: '31 minutes ago',
    duration: '1:58',
    status: 'missed',
    outcome: 'No voicemail left'
  }
];

const callVolumeData = [
  { time: '9 AM', calls: 12 },
  { time: '10 AM', calls: 24 },
  { time: '11 AM', calls: 18 },
  { time: '12 PM', calls: 15 },
  { time: '1 PM', calls: 22 },
  { time: '2 PM', calls: 28 },
  { time: '3 PM', calls: 32 },
  { time: '4 PM', calls: 25 },
  { time: '5 PM', calls: 19 }
];

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState('week');

  // Success Metrics from the plan
  const automationSuccessRate = 85; // Target >= 80%
  const costReduction = 70; // Target >= 30%
  const pipelineArr = 150; // Target >= $100k (in thousands)

  const stats = [
    {
      name: 'Total Calls',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: PhoneIcon,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'Appointments Booked',
      value: '428',
      change: '+8.3%',
      trend: 'up',
      icon: CalendarIcon,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Avg. Handle Time',
      value: '3:24',
      change: '-2.1%',
      trend: 'down',
      icon: ClockIcon,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'Satisfaction Rate',
      value: '98.2%',
      change: '+1.4%',
      trend: 'up',
      icon: CheckCircleIcon,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const maxCalls = Math.max(...callVolumeData.map(d => d.calls));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#1a2332] to-[#000814]">
      <main className="p-6 md:p-10">
        {/* Premium Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <ChartBarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Revenue Proof Dashboard
              </h1>
              <p className="text-gray-400 mt-1">
                Executive overview of Multi-POV sprint performance and key monetization metrics
              </p>
            </div>
          </div>

          {/* Live Indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-300">Live Data • Updated 2 min ago</span>
          </div>
        </div>

        {/* KPI Cards Section - Premium Style */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Automation Success Card */}
          <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                  <ArrowTrendingUpIcon className="w-4 h-4" />
                  +5%
                </div>
              </div>
              
              <Text className="text-gray-400 text-sm font-medium mb-2">Automation Success</Text>
              <Metric className="text-4xl font-bold text-white mb-3">{automationSuccessRate}%</Metric>
              
              <div className="flex items-center space-x-2 pt-3 border-t border-white/10">
                <CheckCircleIcon className="w-5 h-5 text-green-400" />
                <Text className="text-sm text-gray-300">Target: 80% Achieved ✓</Text>
              </div>
            </div>
          </div>

          {/* Cost Reduction Card */}
          <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-green-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <CurrencyDollarIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                  <ArrowTrendingUpIcon className="w-4 h-4" />
                  +12%
                </div>
              </div>
              
              <Text className="text-gray-400 text-sm font-medium mb-2">Cost Reduction vs Human Ops</Text>
              <Metric className="text-4xl font-bold text-white mb-3">{costReduction}%</Metric>
              
              <div className="flex items-center space-x-2 pt-3 border-t border-white/10">
                <CurrencyDollarIcon className="w-5 h-5 text-green-400" />
                <Text className="text-sm text-gray-300">Saving $7,000/month</Text>
              </div>
            </div>
          </div>

          {/* Pipeline ARR Card */}
          <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <RocketLaunchIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <ArrowTrendingUpIcon className="w-4 h-4" />
                  +25%
                </div>
              </div>
              
              <Text className="text-gray-400 text-sm font-medium mb-2">Pipeline ARR Value</Text>
              <Metric className="text-4xl font-bold text-white mb-3">${pipelineArr}k</Metric>
              
              <div className="flex items-center space-x-2 pt-3 border-t border-white/10">
                <RocketLaunchIcon className="w-5 h-5 text-purple-400" />
                <Text className="text-sm text-gray-300">Annual contract track</Text>
              </div>
            </div>
          </div>

          {/* Additional Stats Card */}
          <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <PhoneIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <ArrowTrendingUpIcon className="w-4 h-4" />
                  +8%
                </div>
              </div>
              
              <Text className="text-gray-400 text-sm font-medium mb-2">Total Calls Handled</Text>
              <Metric className="text-4xl font-bold text-white mb-3">2,847</Metric>
              
              <div className="flex items-center space-x-2 pt-3 border-t border-white/10">
                <PhoneIcon className="w-5 h-5 text-cyan-400" />
                <Text className="text-sm text-gray-300">This week</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="mt-8 flex justify-end">
          <div className="flex gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1">
            {['Today', 'Week', 'Month'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period.toLowerCase())}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  timeframe === period.toLowerCase()
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Charts Section - Premium Style */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conversion Funnel - Premium Card */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title className="text-white text-2xl font-bold">POV Conversion Trend</Title>
                <Text className="text-gray-400 mt-1">Real-time performance metrics</Text>
              </div>
              <div className="px-4 py-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                <Text className="text-cyan-400 font-semibold text-sm">↑ 28% vs last month</Text>
              </div>
            </div>
            
            <AreaChart
              className="mt-4 h-72"
              data={automationData}
              index="date"
              categories={['Calls Handled', 'Converted']}
              colors={['cyan', 'emerald']}
              yAxisWidth={40}
              showLegend={true}
              showGridLines={true}
              curveType="monotone"
            />
          </div>

          {/* POV Status Card - Premium Style */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col">
            <Title className="text-white text-2xl font-bold mb-6">Current POV Status</Title>
            
            <div className="flex-1 flex flex-col items-center justify-center">
              <Gauge 
                value={automationSuccessRate} 
                className="w-full" 
                color="cyan"
                showAnimation={true}
              />
              <Text className="text-center mt-4 text-lg font-semibold text-white">
                Automation Success: {automationSuccessRate}%
              </Text>
            </div>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-cyan-500/30 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse" />
                  <div>
                    <Badge color="cyan" className="mb-1">POV 1 (Insurance)</Badge>
                    <Text className="text-sm text-gray-400">Week 3 Progress</Text>
                  </div>
                </div>
                <Text className="text-cyan-400 font-semibold">Live</Text>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-blue-500/30 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  <div>
                    <Badge color="blue" className="mb-1">POV 2 (Financial)</Badge>
                    <Text className="text-sm text-gray-400">Week 2 Progress</Text>
                  </div>
                </div>
                <Text className="text-blue-400 font-semibold">Live</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Call Volume Chart */}
        <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Title className="text-white text-2xl font-bold">Today's Call Volume</Title>
              <Text className="text-gray-400 mt-1">Hourly breakdown of call activity</Text>
            </div>
            <ChartBarIcon className="w-6 h-6 text-cyan-400" />
          </div>
          
          <div className="space-y-4">
            {callVolumeData.map((data, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-16 text-sm text-gray-400 font-medium">{data.time}</div>
                <div className="flex-1 h-10 bg-white/5 rounded-lg overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${(data.calls / maxCalls) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer" />
                  </div>
                </div>
                <div className="w-12 text-right text-white font-semibold">{data.calls}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Comparison Section */}
        <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Title className="text-white text-2xl font-bold">Cost Savings Analysis</Title>
              <Text className="text-gray-400 mt-1">Monthly operational cost comparison</Text>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-red-500/10 rounded-xl border border-red-500/30">
              <div className="flex items-center justify-between mb-4">
                <Text className="text-gray-300 font-medium">Traditional Human Ops</Text>
                <Badge color="red">Legacy</Badge>
              </div>
              <Metric className="text-4xl font-bold text-red-400">${roiData[0].value.toLocaleString()}</Metric>
              <Text className="text-sm text-gray-400 mt-2">Per month cost</Text>
            </div>

            <div className="p-6 bg-green-500/10 rounded-xl border border-green-500/30">
              <div className="flex items-center justify-between mb-4">
                <Text className="text-gray-300 font-medium">AI Agent Operations</Text>
                <Badge color="green">Current</Badge>
              </div>
              <Metric className="text-4xl font-bold text-green-400">${roiData[1].value.toLocaleString()}</Metric>
              <Text className="text-sm text-gray-400 mt-2">Per month cost</Text>
            </div>
          </div>

          <div className="mt-6 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-gray-300 font-medium mb-1">Total Monthly Savings</Text>
                <Metric className="text-3xl font-bold text-green-400">
                  ${(roiData[0].value - roiData[1].value).toLocaleString()}
                </Metric>
              </div>
              <div className="text-right">
                <Text className="text-gray-300 font-medium mb-1">Annual Projection</Text>
                <Metric className="text-3xl font-bold text-green-400">
                  ${((roiData[0].value - roiData[1].value) * 12).toLocaleString()}
                </Metric>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Calls */}
        <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <Title className="text-white text-2xl font-bold">Recent Calls</Title>
            <button className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors">
              View All →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-gray-400 font-medium pb-4 px-4">Caller</th>
                  <th className="text-left text-gray-400 font-medium pb-4 px-4">Phone</th>
                  <th className="text-left text-gray-400 font-medium pb-4 px-4">Time</th>
                  <th className="text-left text-gray-400 font-medium pb-4 px-4">Duration</th>
                  <th className="text-left text-gray-400 font-medium pb-4 px-4">Status</th>
                  <th className="text-left text-gray-400 font-medium pb-4 px-4">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {recentCalls.map((call) => (
                  <tr 
                    key={call.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                          {call.caller.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-white font-medium">{call.caller}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{call.phone}</td>
                    <td className="py-4 px-4 text-gray-400">{call.time}</td>
                    <td className="py-4 px-4 text-white font-medium">{call.duration}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        call.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : call.status === 'transferred'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {call.status === 'completed' && <CheckCircleIcon className="w-3 h-3" />}
                        {call.status === 'missed' && <XCircleIcon className="w-3 h-3" />}
                        {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{call.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Button - Premium Style */}
        <div className="mt-10 text-center">
          <a 
            href="/automations" 
            className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold text-white shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5" />
              View Detailed Automation Performance
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>
      </main>
    </div>
  );
}
