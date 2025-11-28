// components/SiteFooter.tsx
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand & mission */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-slate-50">
              FrontDesk Agents · AI PHONE OS
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              Convertimos cada llamada, WhatsApp y email en ingresos reservados
              en menos de 60 segundos para clínicas, despachos legales,
              inmobiliarias y negocios de alto valor.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              Infraestructura lista para SOC 2 Type II y alineada con GDPR /
              CCPA para industrias reguladas.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Navegación
            </h4>
            <div className="mt-3 flex flex-col gap-1 text-sm text-slate-300">
              <Link href="/" className="hover:text-cyan-300">
                Inicio
              </Link>
              <Link href="/#industries" className="hover:text-cyan-300">
                Industrias
              </Link>
              <Link href="/#features" className="hover:text-cyan-300">
                Características
              </Link>
              <Link href="/pricing" className="hover:text-cyan-300">
                Precios
              </Link>
              <Link href="/setup" className="hover:text-cyan-300">
                Demo guiada
              </Link>
            </div>
          </div>

          {/* Contacto */}
          <div id="contact">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Contacto
            </h4>
            <div className="mt-3 space-y-1 text-sm text-slate-300">
              <p>Houston, Texas · Servicio mundial</p>
              <p>
                Tel:{" "}
                <a
                  href="tel:+12164526636"
                  className="font-medium text-cyan-300"
                >
                  +1 (216) 452-6636
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:sahjonyllc@outlook.com"
                  className="font-medium text-cyan-300"
                >
                  sahjonyllc@outlook.com
                </a>
              </p>
              <p>
                Web:{" "}
                <a
                  href="https://www.frontdeskagents.com"
                  className="font-medium text-cyan-300"
                  target="_blank"
                  rel="noreferrer"
                >
                  frontdeskagents.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-4 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} FrontDesk Agents LLC. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/legal/privacy" className="hover:text-cyan-300">
              Política de privacidad
            </Link>
            <Link href="/legal/terms" className="hover:text-cyan-300">
              Términos de servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
