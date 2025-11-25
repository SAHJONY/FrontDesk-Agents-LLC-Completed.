import DashboardCard from "../components/DashboardCard";

export default function DashboardPage() {
  return (
    <main className="dashboard">
      <div className="dashboard-inner">
        <header className="dashboard-header">
          <div>
            <h1>FrontDesk Agents – Command Center</h1>
            <p>
              La plataforma ya está LIVE en producción. Aquí monitoreamos
              llamadas, leads e inbox en tiempo real.
            </p>
          </div>
          <span className="badge-live">LIVE</span>
        </header>

        {/* Top stats */}
        <section className="dashboard-grid">
          <DashboardCard
            title="Llamadas de hoy"
            value="0"
            subtitle="Conectadas / atendidas"
          />
          <DashboardCard
            title="Leads nuevos"
            value="0"
            subtitle="Últimas 24 horas"
          />
          <DashboardCard
            title="Mensajes pendientes"
            value="0"
            subtitle="WhatsApp / SMS / Email por responder"
          />
        </section>

        {/* Bottom row */}
        <section className="dashboard-bottom">
          <div className="panel">
            <h2>Actividad reciente</h2>
            <p>
              Aquí verás un timeline de llamadas, SMS, WhatsApp y correos
              manejados por tus agentes de IA.
            </p>
            <span className="tag">DEMO</span>
          </div>

          <div className="panel">
            <h2>Próximos pasos</h2>
            <ol className="steps">
              <li>Conectar números telefónicos (Bland / Twilio).</li>
              <li>Conectar el CRM o Airtable para registrar los leads.</li>
              <li>
                Configurar el motor de secuencias de prospección (scripts /
                respuestas).
              </li>
              <li>Revisar métricas diarias de llamadas y conversiones.</li>
            </ol>
          </div>
        </section>

        <footer className="dashboard-footer">
          FrontDesk Agents LLC · Command Center v1
        </footer>
      </div>
    </main>
  );
}
