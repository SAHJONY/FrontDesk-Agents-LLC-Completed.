import Sidebar from "@/components/Layout/Sidebar";
import ConsentEnforcement from "@/components/Settings/ConsentEnforcement";
import { ShieldCheck, Gavel, FileText } from "lucide-react";

export default function ComplianceCenterPage() {
  return (
    <div className="flex min-h-screen bg-[#0B0F1A] text-white">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-bold">Compliance Center</h1>
          <p className="text-gray-400 mt-2">
            Regulatory controls, consent enforcement and audit readiness.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <ShieldCheck className="h-8 w-8 text-emerald-400 mb-4" />
            <h2 className="text-lg font-semibold">Consent & Privacy</h2>
            <p className="text-sm text-gray-400 mt-2">
              TCPA, GDPR and customer consent enforcement.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <Gavel className="h-8 w-8 text-indigo-400 mb-4" />
            <h2 className="text-lg font-semibold">Legal Safeguards</h2>
            <p className="text-sm text-gray-400 mt-2">
              Risk mitigation and regulatory alignment.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <FileText className="h-8 w-8 text-sky-400 mb-4" />
            <h2 className="text-lg font-semibold">Audit Logs</h2>
            <p className="text-sm text-gray-400 mt-2">
              Immutable records for enterprise audits.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-white/5 p-6">
          <ConsentEnforcement />
        </section>
      </main>
    </div>
  );
}
