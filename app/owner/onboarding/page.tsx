// app/owner/onboarding/page.tsx

const steps = [
  {
    id: 1,
    title: "Datos legales del cliente",
    items: [
      "Nombre legal del negocio",
      "Nombre del dueño / decisor",
      "Email principal y teléfono",
      "Dirección del negocio",
    ],
  },
  {
    id: 2,
    title: "Configuración de llamadas",
    items: [
      "Número de entrada (Twilio/Bland) conectado",
      "Horario de atención configurado",
      "Script de bienvenida aprobado por el cliente",
      "Reglas de transferencia a humanos definidas",
    ],
  },
  {
    id: 3,
    title: "Plan y cobro inicial",
    items: [
      "Plan elegido (Starter / Professional / Enterprise)",
      "Link de pago enviado (Stripe/Square/PayPal)",
      "Primer pago confirmado",
      "Contrato / Términos aceptados",
    ],
  },
  {
    id: 4,
    title: "Activación del AI Receptionist",
    items: [
      "Test call completada con el cliente",
      "Verificado inbox de mensajes y email",
      "Dashboard accesible para el cliente",
      "Primera semana de monitoreo activada",
    ],
  },
];

export default function OwnerOnboardingPage() {
  return (
    <main className="min-h-screen px-4 py-10 lg:px-8 bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold tracking-[0.35em] text-emerald-400 uppercase">
            CLIENT ONBOARDING
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Onboarding Checklist – Nuevo Cliente
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Usa esta lista para activar un nuevo cliente de principio a fin.
            Cuando todos los pasos están listos, ese cliente ya está
            produciendo dinero y llamadas en FrontDesk Agents.
          </p>
        </header>

        <div className="space-y-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Paso {step.id}
                  </p>
                  <h2 className="text-lg font-semibold text-slate-50">
                    {step.title}
                  </h2>
                </div>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                {step.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
