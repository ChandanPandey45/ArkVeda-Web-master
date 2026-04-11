import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Case Studies', href: '#case-study' },
  { label: 'Technology', href: '#technology' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
          }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <a
              href="#"
              className="flex items-center group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
            >
              {/* Frosted pill wrapper — visible only on transparent (dark hero) state */}
              <div
                className="flex items-center transition-all duration-500 group-hover:scale-[1.03]"
                style={{
                  background: isScrolled ? 'transparent' : 'rgba(255,255,255,0.92)',
                  backdropFilter: isScrolled ? 'none' : 'blur(8px)',
                  borderRadius: isScrolled ? '0px' : '10px',
                  padding: isScrolled ? '0' : '6px 12px',
                  boxShadow: isScrolled ? 'none' : '0 2px 16px rgba(0,0,0,0.15)',
                  transition: 'all 0.5s ease',
                }}
              >
                <img
                  src="/arkveda-transparent.png"
                  alt="Arkveda Logo"
                  className="h-7 lg:h-9 w-auto object-contain"
                  style={{
                    filter: isScrolled
                      ? 'drop-shadow(0 1px 2px rgba(11,30,47,0.08))'
                      : 'none',
                  }}
                />
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-sm font-medium transition-colors hover:text-solar-yellow ${isScrolled ? 'text-solar-navy' : 'text-white/90'
                    }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button
                onClick={() => scrollToSection('#consultation')}
                className="bg-solar-yellow text-solar-navy hover:bg-solar-yellow/90 font-medium px-6"
              >
                Book a consultation
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-solar-navy' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-solar-navy' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-solar-navy transition-all duration-500 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {/* Mobile Logo in pill */}
          <div
            className="mb-2 px-6 py-4 rounded-xl shadow-lg border border-white/20"
            style={{ background: 'rgba(255,255,255,0.95)' }}
          >
            <img
              src="/arkveda-transparent.png"
              alt="Arkveda Logo"
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </div>

          {navLinks.map((link, index) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-medium text-white hover:text-solar-yellow transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={() => scrollToSection('#consultation')}
            className="mt-4 bg-solar-yellow text-solar-navy hover:bg-solar-yellow/90 font-medium px-8 py-6 text-lg"
          >
            Book a consultation
          </Button>
        </div>
      </div>
    </>
  );
}
