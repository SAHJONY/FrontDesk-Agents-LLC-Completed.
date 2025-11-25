import Image from "next/image";
import AISetupForm from "../components/AISetupForm";
import Link from "next/link";

type Lang = "en" | "es";

function getLang(searchParams?: { lang?: string }): Lang {
  if (!searchParams?.lang) return "en";
  return searchParams.lang === "es" ? "es" : "en";
}

export default function SetupPage({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const lang = getLang(searchParams);

  const copy =
    lang === "en"
      ? {
          title: "Set Up Your AI Receptionist",
          subtitle:
            "Configure an AI-powered receptionist for your online business. You can always tweak these settings later in the command center.",
          buttonBack: "Back to home",
        }
      : {
          title: "Configura Tu Recepcionista de IA",
          subtitle:
            "Configura una recepcionista impulsada por IA para tu negocio en línea. Podrás ajustar estos datos luego en el panel.",
          buttonBack: "Volver al inicio",
        };

  return (
    <main className="fd-page fd-setup">
      <header className="fd-topbar fd-topbar-inner">
        <div className="fd-topbar-left">
          <span className="fd-logo-mark">FD</span>
          <span className="fd-logo-text">FrontDesk Agents</span>
        </div>
        <div className="fd-topbar-right">
          <Link href={`/?lang=${lang}`} className="fd-link-muted">
            {copy.buttonBack}
          </Link>
        </div>
      </header>

      <section className="fd-setup-layout">
        <div className="fd-setup-visual">
          <div className="fd-setup-image-frame">
            <Image
              src="/images/setup-dashboard.jpg"
              alt="AI receptionist configuration dashboard"
              fill
              priority
              className="fd-setup-image"
            />
          </div>
        </div>

        <div className="fd-setup-form-wrapper">
          <h1 className="fd-setup-title">{copy.title}</h1>
          <p className="fd-setup-subtitle">{copy.subtitle}</p>
          <AISetupForm lang={lang} />
        </div>
      </section>
    </main>
  );
}
