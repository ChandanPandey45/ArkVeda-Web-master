import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Zap, BarChart3, FileText, MessageCircle, HelpCircle } from 'lucide-react';

export default function ResourcesSection() {
  const navigate = useNavigate();

  const resources = [
    {
      icon: Zap,
      title: 'Solar Solutions',
      description: 'Residential, commercial, and industrial solar systems tailored to your needs',
      href: '/services',
      color: 'text-solar-yellow'
    },
    {
      icon: BookOpen,
      title: 'Technology & Specs',
      description: 'Learn about Tier-1 panels, smart inverters, and our IoT monitoring platform',
      href: '/technology',
      color: 'text-blue-400'
    },
    {
      icon: BarChart3,
      title: 'Case Studies',
      description: 'Real projects showcasing ROI, energy savings, and customer success stories',
      href: '/case-studies',
      color: 'text-emerald-400'
    },
    {
      icon: FileText,
      title: 'Get a Quote',
      description: 'Receive a free, personalized solar proposal with savings estimates',
      href: '/quote',
      color: 'text-orange-400'
    },
    {
      icon: HelpCircle,
      title: 'FAQ',
      description: 'Answers to common questions about solar energy, installations, and savings',
      href: '/faq',
      color: 'text-purple-400'
    },
    {
      icon: MessageCircle,
      title: 'Contact Us',
      description: 'Reach out to ensure your solar questions are answered',
      href: '#contact',
      color: 'text-pink-400'
    }
  ];

  const handleClick = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-16 lg:py-24 bg-white z-[80]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-solar-navy mb-3">
            Explore Our Solar Services
          </h2>
          <p className="text-solar-gray max-w-2xl mx-auto">
            Everything you need to understand solar energy, our technology, and how we can help you save on electricity costs
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {resources.map((resource) => (
            <button
              key={resource.title}
              onClick={() => handleClick(resource.href)}
              className="group text-left p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-solar-yellow hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              title={`Learn more about ${resource.title.toLowerCase()}`}
            >
              <div className="flex items-start justify-between mb-4">
                <resource.icon className={`w-8 h-8 ${resource.color}`} />
                <ArrowRight className="w-5 h-5 text-solar-gray group-hover:text-solar-yellow group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-lg font-bold text-solar-navy mb-2">
                {resource.title}
              </h3>
              <p className="text-sm text-solar-gray leading-relaxed">
                {resource.description}
              </p>
            </button>
          ))}
        </div>

        {/* Additional Links Section */}
        <div className="mt-16 lg:mt-20 pt-12 lg:pt-16 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-solar-navy mb-6">Key Pages</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Solar Solutions', href: '#solutions' },
                  { name: 'How It Works', href: '#how-it-works' },
                  { name: 'Our Technology', href: '#technology' },
                  { name: 'About Arkveda', href: '#about' }
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-solar-gray hover:text-solar-yellow font-medium transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-solar-yellow rounded-full group-hover:scale-150 transition-transform" />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-solar-navy mb-6">Learn More</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Residential Solar', href: '/services' },
                  { name: 'Commercial Solutions', href: '/services' },
                  { name: 'Case Studies & Results', href: '/case-studies' },
                  { name: 'Get a Free Quote', href: '/quote' }
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.href)}
                      className="text-solar-gray hover:text-solar-yellow font-medium transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-solar-yellow rounded-full group-hover:scale-150 transition-transform" />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
