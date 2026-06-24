import { ArrowUp, Shield, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from '../types';

interface FooterProps {
  setActivePage: (page: Page) => void;
  onBookNow: () => void;
}

export default function Footer({ setActivePage, onBookNow }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (pageId: Page) => {
    setActivePage(pageId);
    scrollToTop();
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return;

    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-brand-slate-dark text-slate-300 relative overflow-hidden pt-16 pb-8 border-t border-slate-800">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Newsletter Banner */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-700/60 flex flex-col lg:flex-row items-center justify-between gap-6 mb-16 shadow-xl">
          <div className="max-w-md text-center lg:text-left">
            <h3 className="font-display text-lg md:text-xl font-bold text-white mb-2">
              Subscribe to the Fortified Chronicle
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Get luxury custom home plumbing tips, seasonal maintenance guides, and regional Southern Ontario updates. No spam ever.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 sm:w-80">
              <input
                type="email"
                placeholder="your.email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 transition-all"
                required
              />
              <Mail className="absolute right-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
            </div>

            <button
              type="submit"
              className="bg-brand-green hover:bg-brand-teal text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-brand-teal/10 cursor-pointer text-center whitespace-nowrap btn-premium"
            >
              {isSubscribed ? 'Subscribed!' : 'Join Newsletter'}
            </button>
          </form>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Column 1: Company Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleLinkClick('home')}>
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-brand-green to-brand-navy rounded-xl shadow-md">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-white leading-none tracking-tight">
                  FORTIFIED
                </span>
                <span className="font-sans font-bold text-[9px] text-brand-teal tracking-[0.25em] uppercase mt-0.5">
                  PLUMBING
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Serving Hamilton, Burlington, Oakville, and Southern Ontario with premium custom home builds, luxury renovations, and trusted plumbing repairs. Built on family integrity.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-800 text-slate-400 hover:text-brand-teal hover:bg-slate-700 transition-all cursor-pointer"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-800 text-slate-400 hover:text-brand-teal hover:bg-slate-700 transition-all cursor-pointer"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-800 text-slate-400 hover:text-brand-teal hover:bg-slate-700 transition-all cursor-pointer"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://wa.me/5194483916"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-slate-800 text-slate-400 hover:text-brand-teal hover:bg-slate-700 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase mb-6">
              Navigation
            </h4>
            <ul className="space-y-3.5 text-xs">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'Company About' },
                { id: 'services', label: 'Core Services' },
                { id: 'gallery', label: 'Completed Work' },
                { id: 'contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id as Page)}
                    className="text-slate-400 hover:text-brand-teal transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-green rounded-full opacity-60" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase mb-6">
              Plumbing Crafts
            </h4>
            <ul className="space-y-3.5 text-xs">
              {[
                'Kitchen Plumbing',
                'Bathroom Plumbing',
                'Sauna & Luxury Spa Builds',
                'Water Heaters & Boilers',
                'Plumbing Services & Repairs',
                'Custom New Builds & Renovations',
              ].map((serv, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick('services')}
                    className="text-slate-400 hover:text-brand-teal transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                  >
                    <span className="text-brand-teal">✓</span>
                    <span>{serv}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-5 text-xs text-slate-400">
            <h4 className="font-display text-sm font-bold tracking-wider text-white uppercase mb-1">
              Main Office
            </h4>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4.5 h-4.5 text-brand-teal shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Adam Van Berkel (Master Plumber)</p>
                <p>1636 2nd Concession West</p>
                <p>Lynden, Ontario L0R 1T0</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4.5 h-4.5 text-brand-teal shrink-0" />
              <a href="tel:5194483916" className="hover:text-brand-teal transition-colors font-semibold">
                519-448-3916
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4.5 h-4.5 text-brand-teal shrink-0" />
              <a href="mailto:joe@fortifiedplumbing.com" className="hover:text-brand-teal transition-colors">
                joe@fortifiedplumbing.com
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={onBookNow}
                className="w-full bg-slate-800 hover:bg-slate-700 text-brand-teal border border-slate-700 rounded-xl py-2 px-4 text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Request Booking Session</span>
              </button>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} Fortified Plumbing Ltd. All rights reserved. Registered Red Seal Master Plumber in Ontario, Canada.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => handleLinkClick('about')}
              className="text-[11px] text-slate-500 hover:text-slate-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="text-[11px] text-slate-500 hover:text-slate-400 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-brand-teal hover:bg-slate-700 hover:-translate-y-1 transition-all shadow-md cursor-pointer flex items-center justify-center"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
