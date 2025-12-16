import {
  ShieldCheckIcon,
  LockClosedIcon,
  DocumentTextIcon,
  PhoneIcon, // Changed from Headset
  BoltIcon, // Changed from Zap
} from '@heroicons/react/24/outline';

export default function ComplianceSecurityPage() {
  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'HIPAA Compliance',
      description: 'Full HIPAA compliance with encrypted data storage and transmission.',
    },
    {
      icon: LockClosedIcon,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security protocols to protect your data.',
    },
    {
      icon: DocumentTextIcon,
      title: 'Compliance Documentation',
      description: 'Complete audit trails and compliance documentation for all interactions.',
    },
    {
      icon: PhoneIcon,
      title: 'Secure Communications',
      description: 'All calls are encrypted and securely stored with access controls.',
    },
    {
      icon: BoltIcon,
      title: 'Real-time Monitoring',
      description: 'Continuous security monitoring and threat detection.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] via-[#0f1e2e] to-[#000814] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Compliance & Security
            </h1>
            <p className="text-xl text-gray-300">
              Enterprise-grade security and compliance built into every interaction
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-16">
            <img
              src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&q=90&fit=crop"
              alt="Security and compliance"
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <feature.icon className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Our Certifications
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-3">
                  <ShieldCheckIcon className="w-10 h-10 text-cyan-400" />
                </div>
                <p className="text-white font-semibold">HIPAA</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-3">
                  <ShieldCheckIcon className="w-10 h-10 text-cyan-400" />
                </div>
                <p className="text-white font-semibold">SOC 2</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-3">
                  <ShieldCheckIcon className="w-10 h-10 text-cyan-400" />
                </div>
                <p className="text-white font-semibold">GDPR</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-3">
                  <ShieldCheckIcon className="w-10 h-10 text-cyan-400" />
                </div>
                <p className="text-white font-semibold">ISO 27001</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              Contact Our Security Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
