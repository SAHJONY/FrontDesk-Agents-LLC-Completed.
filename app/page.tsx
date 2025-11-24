import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Image
        src="/images/landing-bg.jpg"
        alt="AI Receptionist"
        fill
        className="object-cover opacity-30"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#050915]" />
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          Turn Calls into Appointments in{" "}
          <span className="text-cyan-400">60 Seconds</span>
        </h1>
        <p className="text-gray-300 mb-8 text-lg max-w-xl">
          24 / 7 availability. Instant scheduling. Boost your conversions.
        </p>
        <a
          href="/setup"
          className="bg-cyan-400 text-black font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-cyan-300 transition"
        >
          Try Free for 14 Days
        </a>
      </section>
    </main>
  );
}
