import { EnterpriseNavbar } from '@/components/Layout/EnterpriseNavbar';
import { ShieldCheck, Lock, FileText, Globe, Headset, Zap } from 'lucide-react';

// Estilo para destacar certificaciones (simulación)
const ComplianceTag = ({ label }) => (
    <span className="inline-flex items-center px-3 py-1 mr-3 text-sm font-medium text-green-300 bg-green-900/50 rounded-full border border-green-700/50">
        <ShieldCheck className="w-4 h-4 mr-2" />
        {label}
    </span>
);

export default function ComplianceSecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#0f1e2e] to-[#000814] text-white">
      <EnterpriseNavbar />
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tighter text-cyan-400 mb-4">
            Compliance & Security Center
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Seguridad de nivel bancario y cumplimiento normativo integral para operaciones de misión crítica. La IA opera bajo supervisión estricta y auditoría total.
          </p>
        </div>

        {/* 1. Estatus de Certificaciones */}
        <section className="bg-[#10213A] p-8 rounded-xl border border-gray-800 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Estatus de Certificaciones</h2>
            <p className="text-gray-400 mb-6">
                Hemos pasado rigurosas auditorías de seguridad para garantizar que su operación se mantenga dentro del marco normativo.
            </p>
            <div className="flex flex-wrap gap-4">
                <ComplianceTag label="ISO 27001 Certified (Cloud)" />
                <ComplianceTag label="GDPR Ready" />
                <ComplianceTag label="HIPAA Compliant (Bespoke Implementation)" />
                <ComplianceTag label="SOC 2 Type II" />
            </div>
        </section>

        {/* 2. Capas de Seguridad */}
        <section className="mb-16">
            <h2 className="text-4xl font-bold mb-10 text-cyan-400">Nuestro Compromiso de Seguridad</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Seguridad de Datos */}
                <div className="p-6 glass-card border border-gray-800">
                    <Lock className="w-8 h-8 text-red-400 mb-3" />
                    <h3 className="text-xl font-bold mb-2">Seguridad de Datos y Cifrado</h3>
                    <ul className="text-gray-400 list-disc list-inside space-y-1">
                        <li>Cifrado en tránsito (TLS 1.3) y en reposo (AES-256).</li>
                        <li>Retención de datos configurable por el cliente.</li>
                        <li>Anonimización de datos sensibles del cliente (ej. números de tarjeta) en transcripciones.</li>
                    </ul>
                </div>

                {/* Cumplimiento de Voz */}
                <div className="p-6 glass-card border border-gray-800">
                    <FileText className="w-8 h-8 text-purple-400 mb-3" />
                    <h3 className="text-xl font-bold mb-2">Compliance Center (Voz y Auditoría)</h3>
                    <ul className="text-gray-400 list-disc list-inside space-y-1">
                        <li>Grabación y transcripción obligatoria del 100% de las llamadas.</li>
                        <li>Control de acceso basado en roles (RBAC) para la revisión de grabaciones.</li>
                        <li>Auditoría automatizada de guiones y *scripts* legales.</li>
                    </ul>
                </div>

                {/* Infraestructura */}
                <div className="p-6 glass-card border border-gray-800">
                    <Zap className="w-8 h-8 text-yellow-400 mb-3" />
                    <h3 className="text-xl font-bold mb-2">Infraestructura y Disponibilidad</h3>
                    <ul className="text-gray-400 list-disc list-inside space-y-1">
                        <li>Arquitectura nativa de la nube (AWS/Azure) con redundancia multi-zona.</li>
                        <li>SLA garantizado del 99.9% de *uptime*.</li>
                        <li>Monitoreo de seguridad 24/7 por equipo dedicado.</li>
                    </ul>
                </div>
            </div>
        </section>

        {/* 3. Compromiso de AI Responsable */}
        <section className="bg-gray-800/50 p-10 rounded-xl border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <Headset className="w-6 h-6 mr-3 text-cyan-400" />
                Ética y Autonomía de la IA
            </h2>
            <p className="text-gray-400 mb-4">
                Nuestros agentes de voz están diseñados con límites estrictos. La IA nunca tomará decisiones de riesgo y siempre escalará a un agente humano en caso de incertidumbre o solicitud directa.
            </p>
            <p className="text-gray-400">
                Todos los modelos son entrenados con datos anonimizados y dentro de su infraestructura privada (VPC si se requiere), garantizando la separación total de los datos.
            </p>
        </section>

        {/* CTA Final para el proceso de Due Diligence */}
        <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
                ¿Listo para la diligencia debida?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
                Descargue nuestro whitepaper de seguridad o contacte directamente a nuestro equipo de *Compliance*.
            </p>
            <Link 
                href="/request-demo" 
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-200 shadow-xl shadow-cyan-900/50"
            >
                Solicitar Whitepaper de Seguridad
            </Link>
        </div>

      </main>
    </div>
  );
}
