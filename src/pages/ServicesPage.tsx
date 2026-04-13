import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, ArrowRight, Home, Building2, Factory, Wrench, ShieldCheck, BarChart3, Zap, Leaf } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Residential Solar',
    subtitle: 'For homeowners',
    description: 'Custom-designed rooftop systems sized for your specific consumption. We handle everything from site assessment to commissioning and after-sales support.',
    highlights: ['Free roof assessment', '25-year panel warranty', 'Net metering setup', 'Mobile monitoring app'],
    gradient: 'from-solar-yellow/10 to-orange-400/5',
    border: 'border-solar-yellow/20',
    iconColor: 'text-solar-yellow',
    iconBg: 'bg-solar-yellow/10',
  },
  {
    icon: Building2,
    title: 'Commercial & Industrial',
    subtitle: 'For businesses',
    description: 'Large-scale ground-mounted and rooftop systems engineered to eliminate peak-demand charges and reduce your carbon footprint significantly.',
    highlights: ['Load analysis & savings report', 'Custom EPC contracts', 'DISCOM liaison', 'Performance guarantees'],
    gradient: 'from-blue-500/10 to-cyan-400/5',
    border: 'border-blue-400/20',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
  },
  {
    icon: Factory,
    title: 'Solar + Storage',
    subtitle: 'With battery backup',
    description: 'Pair your solar array with lithium-ion battery storage to achieve energy independence—even during grid outages and night-time consumption.',
    highlights: ['Seamless backup switching', 'Lithium-ion technology', 'AI-powered charge optimization', 'ROI under 4 years'],
    gradient: 'from-emerald-500/10 to-teal-400/5',
    border: 'border-emerald-400/20',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-500/10',
  },
  {
    icon: Wrench,
    title: 'O&M Services',
    subtitle: 'Long-term support',
    description: 'Annual maintenance contracts to keep your system at peak production. Our certified technicians handle cleaning, inspections, and component replacements.',
    highlights: ['Bi-annual cleaning', '24/7 monitoring alerts', 'On-call technician', 'Inverter health checks'],
    gradient: 'from-purple-500/10 to-pink-400/5',
    border: 'border-purple-400/20',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-500/10',
  },
];

const benefits = [
  { icon: ShieldCheck, label: '25-Year Warranty' },
  { icon: BarChart3, label: 'Up to 90% savings' },
  { icon: Zap, label: 'Fast installation' },
  { icon: Leaf, label: 'Zero-carbon energy' },
];

export default function ServicesPage() {
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-solar-light">
      <div className="grain-overlay" />
      {/* Navbar removed, now in App.tsx */}

      {/* Hero */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-solar-navy">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(242,178,59,0.12)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/50 hover:text-solar-yellow transition-colors mb-10 text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <div className="max-w-3xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-solar-yellow bg-solar-yellow/10 px-4 py-1.5 rounded-full border border-solar-yellow/20 mb-6">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              End-to-end solar, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-solar-yellow to-orange-400">built to last.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl">
              From the first consultation to decades of ongoing support — Arkveda is your single partner for every stage of your solar journey.
            </p>
          </div>
        </div>
      </section>

      {/* Benefit strip */}
      <div className="bg-solar-yellow">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <b.icon className="w-5 h-5 text-solar-navy shrink-0" />
              <span className="text-solar-navy font-semibold text-sm">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <section className="relative py-20 lg:py-28 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {services.map((svc) => (
              <div
                key={svc.title}
                className={`group relative rounded-3xl bg-gradient-to-br ${svc.gradient} border ${svc.border} bg-white p-8 lg:p-10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-14 h-14 rounded-2xl ${svc.iconBg} flex items-center justify-center mb-6`}>
                  <svc.icon className={`w-7 h-7 ${svc.iconColor}`} />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-solar-gray mb-2 block">{svc.subtitle}</span>
                <h2 className="text-2xl font-bold text-solar-navy mb-4">{svc.title}</h2>
                <p className="text-solar-gray leading-relaxed mb-8">{svc.description}</p>
                <ul className="space-y-2">
                  {svc.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3 text-sm text-solar-gray">
                      <span className="w-1.5 h-1.5 rounded-full bg-solar-yellow shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-solar-navy py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Ready to get started?</h2>
          <p className="text-white/60 text-lg mb-10">Tell us about your property and we'll recommend the right solution — free of charge.</p>
          <button
            onClick={() => navigate('/quote')}
            className="inline-flex items-center gap-3 bg-solar-yellow text-solar-navy font-semibold px-10 py-5 rounded-2xl text-lg hover:bg-white transition-colors duration-200 shadow-[0_0_40px_-10px_rgba(242,178,59,0.5)] hover:scale-105 transform duration-200"
          >
            Request a free quote
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
