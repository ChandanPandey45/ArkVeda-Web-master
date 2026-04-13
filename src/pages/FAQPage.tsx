import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { ArrowLeft, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How much can I save with solar panels?',
    answer: 'Most homeowners save 25-35% on their annual electricity bills. The exact amount depends on your roof size, location, sun exposure, and current energy consumption. We provide a free custom savings estimate based on your specific situation.'
  },
  {
    question: 'What is the typical payback period for solar?',
    answer: 'Most solar systems pay for themselves in 4-8 years, depending on your energy usage and local electricity rates. After payback, you enjoy 20+ years of nearly free electricity. We provide detailed ROI calculations in your quote.'
  },
  {
    question: 'Do solar panels work in cloudy weather?',
    answer: 'Yes! Solar panels generate electricity even on cloudy days, though at reduced efficiency (typically 10-25% of peak capacity). India\'s climate is ideal for solar energy, with most areas receiving excellent sun exposure year-round.'
  },
  {
    question: 'What maintenance do solar systems require?',
    answer: 'Solar systems require minimal maintenance. Annual cleaning and periodic inspections keep your system at peak performance. We offer maintenance contracts starting at ₹5,000/year, including 24/7 monitoring and on-call support.'
  },
  {
    question: 'Are there government incentives for solar?',
    answer: 'Yes! The Indian government offers subsidies, tax benefits, accelerated depreciation, and net metering benefits for both residential and commercial solar installations. We help you navigate all available incentives to maximize your savings.'
  },
  {
    question: 'How long do solar panels last?',
    answer: 'Quality solar panels last 25-30 years or more. Our Tier-1 panels come with 25-year output warranties, guaranteeing 80% efficiency after 25 years. Most systems continue producing electricity well beyond this period.'
  },
  {
    question: 'Can I add battery storage later?',
    answer: 'Absolutely! Our solar systems are designed for battery integration. You can add lithium-ion storage to any system for energy independence during grid outages, even years after installation.'
  },
  {
    question: 'What happens during monsoon season?',
    answer: 'Solar panels are designed to withstand heavy rains, high winds, and extreme weather. Our IEC-certified systems handle India\'s monsoons with no issues, and we include wind-load engineering for your specific location.'
  },
  {
    question: 'How does net metering work?',
    answer: 'Net metering allows your system to feed excess solar electricity back to the grid, earning you credits on your electricity bill. When you consume grid electricity at night, you use these credits. It\'s like having a battery in the grid itself.'
  },
  {
    question: 'What if my roof is shaded?',
    answer: 'Partial shading reduces solar production. However, modern microinverters minimize shading losses. Our engineers perform detailed site assessments to optimize panel placement and design around shade patterns.'
  }
];

export default function FAQPage() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-solar-light flex flex-col">
      <div className="grain-overlay" />

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
              FAQ
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Common questions about <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-solar-yellow to-orange-400">solar energy.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl">
              Get answers to frequently asked questions about solar installation, savings, maintenance, and government incentives for your home or business.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="relative flex-1 py-16 lg:py-24 z-10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="group rounded-xl border border-solar-yellow/20 bg-white hover:border-solar-yellow/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 lg:px-8 py-4 lg:py-5 text-left font-semibold text-solar-navy hover:text-solar-yellow transition-colors duration-200 flex items-center justify-between"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-base lg:text-lg">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-6 lg:px-8 pb-4 lg:pb-6 border-t border-solar-yellow/10 text-sm lg:text-base text-solar-gray leading-relaxed"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 lg:mt-16 text-center">
            <p className="text-solar-gray mb-6">
              Have more questions? Our solar experts are ready to help.
            </p>
            <button
              onClick={() => navigate('/quote')}
              className="inline-block px-8 py-3 lg:py-4 rounded-lg bg-solar-yellow text-solar-navy font-semibold hover:bg-solar-yellow/90 transition-colors"
              title="Get a free solar quote"
            >
              Get a Free Quote
            </button>
          </div>
        </div>

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': faqs.map(item => ({
              '@type': 'Question',
              'name': item.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': item.answer
              }
            }))
          })}
        </script>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
