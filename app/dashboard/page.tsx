import DashboardCard from "../components/DashboardCard";
import Link from "next/link";

type Lang = "en" | "es";

function getLang(searchParams?: { lang?: string }): Lang {
  if (!searchParams?.lang) return "en";
  return searchParams.lang === "es" ? "es" : "en";
}

export default function DashboardPage({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const lang = getLang(searchParams);

  const copy =
    lang === "en"
      ? {
          title: "FrontDesk Agents – Command Center",
          subtitle:
            "The platform is LIVE in production. Monitor calls, leads, WhatsApp, emails and metrics in real time with 24/7 AI agents.",
          nextStepsTitle: "Next steps",
          steps: [
            "Connect phone numbers (Bland / Twilio).",
            "Connect your CRM or Airtable base for leads.",
            "Configure call flows and reception scripts.",
            "Review daily metrics for calls and conversions.",
          ],
        }
      : {
          title: "FrontDesk Agents – Command Center",
          subtitle:
            "La plataforma ya está LIVE en producción. Monitorea llamadas, leads, WhatsApp, correos y métricas en tiempo real con agentes de IA 24/7.",
          nextStepsTitle: "Próximos pasos",
          steps: [
            "Conectar números telefónicos (Bland / Twilio).",
            "Conectar tu CRM o base de Airtable para los leads.",
            "Configurar el flujo de recepcionistas (scripts / reglas).",
            "Revisar métricas diarias de llamadas y conversiones.",
          ],
        };

  return (
    <main className="fd-page fd-dashboard">
      <header className="fd-topbar fd-topbar-inner">
        <div className="fd-topbar-left">
          <span className="fd-logo-mark">FD</span>
          <span className="fd-logo-text">FrontDesk Agents</span>
        </div>
        <div className="fd-topbar-right">
          <Link href="/setup" className="fd-topbar-button">
            Setup
          </Link>
        </div>
      </header>

      <section className="fd-dashboard-inner">
        <div className="fd-dashboard-header">
          <div>
            <p className="fd-badge">Internal Demo Version – FrontDesk Agents LLC</p>
            <h1 className="fd-dashboard-title">{copy.title}</h1>
            <p className="fd-dashboard-subtitle">{copy.subtitle}</p>
          </div>
          <div className="fd-dashboard-status">
            <span className="fd-status-dot" />
            <span>LIVE</span>
          </div>
        </div>

        <div className="fd-dashboard-grid">
          <DashboardCard
            label={lang === "en" ? "Calls today" : "Llamadas de hoy"}
            value="0"
            description={
              lang === "en" ? "Connected numbers / agents" : "Números / agentes conectados"
            }
          />
          <DashboardCard
            label={lang === "en" ? "New leads" : "Leads nuevos"}
            value="0"
            description={lang === "en" ? "Last 24 hours" : "Últimas 24 horas"}
          />
          <DashboardCard
            label={lang === "en" ? "Pending messages" : "Mensajes pendientes"}
            value="0"
            description={
              lang === "en"
                ? "Needing follow-up"
                : "Mensajes en espera de respuesta"
            }
          />
        </div>

        <div className="fd-dashboard-bottom">
          <div className="fd-dashboard-timeline">
            <h2>{lang === "en" ? "Recent activity" : "Actividad reciente"}</h2>
            <p className="fd-dashboard-muted">
              {lang === "en"
                ? "Here you will see a real-time timeline of calls, WhatsApp, SMS and emails handled by your AI agents."
                : "Aquí verás en tiempo real llamadas, WhatsApp, SMS y correos atendidos por tus agentes de IA."}
            </p>
            <div className="fd-timeline-placeholder">
              {lang === "en"
                ? "Connect your phone system to start streaming activity."
                : "Conecta tu sistema telefónico para empezar a ver actividad."}
            </div>
          </div>

          <aside className="fd-dashboard-nextsteps">
            <h2>{copy.nextStepsTitle}</h2>
            <ul>
              {copy.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
