// app/owner/payments/page.tsx

const plans = [
  {
    name: "Starter",
    price: "$399 / mes",
    description: "1 AI Receptionist, 1 inbox, 24/7, 1 idioma.",
    stripeEnv: "NEXT_PUBLIC_STRIPE_STARTER_URL",
    paypalEnv: "NEXT_PUBLIC_PAYPAL_STARTER_URL",
    squareEnv: "NEXT_PUBLIC_SQUARE_STARTER_URL",
  },
  {
    name: "Professional",
    price: "$899 / mes",
    description:
      "3 AI agents, multi-idioma, CRM integration, call routing avanzado.",
    stripeEnv: "NEXT_PUBLIC_STRIPE_PROF_URL",
    paypalEnv: "NEXT_PUBLIC_PAYPAL_PROF_URL",
    squareEnv: "NEXT_PUBLIC_SQUARE_PROF_URL",
  },
  {
    name: "Enterprise",
    price: "$1,799 / mes",
    description:
      "Unlimited agents, SLA, workflows custom, dedicated CSM.",
    stripeEnv: "NEXT_PUBLIC_STRIPE_ENT_URL",
    paypalEnv: "NEXT_PUBLIC_PAYPAL_ENT_URL",
    squareEnv: "NEXT_PUBLIC_SQUARE_ENT_URL",
  },
];

const OTHER_METHODS = {
  cashApp: {
    label: "Cash App",
    cashtag: "$FrontDeskAgents",
    note: "El cliente debe poner el nombre del negocio en el memo.",
  },
  zelle: {
    label: "Zelle",
    email: "billing@frontdeskagents.com",
    name: "FRONTDESK AGENTS LLC",
  },
  wire: {
    label: "Wire Transfer",
    bankName: "TU BANCO",
    accountName: "FRONTDESK AGENTS LLC",
    routingNumber: "000000000",
    accountNumber: "000000000000",
    swift: "SWIFT123",
    note: "Actualizar con tus datos reales del banco.",
  },
};

function getEnvOrPlaceholder(key: string) {
  if (typeof window === "undefined") {
    return `ENV:${key}`;
  }
  // En el navegador, el valor real viene de NEXT_PUBLIC_*
  // @ts-ignore
  return process.env[key] || `ENV:${key}`;
}

export default function OwnerPaymentsPage() {
  return (
    <main className="min-h-screen px-4 py-10 lg:px-8 bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold tracking-[0.35em] text-sky-400 uppercase">
            PAYMENTS DASHBOARD
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Cobros & Suscripciones – FrontDesk Agents
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
            Esta pantalla es para ti como dueño. Aquí decides cómo quieres
            que te paguen: Stripe, Square, PayPal, Cash App, Zelle o wire.
            Solo pega los links reales de checkout en las variables de
            entorno indicadas y ya puedes cobrar.
          </p>
        </header>

        {/* Plans */}
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4"
            >
              <div>
                <p className="text-xs font-semibold text-sky-400 uppercase tracking-wide">
                  {plan.name}
                </p>
                <p className="text-2xl font-bold mt-1">{plan.price}</p>
                <p className="text-sm text-slate-300 mt-2">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-400">
                <p className="font-semibold text-slate-200">
                  Links de pago (pegar en .env):
                </p>
                <ul className="space-y-1">
                  <li>
                    Stripe: <code>{plan.stripeEnv}</code>
                  </li>
                  <li>
                    PayPal: <code>{plan.paypalEnv}</code>
                  </li>
                  <li>
                    Square: <code>{plan.squareEnv}</code>
                  </li>
                </ul>
                <p className="mt-2 text-[11px]">
                  Una vez que crees los productos en Stripe / PayPal / Square,
                  pega las URLs de checkout en un archivo <code>.env</code> con
                  esos nombres de variables (NEXT_PUBLIC_…).
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Otros métodos */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Cash App */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
              {OTHER_METHODS.cashApp.label}
            </p>
            <p className="text-lg font-semibold">
              Cashtag: {OTHER_METHODS.cashApp.cashtag}
            </p>
            <p className="text-sm text-slate-300">
              {OTHER_METHODS.cashApp.note}
            </p>
          </div>

          {/* Zelle */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
              {OTHER_METHODS.zelle.label}
            </p>
            <p className="text-sm text-slate-300">
              Nombre: {OTHER_METHODS.zelle.name}
            </p>
            <p className="text-sm text-slate-300">
              Email: {OTHER_METHODS.zelle.email}
            </p>
          </div>

          {/* Wire */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <p className="text-xs font-semibold text-fuchsia-400 uppercase tracking-wide">
              {OTHER_METHODS.wire.label}
            </p>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>Banco: {OTHER_METHODS.wire.bankName}</li>
              <li>Titular: {OTHER_METHODS.wire.accountName}</li>
              <li>Routing: {OTHER_METHODS.wire.routingNumber}</li>
              <li>Cuenta: {OTHER_METHODS.wire.accountNumber}</li>
              <li>SWIFT: {OTHER_METHODS.wire.swift}</li>
            </ul>
            <p className="text-xs text-slate-400">
              IMPORTANTE: reemplaza estos valores por los datos reales de tu
              banco antes de usarlo con clientes.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
