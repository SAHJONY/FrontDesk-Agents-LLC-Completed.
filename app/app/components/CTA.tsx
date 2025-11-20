"use client";

export default function CTA() {
  return (
    <section className="w-full py-16 px-6 bg-sky-500 dark:bg-sky-600 text-white text-center rounded-2xl shadow-xl mt-12">
      <h2 className="text-3xl font-bold mb-4">
        Start Your Free 14-Day Trial Today
      </h2>
      <p className="text-lg mb-6">
        Experience the AI Receptionist built for real estate professionals.
      </p>
      <a
        href="https://your-signup-link.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-sky-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
      >
        Get Started
      </a>
    </section>
  );
}
