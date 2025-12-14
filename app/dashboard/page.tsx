// ./app/dashboard/page.tsx

'use client'; // <-- ADDED DIRECTIVE HERE

import {
  LineChart,
  AreaChart,
  Card,
  Title,
  Text,
  Metric,
  Badge,
} from '@tremor/react'; 
// Note: Gauge component import has been removed to resolve the build error.

import { CheckCircleIcon, CurrencyDollarIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

// Mock Data (Replace with actual data fetching logic)
const automationData = [
  { date: 'Jan 1', 'Calls Handled': 100, 'Converted': 20 },
  { date: 'Jan 7', 'Calls Handled': 250, 'Converted': 60 },
  { date: 'Jan 14', 'Calls Handled': 400, 'Converted': 100 },
  { date: 'Jan 21', 'Calls Handled': 550, 'Converted': 150 },
  { date: 'Jan 28', 'Calls Handled': 700, 'Converted': 190 },
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
    <main className="p-6 md:p-10">
      <Title>🚀 Revenue Proof Dashboard</Title>
      <Text>
        Executive overview of the Multi-POV sprint performance and key monetization metrics.
      </Text>

      {/* --- KPI Cards Section --- */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="p-4">
          <Text>Automation Success</Text>
          <Metric className="text-blue-500">{automationSuccessRate}%</Metric>
          <div className="flex items-center space-x-2 mt-2">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            <Text className="text-sm">Target: 80% Achieved</Text>
          </div>
        </Card>
        <Card className="p-4">
          <Text>Cost Reduction vs. Human Ops</Text>
          <Metric className="text-green-500">{costReduction}%</Metric>
          <div className="flex items-center space-x-2 mt-2">
            <CurrencyDollarIcon className="w-5 h-5 text-blue-500" />
            <Text className="text-sm">Saving $7,000 / month</Text>
          </div>
        </Card>
        <Card className="p-4">
          <Text>Pipeline ARR Value</Text>
          <Metric className="text-purple-500">${pipelineArr}k</Metric>
          <div className="flex items-center space-x-2 mt-2">
            <RocketLaunchIcon className="w-5 h-5 text-purple-500" />
            <Text className="text-sm">On track for annual contract conversion</Text>
          </div>
        </Card>
      </div>

      {/* --- Charts Section --- */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Conversion Funnel */}
        <Card className="lg:col-span-2">
          <Title>POV Conversion Trend</Title>
          <AreaChart
            className="mt-4 h-72"
            data={automationData}
            index="date"
            categories={['Calls Handled', 'Converted']}
            colors={['blue', 'green']}
            yAxisWidth={30}
          />
        </Card>

        {/* Status Card (Replaced Gauge) */}
        <Card className="flex flex-col items-center justify-center text-center">
            <Title>Current POV Status</Title>
            
            <Metric className="mt-4 text-6xl text-blue-500 font-bold">
                {automationSuccessRate}%
            </Metric>
            <Text className="mt-2 text-lg font-medium">
                Automation Success Rate
            </Text>

            <div className="mt-6 space-y-2">
                <Text>
                    <Badge color="blue">POV 1 (Insurance)</Badge> Live - Week 3
                </Text>
                <Text>
                    <Badge color="blue">POV 2 (Financial)</Badge> Live - Week 2
                </Text>
            </div>
        </Card>
      </div>
      
      {/* Action Button */}
      <div className="mt-10 text-center">
        <a href="/automations" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          View Detailed Automation Performance
        </a>
      </div>
    </main>
  );
}
