import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Users, Receipt, MapPin, ArrowRight, Award, CheckCircle, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: 'Customer-first',
    description: 'Every decision we make starts with what\'s best for you—from system design to long-term support.',
    icon: Users,
    iconBg: 'bg-solar-yellow/10',
    iconColor: 'text-solar-yellow',
    accent: 'border-l-solar-yellow',
  },
  {
    title: 'Transparent pricing',
    description: 'No hidden fees, no surprises. Get a clear breakdown of costs and savings before you commit.',
    icon: Receipt,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    accent: 'border-l-blue-400',
  },
  {
    title: 'Local support',
    description: 'Our team is based in your region, ready to respond quickly and understand local regulations.',
    icon: MapPin,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    accent: 'border-l-emerald-400',
  },
];

const certifications = [
  { label: 'Approved', value: 'MSME', icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Certified', value: 'ISO', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Empanelled', value: 'UPCL', icon: Award, color: 'text-solar-yellow', bg: 'bg-solar-yellow/10' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const statsEl = statsRef.current;

    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(left.querySelectorAll('.left-item'),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      );

      gsap.fromTo(right.querySelectorAll('.value-card'),
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: right, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      );

      if (statsEl) {
        gsap.fromTo(statsEl.querySelectorAll('.stat-item'),
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: statsEl, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen flex items-center bg-solar-light py-24 lg:py-36 z-[100] overflow-hidden"
    >
      {/* Accent circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-solar-yellow/5 -mr-64 -mt-64 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 -ml-48 -mb-48 blur-3xl pointer-events-none" />

      <div className="relative w-full px-6 lg:px-12 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Certifications Bar */}
          <div ref={statsRef} className="grid grid-cols-3 gap-4 lg:gap-8 mb-20 lg:mb-28 max-w-3xl mx-auto text-center">
            {certifications.map((cert) => (
              <div key={cert.label} className="stat-item flex flex-col items-center">
                <div className={`w-12 h-12 rounded-2xl ${cert.bg} flex items-center justify-center mb-4 shadow-sm`}>
                  <cert.icon className={`w-6 h-6 ${cert.color}`} />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-solar-navy mb-1">{cert.value}</div>
                <div className="text-xs lg:text-sm font-medium text-solar-gray uppercase tracking-widest">{cert.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column */}
            <div ref={leftRef} className="lg:sticky lg:top-32 lg:self-start">
              <span className="left-item font-mono text-xs uppercase tracking-[0.2em] text-solar-yellow bg-solar-yellow/10 px-3 py-1.5 rounded-full border border-solar-yellow/20 mb-5 inline-block">
                About Arkveda
              </span>
              <h2 className="left-item text-3xl sm:text-4xl md:text-5xl font-bold text-solar-navy leading-tight mb-6 mt-2">
                We're here to make solar simple.
              </h2>
              <p className="left-item text-base sm:text-lg text-solar-gray leading-relaxed mb-8">
                From the first survey to long-term maintenance, we prioritize clear communication, honest pricing, and reliable service. Our team of certified engineers and installers brings years of experience to every project.
              </p>
              <Button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="left-item bg-solar-navy text-white hover:bg-solar-navy/85 font-semibold px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Meet the team
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Right Column */}
            <div ref={rightRef} className="space-y-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className={`value-card bg-white rounded-2xl p-6 lg:p-7 shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 ${value.accent} hover:-translate-x-0 group cursor-default`}
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-12 h-12 shrink-0 rounded-2xl ${value.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className={`w-6 h-6 ${value.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-solar-navy mb-2">{value.title}</h3>
                      <p className="text-sm lg:text-base text-solar-gray leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
