import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Home, Building2, Factory, CheckCircle2, Phone, Mail, MapPin, Send } from 'lucide-react';

const propertyTypes = [
  { id: 'residential', icon: Home, label: 'Residential', sub: 'Home / Villa' },
  { id: 'commercial', icon: Building2, label: 'Commercial', sub: 'Office / Retail' },
  { id: 'industrial', icon: Factory, label: 'Industrial', sub: 'Factory / Warehouse' },
];

const trustPoints = [
  'No spam, ever',
  'Response within 1 business day',
  'No-pressure consultation',
  '100% free quote',
];

export default function QuotePage() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('residential');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const phone = data.get('phone') as string;
    const location = data.get('location') as string;
    const units = data.get('units') as string;
    const notes = data.get('notes') as string;

    const subject = encodeURIComponent(`Solar Quote Request — ${selectedType} — ${name}`);
    const body = encodeURIComponent(
      `Hi Arkveda Team,\n\nI'd like a quote for a solar installation.\n\n` +
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nLocation: ${location}\n` +
      `Property Type: ${selectedType}\nMonthly Consumption: ${units} units\n\nAdditional Notes:\n${notes}\n\nBest regards,\n${name}`
    );
    window.location.href = `mailto:info.contactchandan@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-solar-light">
      <div className="grain-overlay" />
      {/* Navbar removed, now in App.tsx */}

      {/* Hero */}
      <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-20 bg-solar-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(242,178,59,0.10)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/50 hover:text-solar-yellow transition-colors mb-10 text-sm group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <div className="max-w-2xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-solar-yellow bg-solar-yellow/10 px-4 py-1.5 rounded-full border border-solar-yellow/20 mb-6">
              Free Quote
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Request a custom <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-solar-yellow to-orange-400">solar proposal.</span>
            </h1>
            <p className="text-white/70 text-lg">
              Fill in the form and our energy experts will prepare a tailored solar proposal with estimated savings, system size, and ROI — at no cost to you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-solar-navy mb-3">Your email client should have opened!</h2>
                  <p className="text-solar-gray mb-8">We've pre-filled your quote request. Hit send in your mail app and we'll be in touch within one business day.</p>
                  <button
                    onClick={() => navigate('/')}
                    className="bg-solar-yellow text-solar-navy font-semibold px-8 py-4 rounded-2xl hover:bg-solar-navy hover:text-white transition-colors"
                  >
                    Return to Home
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-gray-100 space-y-6">
                  <h2 className="text-2xl font-bold text-solar-navy mb-2">Tell us about your property</h2>

                  {/* Property type selector */}
                  <div>
                    <label className="block text-sm font-medium text-solar-navy mb-3">Property type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {propertyTypes.map((pt) => (
                        <button
                          key={pt.id}
                          type="button"
                          onClick={() => setSelectedType(pt.id)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 ${
                            selectedType === pt.id
                              ? 'border-solar-yellow bg-solar-yellow/5 text-solar-navy'
                              : 'border-gray-200 text-solar-gray hover:border-gray-300'
                          }`}
                        >
                          <pt.icon className={`w-6 h-6 ${selectedType === pt.id ? 'text-solar-yellow' : ''}`} />
                          <span className="font-semibold text-sm">{pt.label}</span>
                          <span className="text-xs text-solar-gray">{pt.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-solar-navy mb-2">Full Name *</label>
                      <input name="name" required placeholder="Ravi Shankar" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-solar-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-solar-yellow/40 focus:border-solar-yellow transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-solar-navy mb-2">Email *</label>
                      <input name="email" type="email" required placeholder="you@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-solar-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-solar-yellow/40 focus:border-solar-yellow transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-solar-navy mb-2">Phone *</label>
                      <input name="phone" required placeholder="+91 98765 43210" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-solar-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-solar-yellow/40 focus:border-solar-yellow transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-solar-navy mb-2">City / State *</label>
                      <input name="location" required placeholder="Bangalore, Karnataka" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-solar-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-solar-yellow/40 focus:border-solar-yellow transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-solar-navy mb-2">Monthly electricity consumption (units)</label>
                    <input name="units" placeholder="e.g. 450 units" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-solar-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-solar-yellow/40 focus:border-solar-yellow transition-colors" />
                    <p className="text-xs text-solar-gray mt-1.5">Check your last electricity bill for this figure.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-solar-navy mb-2">Additional notes</label>
                    <textarea name="notes" rows={3} placeholder="Any specific requirements, roof type, shading concerns, etc." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-solar-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-solar-yellow/40 focus:border-solar-yellow transition-colors resize-none" />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-solar-yellow text-solar-navy font-semibold py-4 rounded-2xl hover:bg-solar-navy hover:text-white transition-colors duration-200 flex items-center justify-center gap-3 text-base shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5" />
                    Send Quote Request
                  </button>
                  <p className="text-xs text-center text-solar-gray">By submitting, you agree to be contacted by Arkveda's solar consultants.</p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trust signals */}
              <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
                <h3 className="font-bold text-solar-navy mb-5">What to expect</h3>
                <ul className="space-y-3">
                  {trustPoints.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-sm text-solar-gray">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact alternatives */}
              <div className="bg-solar-navy rounded-3xl p-7 text-white">
                <h3 className="font-bold mb-5">Prefer to call or email?</h3>
                <div className="space-y-4">
                  <a href="tel:+15550142200" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-solar-yellow/20 transition-colors">
                      <Phone className="w-5 h-5 text-solar-yellow" />
                    </div>
                    <div>
                      <div className="text-xs text-white/40">Call us directly</div>
                      <div className="text-sm font-medium text-white group-hover:text-solar-yellow transition-colors">+1 (555) 014-2200</div>
                    </div>
                  </a>
                  <a href="mailto:info.contactchandan@gmail.com" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-solar-yellow/20 transition-colors">
                      <Mail className="w-5 h-5 text-solar-yellow" />
                    </div>
                    <div>
                      <div className="text-xs text-white/40">Email us</div>
                      <div className="text-sm font-medium text-white group-hover:text-solar-yellow transition-colors break-all">info.contactchandan@gmail.com</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-solar-yellow" />
                    </div>
                    <div>
                      <div className="text-xs text-white/40">Visit our office</div>
                      <div className="text-sm font-medium text-white">Bangalore, Karnataka</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small stat */}
              <div className="bg-solar-yellow rounded-3xl p-7">
                <div className="text-4xl font-bold text-solar-navy mb-2">₹ 0</div>
                <div className="text-solar-navy font-semibold">Cost to get a quote</div>
                <p className="text-solar-navy/70 text-sm mt-2">No commitment. No credit card. Just an honest assessment of your solar potential.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
