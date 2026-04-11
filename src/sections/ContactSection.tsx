import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Mail, Phone, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content.querySelectorAll('.animate-item'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen flex items-center bg-solar-navy overflow-hidden z-[110]"
    >
      {/* Background Image with intense overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/house_dusk_solar.jpg"
          alt="Modern house dusk with solar"
          className="w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-solar-navy via-solar-navy/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-solar-navy/90 to-transparent" />
      </div>

      <div ref={contentRef} className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Copy */}
          <div className="text-left space-y-6">
            <span className="animate-item inline-block font-mono text-xs uppercase tracking-[0.2em] text-solar-yellow bg-solar-yellow/10 px-4 py-2 rounded-full border border-solar-yellow/20 backdrop-blur-sm">
              Get in Touch
            </span>
            <h2 className="animate-item text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Let's build your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-solar-yellow to-orange-400">solar plan.</span>
            </h2>
            <p className="animate-item text-lg sm:text-xl text-white/70 max-w-lg leading-relaxed">
              Ready to take control of your energy? Send us a message and our experts will get back to you within one business day with a customized strategy.
            </p>
            
            <div className="animate-item pt-8 hidden lg:block">
              <Button
                onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-solar-yellow text-solar-navy hover:bg-white hover:text-solar-navy font-semibold px-10 py-7 text-lg rounded-2xl shadow-[0_0_40px_-10px_rgba(242,178,59,0.5)] transition-all duration-300 hover:scale-105"
              >
                Book Your Consultation
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right Column: Glassmorphism Contact Cards */}
          <div className="space-y-6">
            <a
              href="mailto:info.contactchandan@gmail.com"
              className="animate-item group block relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl hover:bg-white/10 hover:border-solar-yellow/50 transition-all duration-500 shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-solar-yellow/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-solar-yellow/20 transition-colors duration-500" />
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-solar-yellow to-orange-500 flex items-center justify-center shadow-lg transform group-hover:-translate-y-1 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-solar-navy" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Email Us</h3>
                  <p className="text-white/60 mb-2">Drop us a line anytime.</p>
                  <span className="text-solar-yellow font-medium text-lg lg:text-xl break-all">
                    info.contactchandan@gmail.com
                  </span>
                </div>
              </div>
            </a>

            <a
              href="tel:+15550142200"
              className="animate-item group block relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl hover:bg-white/10 hover:border-blue-400/50 transition-all duration-500 shadow-2xl"
            >
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -ml-16 -mb-16 group-hover:bg-blue-500/20 transition-colors duration-500" />
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 transform group-hover:-translate-y-1 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Call Us</h3>
                  <p className="text-white/60 mb-2">Mon-Fri from 9am to 6pm.</p>
                  <span className="text-white font-medium text-lg lg:text-xl">
                    +1 (555) 014-2200
                  </span>
                </div>
              </div>
            </a>
            
            <div className="animate-item pt-6 lg:hidden">
              <Button
                onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-solar-yellow text-solar-navy hover:bg-white font-semibold py-7 text-lg rounded-2xl shadow-[0_0_40px_-10px_rgba(242,178,59,0.5)]"
              >
                Book Your Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
