// app/demo/page.tsx
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Book a Live Demo | FrontDesk Agents",
  description:
    "Agenda una demo en vivo de 30 minutos para ver el FrontDesk Command Center en acción."
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 lg:flex-row lg:items-center">
          {/* TEXTO IZQUIERDA */}
          <div className="flex-1 space-y-5">
            <p className="inline rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">
              FrontDesk Agents · Live Demo
            </p>

            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Agenda tu demo de{" "}
              <span className="text-sky-300">30 minutos</span> y mira cómo
              tu front desk se convierte en una máquina de ingresos.
            </h1>

            <p className="max-w-xl text-sm text-slate-300">
              En esta llamada vemos tu operación actual, te mostramos el
              Command Center en vivo y calculamos cuánto dinero estás dejando
              en la mesa por llamadas perdidas. Terminamos con un plan claro
              para activar tu piloto pagado.
            </p>

            <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">
                Agenda ahora mismo
              </p>
              <p className="text-slate-200">
                Usa nuestro calendario para elegir el horario que mejor te
                funcione. Recibirás confirmación automática y recordatorios.
              </p>

              <Link
                href="https://calendly.com/frontdeskllc/30min"
                target="_blank"
                className="inline-flex items-center justify-center rounded-md bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-sky-300"
              >
                Reservar demo de 30 minutos
              </Link>

              <p className="text-[11px] text-slate-400">
                No se requiere tarjeta para agendar la demo. Al final de la
                llamada puedes iniciar con un piloto pagado vía Zelle, CashApp
                o transferencia.
              </p>
            </div>

            <div className="grid gap-3 text-xs text-slate-300 sm:grid-cols-3">
              <div>
                <p className="font-semibold text-slate-100">Lo que verás</p>
                <p>Dashboard en tiempo real, llamadas, leads y citas.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-100">Lo que cerramos</p>
                <p>Plan de piloto y precio mensual según tu volumen.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-100">Siguiente paso</p>
                <p>Contrato simple + pago inicial para activar tu cuenta.</p>
              </div>
            </div>
          </div>

          {/* IMAGEN DERECHA */}
          <div className="flex-1">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl">
              <Image
                src="/images/ai_hero_concept.png"
                alt="Demo en vivo del FrontDesk Command Center"
                width={960}
                height={640}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent px-4 pb-4 pt-10 text-xs text-slate-200">
                <p className="font-semibold">
                  Demo en vivo · FrontDesk Command Center
                </p>
                <p className="text-[11px] text-slate-300">
                  Mostramos cómo la AI atiende llamadas, rescata perdidas y
                  agenda citas mientras tú ves los números en tiempo real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
