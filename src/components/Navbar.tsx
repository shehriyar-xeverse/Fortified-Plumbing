import { useState, useEffect } from 'react';
import { Menu, X, Shield, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../types';

interface NavbarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  onBookNow: () => void;
}

export default function Navbar({ activePage, setActivePage, onBookNow }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (pageId: Page) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-slate-100 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            {/* Logo Icon */}
            <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-brand-green to-brand-navy rounded-xl shadow-md group-hover:shadow-brand-green/20 transition-all duration-300">
              <Shield className="w-5 h-5 text-white" />
              {/* Pulse effect */}
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
              </span>
            </div>

            {/* Brand Name Text */}
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-none tracking-tight text-brand-navy group-hover:text-brand-green transition-colors">
                FORTIFIED
              </span>
              <span className="font-sans font-bold text-[9px] leading-none tracking-[0.25em] text-brand-teal uppercase mt-0.5">
                PLUMBING
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative text-sm font-semibold tracking-wide py-1.5 transition-colors duration-300 cursor-pointer ${
                    isActive ? 'text-brand-green' : 'text-brand-slate-muted hover:text-brand-green'
                  }`}
                  data-cursor="view"
                >
                  {link.label}
                  {/* Underline Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-green to-brand-teal rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls (Call to Action Button) */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onBookNow}
              className="bg-brand-green hover:bg-brand-teal text-white font-bold text-xs md:text-sm tracking-wide px-5 py-2.5 rounded-xl shadow-md shadow-brand-green/10 hover:shadow-brand-teal/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 cursor-pointer btn-premium"
              data-cursor="book"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Direct access Book Now button for quick mobile conversions */}
            <button
              onClick={onBookNow}
              className="sm:hidden bg-brand-green text-white font-bold text-xs p-2.5 rounded-lg flex items-center justify-center cursor-pointer shadow-md"
            >
              <CalendarDays className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-50 text-brand-navy hover:text-brand-green hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop slide-in/fade */}
            <motion.div
              className="fixed inset-0 top-[60px] bg-brand-slate-dark/20 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed right-0 top-[60px] h-screen w-full sm:w-80 bg-white border-l border-slate-100 shadow-2xl z-50 p-6 flex flex-col justify-between pb-24 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              <div className="space-y-6">
                {/* Brand Showcase inside Drawer */}
                <div className="flex items-center gap-2 pb-6 border-b border-slate-50">
                  <div className="flex items-center justify-center w-8 h-8 bg-brand-green rounded-lg text-white">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-sm text-brand-navy">FORTIFIED</span>
                    <span className="text-[7px] font-bold text-brand-teal tracking-widest">PLUMBING</span>
                  </div>
                </div>

                {/* Staggered Nav Links */}
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link, idx) => {
                    const isActive = activePage === link.id;
                    return (
                      <motion.button
                        key={link.id}
                        onClick={() => handleLinkClick(link.id)}
                        className={`text-left text-base font-bold tracking-wide py-2.5 px-4 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'bg-brand-green/10 text-brand-green font-extrabold'
                            : 'text-brand-slate-muted hover:bg-slate-50 hover:text-brand-green'
                        }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <span>{link.label}</span>
                        {isActive && <div className="w-1.5 h-1.5 bg-brand-green rounded-full" />}
                      </motion.button>
                    );
                  })}
                </nav>
              </div>

              {/* Action Controls inside Drawer */}
              <div className="space-y-4 pt-6 border-t border-slate-50">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onBookNow();
                  }}
                  className="w-full bg-gradient-to-r from-brand-green to-brand-teal text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md hover:shadow-brand-teal/20 transition-all flex items-center justify-center gap-2 cursor-pointer btn-premium"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Request Booking Now</span>
                </button>

                <p className="text-[10px] text-center text-brand-slate-light leading-relaxed">
                  Red Seal Certified Master Plumbers • Serving Hamilton & Southern Ontario
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
