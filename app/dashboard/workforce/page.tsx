import { AgentConfigUI } from "@/components/workforce/agent-config-ui";

export default function WorkforceConfigPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h1 className="text-3xl font-black text-slate-50 italic uppercase tracking-tighter">
          Workforce DNA Laboratory
        </h1>
        <p className="text-sm text-slate-400 italic">Configure neural personalities and operational boundaries.</p>
      </header>
      
      <AgentConfigUI />
    </div>
  );
}
