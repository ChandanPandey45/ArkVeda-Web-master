import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const pageContent = {
  'services': {
    title: 'Our Complete Services',
    description: 'Arkveda provides end-to-end solar solutions for residential, commercial, and industrial properties. From consultation and custom engineering to installation and lifetime maintenance, we ensure your transition to clean energy is seamless and profitable.',
  },
  'case-studies': {
    title: 'Success Stories',
    description: 'Explore how we have helped thousands of Indian homeowners and businesses slash their electricity bills by up to 90%. Our case studies highlight real-world installations, ROI timelines, and the environmental impact of choosing Arkveda.',
  },
  'technology': {
    title: 'Our Technology',
    description: 'We partner with Tier-1 manufacturers to source the highest efficiency solar panels, smart inverters, and durable mounting structures. Our technology guarantees maximum power generation even in challenging weather conditions across India.',
  },
  'quote': {
    title: 'Request a Custom Quote',
    description: 'Ready to see how much you can save? Our team will analyze your roof space, past electricity bills, and energy goals to deliver a transparent, no-obligation quote tailored specifically for you.',
  },
  'about-full': {
    title: 'The Full Arkveda Story',
    description: 'Founded with the mission to democratize clean energy, Arkveda has grown into one of India\'s most trusted solar EPC companies. Learn about our journey, our certified team of experts, and our commitment to a sustainable future.',
  }
};

export default function GenericDetailPage() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  
  const content = pageContent[pageId as keyof typeof pageContent] || {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist or is currently being updated.',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageId]);

  return (
    <div className="relative min-h-screen bg-solar-light flex flex-col pt-16 lg:pt-20">
      <div className="grain-overlay" />
      <Navbar />
      
      <main className="relative flex-1 flex flex-col items-center justify-center py-20 px-6 lg:px-12 text-center z-10">
        <div className="max-w-3xl mx-auto bg-white rounded-[32px] p-8 md:p-12 shadow-xl">
          <Button 
            variant="ghost" 
            className="mb-8 text-solar-gray hover:text-solar-navy group"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-solar-navy mb-6">
            {content.title}
          </h1>
          
          <div className="w-16 h-1 bg-solar-yellow mx-auto rounded-full mb-8" />
          
          <p className="text-lg md:text-xl text-solar-gray leading-relaxed mb-12">
            {content.description}
          </p>

          <Button 
            onClick={() => navigate('/#contact')}
            className="bg-solar-yellow text-solar-navy hover:bg-solar-yellow/90 font-medium px-8 py-6 rounded-xl text-lg"
          >
            Contact us today
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
