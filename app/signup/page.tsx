import Image from 'next/image';
import SignupForm from '../components/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Branding */}
          <div className="hidden lg:block">
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
                alt="AI Technology"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-purple-900/90"></div>
              
              <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
                <h1 className="text-5xl font-bold mb-6">
                  Join 1,000+ Companies
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Transform your customer communications with enterprise-grade AI phone agents
                </p>
                
                <div className="space-y-4">
                  {[
                    'Deploy in under 5 minutes',
                    'No credit card required',
                    '14-day free trial',
                    '24/7 expert support'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-lg">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold">10M+</div>
                    <div className="text-sm text-blue-200">Calls Handled</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">99.9%</div>
                    <div className="text-sm text-blue-200">Uptime</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">4.9/5</div>
                    <div className="text-sm text-blue-200">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
