import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const sun = sunRef.current;
    const content = contentRef.current;
    const label = labelRef.current;

    if (!section || !bg || !sun || !content || !label) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      loadTl
        .fromTo(bg, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.1 })
        .fromTo(sun, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 0.22, duration: 0.9, ease: 'back.out(1.6)' }, '-=0.8')
        .fromTo(content.querySelectorAll('.animate-item'), 
          { y: 24, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, 
          '-=0.5'
        )
        .fromTo(label.querySelectorAll('.label-item'), 
          { y: 10, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, 
          '-=0.3'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set(content.querySelectorAll('.animate-item'), { y: 0, opacity: 1 });
            gsap.set(sun, { scale: 1, opacity: 0.22 });
            gsap.set(bg, { scale: 1, opacity: 1 });
            gsap.set(label.querySelectorAll('.label-item'), { y: 0, opacity: 1 });
          }
        }
      });
      // EXIT (70-100%): Elements exit
      scrollTl
        .fromTo(content.querySelectorAll('.animate-item'), 
          { y: 0, opacity: 1 }, 
          { y: '-18vh', opacity: 0, ease: 'power2.in', stagger: 0.02 }, 
          0.7
        )
        .fromTo(sun, 
          { scale: 1, opacity: 0.22 }, 
          { scale: 1.35, opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(bg, 
          { scale: 1, opacity: 1 }, 
          { scale: 1.08, opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(label.querySelectorAll('.label-item'), 
          { y: 0, opacity: 1 }, 
          { y: '6vh', opacity: 0, ease: 'power2.in', stagger: 0.02 }, 
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#energy-independence');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_rooftop_solar.jpg"
          alt="Solar panels on rooftop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1E2F]/60 via-[#0B1E2F]/40 to-[#0B1E2F]/30" />
      </div>

      {/* Sun Circle */}
      <div
        ref={sunRef}
        className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-solar-yellow"
        style={{ opacity: 0 }}
      />

      {/* Main Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <h1 className="animate-item text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-tight" style={{ opacity: 0 }}>
          Solar energy, simplified.
        </h1>
        <p className="animate-item mt-6 text-lg sm:text-xl text-white/90 max-w-xl" style={{ opacity: 0 }}>
          End-to-end rooftop solutions for homes and businesses.
        </p>
        <div className="animate-item mt-10 flex flex-col sm:flex-row items-center gap-4" style={{ opacity: 0 }}>
          <Button
            onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-solar-yellow text-solar-navy hover:bg-solar-yellow/90 font-medium px-8 py-6 text-base rounded-xl"
          >
            Book a consultation
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <button
            onClick={() => document.querySelector('#solutions')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white/90 hover:text-white font-medium flex items-center gap-2 transition-colors"
          >
            Explore solutions
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Labels */}
      <div
        ref={labelRef}
        className="absolute bottom-8 left-0 right-0 px-6 lg:px-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4"
      >
        <span className="label-item font-mono text-xs uppercase tracking-[0.14em] text-white/70" style={{ opacity: 0 }}>
          Arkveda Green Energy
        </span>
        <span className="label-item text-sm text-white/70 max-w-xs text-left sm:text-right" style={{ opacity: 0 }}>
          Performance-first design. Transparent pricing. Local support.
        </span>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
