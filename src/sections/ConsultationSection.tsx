import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

export default function ConsultationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const form = formRef.current;

    if (!section || !bg || !content || !form) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });

      const formFields = form.querySelectorAll('.form-field');

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(bg, { scale: 1.08, opacity: 0.7 }, { scale: 1, opacity: 1, ease: 'none' }, 0)
        .fromTo(content.querySelectorAll('.content-item'), { x: '-10vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out', stagger: 0.03 }, 0.08)
        .fromTo(form, { x: '40vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0.10)
        .fromTo(formFields, { y: '3vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', stagger: 0.05 }, 0.16);

      // SETTLE (30-70%): Hold
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = 'service_dzerk12';
    const ownerTemplateID = 'template_nvqlqj9';
    const customerTemplateID = 'template_ihieqob';
    const publicKey = '5bDvae90dsswcWBQs';

    // Send both templates simultaneously
    Promise.all([
      emailjs.sendForm(serviceID, ownerTemplateID, e.target as HTMLFormElement, publicKey),
      emailjs.sendForm(serviceID, customerTemplateID, e.target as HTMLFormElement, publicKey)
    ])
      .then((results) => {
        console.log('Success! Both sent.', results);
        setIsSubmitting(false);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error('Failed...', error);
        setIsSubmitting(false);
        alert('Failed to send the request: ' + (error.text || error.message || 'Unknown error'));
      });
  };

  return (
    <section
      ref={sectionRef}
      id="consultation"
      className="relative w-full min-h-screen py-24 flex items-center overflow-hidden z-[90]"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/solar_farm_sky.jpg"
          alt="Solar farm"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Content */}
        <div
          ref={contentRef}
          className="flex-1 max-w-lg w-full text-center lg:text-left"
        >
          <span className="content-item inline-block font-mono text-xs uppercase tracking-[0.14em] text-white/70 mb-4">
            Consultation
          </span>
          <h2 className="content-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Ready to start? Get a free quote.
          </h2>
          <p className="content-item mt-6 text-base sm:text-lg text-white/80 leading-relaxed mx-auto lg:mx-0 max-w-md">
            Tell us a little about your home or business, and we'll prepare a personalized estimate—no pressure, no spam.
          </p>
        </div>

        {/* Form Card */}
        <div
          ref={formRef}
          className="w-full max-w-[420px] lg:w-[420px] shrink-0 bg-white rounded-[28px] p-6 lg:p-8 shadow-xl"
        >
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-solar-navy mb-2">Thank you!</h3>
              <p className="text-solar-gray">We'll get back to you within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="form-field">
                <Label htmlFor="name" className="text-sm font-medium text-solar-navy">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  required
                  className="mt-1.5 rounded-xl border-gray-200 focus:border-solar-yellow focus:ring-solar-yellow"
                />
              </div>
              <div className="form-field">
                <Label htmlFor="email" className="text-sm font-medium text-solar-navy">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="mt-1.5 rounded-xl border-gray-200 focus:border-solar-yellow focus:ring-solar-yellow"
                />
              </div>
              <div className="form-field">
                <Label htmlFor="phone" className="text-sm font-medium text-solar-navy">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  required
                  className="mt-1.5 rounded-xl border-gray-200 focus:border-solar-yellow focus:ring-solar-yellow"
                />
              </div>
              <div className="form-field">
                <Label htmlFor="location" className="text-sm font-medium text-solar-navy">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="City, State"
                  required
                  className="mt-1.5 rounded-xl border-gray-200 focus:border-solar-yellow focus:ring-solar-yellow"
                />
              </div>
              <div className="form-field pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-solar-yellow text-solar-navy hover:bg-solar-yellow/90 font-medium py-6 rounded-xl"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Request a call
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
              <p className="form-field text-xs text-center text-solar-gray">
                We reply within one business day.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
