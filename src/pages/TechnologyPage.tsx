import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, ArrowRight, Monitor, Shield, Wind, Sun, Battery, Cpu, Wifi } from 'lucide-react';

const specs = [
  { label: 'Panel Efficiency', value: 'Up to 22.8%', sub: 'Monocrystalline PERC' },
  { label: 'Inverter Warranty', value: '10 Years', sub: 'Parts & labor covered' },
  { label: 'Panel Warranty', value: '25 Years', sub: 'Output guaranteed' },
  { label: 'Monitoring', value: '24/7 Live', sub: 'Mobile + web dashboard' },
];

const techStack = [
  {
    icon: Sun,
    title: 'Tier-1 Solar Panels',
    description: 'We only install panels from Tier-1 manufacturers rated by Bloomberg Finance. Our panels achieve up to 22.8% efficiency with guaranteed 80% output after 25 years.',
    color: 'text-solar-yellow',
    bg: 'bg-solar-yellow/10',
  },
  {
    icon: Cpu,
    title: 'Smart Inverters',
    description: 'String and microinverter solutions with built-in arc-fault detection, reactive power compensation and real-time grid diagnostics for safe, reliable conversion.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Battery,
    title: 'Lithium-Ion Storage',
    description: 'Pair your system with LiFePO4 battery storage for complete energy independence. Seamless switchover to battery within 10ms during grid outages.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Wifi,
    title: 'IoT Monitoring Platform',
    description: 'Our proprietary monitoring platform provides real-time insights into power generation, consumption, CO₂ offset, and system health — accessible from any device.',
    color: 'text-purple-600',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Shield,
    title: 'Precision Mounting',
    description: 'Corrosion-resistant aluminum racking systems engineered to withstand 180 km/h wind loads and meet all IS codes and local building regulations.',
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
  {
    icon: Wind,
    title: 'Weather-Resilient Design',
    description: 'Every system is engineered for the Indian climate — from coastal humidity to desert heat. Panels carry IEC certification for salt spray, hail and UV resistance.',
    color: 'text-cyan-600',
    bg: 'bg-cyan-500/10',
  },
];

export default function TechnologyPage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-solar-light">
      <div className="grain-overlay" />
      {/* Navbar removed, now in App.tsx */}

      {/* Hero */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-solar-navy">
        <div className="absolute inset-0">
          <img src="/installer_working.jpg" alt="Technology" className="w-full h-full object-cover opacity-20 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-solar-navy/90 via-solar-navy/80 to-solar-navy" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/50 hover:text-solar-yellow transition-colors mb-10 text-sm group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <div className="max-w-3xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-solar-yellow bg-solar-yellow/10 px-4 py-1.5 rounded-full border border-solar-yellow/20 mb-6">
              Our Technology
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Quality you can see. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-solar-yellow to-orange-400">Performance you can track.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed">
              We use only Tier-1 rated components and partner with industry-leading manufacturers to ensure maximum output for decades.
            </p>
          </div>
        </div>
      </section>

      {/* Specs row */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
          {specs.map((s) => (
            <div key={s.label} className="text-center pl-4 first:pl-0">
              <div className="text-2xl lg:text-3xl font-bold text-solar-navy">{s.value}</div>
              <div className="text-xs text-solar-gray mt-1">{s.label}</div>
              <div className="text-xs text-solar-yellow mt-0.5 font-medium">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-solar-navy mb-4">The complete Arkveda tech stack</h2>
            <p className="text-solar-gray text-lg max-w-xl mx-auto">Every component in your solar system is chosen for durability, efficiency, and safety.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech) => (
              <div key={tech.title} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-2xl ${tech.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <tech.icon className={`w-7 h-7 ${tech.color}`} />
                </div>
                <h3 className="text-xl font-bold text-solar-navy mb-3">{tech.title}</h3>
                <p className="text-solar-gray text-sm leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monitoring preview section */}
      <section className="bg-solar-navy py-20 lg:py-28 px-6 lg:px-12 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(242,178,59,0.08)_0%,_transparent_70%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-solar-yellow bg-solar-yellow/10 px-3 py-1.5 rounded-full border border-solar-yellow/20 mb-6">
                Smart Monitoring
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Track every kilowatt in real-time.</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Our IoT-enabled monitoring platform gives you a live view of generation, consumption, grid export, and battery levels — accessible from your phone, tablet or browser.
              </p>
              <ul className="space-y-4">
                {['Live generation vs consumption graph', 'CO₂ offset and savings tracker', 'Instant fault alerts via SMS/email', 'Historical reports with export'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/80">
                    <div className="w-5 h-5 rounded-full bg-solar-yellow/20 border border-solar-yellow/40 flex items-center justify-center shrink-0">
                      <Monitor className="w-3 h-3 text-solar-yellow" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-white/30 text-xs font-mono">arkveda-monitor.app</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-sm">Today's Generation</span>
                    <span className="text-solar-yellow font-bold text-xl">18.4 kWh</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-solar-yellow to-orange-400 rounded-full" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[
                      { label: 'Saving', value: '₹ 214', color: 'text-emerald-400' },
                      { label: 'CO₂ Avoided', value: '12.1 kg', color: 'text-blue-400' },
                      { label: 'Grid Export', value: '4.2 kWh', color: 'text-solar-yellow' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center">
                        <div className={`font-bold ${stat.color}`}>{stat.value}</div>
                        <div className="text-white/40 text-xs mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    {[40, 65, 55, 80, 72, 88, 78, 90, 85, 60, 70, 75].map((h, i) => (
                      <div key={i} className="flex-1 bg-solar-yellow/20 rounded-sm" style={{ height: `${h * 0.6}px` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-12 bg-solar-light">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-solar-navy mb-4">Experience the difference premium tech makes.</h2>
          <p className="text-solar-gray mb-8">Let us design a system that maximizes your return on investment using the best available components.</p>
          <button
            onClick={() => navigate('/quote')}
            className="inline-flex items-center gap-3 bg-solar-navy text-white font-semibold px-10 py-5 rounded-2xl text-lg hover:bg-solar-navy/85 transition-colors shadow-lg hover:-translate-y-0.5 transform duration-200"
          >
            Get your custom design
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
