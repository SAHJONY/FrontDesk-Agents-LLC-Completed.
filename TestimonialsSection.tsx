const testimonials = [
  {
    quote:
      'FrontDesk Agents replaced two full-time receptionists in week one.',
    author: 'Managing Partner, Law Firm',
  },
  {
    quote:
      'We stopped missing calls completely. ROI was immediate.',
    author: 'Multi-Location Medical Practice',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-3xl font-bold">Trusted by Operators</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="rounded-xl border p-6"
            >
              <p className="italic">“{t.quote}”</p>
              <footer className="mt-4 font-semibold">
                {t.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
