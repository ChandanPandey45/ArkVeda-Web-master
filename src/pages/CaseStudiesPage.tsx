import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, ArrowRight, Star, TrendingDown, Zap, Leaf } from 'lucide-react';

const caseStudies = [
  {
    category: 'Residential',
    location: 'Bangalore, Karnataka',
    title: 'Sharma Family — 10 kW Rooftop System',
    description: 'A 4-bedroom home with heavy AC usage. We designed a 10 kW bifacial system with smart inverter, reducing their monthly electricity bill from ₹8,200 to ₹610.',
    savings: '₹7,590/month',
    system: '10 kW',
    roi: '3.8 years',
    co2: '10.5 T/year',
    image: '/hero_rooftop_solar.jpg',
    accent: 'border-solar-yellow',
    tag: 'bg-solar-yellow/10 text-solar-navy',
  },
  {
    category: 'Commercial',
    location: 'Pune, Maharashtra',
    title: 'Nexus Textiles — 250 kW Industrial Rooftop',
    description: 'A large textile manufacturing unit running three shifts. We installed a 250 kW ground-mounted + rooftop hybrid system, eliminating daytime grid dependency entirely.',
    savings: '₹1.8L/month',
    system: '250 kW',
    roi: '4.2 years',
    co2: '262 T/year',
    image: '/installer_working.jpg',
    accent: 'border-blue-400',
    tag: 'bg-blue-100 text-blue-800',
  },
  {
    category: 'Housing Society',
    location: 'Hyderabad, Telangana',
    title: 'Greenpark Apartments — 80 kW Common Area Solar',
    description: '120-unit housing society with high common area electricity costs. Our 80 kW rooftop system now powers lifts, corridor lighting and the clubhouse — and exports excess to the grid.',
    savings: '₹58,000/month',
    system: '80 kW',
    roi: '4.5 years',
    co2: '84 T/year',
    image: '/home_golden_hour_solar.jpg',
    accent: 'border-emerald-400',
    tag: 'bg-emerald-100 text-emerald-800',
  },
];

const testimonials = [
  {
    quote: "They explained every step, kept the site tidy, and the system is performing even better than estimated. We're genuinely impressed.",
    name: 'Priya & Rahul',
    role: 'Homeowners, Bangalore',
    stars: 5,
  },
  {
    quote: "The ROI calculation turned out to be spot-on. We broke even in under 4 years and now our energy costs are essentially zero during the day.",
    name: 'Vikram Menon',
    role: 'Director, Nexus Textiles',
    stars: 5,
  },
  {
    quote: "Our committee was skeptical at first, but the process was completely hassle-free. The savings showed up in the very first bill.",
    name: 'Mrs. Sudha Rao',
    role: 'Secretary, Greenpark Apartments',
    stars: 5,
  },
];

export default function CaseStudiesPage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-solar-light">
      <div className="grain-overlay" />
      {/* Navbar removed, now in App.tsx */}

      {/* Hero */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-solar-navy">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(242,178,59,0.10)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/50 hover:text-solar-yellow transition-colors mb-10 text-sm group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <div className="max-w-3xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-solar-yellow bg-solar-yellow/10 px-4 py-1.5 rounded-full border border-solar-yellow/20 mb-6">
              Case Studies
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Real installs. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-solar-yellow to-orange-400">Real savings.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70">
              Explore how we've helped homeowners, businesses and housing societies across India cut their electricity costs by up to 90% — with transparent numbers.
            </p>
          </div>
        </div>
      </section>

      {/* Stats highlight */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 grid grid-cols-3 gap-8 text-center divide-x divide-gray-100">
          {[
            { icon: Zap, val: '100+', label: 'Systems installed' },
            { icon: TrendingDown, val: '₹12 Cr', label: 'Client savings / year' },
            { icon: Leaf, val: '18,400 T', label: 'CO₂ avoided / year' },
          ].map((s) => (
            <div key={s.label} className="pl-4 first:pl-0">
              <s.icon className="w-6 h-6 text-solar-yellow mx-auto mb-2" />
              <div className="text-2xl font-bold text-solar-navy">{s.val}</div>
              <div className="text-xs text-solar-gray mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Case study cards */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-10">
          {caseStudies.map((cs, idx) => (
            <div key={cs.title} className={`bg-white rounded-3xl overflow-hidden shadow-sm border-l-4 ${cs.accent} flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
              <div className="lg:w-2/5 h-64 lg:h-auto relative shrink-0">
                <img src={cs.image} alt={cs.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                <span className={`absolute top-4 left-4 font-mono text-xs font-semibold px-3 py-1.5 rounded-full ${cs.tag}`}>
                  {cs.category}
                </span>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center flex-1">
                <span className="text-xs text-solar-gray font-mono mb-2 uppercase tracking-wider">{cs.location}</span>
                <h2 className="text-2xl lg:text-3xl font-bold text-solar-navy mb-4">{cs.title}</h2>
                <p className="text-solar-gray leading-relaxed mb-8">{cs.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Monthly savings', val: cs.savings },
                    { label: 'System size', val: cs.system },
                    { label: 'Payback period', val: cs.roi },
                    { label: 'CO₂ offset', val: cs.co2 },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-solar-light rounded-xl p-3">
                      <div className="font-bold text-solar-navy text-lg">{stat.val}</div>
                      <div className="text-xs text-solar-gray mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-solar-navy py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-14">What our clients say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-solar-yellow text-solar-yellow" />
                  ))}
                </div>
                <p className="text-white/80 italic leading-relaxed mb-6">"{t.quote}"</p>
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/40 mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-12 bg-solar-light text-center">
        <h2 className="text-3xl font-bold text-solar-navy mb-4">Join over 1,200 satisfied customers.</h2>
        <p className="text-solar-gray mb-8 text-lg">Let's create your own success story — starting with a free consultation.</p>
        <button
          onClick={() => navigate('/quote')}
          className="inline-flex items-center gap-3 bg-solar-yellow text-solar-navy font-semibold px-10 py-5 rounded-2xl text-lg hover:bg-solar-navy hover:text-white transition-colors duration-200 shadow-lg transform hover:-translate-y-0.5 duration-200"
        >
          Get my free quote
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      <Footer />
    </div>
  );
}
