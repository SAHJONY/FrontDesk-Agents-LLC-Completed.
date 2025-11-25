export default function DashboardPage() {
  return (
    <main className="dashboard">
      <div className="dashboard-inner">
        <header className="dashboard-header">
          <div>
            <h1>FrontDesk Agents – Command Center</h1>
            <p className="dashboard-subtitle">
              La plataforma ya está LIVE en producción. Aquí monitoreas llamadas,
              leads e inbox en tiempo real.
            </p>
          </div>
          <div className="env-pill">
            <span className="env-dot" />
            LIVE
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Llamadas de hoy</div>
            <div className="stat-value">0</div>
            <div className="stat-sublabel">Conectadas / atendidas</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Leads nuevos</div>
            <div className="stat-value">0</div>
            <div className="stat-sublabel">Últimas 24 horas</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Mensajes pendientes</div>
            <div className="stat-value">0</div>
            <div className="stat-sublabel">Inbox sin responder</div>
          </div>
        </section>

        <section className="panels-grid">
          <div className="panel">
            <div className="panel-header">
              <h2>Actividad reciente</h2>
              <span className="panel-tag">Demo</span>
            </div>
            <p className="panel-empty">
              Aquí verás un timeline de llamadas, SMS, WhatsApp y correos
              manejados por tus agentes de IA.
            </p>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>Próximos pasos</h2>
            </div>
            <ol className="panel-list">
              <li>Conectar números telefónicos (Bland.ai / Twilio).</li>
              <li>Conectar tu CRM o Airtable para guardar los leads.</li>
              <li>Configurar el script de tu recepcionista (español/inglés).</li>
              <li>Revisar métricas diarias de llamadas y conversiones.</li>
            </ol>
          </div>
        </section>

        <footer className="dashboard-footer">
          <span>FrontDesk Agents LLC · Command Center v1</span>
        </footer>
      </div>
    </main>
  );
}
