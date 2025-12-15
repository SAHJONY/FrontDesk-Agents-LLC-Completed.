import { Sidebar } from '@/components/Layout/Sidebar';
import ConsentEnforcement from '@/components/Settings/ConsentEnforcement'; // El componente que se arregló.
import { ShieldCheck, Gavel, FileText } from 'lucide-react';

export default function ComplianceCenter() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-8 w-full">
        <h1 className="executive-heading mb-10">
          COMPLIANCE & RISK MANAGEMENT
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Tarjeta de Status de Compliance */}
            <div className="premium-card col-span-1">
                <ShieldCheck className="w-8 h-8 text-cyan-400 mb-3" />
                <h2 className="text-2xl font-bold mb-2">Compliance Status</h2>
                <p className="text-sm text-gray-400">Review all global regulation settings (TCPA, GDPR).</p>
            </div>
             {/* ... otras tarjetas de Compliance ... */}
        </div>

        {/* Sección de Consentimiento (Usa el componente arreglado) */}
        <section className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center border-b border-gray-800 pb-2">
                <Gavel className="w-5 h-5 mr-3 text-red-500" /> 
                TCPA Consent Enforcement (USA)
            </h2>
            <ConsentEnforcement />
        </section>

      </main>
    </div>
  );
}
