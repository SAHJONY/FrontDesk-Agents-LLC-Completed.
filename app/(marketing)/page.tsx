import Link from 'next/link';
import { EnterpriseNavbar } from '@/components/Layout/EnterpriseNavbar'; // Importamos la Navbar Enterprise
import { Shield, TrendingUp, Cpu, Globe } from 'lucide-react';

// Componente para el Trust Bar
const TrustBar = () => (
  <div className="bg-[#10213A] py-3 text-center border-t border-b border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-400 text-sm font-medium">
      Usado por equipos que no pueden fallar · SLA 99.9% · Auditoría completa · Multilingüe · Multi-dispositivo
    </div>
  </div>
);

// Componente de Funcionalidad Clave
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-[#0a1929]/70 rounded-xl border border-gray-800 shadow-2xl transition-all duration-300 hover:border-cyan-600 hover:shadow-cyan-900/50">
    <Icon className="w-8 h-8 text-cyan-400 mb-4" />
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default function EnterpriseHomePage() {
  return (
    // Estructura del Layout de Marketing: La Navbar en el layout y el contenido aquí.
    // Usamos el fondo oscuro general de la aplicación.
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#0f1e2e] to-[#000814] text-white">
      
      {/* 1. Navbar Enterprise (Asume que está en el layout o lo renderizas aquí) */}
      <EnterpriseNavbar /> 

      {/* Margen para compensar la Navbar fija */}
      <div className="pt-16">
        <TrustBar />
      </div>

      {/* 2. Hero Section */}
      <section className="relative pt-12 md:pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-tight">
          <span className="block text-gray-200">Automatiza operaciones de</span>
          <span className="block text-cyan-400">atención crítica 24/7.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10">
          Plataforma *enterprise* de agentes de voz inteligentes que gestionan llamadas, citas y leads con <strong className="text-white">auditoría total y disponibilidad global.</strong>
        </p>
        
        {/* CTAs */}
        <div className="flex justify-center space-x-4">
          <Link 
            href="/request-demo" 
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-200 shadow-xl shadow-cyan-900/50"
          >
            Request Enterprise Demo
          </Link>
          <Link 
            href="/contact-sales" 
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-3 px-8 rounded-lg text-lg border border-gray-700 transition duration-200"
          >
            Talk to Sales
          </Link>
        </div>
        
        {/* Placeholder de Imagen de Producto (Enterprise Dashboard) */}
        <div className="mt-16">
            <div className="h-96 w-full bg-gray-900/50 rounded-xl border border-gray-700 flex items-center justify-center text-gray-500">
                [Visual Premium del Dashboard o la Interfaz de Agente AI en acción]
            </div>
        </div>
      </section>

      {/* 3. Sección de Problema/Dolor */}
      <section className="py-20 bg-[#10213A]/50 border-t border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-red-400 mb-4">El Riesgo de Escalar con Personal Humano</h2>
          <p className="text-xl text-gray-300">
            Las llamadas perdidas, errores humanos y brechas de cumplimiento cuestan ingresos, reputación y multas. Escalar equipos humanos 24/7 no es viable ni auditable.
          </p>
        </div>
      </section>

      {/* 4. Solución y Capacidades Clave */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">Solución: Autonomía de Misión Crítica</h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto text-center mb-12">
           Agentes de voz autónomos, entrenados en su negocio, integrados a su stack, operando en cualquier dispositivo sin intervención humana.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={Cpu}
            title="Atención Autónoma 24/7"
            description="Agentes de voz entrante y saliente, operando sin pausas para gestionar picos de tráfico y servicio nocturno."
          />
          <FeatureCard 
            icon={Shield}
            title="Compliance Center Total"
            description="Grabación, auditoría y trazabilidad completa de cada interacción. Cumpla con regulaciones de privacidad y sectoriales."
          />
          <FeatureCard 
            icon={TrendingUp}
            title="Analytics Ejecutivos"
            description="Mida ROI, tasas de conversión, tiempos de manejo y perfiles de riesgo en tiempo real desde el Global Command Center."
          />
          <FeatureCard 
            icon={Globe}
            title="Escala Global y Flexible"
            description="Implementación inmediata en múltiples idiomas, zonas horarias y ubicaciones geográficas, adaptándose a su operación."
          />
        </div>
      </section>

      {/* 5. Sección de ROI y CTA Final */}
      <section className="py-20 bg-[#10213A] text-center border-t border-gray-800">
        <h2 className="text-4xl font-bold mb-8 text-white">El Retorno de la Inversión (ROI) es la Misión</h2>
        
        <div className="flex justify-center gap-12 mb-12">
            <div className="text-center">
                <p className="text-5xl font-extrabold text-cyan-400">−50–70%</p>
                <p className="text-lg text-gray-400">vs costos de personal 24/7</p>
            </div>
            <div className="text-center">
                <p className="text-5xl font-extrabold text-cyan-400">+30%</p>
                <p className="text-lg text-gray-400">llamadas atendidas y convertidas</p>
            </div>
            <div className="text-center">
                <p className="text-5xl font-extrabold text-cyan-400">0%</p>
                <p className="text-lg text-gray-400">llamadas sin auditar</p>
            </div>
        </div>

        <h3 className="text-3xl font-semibold mb-6 text-gray-200">Hablemos de su operación.</h3>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Diseñamos, implementamos y demostramos ROI medible en solo 30 días, garantizando que su inversión rinda frutos de forma inmediata.
        </p>

        <Link 
            href="/request-demo" 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg text-xl transition duration-200 shadow-2xl shadow-green-900/50"
        >
            Agendar Consulta Estratégica
        </Link>
      </section>
      
      {/* Placeholder de Footer */}
      <footer className="py-10 text-center text-gray-600 border-t border-gray-900 text-sm">
        &copy; {new Date().getFullYear()} FrontDesk Agents. Plataforma Enterprise.
      </footer>
    </div>
  );
}
