// /app/page.tsx
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";

const Button = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => (
  <button
    className={`px-6 py-3 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl ${className}`}
    {...props}
  >
    {children}
  </button>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-cyan-700/50 hover:border-cyan-500/70 transition-all duration-300 transform hover:scale-[1.02] shadow-2xl">
    <Icon className="w-8 h-8 text-cyan-400 mb-4" />
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header/Nav */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-extrabold text-cyan-400 tracking-wider">
            FrontDesk Agents LLC
          </div>
          <a
            href="#contact"
            className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center p-8 pt-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-4">
            The Future of Front-Office Automation
          </p>
          <h1
            className="text-6xl md:text-8xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff, #8dd3f7, #4dd0e1)",
            }}
          >
            AI Phone OS for Enterprise
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Instantly deploy a fully autonomous, hyper-realistic AI agent that
            handles 99% of your front-office calls, 24/7.
          </p>

          <div className="flex justify-center space-x-4">
            <Button className="bg-cyan-500 text-slate-900 hover:bg-cyan-400">
              Start Free Trial <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Button>
            <Button className="bg-slate-700 text-white border border-slate-600 hover:bg-slate-600">
              See Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Unmatched Performance. Unbelievable Efficiency.
          </h2>
          <p className="text-xl text-slate-400 text-center mb-16">
            Our agents are trained on billions of customer interactions,
            delivering human-level service at machine speed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Clock}
              title="24/7 Availability"
              description="Never miss a call. Our AI agents work around the clock, handling peak volumes effortlessly."
            />
            <FeatureCard
              icon={Zap}
              title="Hyper-Realistic Voice"
              description="Customers won't know the difference. Our voice models are indistinguishable from human agents."
            />
            <FeatureCard
              icon={Shield}
              title="Secure & Compliant"
              description="Built with enterprise-grade security and compliance standards for peace of mind."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} FrontDesk Agents LLC. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
