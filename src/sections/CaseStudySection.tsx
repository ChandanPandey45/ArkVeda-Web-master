import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudySection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const card = cardRef.current;

    if (!section || !bg || !content || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(bg, { scale: 1.10, opacity: 0.7 }, { scale: 1, opacity: 1, ease: 'none' }, 0)
        .fromTo(content.querySelectorAll('.content-item'), { y: '8vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', stagger: 0.03 }, 0.08)
        .fromTo(card, { x: '40vw', opacity: 0, rotate: 6 }, { x: 0, opacity: 1, rotate: 0, ease: 'power2.out' }, 0.12);

      // SETTLE (30-70%): Hold
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="case-study"
      className="relative w-full h-screen overflow-hidden z-50"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/house_dusk_solar.jpg"
          alt="Modern house with solar at dusk"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-center px-6 lg:px-[6vw]"
      >
        <span className="content-item font-mono text-xs uppercase tracking-[0.14em] text-white/70 mb-4">
          Case Study
        </span>
        <h2 className="content-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-xl leading-tight">
          A home that earns while it saves.
        </h2>
        <p className="content-item mt-6 text-base sm:text-lg text-white/80 max-w-md leading-relaxed">
          We redesigned the layout to maximize generation, minimized shading, and delivered a system that pays for itself sooner—without cutting corners.
        </p>
        <button
          onClick={() => navigate('/case-studies')}
          className="content-item mt-8 text-white font-medium flex items-center gap-2 hover:text-solar-yellow transition-colors w-fit"
        >
          Read the full story
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Metric Card */}
      <div
        ref={cardRef}
        className="absolute right-6 lg:right-[6vw] bottom-[12vh] lg:bottom-[12vh] w-[280px] sm:w-[320px] lg:w-[30vw] max-w-[380px] bg-white rounded-[28px] p-6 lg:p-8 shadow-xl"
      >
        <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-solar-navy">28%</span>
        <p className="mt-3 text-sm sm:text-base text-solar-gray">
          Faster payback vs. standard design
        </p>
      </div>
    </section>
  );
}
