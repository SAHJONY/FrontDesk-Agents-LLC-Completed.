import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <h1 className="hero-title">FrontDesk Agents – Command Center</h1>
        <p className="hero-subtitle">
          La plataforma ya está LIVE en producción. Aquí monitoreamos llamadas,
          leads e inbox en tiempo real.
        </p>

        <div className="hero-actions">
          <Link href="/dashboard" className="btn-primary">
            Ir al Dashboard
          </Link>
          <Link href="/setup" className="btn-secondary">
            Configurar cuenta
          </Link>
        </div>

        <p className="hero-footer">
          Versión demo interna. Conecta números, Airtable y correos cuando
          estés listo.
        </p>
      </section>
    </main>
  );
}
