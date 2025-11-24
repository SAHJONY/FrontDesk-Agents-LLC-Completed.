"use client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex items-center justify-center px-6">
      {/* Background cinematic image */}
      <Image
        src="/images/landing-bg.jpg"
        alt="AI Receptionist background"
        fill
        priority
        className="object-cover opacity-40"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />

      {/* Main content */}
      <section className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Turn Calls into{" "}
          <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
            Appointments
          </span>{" "}
          in 60 Seconds
        </h1>

        <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
          24/7 AI Receptionist that answers calls, books appointments, and boosts
          your sales — automatically.
        </p>

        <a
          href="/setup"
          className="inline-block bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_45px_rgba(34,211,238,0.8)]"
        >
          Try Free for 14 Days
        </a>

        <div className="mt-8 flex flex-col items-center text-gray-400 text-sm space-y-1">
          <p>No credit card required</p>
          <p>Cancel anytime</p>
        </div>
      </section>

      {/* Cinematic blur circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-purple-700/20 rounded-full blur-3xl" />
    </main>
  );
}
