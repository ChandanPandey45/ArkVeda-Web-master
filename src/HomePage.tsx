import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import EnergyIndependenceSection from './sections/EnergyIndependenceSection';
import HowItWorksSection from './sections/HowItWorksSection';
import SolutionsSection from './sections/SolutionsSection';
import CaseStudySection from './sections/CaseStudySection';
import TechnologySection from './sections/TechnologySection';
import SavingsSection from './sections/SavingsSection';
import TestimonialSection from './sections/TestimonialSection';
import ConsultationSection from './sections/ConsultationSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scroll-triggered animations
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger after all components mount
      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-solar-light">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation removed, now in App.tsx */}
      
      {/* Main content */}
      <main className="relative flex-1">
        {/* Section 1: Hero */}
        <HeroSection />
        
        {/* Section 2: Energy Independence */}
        <EnergyIndependenceSection />
        
        {/* Section 3: How It Works */}
        <HowItWorksSection />
        
        {/* Section 4: Solutions */}
        <SolutionsSection />
        
        {/* Section 5: Case Study */}
        <CaseStudySection />
        
        {/* Section 6: Technology */}
        <TechnologySection />
        
        {/* Section 7: Savings */}
        <SavingsSection />
        
        {/* Section 8: Testimonial */}
        <TestimonialSection />
        
        {/* Section 9: Consultation */}
        <ConsultationSection />
        
        {/* Section 10: About */}
        <AboutSection />
        
        {/* Section 11: Contact */}
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
