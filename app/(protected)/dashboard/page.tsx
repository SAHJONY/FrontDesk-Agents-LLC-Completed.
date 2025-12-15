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

// Nota: Se ha removido el div contenedor principal y sus clases de fondo/padding
// para que el layout.tsx pueda gestionar la estructura de la página.

const SIMULATED_CLIENT_KEY = 'FDDG-SARAV1-93A2X-57B'; 

export default async function DashboardPage() {
  // Asumiendo que getClientMetrics y sus tipos están definidos.
  // Si metrics es undefined/null, usar un valor predeterminado seguro.
  const clientKey = SIMULATED_CLIENT_KEY;
  // Simulación: Si metrics falla, usar valores predeterminados
  const metrics = await getClientMetrics(clientKey, 7) || {
    appointmentsBooked: 'N/A',
    conversionRate: 'N/A',
    callsProcessed: 'N/A',
    totalDurationHours: 'N/A',
    abandonmentRate: 'N/A',
  };
  
  return (
    // CONTENIDO: Ahora es solo el contenido de la página, el padding y el fondo
    // serán provistos por el layout.tsx para consistencia.
    <div> 
      {/* Premium Header Section */}
      <div className="relative rounded-2xl overflow-hidden mb-10">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=90&fit=crop"
            alt="Executive dashboard"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1929] via-[#0a1929]/90 to-transparent" />
        </div>
        
        <div className="relative p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
              <SparklesIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-white">
                Executive Command Center
              </h1>
              <p className="text-gray-400">
                Enterprise Performance Analytics (Last 7 Days)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
        {/* System Status Card */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=90&fit=crop"
                alt="Analytics"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative">
              <h2 className="text-xl font-bold text-white mb-4">System Status</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Enterprise Online</span>
              </div>
              <div className="space-y-3">
                <div className="text-center p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <p className="text-sm text-blue-400">Active AI Agents</p>
                  <p className="text-2xl font-bold text-white">12</p>
                </div>
                <div className="text-center p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                  <p className="text-sm text-green-400">Daily Volume</p>
                  <p className="text-2xl font-bold text-white">847</p>
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
          image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=90&fit=crop"
        />
        
        <MetricCard 
          icon={ChartBarIcon} 
          title="Conversion Rate" 
          value={`${metrics.conversionRate}%`}
          color="--color-primary"
          image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=90&fit=crop"
        />
        
        <MetricCard 
          icon={PhoneIcon} 
          title="Total Calls Processed" 
          value={metrics.callsProcessed} 
          color="--color-accent-blue"
          image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=90&fit=crop"
        />
      </div>
      
      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <MetricCard 
          icon={ClockIcon} 
          title="Time Saved (Hours)" 
          value={metrics.totalDurationHours} 
          color="--color-gold" 
          secondaryText="Equivalent to full-time staff"
          image="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=90&fit=crop"
        />
        <MetricCard 
          icon={ArrowPathIcon} 
          title="Service Level" 
          value={`${100 - metrics.abandonmentRate}%`}
          color="--color-primary" 
          secondaryText="Industry-leading performance"
          image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=90&fit=crop"
        />
        
        <MetricCard 
          icon={ChartBarIcon} 
          title="Revenue Impact" 
          value={`$${(metrics.appointmentsBooked * 150).toLocaleString()}`}
          color="--color-gold" 
          secondaryText="Estimated value captured"
          image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=90&fit=crop"
        />
      </div>

      {/* Enterprise Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Enterprise AI Performance</h3>
          <div className="relative rounded-xl overflow-hidden mb-6">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=90&fit=crop"
              alt="Performance analytics"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929] to-transparent" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">AI Response Accuracy</span>
              <span className="text-white font-bold">99.2%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '99.2%' }} />
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="text-gray-400">Customer Satisfaction</span>
              <span className="text-white font-bold">97.8%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '97.8%' }} />
            </div>
          </div>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Executive Activity Stream</h3>
          <div className="relative rounded-xl overflow-hidden mb-6">
            <img
              src="https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=800&q=90&fit=crop"
              alt="Business professional"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929] to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full w-fit">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-green-400">Real-time Updates</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm text-white">High-value lead captured</p>
                <p className="text-xs text-gray-400">Enterprise account - 2 min ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm text-white">Executive meeting scheduled</p>
                <p className="text-xs text-gray-400">C-level prospect - 5 min ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm text-white">Strategic partnership inquiry</p>
                <p className="text-xs text-gray-400">Fortune 500 company - 12 min ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Operations Map */}
      <div className="mt-10 glass-card p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Global Enterprise Operations</h3>
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=90&fit=crop"
            alt="Global operations center"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1929] via-[#0a1929]/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-white">50+</p>
                <p className="text-xs text-gray-300">Countries Served</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-xs text-gray-300">Global Coverage</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-white">15+</p>
                <p className="text-xs text-gray-300">Languages</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// MetricCard Component (Mantenerlo como se definió)
// ----------------------------------------------------------------------
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
                
