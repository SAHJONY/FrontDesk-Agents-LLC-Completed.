import { Sidebar } from '@/components/Layout/Sidebar';
import Link from 'next/link';
import { DollarSign, Zap, TrendingUp, ShieldCheck, Settings } from 'lucide-react';

// ----------------------------------------------------------------------
// Componente auxiliar KPI_Card (Manteniendo el estilo ejecutivo)
// ----------------------------------------------------------------------
const KPI_Card = ({ title, value, change, icon: Icon, color }) => (
  // Clase premium-card definida en globals.css
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

// ----------------------------------------------------------------------
// Página Principal del Dashboard
// ----------------------------------------------------------------------

export default function Dashboard() {
  return (
    // Contenedor principal para la estructura Sidebar + Contenido
    <div className="flex min-h-screen">
      
      {/* Sidebar importada: Contiene la corrección de layout para móvil/escritorio */}
      <Sidebar />
      
      {/* Contenido Principal: Incluye la corrección de margen lg:ml-64 */}
      <main className="p-8 w-full lg:ml-64">
        
        {/* Encabezado Ejecutivo */}
        <h1 className="executive-heading mb-10 flex justify-between items-center">
          GLOBAL COMMAND CENTER
          <Link href="/settings/general" className="text-sm text-gray-400 hover:text-cyan-400 flex items-center transition duration-150">
            <Settings className="w-4 h-4 mr-2" />
            Go to Settings
          </Link>
        </h1>

        {/* Ejemplo de Botones de Acción Rápida (FIXED: Conexión de Enlaces) */}
        <div className="mb-10 flex space-x-4">
            {/* Botón Primario: Despliegue de Agente (Acento Cian) */}
            <Link 
                href="/settings/scripts" 
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-lg"
            >
                Deploy New AI Agent
            </Link>
            {/* Botón Secundario: Revisión de Logs */}
            <Link 
                href="/client/call-log" 
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
                Review Call Audit Logs
            </Link>
        </div>

        {/* Fila de KPIs de Alto Impacto */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <KPI_Card title="BOOKED REVENUE" value="$125.7M" change="+18%" icon={DollarSign} color="text-cyan-400" />
          <KPI_Card title="OPERATIONAL EFFICIENCY" value="92%" change="+5%" icon={Zap} color="text-green-400" />
          <KPI_Card title="LEAD CONVERSION" value="52%" change="+3%" icon={TrendingUp} color="text-cyan-400" />
          <KPI_Card title="COMPLIANCE SCORE" value="98.5%" change="+0.1%" icon={ShieldCheck} color="text-yellow-400" />
        </div>

        {/* Tarjeta de Gráfico Global (Placeholder) */}
        <div className="premium-card p-0 h-[500px] flex flex-col">
          <h2 className="text-xl font-bold p-6 border-b border-gray-700">
            Regional Performance & Latency Map
          </h2>
          <div className="flex-grow flex items-center justify-center text-gray-400 text-lg">
            [Placeholder: Mapa de Conexiones Globales con Datos Holográficos]
          </div>
        </div>
      </main>
    </div>
  );
}
