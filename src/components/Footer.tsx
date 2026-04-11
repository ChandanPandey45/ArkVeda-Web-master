import { Sun, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Case Studies', href: '#case-study' },
  { label: 'Technology', href: '#technology' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  { label: 'Residential Solar', href: '/services' },
  { label: 'Commercial & Industrial', href: '/services' },
  { label: 'Solar + Storage', href: '/services' },
  { label: 'O&M Services', href: '/services' },
  { label: 'Get a Quote', href: '/quote' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

const socialLinks = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    if (href.startsWith('/')) {
      navigate(href);
      return;
    }
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative w-full bg-solar-navy overflow-hidden z-[120]">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-solar-yellow/40 to-transparent" />
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(242,178,59,0.04)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative w-full px-6 lg:px-12 z-10">
        {/* Main grid */}
        <div className="max-w-7xl mx-auto pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
            {/* Brand column */}
            <div className="md:col-span-2 lg:col-span-1">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex items-center gap-2.5 mb-5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-solar-yellow/10 border border-solar-yellow/20 flex items-center justify-center group-hover:bg-solar-yellow/20 transition-colors">
                  <Sun className="w-5 h-5 text-solar-yellow" />
                </div>
                <span className="text-xl font-bold text-white">Arkveda</span>
              </a>
              <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-6">
                Powering a cleaner future—one rooftop at a time. India's trusted solar EPC partner since 2015.
              </p>
              {/* Social links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-solar-yellow hover:border-solar-yellow/40 hover:bg-solar-yellow/10 transition-all duration-200"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-xs font-semibold text-white/30 uppercase tracking-[0.15em] mb-5">
                Navigate
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-white/60 hover:text-solar-yellow transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-semibold text-white/30 uppercase tracking-[0.15em] mb-5">
                Services
              </h4>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-white/60 hover:text-solar-yellow transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="text-xs font-semibold text-white/30 uppercase tracking-[0.15em] mb-5">
                Contact
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:info.contactchandan@gmail.com"
                    className="flex items-start gap-3 text-sm text-white/60 hover:text-solar-yellow transition-colors duration-200 group"
                  >
                    <Mail className="w-4 h-4 mt-0.5 shrink-0 text-solar-yellow/60 group-hover:text-solar-yellow transition-colors" />
                    <span>rishabhpandey90057@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+15550142200"
                    className="flex items-start gap-3 text-sm text-white/60 hover:text-solar-yellow transition-colors duration-200 group"
                  >
                    <Phone className="w-4 h-4 mt-0.5 shrink-0 text-solar-yellow/60 group-hover:text-solar-yellow transition-colors" />
                    <span>+1 (555) 014-2200</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-sm text-white/60">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-solar-yellow/60" />
                    <span>Gorakhpur, Uttar Pradesh, India</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} Arkveda Green Energy. All rights reserved.
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
