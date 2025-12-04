type DemoCopy = {
  title: string;
  subtitle: string;
  bullets: string[];
};

type IndustriesCopy = {
  title: string;
  subtitle: string;
  verticals: string[];
};

type SupportCopy = {
  title: string;
  subtitle: string;
  items: string[];
};

export const demoCopy: Record<Lang, DemoCopy> = {
  en: {
    title: "See FrontDesk Agents in action.",
    subtitle: "Watch how the AI receptionist answers, texts and books in real time.",
    bullets: [
      "Live call flow walkthrough",
      "Sample outbound reactivation campaign",
      "Q&A with our team",
    ],
  },
  es: {
    title: "Mira FrontDesk Agents en acción.",
    subtitle:
      "Observa cómo la recepcionista IA contesta, envía SMS y agenda en tiempo real.",
    bullets: [
      "Recorrido en vivo del flujo de llamadas",
      "Ejemplo de campaña de reactivación",
      "Preguntas y respuestas con nuestro equipo",
    ],
  },
};
