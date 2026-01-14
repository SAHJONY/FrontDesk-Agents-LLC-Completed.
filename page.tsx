import Navigation from '@/components/Navigation';
import HeroSectionEnhanced from '@/components/HeroSectionEnhanced';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <HeroSectionEnhanced />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
