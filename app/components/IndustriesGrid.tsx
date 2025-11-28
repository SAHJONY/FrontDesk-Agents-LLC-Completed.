// components/IndustriesGrid.tsx
import Image from "next/image";

const INDUSTRIES = [
  {
    id: "medical",
    title: "Medical & Dental Clinics",
    description:
      "Fill the calendar, reduce no-shows y confirma citas en segundos con un AI receptionist entrenado para salud.",
    badge: "+38% más visitas confirmadas",
    image: "/medical.jpg", // ← reemplaza por tu archivo correcto
  },
  {
    id: "legal",
    title: "Law Firms & Legal Services",
    description:
      "Califica leads, agenda consultas y protege cada interacción con registros auditables 24/7.",
    badge: "Prioriza casos de alto valor",
    image: "/legal.jpg", // ← imagen correcta para legal
  },
  {
    id: "realestate",
    title: "Real Estate & Investors",
    description:
      "Captura leads calientes, agenda citas de compradores e inversores y automatiza seguimiento.",
    badge: "+62% más citas exitosas",
    image: "/realestate.jpg",
  },
  {
    id: "homeservices",
    title: "Home Services & Contractors",
    description:
      "Responde cotizaciones, agenda trabajos y confirma visitas sin perder clientes.",
    badge: "Convierte 24/7",
    image: "/homeservices.jpg",
  },
];

export default function IndustriesGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 mt-10">
      {INDUSTRIES.map((industry) => (
        <div
          key={industry.id}
          className="rounded-2xl overflow-hidden bg-[#0D1117] border border-white/10 shadow-xl"
        >
          <div className="relative w-full h-56 md:h-64">
            <Image
              src={industry.image}
              alt={industry.title}
              fill
              className="object-cover"
              sizes="100%"
            />
            <span className="absolute top-4 left-4 bg-blue-500/20 text-blue-300 px-4 py-1 rounded-full text-sm font-medium backdrop-blur">
              {industry.badge}
            </span>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold text-white">
              {industry.title}
            </h3>
            <p className="text-gray-400 mt-2">{industry.description}</p>

            <a
              href={`/industries/${industry.id}`}
              className="text-blue-400 mt-4 inline-block font-medium"
            >
              Ver playbook para este sector ↗
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
