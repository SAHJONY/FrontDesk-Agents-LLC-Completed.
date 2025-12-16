import { FileText, Lock, ShieldCheck, Zap, Headphones } from "lucide-react";

export default function ComplianceSecurityPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-4xl font-semibold mb-8">Compliance & Security</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Feature icon={<ShieldCheck />} title="Audit Ready" />
        <Feature icon={<Lock />} title="Data Protection" />
        <Feature icon={<FileText />} title="Full Call Logs" />
        <Feature icon={<Zap />} title="Real-Time Monitoring" />
        <Feature icon={<Headphones />} title="24/7 Coverage" />
      </div>
    </section>
  );
}

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="rounded-xl border p-6">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-medium">{title}</h3>
    </div>
  );
}
