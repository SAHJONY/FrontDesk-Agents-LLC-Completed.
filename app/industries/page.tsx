// app/industries/page.tsx
import Image from "next/image";

type IndustryCardProps = {
  name: string;
  description: string;
  image: string;
  badge: string;
};

function IndustryCard({ name, description, image, badge }: IndustryCardProps) {
  return (
    <article className="fd-card overflow-hidden flex flex-col">
      <div className="premium-image-container max-w-full aspect-[16/9] rounded-2xl">
        <Image src={image} alt={name} fill className="premium-image" />
      </div>
      <div className="p-5 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-slate-50">
            {name}
          </h3>
          <span className="rounded-full bg-cyan-400/10 text-cyan-300 text-[11px] font-semibold px-2.5 py-1 uppercase tracking-wide">
            {badge}
          </span>
        </div>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
    </article>
  );
}

export default function IndustriesPage() {
  const industries: IndustryCardProps[] = [
    {
      name: "Medical & Dental",
      description:
        "Answer new patient calls 24/7, pre-qualify insurance and book cleanings or consultations automatically.",
      image: "/premium/industries/medical.png",
      badge: "Healthcare",
    },
    {
      name: "Law Firms",
      description:
        "Capture consultations, qualify cases and route calls by practice area in seconds.",
      image: "/premium/industries/lawyers.png",
      badge: "Legal",
    },
    {
      name: "Real Estate & Investors",
      description:
        "Qualify sellers, screen buyers and schedule showings while you sleep.",
      image: "/premium/industries/real-estate.png",
      badge: "Real Estate",
    },
    {
      name: "E-commerce & Logistics",
      description:
        "Recover abandoned calls, track orders and process simple support requests with AI messaging.",
      image: "/premium/industries/ecommerce.png",
      badge: "E-commerce",
    },
    {
      name: "HVAC & Home Services",
      description:
        "Book urgent jobs, route emergencies and reduce no-shows with automated reminders.",
      image: "/premium/industries/hvac.png",
      badge: "Field Service",
    },
    {
      name: "Restaurants & Salons",
      description:
        "Handle reservations, confirmations and waitlists without burning your staff.",
      image: "/premium/industries/restaurants.png",
      badge: "Local",
    },
  ];

  return (
    <main className="min-h-screen px-5 sm:px-8 pt-6 pb-12 bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300/80">
            Built for High-Volume Businesses
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">
            Industries We Serve
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            FrontDesk Agents is ready for your niche: clinics, attorneys,
            wholesalers, HVAC, e-commerce and more. One platform, many
            playbooks.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {industries.map((industry) => (
            <IndustryCard key={industry.name} {...industry} />
          ))}
        </section>
      </div>
    </main>
  );
}
