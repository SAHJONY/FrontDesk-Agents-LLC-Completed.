const features = [
  {
    title: 'AI Voice Agents',
    description: 'Answer, route, and qualify calls autonomously.',
  },
  {
    title: 'Smart Messaging',
    description: 'SMS and chat follow-ups that convert leads.',
  },
  {
    title: 'Email Operations',
    description: 'Automated inbox management and responses.',
  },
  {
    title: 'Real-Time Analytics',
    description: 'Track calls, conversions, and ROI instantly.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-bold text-center">
          Built for Revenue, Not Demos
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl bg-white p-6 shadow"
            >
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
