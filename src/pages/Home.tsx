import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, CalendarDays, ArrowRight, ShieldCheck, HeartHandshake, MapPin, Users, CheckCircle, Send, Sparkles, Building, Star } from 'lucide-react';
import { SERVICES_DATA, GALLERY_IMAGES, SERVICE_AREAS } from '../data';
import { Page } from '../types';
import SectionAnimate, { ImageAnimate, HeadingAnimate, DescAnimate } from '../components/SectionAnimate';
import TiltCard from '../components/TiltCard';
import Lightbox from '../components/Lightbox';
import WaterBubbles from '../components/WaterBubbles';
import Antigravity from '../components/Antigravity';

// Map icon strings to Lucide components
import { CookingPot, ShowerHead, Waves, Droplet, Flame, Wrench } from 'lucide-react';
const ICON_MAP: Record<string, any> = {
  CookingPot,
  ShowerHead,
  Waves,
  Droplet,
  Flame,
  Wrench,
};

interface HomeProps {
  setActivePage: (page: Page) => void;
  onBookNow: (preselectedService?: string) => void;
}

export default function Home({ setActivePage, onBookNow }: HomeProps) {
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  // Quick Contact Form State
  const [contactForm, setContactForm] = useState({
    firstName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: 'Hamilton',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openLightbox = (index: number) => {
    setSelectedImageIdx(index);
    setLightboxOpen(true);
  };

  const handlePrevImage = () => {
    setSelectedImageIdx((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIdx((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
  };

  // Contact Form Submit
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!contactForm.firstName.trim()) errors.firstName = 'Name is required.';
    if (!contactForm.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Enter a valid email.';
    }
    if (!contactForm.phone.trim()) {
      errors.phone = 'Phone number is required.';
    }
    if (!contactForm.streetAddress.trim()) errors.streetAddress = 'Street address is required.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setContactForm({
        firstName: '',
        email: '',
        phone: '',
        streetAddress: '',
        city: 'Hamilton',
        message: '',
      });
    }, 1000);
  };

  return (
    <div className="pt-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-brand-navy overflow-hidden py-16 px-4">
        {/* Cinematic Video Background with smooth fade-in and high-quality cover */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="w-full h-full object-cover select-none pointer-events-none scale-101"
            style={{ objectFit: 'cover' }}
          >
            <source
              src="https://res.cloudinary.com/dju25z9v3/video/upload/v1782313774/Enhancer-Ultra_HD-PixVerse_V6_Image_Text_540P_Cinematic_4K_comme_dixpub.mp4"
              type="video/mp4"
            />
          </motion.video>
          
          {/* Dark Overlay (40%-50%) to ensure text readability */}
          <div className="absolute inset-0 bg-brand-navy/45 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-brand-navy/40" />

          {/* Premium Floating Water Bubbles (High Density for Hero) */}
          <WaterBubbles density="high" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-white text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-brand-teal font-mono text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Registered Red Seal Master Plumbers</span>
            </div>

            <HeadingAnimate tag="h1" className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight">
              Innovative <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-teal-300 to-white">
                Plumbing Solutions
              </span>
            </HeadingAnimate>

            <DescAnimate className="text-lg sm:text-xl font-medium text-teal-100 max-w-xl mx-auto lg:mx-0">
              Specializing in Custom Builds & Renovations
            </DescAnimate>

            <DescAnimate className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Our team of highly skilled and knowledgeable craftsmen get to work. We pride ourselves on a thorough process, quality workmanship, and attention to every detail.
            </DescAnimate>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onBookNow()}
                className="w-full sm:w-auto bg-brand-teal hover:bg-brand-teal-hover text-brand-navy font-bold text-sm tracking-wide px-8 py-4 rounded-2xl shadow-xl shadow-brand-teal/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-2 btn-premium"
              >
                <CalendarDays className="w-4 h-4" />
                <span>Book Free Consultation</span>
              </button>

              <button
                onClick={() => {
                  setActivePage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto border border-white/20 hover:border-white/50 hover:bg-white/5 text-white font-bold text-sm tracking-wide px-8 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Hero Banner Info */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 text-left max-w-lg mx-auto lg:mx-0">
              <div>
                <span className="block text-2xl font-bold font-display text-brand-teal">519+</span>
                <span className="block text-[10px] text-slate-300 uppercase tracking-widest">Lynden HQ Phone</span>
              </div>
              <div>
                <span className="block text-2xl font-bold font-display text-brand-teal">Red Seal</span>
                <span className="block text-[10px] text-slate-300 uppercase tracking-widest">Ontario Licensed</span>
              </div>
              <div>
                <span className="block text-2xl font-bold font-display text-brand-teal">Family Run</span>
                <span className="block text-[10px] text-slate-300 uppercase tracking-widest">Adam & Jodi</span>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[420px]">
            {/* Elegant framing for a luxurious builder look */}
            <div className="absolute inset-0 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Interactive 3D Water Particle Attraction Field (Antigravity component) */}
            <div className="absolute inset-0 z-0 w-full h-full pointer-events-none opacity-80">
              <Antigravity
                count={260}
                magnetRadius={12}
                ringRadius={10}
                waveSpeed={0.5}
                waveAmplitude={1.3}
                particleSize={1.5}
                lerpSpeed={0.06}
                color={'#14B8A6'}
                autoAnimate={true}
                particleVariance={0.9}
                particleShape="sphere"
                fieldStrength={11}
              />
            </div>
            
            <div className="w-full max-w-[420px] aspect-square relative z-10 p-4 border border-white/10 bg-white/5 backdrop-blur-md rounded-[2.5rem] shadow-2xl flex flex-col justify-between">
              
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-teal">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                  Est. Southern ON
                </div>
              </div>

              {/* Displaying premium quality card content */}
              <div className="bg-slate-900/40 p-6 rounded-3xl border border-white/10">
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-brand-teal text-brand-teal" />
                  ))}
                </div>
                <blockquote className="text-xs text-slate-200 italic mb-4">
                  "Adam completed the rough-in and finish plumbing for our custom home build. His attention to detail and copper alignment was truly artwork."
                </blockquote>
                <cite className="block text-xs font-bold text-white not-italic">
                  - Custom Build Client, Ancaster ON
                </cite>
              </div>

              {/* Bottom tag */}
              <div className="flex items-center gap-3 text-xs text-teal-100">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Available for high-end builder contracts</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. SERVICES OVERVIEW SECTION */}
      <section className="py-24 bg-brand-bg-primary noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionAnimate className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-green font-mono text-xs font-bold tracking-[0.25em] uppercase block mb-3">
              WHAT WE DO BEST
            </span>
            <HeadingAnimate tag="h2" className="text-3xl sm:text-4xl font-display font-bold text-brand-navy mb-4">
              Plumbing Services
            </HeadingAnimate>
            <DescAnimate className="text-sm sm:text-base font-semibold text-brand-teal mb-4">
              Reliable plumbing solutions built on craftsmanship, care, and family values.
            </DescAnimate>
            <DescAnimate className="text-xs sm:text-sm text-brand-slate-muted leading-relaxed">
              We believe great plumbing goes beyond pipes and fittings; it’s about creating comfort, safety, and reliability for the people who depend on it every day. Whether it’s a leaky faucet, a custom bathroom renovation, or a complex new build, we approach every project with precision, honesty, and pride in our craft.
            </DescAnimate>
          </SectionAnimate>

          {/* Service Cards Grid with 3D Tilt */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service, index) => {
              const IconComponent = ICON_MAP[service.icon] || Wrench;
              return (
                <SectionAnimate key={service.id} delay={index * 0.1}>
                  <TiltCard
                    onClick={() => {
                      setActivePage('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-8 h-full flex flex-col justify-between group"
                  >
                    <div>
                      {/* Animated Service Icon */}
                      <div className="w-14 h-14 bg-brand-bg-secondary text-brand-green rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-slate-50 group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                        <IconComponent className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                      </div>

                      <h3 className="font-display text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-green transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-xs font-semibold text-brand-teal mb-4">
                        {service.subtitle}
                      </p>

                      <p className="text-xs text-brand-slate-muted leading-relaxed line-clamp-4">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-green group-hover:text-brand-teal transition-colors flex items-center gap-1">
                        <span>Learn details</span>
                        <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookNow(service.title);
                        }}
                        className="bg-brand-bg-secondary hover:bg-brand-green text-brand-navy hover:text-white font-bold text-[10px] uppercase tracking-wider py-1.5 px-3 rounded-lg border border-slate-100 transition-colors cursor-pointer"
                      >
                        Book Now
                      </button>
                    </div>
                  </TiltCard>
                </SectionAnimate>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. FAMILY BUSINESS SECTION */}
      <section className="py-24 bg-brand-bg-secondary border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Split Image Left */}
            <div className="lg:col-span-5">
              <ImageAnimate
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800"
                alt="Fortified Plumbing Family Values"
                className="rounded-3xl shadow-xl aspect-square"
              />
            </div>

            {/* Split Content Right */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-brand-teal font-mono text-xs font-bold tracking-[0.25em] uppercase block">
                FAMILY OPERATED
              </span>
              
              <HeadingAnimate tag="h2" className="text-3xl sm:text-4xl font-display font-bold text-brand-navy">
                Built on Family. Driven by Integrity.
              </HeadingAnimate>

              <DescAnimate className="text-sm font-semibold text-brand-green">
                Fortified Plumbing is a family-run business led by Adam and Jodi — combining craftsmanship, care, and community values in everything we do.
              </DescAnimate>

              <DescAnimate className="text-xs sm:text-sm text-brand-slate-muted leading-relaxed space-y-4">
                <p>
                  Fortified Plumbing is more than a business; it’s a family. Founded and led by Adam and his wife Jodi, Fortified was built on the belief that honest work, strong values, and genuine care for people create something lasting.
                </p>
                <p>
                  Adam, a master plumber, brings hands-on expertise and an unwavering commitment to excellence. Jodi ensures every client experience reflects the family values Fortified was built upon.
                </p>
                <p>
                  Together they have built a trusted company known for quality craftsmanship, integrity, and reliability. Serving their neighbors across Lynden, Ancaster, and Hamilton with five-star plumbing mastery.
                </p>
              </DescAnimate>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 bg-teal-50 text-brand-teal rounded-xl flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy">Adam Van Berkel</h4>
                    <p className="text-[10px] text-brand-slate-light">Red Seal Master Plumber</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 bg-teal-50 text-brand-teal rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy">Jodi Van Berkel</h4>
                    <p className="text-[10px] text-brand-slate-light">Client Care Director</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-brand-navy hover:bg-brand-green text-white font-bold text-xs tracking-wide px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <span>Read our full story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. GALLERY (OUR WORK SPEAKS FOR ITSELF) */}
      <section className="py-24 bg-brand-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionAnimate className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-green font-mono text-xs font-bold tracking-[0.25em] uppercase block mb-3">
              PREMIUM GALLERY
            </span>
            <HeadingAnimate tag="h2" className="text-3xl sm:text-4xl font-display font-bold text-brand-navy mb-4">
              Our Work Speaks for Itself
            </HeadingAnimate>
            <DescAnimate className="text-xs sm:text-sm text-brand-slate-muted leading-relaxed">
              Explore actual high-contrast images of completed plumbing systems, boiler installations, and custom floor-heat layouts finished by Master Plumber Adam Van Berkel.
            </DescAnimate>
          </SectionAnimate>

          {/* Masonry Responsive Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {GALLERY_IMAGES.map((img, index) => (
              <div
                key={img.id}
                onClick={() => openLightbox(index)}
                className="break-inside-avoid relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 cursor-zoom-in group shadow-sm hover:shadow-lg transition-all duration-500"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-auto object-cover select-none group-hover:scale-102 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Hover overlay with Deep Green + Navy gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/90 via-brand-navy/65 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[9px] font-bold font-mono tracking-wider bg-brand-teal/20 px-2 py-0.5 rounded border border-brand-teal/30 w-max mb-2 uppercase">
                    {img.category}
                  </span>
                  <h4 className="text-xs font-bold font-display leading-snug">
                    {img.title}
                  </h4>
                  <span className="text-[9px] text-teal-100 mt-1 block font-mono">
                    Click to inspect system setup
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. SERVICE AREA SECTION */}
      <section className="py-24 bg-brand-bg-alternate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionAnimate className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-green font-mono text-xs font-bold tracking-[0.25em] uppercase block mb-3">
              WHERE WE WORK
            </span>
            <HeadingAnimate tag="h2" className="text-3xl sm:text-4xl font-display font-bold text-brand-navy mb-4">
              Trusted Plumbing Across Southern Ontario
            </HeadingAnimate>
            <DescAnimate className="text-xs sm:text-sm text-brand-slate-muted leading-relaxed">
              Based out of Lynden, ON, we deliver high-end contractor services and routine plumbing solutions directly to your doorstep.
            </DescAnimate>
          </SectionAnimate>

          {/* Bento-style Area Cards with 3D Tilt */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_AREAS.map((area, idx) => (
              <SectionAnimate key={idx} delay={idx * 0.05}>
                <TiltCard className="p-6 h-full border border-slate-200/60 shadow-sm flex flex-col justify-between hover:border-brand-teal/50 transition-colors">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-1.5 text-brand-green font-bold text-lg font-display">
                        <MapPin className="w-4.5 h-4.5 text-brand-teal" />
                        <span>{area.city}</span>
                      </div>
                      <span className="text-[9px] bg-slate-100 text-brand-navy px-2 py-0.5 rounded font-bold font-mono uppercase tracking-wider">
                        ON, CANADA
                      </span>
                    </div>

                    <p className="text-[10px] text-brand-slate-light font-bold mb-2">
                      {area.region}
                    </p>

                    <p className="text-xs text-brand-slate-muted leading-relaxed mb-4">
                      {area.desc}
                    </p>
                  </div>

                  {/* Highlights Bullet Tags */}
                  <div className="border-t border-slate-50 pt-4 space-y-2">
                    <span className="block text-[9px] uppercase font-bold text-brand-slate-light tracking-widest">
                      Specialties:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {area.features.map((f, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-semibold bg-brand-bg-secondary text-brand-green border border-slate-100 px-2 py-0.5 rounded-md"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </SectionAnimate>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-brand-slate-muted italic">
              Don't see your town? We serve surrounding areas within a 45-minute radius of Lynden.
              <button
                onClick={() => setActivePage('contact')}
                className="text-brand-green font-bold hover:underline ml-1 cursor-pointer"
              >
                Inquire here
              </button>
            </p>
          </div>

        </div>
      </section>

      {/* 6. CONTACT CTA SECTION */}
      <section className="relative overflow-hidden py-24 bg-brand-bg-primary border-t border-slate-100 noise-bg">
        <WaterBubbles density="medium" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionAnimate className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-brand-green font-mono text-xs font-bold tracking-[0.25em] uppercase block mb-3">
              GET IN TOUCH
            </span>
            <HeadingAnimate tag="h2" className="text-3xl sm:text-4xl font-display font-bold text-brand-navy mb-4">
              Let's Get Started
            </HeadingAnimate>
            <DescAnimate className="text-xs sm:text-sm text-brand-slate-muted leading-relaxed">
              Whether you're planning a renovation, need a repair, or looking for a trusted plumbing partner for your next project, we'd love to hear from you.
            </DescAnimate>
          </SectionAnimate>

          <SectionAnimate>
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-teal-50 text-brand-teal rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">
                    Inquiry Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-slate-muted max-w-md mx-auto mb-6">
                    Thank you. We have saved your submission. One of our family coordinators will reach out via email or phone within the next hour.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="bg-brand-navy text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* First Name */}
                    <div>
                      <label className="block text-xs font-bold text-brand-slate-dark mb-1.5">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={contactForm.firstName}
                        onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs sm:text-sm text-brand-slate-dark focus:border-brand-green/40 focus:bg-white transition-all"
                      />
                      {formErrors.firstName && (
                        <p className="text-[10px] text-red-500 mt-1">{formErrors.firstName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-brand-slate-dark mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs sm:text-sm text-brand-slate-dark focus:border-brand-green/40 focus:bg-white transition-all"
                      />
                      {formErrors.email && (
                        <p className="text-[10px] text-red-500 mt-1">{formErrors.email}</p>
                      )}
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-brand-slate-dark mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="905-555-0144"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs sm:text-sm text-brand-slate-dark focus:border-brand-green/40 focus:bg-white transition-all"
                      />
                      {formErrors.phone && (
                        <p className="text-[10px] text-red-500 mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    {/* Street Address */}
                    <div>
                      <label className="block text-xs font-bold text-brand-slate-dark mb-1.5">
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="123 King St. E"
                        value={contactForm.streetAddress}
                        onChange={(e) => setContactForm({ ...contactForm, streetAddress: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs sm:text-sm text-brand-slate-dark focus:border-brand-green/40 focus:bg-white transition-all"
                      />
                      {formErrors.streetAddress && (
                        <p className="text-[10px] text-red-500 mt-1">{formErrors.streetAddress}</p>
                      )}
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* City */}
                    <div>
                      <label className="block text-xs font-bold text-brand-slate-dark mb-1.5">
                        City
                      </label>
                      <select
                        value={contactForm.city}
                        onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs sm:text-sm text-brand-slate-dark focus:border-brand-green/40 focus:bg-white transition-all"
                      >
                        <option value="Hamilton">Hamilton</option>
                        <option value="Ancaster">Ancaster</option>
                        <option value="Dundas">Dundas</option>
                        <option value="Burlington">Burlington</option>
                        <option value="Oakville">Oakville</option>
                        <option value="Stoney Creek">Stoney Creek</option>
                        <option value="Lynden">Lynden</option>
                      </select>
                    </div>

                    {/* Blank spacing on desktop */}
                    <div className="hidden sm:block" />

                  </div>

                  {/* Message details */}
                  <div>
                    <label className="block text-xs font-bold text-brand-slate-dark mb-1.5">
                      Your Message or Project Scope
                    </label>
                    <textarea
                      placeholder="Brief description of leak, boiler rebuild, or bathroom layout..."
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs sm:text-sm text-brand-slate-dark focus:border-brand-green/40 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-brand-green to-brand-teal text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-brand-teal/20 transition-all cursor-pointer flex items-center justify-center gap-2 btn-premium"
                  >
                    {isSubmitting ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>
          </SectionAnimate>

        </div>
      </section>

      {/* Shared Lightbox Overlay */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageUrl={GALLERY_IMAGES[selectedImageIdx]?.url}
        imageTitle={GALLERY_IMAGES[selectedImageIdx]?.title}
        category={GALLERY_IMAGES[selectedImageIdx]?.category}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />

    </div>
  );
}
