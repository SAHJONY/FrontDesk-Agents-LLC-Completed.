// ./app/dashboard/page.tsx

'use client'; // Required for chart components

import {
  AreaChart,
  Card,
  Title,
  Text,
  Metric,
  Badge,
} from '@tremor/react'; 
import { CheckCircleIcon, CurrencyDollarIcon, RocketLaunchIcon, PhoneIcon } from '@heroicons/react/24/outline';

// NEW MOCK DATA based on COMMAND CENTER DASHBOARD
const currentMetrics = {
    calls: 37,
    newLeads: 12,
    leads: 72,
    appointments: 26,
    revenue: 4500, // USD 4.5k
};

const automationData = [
  // ... (Your trend data remains for the AreaChart)
  { date: 'Jan 28', 'Calls Handled': 700, 'Converted': 190 },
];

export default function DashboardPage() {
  
  // Use the established metrics for display
  const automationSuccessRate = 85; 
  const costReduction = 70; 
  
  return (
    <main className="p-6 md:p-10">
      <Title className="text-4xl font-extrabold text-gray-900">
        BOOST YOUR BUSINESS WITH THE COMMAND CENTER DASHBOARD 
      </Title>
      <Text className="mt-2 text-lg text-gray-600">
        Executive overview of the FrontDesk Agents system performance and monetization metrics.
      </Text>

      {/* --- COMMAND CENTER METRICS CARDS (Based on Image 515.png) --- */}
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
        <Card className="p-4 bg-blue-50">
          <Text>Calls</Text>
          <Metric className="text-blue-700">{currentMetrics.calls}</Metric>
        </Card>
        <Card className="p-4 bg-green-50">
          <Text>New Leads</Text>
          <Metric className="text-green-700">{currentMetrics.newLeads}</Metric>
        </Card>
        <Card className="p-4 bg-indigo-50">
          <Text>Appointments</Text>
          <Metric className="text-indigo-700">{currentMetrics.appointments}</Metric>
        </Card>
        <Card className="p-4 bg-yellow-50">
          <Text>Revenue</Text>
          <Metric className="text-yellow-700">USD {currentMetrics.revenue / 1000}k</Metric>
        </Card>
      </div>

      {/* --- POV Success Metrics (Retaining original goals) --- */}
      <Title className="mt-10 text-2xl font-semibold">POV Performance Metrics</Title>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card>
          <Text>Automation Success</Text>
          <Metric className="text-blue-500">{automationSuccessRate}%</Metric>
        </Card>
        <Card>
          <Text>Cost Reduction vs. Human Ops</Text>
          <Metric className="text-green-500">{costReduction}%</Metric>
        </Card>
        <Card>
          <Text>Pipeline ARR Value</Text>
          <Metric className="text-purple-500">$150k</Metric>
        </Card>
      </div>
      
      {/* --- Charts Section (Unchanged) --- */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversion Funnel Area Chart */}
        <Card className="lg:col-span-2">...</Card>

        {/* Status Card */}
        <Card className="flex flex-col items-center justify-center text-center">
            <Title>AI Agent Status: SARA</Title> {/* Referencing SARA */}
            <Metric className="mt-4 text-6xl text-blue-500 font-bold">
                {automationSuccessRate}%
            </Metric>
            <Text className="mt-2 text-lg font-medium">Automation Success Rate</Text>
            <div className="mt-6 space-y-2">
                <Badge color="blue">POV 1 (Insurance)</Badge>
                <Badge color="blue">POV 2 (Financial)</Badge>
            </div>
        </Card>
      </div>
    </main>
  );
}
