import DashboardCard from "../components/DashboardCard";

export default function DashboardPage() {
  // Valores demo por ahora – luego se conectan a datos reales
  const stats = {
    callsToday: 0,
    newLeads: 0,
    pendingReplies: 0,
  };

  return (
    <main className="page page--full">
      <header className="dash-header">
        <div>
          <p className="dash-header__eyebrow">FrontDesk Agents · LIVE</p>
          <h1 className="dash-header__title">Command Center</h1>
          <p className="dash-header__subtitle">
            Aquí verás llamadas, leads, WhatsApp, correos y resultados
            de tus agentes de IA en tiempo real.
          </p>
        </div>

        <div className="dash-header__actions">
          <span className="status-badge status-badge--live">● LIVE</span>
          <a href="/setup" className="btn btn--ghost btn--sm">
            Configurar Cuenta
          </a>
        </div>
      </header>

      <section className="dash-grid">
        <DashboardCard
          title="Llamadas de hoy"
          value={stats.callsToday}
          helper="Conectadas / atendidas por IA"
        />
        <DashboardCard
          title="Leads nuevos"
          value={stats.newLeads}
          helper="Últimas 24 horas"
        />
        <DashboardCard
          title="Mensajes pendientes"
          value={stats.pendingReplies}
          helper="WhatsApp, SMS, email por responder"
        />
      </section>

      <section className="dash-bottom">
        <div className="dash-panel">
          <h2>Actividad reciente</h2>
          <p className="dash-panel__empty">
            Aquí verás el timeline de llamadas, WhatsApp y correos
            manejados por tus agentes de IA.
          </p>
        </div>

        <div className="dash-panel">
          <h2>Próximos pasos</h2>
          <ol className="dash-steps">
            <li>Conectar números telefónicos (Bland / Twilio).</li>
            <li>Conectar el CRM / Airtable para registrar los leads.</li>
            <li>Configurar guiones de recepción y respuestas rápidas.</li>
            <li>Revisar métricas diarias de llamadas y conversiones.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}
