import Link from "next/link";

export default function Home() {
  return (
    <main className="page page--centered">
      <section className="hero">
        <div className="hero__badge">Versión Demo Interna · FrontDesk Agents LLC</div>

        <h1 className="hero__title">
          FrontDesk Agents <span className="hero__accent">Command Center</span>
        </h1>

        <p className="hero__subtitle">
          La plataforma ya está <strong>LIVE</strong> en producción.
          Desde aquí monitoreamos llamadas, leads, WhatsApp, correos
          y métricas en tiempo real con agentes de IA 24/7.
        </p>

        <div className="hero__actions">
          <Link href="/dashboard" className="btn btn--primary">
            Ir al Dashboard
          </Link>

          <Link href="/setup" className="btn btn--ghost">
            Configurar cuenta
          </Link>
        </div>

        <div className="hero__footnote">
          Versión demo interna. Conecta números (Bland / Twilio), Airtable y
          correos cuando estés listo para producción.
        </div>
      </section>
    </main>
  );
}
