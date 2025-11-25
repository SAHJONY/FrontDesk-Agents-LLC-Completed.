import AISetupForm from "../components/AISetupForm";

export default function SetupPage() {
  return (
    <main className="page page--centered">
      <section className="setup">
        <header className="setup__header">
          <p className="setup__eyebrow">Onboarding · Paso 1</p>
          <h1 className="setup__title">Configura tu AI Receptionist</h1>
          <p className="setup__subtitle">
            Define el negocio, el nombre del recepcionista y el propósito
            principal. Esto alimenta los prompts y flujos internos
            del Command Center.
          </p>
        </header>

        <div className="setup__content">
          <AISetupForm />
          <aside className="setup__sidecard">
            <h2>Qué va a hacer la IA</h2>
            <ul>
              <li>Contestar llamadas 24/7 con saludo profesional.</li>
              <li>Capturar leads y enviar resumen a tu CRM / Airtable.</li>
              <li>Calificar prospectos y pasar sólo los buenos.</li>
              <li>Respetar guiones, horarios y reglas TCPA.</li>
            </ul>
            <p className="setup__hint">
              Más tarde conectaremos números de teléfono, bandejas de correo y
              fuentes de leads reales.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
