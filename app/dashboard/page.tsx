import { Sidebar } from '@/components/Layout/Sidebar';
import { DollarSign, Zap, TrendingUp, ShieldCheck } from 'lucide-react';

// Componente para una tarjeta de KPI con estilo Premium
const KPI_Card = ({ title, value, change, icon: Icon, color }) => (
  <div className="premium-card">
    <div className={`text-sm font-semibold mb-2 flex items-center ${color}`}>
      <Icon className="w-4 h-4 mr-2" />
      {title}
    </div>
    <div className="text-4xl font-extrabold text-white mb-1 tracking-tight">
      {value}
    </div>
    <p className={`text-sm font-medium ${change.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
      {change} vs Last Month
    </p>
  </div>
);

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full">
        <h1 className="executive-heading mb-10">
          GLOBAL COMMAND CENTER
        </h1>
        
        {/* Fila de KPIs de Alto Impacto */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <KPI_Card title="BOOKED REVENUE" value="$125.7M" change="+18%" icon={DollarSign} color="text-cyan-400" />
          <KPI_Card title="OPERATIONAL EFFICIENCY" value="92%" change="+5%" icon={Zap} color="text-green-400" />
          <KPI_Card title="LEAD CONVERSION" value="52%" change="+3%" icon={TrendingUp} color="text-cyan-400" />
          <KPI_Card title="COMPLIANCE SCORE" value="98.5%" change="+0.1%" icon={ShieldCheck} color="text-yellow-400" />
        </div>

        {/* Tarjeta de Gráfico Global (Simulación de Holograma) */}
        <div className="premium-card p-0 h-[500px] flex flex-col">
          <h2 className="text-xl font-bold p-6 border-b border-gray-700">
            Regional Performance & Latency Map
          </h2>
          <div className="flex-grow flex items-center justify-center text-gray-400 text-lg">
            {/* Aquí iría un componente real de mapa interactivo/holográfico */}
            [Simulación de Mapa de Datos Global con Acentos Cian]
          </div>
        </div>
      </main>
    </div>
  );
}
