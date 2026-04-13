import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How much can I save with solar panels?',
    answer: 'Most homeowners save 25-35% on their annual electricity bills. The exact amount depends on your roof size, location, sun exposure, and current energy consumption. We provide a free custom savings estimate.'
  },
  {
    question: 'What is the typical payback period for solar?',
    answer: 'Most solar systems pay for themselves in 4-8 years. After that, you enjoy 20+ years of nearly free electricity. We provide detailed ROI calculations in your quote.'
  },
  {
    question: 'Do solar panels work in cloudy weather?',
    answer: 'Yes! Solar panels generate electricity even on cloudy days, though at reduced efficiency. India\'s climate is ideal for solar energy, with most areas receiving excellent sun exposure year-round.'
  },
  {
    question: 'What maintenance do solar systems require?',
    answer: 'Solar systems require minimal maintenance. Annual cleaning and periodic inspections keep your system at peak performance. We offer maintenance contracts starting at ₹5,000/year.'
  },
  {
    question: 'Are there government incentives for solar?',
    answer: 'Yes! The Indian government offers subsidies, tax benefits, and accelerated depreciation for both residential and commercial solar installations. We help you navigate all available incentives.'
  },
  {
    question: 'How long do solar panels last?',
    answer: 'Quality solar panels last 25-30 years or more. Our Tier-1 panels come with 25-year output warranties, guaranteeing 80% efficiency after 25 years.'
  },
  {
    question: 'Can I add battery storage later?',
    answer: 'Absolutely! Our systems are designed for battery integration. You can add lithium-ion storage to any system for energy independence during grid outages.'
  },
  {
    question: 'What happens during monsoon season?',
    answer: 'Solar panels are designed to withstand heavy rains, high winds, and extreme weather. Our IEC-certified systems handle India\'s monsoons with no issues.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full py-16 lg:py-24 bg-solar-light z-[85]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-solar-navy mb-3">
            Common Questions About Solar Energy
          </h2>
          <p className="text-solar-gray max-w-2xl mx-auto">
            Get answers to frequently asked questions about solar installation, savings, maintenance, and government incentives
          </p>
        </div>

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
            onClick={() => document.querySelector('#consultation')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-block px-8 py-3 lg:py-4 rounded-lg bg-solar-yellow text-solar-navy font-semibold hover:bg-solar-yellow/90 transition-colors"
            title="Schedule a free solar consultation"
          >
            Book a Free Consultation
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
  );
}
