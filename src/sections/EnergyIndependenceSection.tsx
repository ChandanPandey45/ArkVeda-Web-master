import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function EnergyIndependenceSection() {
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
        .fromTo(content.querySelector('.label'), { x: '-8vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0.05)
        .fromTo(content.querySelector('h2'), { y: '10vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.08)
        .fromTo(content.querySelector('p'), { y: '6vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.12)
        .fromTo(content.querySelector('button'), { x: '-2vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0.16)
        .fromTo(card, { x: '40vw', opacity: 0, rotate: 6 }, { x: 0, opacity: 1, rotate: 0, ease: 'power2.out' }, 0.10);

      // SETTLE (30-70%): Hold
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="energy-independence"
      className="relative w-full min-h-screen py-24 flex items-center overflow-hidden z-20"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/home_modern_solar.jpg"
          alt="Modern home with solar panels"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-end lg:items-center justify-between gap-12 lg:gap-20">
        {/* Content */}
        <div
          ref={contentRef}
          className="flex-1 max-w-lg self-start lg:self-center"
        >
          <span className="label content-item inline-block font-mono text-xs uppercase tracking-[0.14em] text-white/70 mb-4">
            Energy Independence
          </span>
          <h2 className="content-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Live modern. Go solar.
          </h2>
          <p className="content-item mt-6 text-base sm:text-lg text-white/80 leading-relaxed">
            We design systems that fit your roof, your usage, and your budget—so you can lock in lower bills and protect your home from rising energy prices.
          </p>
          <button
            onClick={() => document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="content-item mt-8 text-white font-medium flex items-center gap-2 hover:text-solar-yellow transition-colors w-fit"
          >
            See how it works
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stat Card */}
        <div
          ref={cardRef}
          className="w-full sm:w-[320px] max-w-[380px] shrink-0 bg-white rounded-[28px] p-6 lg:p-8 shadow-xl"
        >
          <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-solar-navy">Up to 90%</span>
          <p className="mt-3 text-sm sm:text-base text-solar-gray">
            Reduction in annual electricity costs
          </p>
        </div>
      </div>
    </section>
  );
}
