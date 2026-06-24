import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import GlobalLoader from './components/GlobalLoader';
import BookingModal from './components/BookingModal';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isBooting, setIsBooting] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPreselected, setBookingPreselected] = useState('');

  // Scroll to top on every single page change (MANDATORY REQUIREMENT) + Dynamic SEO Title & Meta Description
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const titles: Record<Page, string> = {
      home: 'Fortified Plumbing | Trusted Plumbing Services in Ontario',
      about: 'About Us | Fortified Plumbing',
      services: 'Plumbing Services | Fortified Plumbing',
      gallery: 'Our Work Gallery | Fortified Plumbing',
      contact: 'Contact Us | Fortified Plumbing'
    };

    const descriptions: Record<Page, string> = {
      home: 'Red Seal master plumbers providing premium plumbing services, high-end kitchen & bathroom renovations, and mechanical repairs in Lynden, Hamilton, and Southern Ontario.',
      about: 'Built on family and driven by integrity, learn about our Red Seal plumbing licensing, custom-renovations expertise, and top-tier customer commitment.',
      services: 'Explore our specialized plumbing solutions: from custom wet rooms and radiant hydronic loops to expert leak detection, drain snaking, and gas fittings.',
      gallery: 'Browse our real project portfolio showcasing immaculate mechanical rooms, rough-ins, custom pipework, and high-end plumbing creations across Ontario.',
      contact: "Get in touch with Ontario's licensed Master Plumber, Adam Van Berkel, for prompt scheduling, general contractor tenders, or 24/7 mechanical assistance."
    };
    
    document.title = titles[activePage] || 'Fortified Plumbing | Trusted Plumbing Services in Ontario';
    
    const metaDesc = document.getElementById('meta-description');
    if (metaDesc) {
      metaDesc.setAttribute('content', descriptions[activePage] || '');
    }
  }, [activePage]);

  const handleOpenBooking = (serviceTitle: string = '') => {
    setBookingPreselected(serviceTitle);
    setIsBookingOpen(true);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home
            setActivePage={setActivePage}
            onBookNow={(title) => handleOpenBooking(title)}
          />
        );
      case 'about':
        return <About />;
      case 'services':
        return <Services onBookNow={(title) => handleOpenBooking(title)} />;
      case 'gallery':
        return <Gallery />;
      case 'contact':
        return <Contact onBookNow={() => handleOpenBooking()} />;
      default:
        return (
          <Home
            setActivePage={setActivePage}
            onBookNow={(title) => handleOpenBooking(title)}
          />
        );
    }
  };

  return (
    <>
      {/* 1. Cinematic Boot Loader */}
      <AnimatePresence mode="wait">
        {isBooting && (
          <GlobalLoader
            isInitial={true}
            onFinished={() => setIsBooting(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Website Structure once loaded */}
      {!isBooting && (
        <div className="relative min-h-screen bg-brand-bg-primary text-brand-slate-dark flex flex-col justify-between selection:bg-brand-green/20 selection:text-brand-green">
          
          {/* 2. Custom Dual-Layer Cursor (Desktop only, automatically responsive) */}
          <CustomCursor />

          {/* 3. Sticky Glassmorphic Header */}
          <Navbar
            activePage={activePage}
            setActivePage={setActivePage}
            onBookNow={() => handleOpenBooking()}
          />

          {/* 4. Fluid Main Body with Smooth Page Transition blur effects */}
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(8px)', y: -10 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {renderActivePage()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* 5. Rich Premium 4-Column Footer */}
          <Footer
            setActivePage={setActivePage}
            onBookNow={() => handleOpenBooking()}
          />

          {/* 6. High-End Scheduling Multi-Step Form Overlay */}
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            preselectedService={bookingPreselected}
          />

        </div>
      )}
    </>
  );
}
