// app/dashboard/page.tsx

import DashboardCard from "../components/DashboardCard";

export default function DashboardPage() {
  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              FrontDesk Agents – Command Center
            </h1>
            <p className="dashboard-subtitle">
              La plataforma ya está LIVE en producción. Aquí monitoreamos llamadas,
              leads e inbox en tiempo real.
            </p>
          </div>
          <span className="dashboard-live-pill">LIVE</span>
        </header>

        <section className="dashboard-grid">
          <DashboardCard
            title="LLAMADAS DE HOY"
            value={0}
            helperText="Conectadas / atendidas"
          />
          <DashboardCard
            title="LEADS NUEVOS"
            value={0}
            helperText="Últimas 24 horas"
          />
          <DashboardCard
            title="MENSAJES PENDIENTES"
            value={0}
            helperText="Listos para responder"
          />
        </section>

        <section className="dashboard-bottom-grid">
          <DashboardCard
            title="Actividad reciente"
            helperText="Aquí verás un timeline de llamadas, SMS, WhatsApp y correos manejados por tus agentes de IA."
            badge="DEMO"
          />
          <DashboardCard
            title="Próximos pasos"
            helperText="1. Conectar números telefónicos (Bland / Twilio). 2. Conectar el CRM o Airtable para pasar los leads. 3. Configurar el script de recepcionista (español/inglés). 4. Revisar métricas diarias de llamadas y conversiones."
          />
        </section>

        <footer className="dashboard-footer">
          <span>FrontDesk Agents LLC · Command Center v1</span>
        </footer>
      </div>
    </main>
  );
}
