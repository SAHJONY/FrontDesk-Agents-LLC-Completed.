'use client';

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
  ArrowTrendingUpIcon
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

export default function DashboardPage() {
  // Success Metrics from the plan
  const automationSuccessRate = 85; // Target >= 80%
  const costReduction = 70; // Target >= 30%
  const pipelineArr = 150; // Target >= $100k (in thousands)

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
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
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
        </div>

        {/* Charts Section - Premium Style */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
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

        {/* ROI Comparison Section */}
        <div className="mt-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
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
