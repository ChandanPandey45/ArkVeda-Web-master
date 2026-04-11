import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

      scrollTl
        .fromTo(bg, { scale: 1.08, opacity: 0.6 }, { scale: 1, opacity: 1, ease: 'none' }, 0)
        .fromTo(content.querySelectorAll('.content-item'), { y: '8vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', stagger: 0.05 }, 0.08)
        .fromTo(card, { x: '40vw', opacity: 0, rotate: 4 }, { x: 0, opacity: 1, rotate: 0, ease: 'power2.out', duration: 0.9 }, 0.10);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonial"
      className="relative w-full h-screen overflow-hidden z-[80]"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/home_golden_hour_solar.jpg"
          alt="Home with solar at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E2F]/85 via-[#0B1E2F]/60 to-[#0B1E2F]/30" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-center px-6 lg:px-[6vw]"
      >
        <span className="content-item inline-block font-mono text-xs uppercase tracking-[0.2em] text-solar-yellow bg-solar-yellow/10 px-3 py-1.5 rounded-full border border-solar-yellow/20 mb-6 w-fit">
          Testimonial
        </span>

        {/* Large quote icon */}
        <Quote className="content-item w-10 h-10 text-solar-yellow/40 mb-4 fill-solar-yellow/10" />

        <h2 className="content-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-xl leading-tight">
          The process was clear from day one.
        </h2>
        <p className="content-item mt-6 text-base sm:text-lg text-white/80 max-w-md leading-relaxed italic">
          "They explained every step, kept the site tidy, and the system is performing even better than estimated. We're genuinely impressed."
        </p>
        <div className="content-item flex items-center gap-3 mt-5">
          {/* Avatar placeholder */}
          <div className="w-10 h-10 rounded-full bg-solar-yellow/20 border border-solar-yellow/40 flex items-center justify-center text-solar-yellow font-bold text-sm">
            P
          </div>
          <p className="text-white font-semibold">
            Priya & Rahul, Homeowners — Bangalore
          </p>
        </div>
        <button
          onClick={() => navigate('/case-studies')}
          className="content-item mt-8 text-white font-medium flex items-center gap-2 hover:text-solar-yellow transition-colors w-fit group"
        >
          Read more stories
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Rating Card */}
      <div
        ref={cardRef}
        className="absolute right-6 lg:right-[6vw] bottom-[12vh] lg:bottom-[14vh] w-[280px] sm:w-[320px] lg:w-[30vw] max-w-[380px]"
      >
        <div className="bg-white rounded-[28px] p-6 lg:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-5xl lg:text-6xl font-bold text-solar-navy">4.9</span>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-solar-yellow text-solar-yellow" />
                ))}
              </div>
              <span className="text-xs text-solar-gray">out of 5</span>
            </div>
          </div>
          <p className="text-sm lg:text-base text-solar-gray">
            Average customer rating across 100+ installations
          </p>
          <div className="mt-4 flex gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-solar-yellow" />
            <div className="h-1.5 w-3 rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
}
