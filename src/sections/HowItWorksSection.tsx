import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardCheck, Wrench, HeadphonesIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Design',
    description: 'We assess your roof, usage, and goals—then propose a system sized for real performance.',
    icon: ClipboardCheck,
    color: 'from-solar-yellow/20 to-orange-500/10',
    iconBg: 'bg-solar-yellow/20',
    iconColor: 'text-solar-yellow',
  },
  {
    number: '02',
    title: 'Install',
    description: 'Our certified crew installs with care, keeps your home clean, and finishes on schedule.',
    icon: Wrench,
    color: 'from-blue-500/20 to-cyan-500/10',
    iconBg: 'bg-blue-400/20',
    iconColor: 'text-blue-300',
  },
  {
    number: '03',
    title: 'Support',
    description: 'We monitor performance, handle maintenance, and answer questions—year after year.',
    icon: HeadphonesIcon,
    color: 'from-emerald-500/20 to-teal-500/10',
    iconBg: 'bg-emerald-400/20',
    iconColor: 'text-emerald-300',
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !bg || !header || !cards) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });

      const cardElements = cards.querySelectorAll('.step-card');

      scrollTl
        .fromTo(bg, { scale: 1.08, opacity: 0.6 }, { scale: 1, opacity: 1, ease: 'none' }, 0)
        .fromTo(header.querySelectorAll('.header-item'), { y: '-4vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', stagger: 0.05 }, 0.05)
        .fromTo(cardElements[0], { y: '40px', opacity: 0, rotate: -1 }, { y: 0, opacity: 1, rotate: 0, ease: 'power3.out', duration: 0.8 }, 0.12)
        .fromTo(cardElements[1], { y: '50px', opacity: 0, rotate: 1 }, { y: 0, opacity: 1, rotate: 0, ease: 'power3.out', duration: 0.8 }, 0.18)
        .fromTo(cardElements[2], { y: '40px', opacity: 0, rotate: -1 }, { y: 0, opacity: 1, rotate: 0, ease: 'power3.out', duration: 0.8 }, 0.24);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative w-full min-h-screen py-24 flex flex-col justify-center overflow-hidden z-30"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/installer_working.jpg"
          alt="Solar technician at work"
          className="w-full h-full object-cover"
        />
        {/* Stronger overlay for card visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1E2F]/60 via-[#0B1E2F]/70 to-[#0B1E2F]/80" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-20">
          <span className="header-item inline-block font-mono text-xs uppercase tracking-[0.2em] text-solar-yellow bg-solar-yellow/10 px-4 py-1.5 rounded-full border border-solar-yellow/20 mb-4">
            How It Works
          </span>
          <h2 className="header-item mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            A simple path to clean power.
          </h2>
          <p className="header-item mt-3 text-white/60 text-base sm:text-lg max-w-xl mx-auto">
            Three steps is all it takes to start saving.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`step-card relative overflow-hidden rounded-[28px] border border-white/10 backdrop-blur-md bg-gradient-to-br ${step.color} bg-white/5 p-6 lg:p-8 shadow-2xl group hover:-translate-y-1 transition-transform duration-300`}
              >
                {/* Glow orb */}
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5 blur-2xl" />
                
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <span className="font-mono text-5xl font-bold text-white/10 leading-none select-none">
                    {step.number}
                  </span>
                  <div className={`w-12 h-12 rounded-2xl ${step.iconBg} flex items-center justify-center`}>
                    <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 relative z-10">
                  {step.title}
                </h3>
                <p className="text-sm lg:text-base text-white/70 leading-relaxed relative z-10">
                  {step.description}
                </p>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-solar-yellow/40 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
