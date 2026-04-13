import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Home, Building2, Battery, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'Residential Solar', icon: Home },
  { title: 'Commercial & Industrial', icon: Building2 },
  { title: 'Solar + Storage', icon: Battery },
  { title: 'Operations & Maintenance', icon: Settings },
];

export default function SolutionsSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const list = listRef.current;

    if (!section || !bg || !content || !list) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });

      const serviceItems = list.querySelectorAll('.service-item');

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(bg, { scale: 1.08, opacity: 0.7 }, { scale: 1, opacity: 1, ease: 'none' }, 0)
        .fromTo(content.querySelectorAll('.content-item'), { x: '-10vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out', stagger: 0.03 }, 0.08)
        .fromTo(list, { x: '40vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0.10)
        .fromTo(serviceItems, { x: '6vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out', stagger: 0.06 }, 0.14);

      // SETTLE (30-70%): Hold
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative w-full min-h-screen py-24 flex items-center overflow-hidden z-40"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/solar_farm_sky.jpg"
          alt="Solar farm under blue sky"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-20">
        
        {/* Content */}
        <div
          ref={contentRef}
          className="flex-1 max-w-lg"
        >
          <span className="content-item inline-block font-mono text-xs uppercase tracking-[0.14em] text-white/70 mb-4">
            Solutions
          </span>
          <h2 className="content-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Built for homes, made to scale.
          </h2>
          <p className="content-item mt-6 text-base sm:text-lg text-white/80 leading-relaxed">
            From compact rooftops to commercial arrays, we engineer systems that perform—backed by monitoring, maintenance, and honest pricing.
          </p>
          <button
            onClick={() => navigate('/services')}
            className="content-item mt-8 text-white font-medium flex items-center gap-2 hover:text-solar-yellow transition-colors w-fit"
            title="View all solar services including residential and commercial"
          >
            View all solar services
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Service List */}
        <div
          ref={listRef}
          className="w-full lg:w-[380px] shrink-0 space-y-3"
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="service-item bg-white rounded-2xl p-4 lg:p-5 flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="w-1 h-10 bg-solar-yellow rounded-full" />
              <service.icon className="w-5 h-5 text-solar-navy" />
              <span className="flex-1 text-sm lg:text-base font-medium text-solar-navy">
                {service.title}
              </span>
              <ArrowRight className="w-4 h-4 text-solar-gray group-hover:text-solar-yellow group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
