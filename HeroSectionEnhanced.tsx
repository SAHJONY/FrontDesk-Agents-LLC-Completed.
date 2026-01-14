export default function HeroSectionEnhanced() {
  return (
    <section className="relative bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-32 text-center">
        <h1 className="text-5xl font-bold leading-tight">
          Your AI-Powered Revenue Workforce
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
          24/7 AI agents that answer calls, qualify leads, book appointments,
          and never miss revenue.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/demo"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold"
          >
            Book a Demo
          </a>
          <a
            href="/pricing"
            className="rounded-lg border border-white px-6 py-3 font-semibold"
          >
            View Pricing
          </a>
        </div>
      </div>
    </section>
  );
}
