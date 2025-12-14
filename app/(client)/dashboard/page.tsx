// ./app/(client)/dashboard/page.tsx (SERVER COMPONENT)
import React from 'react';
import RealtimeStatus from '@/components/Dashboard/RealtimeStatus';
import { getClientMetrics } from '@/lib/dashboard-metrics';
import { 
  ClockIcon, 
  CalendarDaysIcon, 
  ChartBarIcon, 
  PhoneIcon,
  ArrowPathIcon 
} from '@heroicons/react/24/outline';

// Simulación de Auth y Client Key (Debería venir de la sesión real)
const SIMULATED_CLIENT_KEY = 'FDDG-SARAV1-93A2X-57B'; 

export default async function DashboardPage() {
  const clientKey = SIMULATED_CLIENT_KEY; // En producción, esto sería: auth().clientKey
  
  // *** 1. Cargar las Métricas en el Server Component ***
  const metrics = await getClientMetrics(clientKey, 7);
  
  return (
    <div className="p-8 md:p-12 w-full">
      <h1 className="text-3xl font-extrabold text-white mb-2">
        Command Center: Overview
      </h1>
      <p className="text-gray-400 mb-10">
        Performance data for SARA.AI (Last 7 Days)
      </p>

      {/* Real-time Status and Primary Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
        
        {/* Slot 1: Live AI Status (Client Component) */}
        <div className="lg:col-span-1">
          <RealtimeStatus />
        </div>
        
        {/* --- 2. Target Metrics from Server --- */}
        
        {/* Metric 1: Appointments Booked */}
        <MetricCard 
          icon={CalendarDaysIcon} 
          title="Appointments Booked" 
          value={metrics.appointmentsBooked} 
          color="--color-gold" 
        />
        
        {/* Metric 2: Conversion Rate */}
        <MetricCard 
          icon={ChartBarIcon} 
          title="Conv. Rate (Call → Book)" 
          value={`${metrics.conversionRate}%`}
          color="--color-primary" 
        />
        
        {/* Metric 3: Total Calls Processed */}
        <MetricCard 
          icon={PhoneIcon} 
          title="Total Calls Processed" 
          value={metrics.callsProcessed} 
          color="--color-accent-blue" 
        />
      </div>
      
      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard 
          icon={ClockIcon} 
          title="Time Saved (Hours)" 
          value={metrics.totalDurationHours} 
          color="--color-gold" 
          secondaryText="Equivalent to staff time"
        />
        <MetricCard 
          icon={ArrowPathIcon} 
          title="Abandonment Rate" 
          value={`${metrics.abandonmentRate}%`}
          color="--color-red-light" 
          secondaryText="Calls ending without outcome"
        />
        
        {/* Placeholder for additional metrics */}
        <MetricCard 
          icon={ChartBarIcon} 
          title="Lead Qualification" 
          value={metrics.appointmentsBooked || 0}
          color="--color-primary" 
          secondaryText="Qualified leads"
        />
      </div>
    </div>
  );
}

// Helper Component for Visual Style
interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  color: string;
  secondaryText?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  icon: Icon, 
  title, 
  value, 
  color, 
  secondaryText 
}) => (
  <div className="glass-card p-6 flex flex-col justify-between h-full">
    <div className="flex items-start justify-between">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </h3>
      <Icon className={`w-8 h-8 text-[var(${color})]`} />
    </div>
    <div className="mt-4">
      <p className="text-4xl font-extrabold text-white">
        {value}
      </p>
      {secondaryText && (
        <p className="text-xs text-gray-500 mt-1">{secondaryText}</p>
      )}
    </div>
  </div>
);
