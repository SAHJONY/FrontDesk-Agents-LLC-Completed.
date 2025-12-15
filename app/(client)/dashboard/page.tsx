import React from 'react';
import { getClientMetrics } from '@/lib/dashboard-metrics';
import { 
  ClockIcon, 
  CalendarDaysIcon, 
  ChartBarIcon, 
  PhoneIcon,
  ArrowPathIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const SIMULATED_CLIENT_KEY = 'FDDG-SARAV1-93A2X-57B'; 

export default async function DashboardPage() {
  const clientKey = SIMULATED_CLIENT_KEY;
  const metrics = await getClientMetrics(clientKey, 7);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#0f1e2e] to-[#000814] p-8 md:p-12">
      {/* Header Section with Background Image */}
      <div className="relative rounded-2xl overflow-hidden mb-10">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80&fit=crop"
            alt="Dashboard background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1929] via-[#0a1929]/90 to-transparent" />
        </div>
        
        <div className="relative p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <SparklesIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-white">
                Command Center
              </h1>
              <p className="text-gray-400">
                Performance data for SARA.AI (Last 7 Days)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
        {/* System Status Card with Image */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&fit=crop"
                alt="Analytics"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative">
              <h2 className="text-xl font-bold text-white mb-4">System Status</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Online</span>
              </div>
              <div className="space-y-3">
                <div className="text-center p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <p className="text-sm text-blue-400">Active Agents</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <div className="text-center p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                  <p className="text-sm text-green-400">Calls Today</p>
                  <p className="text-2xl font-bold text-white">24</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <MetricCard 
          icon={CalendarDaysIcon} 
          title="Appointments Booked" 
          value={metrics.appointmentsBooked} 
          color="--color-gold"
          image="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80&fit=crop"
        />
        
        <MetricCard 
          icon={ChartBarIcon} 
          title="Conv. Rate (Call → Book)" 
          value={`${metrics.conversionRate}%`}
          color="--color-primary"
          image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80&fit=crop"
        />
        
        <MetricCard 
          icon={PhoneIcon} 
          title="Total Calls Processed" 
          value={metrics.callsProcessed} 
          color="--color-accent-blue"
          image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&q=80&fit=crop"
        />
      </div>
      
      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <MetricCard 
          icon={ClockIcon} 
          title="Time Saved (Hours)" 
          value={metrics.totalDurationHours} 
          color="--color-gold" 
          secondaryText="Equivalent to staff time"
          image="https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400&q=80&fit=crop"
        />
        <MetricCard 
          icon={ArrowPathIcon} 
          title="Abandonment Rate" 
          value={`${metrics.abandonmentRate}%`}
          color="--color-red-light" 
          secondaryText="Calls ending without outcome"
          image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&fit=crop"
        />
        
        <MetricCard 
          icon={ChartBarIcon} 
          title="Lead Qualification" 
          value={metrics.appointmentsBooked || 0}
          color="--color-primary" 
          secondaryText="Qualified leads"
          image="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80&fit=crop"
        />
      </div>

      {/* Team Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold text-white mb-6">AI Performance</h3>
          <div className="relative rounded-xl overflow-hidden mb-6">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop"
              alt="Performance analytics"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929] to-transparent" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Response Accuracy</span>
              <span className="text-white font-bold">98.5%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '98.5%' }} />
            </div>
          </div>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="relative rounded-xl overflow-hidden mb-6">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&fit=crop"
              alt="Team collaboration"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929] to-transparent" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm text-white">Call answered - New booking</p>
                <p className="text-xs text-gray-400">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm text-white">Appointment scheduled</p>
                <p className="text-xs text-gray-400">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm text-white">Lead qualified</p>
                <p className="text-xs text-gray-400">8 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  color: string;
  secondaryText?: string;
  image?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  icon: Icon, 
  title, 
  value, 
  color, 
  secondaryText,
  image 
}) => (
  <div className="glass-card p-6 flex flex-col justify-between h-full relative overflow-hidden group">
    {/* Background Image */}
    {image && (
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    )}
    
    <div className="relative">
      <div className="flex items-start justify-between mb-4">
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
  </div>
);
