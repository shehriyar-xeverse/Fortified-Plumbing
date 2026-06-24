import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, ShieldCheck, HeartHandshake, Map, Compass, ExternalLink } from 'lucide-react';
import SectionAnimate, { HeadingAnimate, DescAnimate } from '../components/SectionAnimate';
import TiltCard from '../components/TiltCard';
import WaterBubbles from '../components/WaterBubbles';
import Antigravity from '../components/Antigravity';

interface ContactPageProps {
  onBookNow: () => void;
}

export default function Contact({ onBookNow }: ContactPageProps) {
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: 'Lynden',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.firstName.trim()) newErrors.firstName = 'First Name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    }
    if (!form.streetAddress.trim()) newErrors.streetAddress = 'Street Address is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({
        firstName: '',
        email: '',
        phone: '',
        streetAddress: '',
        city: 'Lynden',
        message: '',
      });
    }, 1100);
  };

  return (
    <div className="pt-24 pb-16">
      
      {/* 1. HEADER HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-green/5 to-brand-navy/5 py-12 px-4 border-b border-slate-100">
        <WaterBubbles density="low" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-7 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-[10px] font-bold font-mono tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5 text-brand-teal" />
              <span>CONNECT WITH THE MASTERS</span>
            </div>
            <HeadingAnimate tag="h1" className="text-3xl sm:text-5xl font-display font-bold text-brand-navy tracking-tight leading-tight">
              Contact Fortified Plumbing
            </HeadingAnimate>
            <DescAnimate className="text-sm sm:text-base text-brand-slate-muted max-w-2xl">
              Based out of Lynden, Ontario, we bring five-star residential installations and prompt mechanical repair solutions across Southern Ontario.
            </DescAnimate>
          </div>
          
          <div className="md:col-span-5 h-[180px] w-full relative pointer-events-none">
            <Antigravity
              count={180}
              magnetRadius={11}
              ringRadius={8}
              waveSpeed={0.5}
              waveAmplitude={1.2}
              particleSize={1.5}
              lerpSpeed={0.06}
              color={'#0F766E'}
              autoAnimate={true}
              particleVariance={0.8}
              particleShape="box"
              fieldStrength={9}
            />
          </div>
        </div>
      </section>

      {/* 2. SPLIT-LAYOUT DETAILS */}
      <section className="py-16 bg-brand-bg-primary noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Info Column (Contact Cards & Hours) */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="space-y-4">
                <span className="text-brand-green font-mono text-xs font-bold tracking-[0.25em] uppercase block">
                  COORDINATES
                </span>
                <h2 className="font-display text-2xl font-bold text-brand-navy">
                  Office Headquarters
                </h2>
                <p className="text-xs text-brand-slate-muted leading-relaxed">
                  Have an upcoming luxury custom home build, bathroom layout, or plumbing repair? Reach out directly via phone, email, or our scheduling form.
                </p>
              </div>

              {/* Contact Information Details */}
              <div className="space-y-4">
                
                {/* Adam biography */}
                <TiltCard className="p-5" borderRadius={20}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-brand-green shrink-0">
                        <ShieldCheck className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">Adam Van Berkel</h4>
                        <p className="text-[10px] text-brand-slate-light font-bold">ONTARIO LICENSED MASTER PLUMBER</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-brand-slate-muted leading-relaxed">
                      Red Seal certification #519-ON. Fully TSSA licensed Gas technician. Overseeing all custom installations.
                    </p>
                  </div>
                </TiltCard>

                {/* Address Card */}
                <TiltCard className="p-5" borderRadius={20}>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div className="text-xs space-y-0.5 text-brand-slate-muted">
                      <p className="font-bold text-brand-navy">Physical Address</p>
                      <p>1636 2nd Concession West</p>
                      <p>Lynden, Ontario L0R 1T0</p>
                    </div>
                  </div>
                </TiltCard>

                {/* Phone Card */}
                <TiltCard className="p-5" borderRadius={20}>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div className="text-xs space-y-0.5 text-brand-slate-muted">
                      <p className="font-bold text-brand-navy">Phone Support</p>
                      <a href="tel:5194483916" className="font-extrabold text-brand-green hover:underline">
                        519-448-3916
                      </a>
                      <p className="text-[10px] text-brand-slate-light">Call for prompt local scheduling.</p>
                    </div>
                  </div>
                </TiltCard>

                {/* Email Card */}
                <TiltCard className="p-5" borderRadius={20}>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div className="text-xs space-y-0.5 text-brand-slate-muted">
                      <p className="font-bold text-brand-navy">Primary Email</p>
                      <a href="mailto:joe@fortifiedplumbing.com" className="font-semibold text-brand-green hover:underline">
                        joe@fortifiedplumbing.com
                      </a>
                      <p className="text-[10px] text-brand-slate-light">Tenders & contractor blueprint sets.</p>
                    </div>
                  </div>
                </TiltCard>

              </div>

              {/* Business Hours Table */}
              <TiltCard className="p-6" borderRadius={20}>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-brand-navy font-display font-bold text-sm">
                    <Clock className="w-4.5 h-4.5 text-brand-green" />
                    <span>Business Availability</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      { days: 'Monday - Friday', hours: '7:30 AM - 5:30 PM' },
                      { days: 'Saturday', hours: '8:00 AM - 1:00 PM' },
                      { days: 'Sunday', hours: 'Closed' },
                      { days: 'Active Emergencies', hours: 'Available Call Out' }
                    ].map((h, i) => (
                      <div key={i} className="flex justify-between border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                        <span className="text-brand-slate-muted font-medium">{h.days}</span>
                        <span className="text-brand-navy font-bold">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>

            </div>

            {/* Right Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-100">
                <div className="mb-6 space-y-1">
                  <h3 className="font-display text-xl font-bold text-brand-navy">Send A Direct Message</h3>
                  <p className="text-xs text-brand-slate-muted">Fill out the fields below and we will contact you within 1-2 hours.</p>
                </div>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-teal-50 text-brand-teal rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">Message Sent Successfully!</h3>
                    <p className="text-xs sm:text-sm text-brand-slate-muted max-w-sm mx-auto mb-6">
                      Thank you for contacting Fortified Plumbing. We have received your request and will respond within the hour.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-brand-navy text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-brand-slate-dark mb-1">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand-green/40 transition-all rounded-xl py-2.5 px-4 text-xs sm:text-sm text-brand-slate-dark"
                        />
                        {errors.firstName && (
                          <p className="text-[10px] text-red-500 mt-1">{errors.firstName}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-brand-slate-dark mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="your.email@gmail.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand-green/40 transition-all rounded-xl py-2.5 px-4 text-xs sm:text-sm text-brand-slate-dark"
                        />
                        {errors.email && (
                          <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-bold text-brand-slate-dark mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="519-555-0199"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand-green/40 transition-all rounded-xl py-2.5 px-4 text-xs sm:text-sm text-brand-slate-dark"
                        />
                        {errors.phone && (
                          <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>
                        )}
                      </div>

                      {/* Street Address */}
                      <div>
                        <label className="block text-xs font-bold text-brand-slate-dark mb-1">
                          Street Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="123 King St. E"
                          value={form.streetAddress}
                          onChange={(e) => setForm({ ...form, streetAddress: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand-green/40 transition-all rounded-xl py-2.5 px-4 text-xs sm:text-sm text-brand-slate-dark"
                        />
                        {errors.streetAddress && (
                          <p className="text-[10px] text-red-500 mt-1">{errors.streetAddress}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-slate-dark mb-1">
                        City
                      </label>
                      <select
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand-green/40 transition-all rounded-xl py-2.5 px-4 text-xs sm:text-sm text-brand-slate-dark"
                      >
                        <option value="Lynden">Lynden</option>
                        <option value="Hamilton">Hamilton</option>
                        <option value="Ancaster">Ancaster</option>
                        <option value="Burlington">Burlington</option>
                        <option value="Oakville">Oakville</option>
                        <option value="Dundas">Dundas</option>
                        <option value="Stoney Creek">Stoney Creek</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-slate-dark mb-1">
                        Brief Project Details or Message
                      </label>
                      <textarea
                        placeholder="Leaking sink repair, Navien gas vent update, luxury freestanding tub fitting blueprint scope..."
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand-green/40 transition-all rounded-xl py-2.5 px-4 text-xs sm:text-sm text-brand-slate-dark resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-brand-green to-brand-teal text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-brand-teal/20 transition-all flex items-center justify-center gap-2 cursor-pointer btn-premium"
                    >
                      {submitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Message</span>
                        </>
                      )}
                    </button>

                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. LUXURY INTERACTIVE GOOGLE MAP REPRESENTATION */}
      <section className="py-16 bg-brand-bg-secondary border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white border border-slate-200/60 shadow-xl rounded-3xl overflow-hidden p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Vector Map representation */}
            <div className="lg:col-span-7 h-80 sm:h-96 bg-slate-50 rounded-2xl relative overflow-hidden border border-slate-100">
              
              {/* Grid backdrop simulating map roads */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-brand-green/10 transform rotate-12" />
              <div className="absolute left-1/3 top-0 bottom-0 w-[2px] bg-brand-green/10 transform -rotate-12" />
              <div className="absolute left-2/3 top-0 bottom-0 w-[2px] bg-brand-green/10 transform rotate-45" />

              {/* Service Radius overlay rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-brand-teal/20 bg-brand-teal/5 animate-pulse" style={{ animationDuration: '6s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-brand-teal/25 bg-brand-teal/5" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-brand-teal/30 bg-brand-teal/5" />

              {/* Lynden Center Marker Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="px-3 py-1 bg-brand-navy text-white text-[9px] font-bold rounded-full shadow-md mb-1 border border-brand-teal/30 whitespace-nowrap animate-bounce">
                  FORTIFIED HQ (LYNDEN, ON)
                </div>
                <div className="w-5 h-5 bg-brand-green border-2 border-white rounded-full flex items-center justify-center shadow-lg relative">
                  <div className="w-2.5 h-2.5 bg-brand-teal rounded-full" />
                </div>
              </div>

              {/* Surrounding City Points representing Southern Ontario */}
              {[
                { city: 'Hamilton', top: '40%', left: '70%' },
                { city: 'Ancaster', top: '55%', left: '60%' },
                { city: 'Dundas', top: '35%', left: '55%' },
                { city: 'Burlington', top: '22%', left: '78%' },
                { city: 'Oakville', top: '15%', left: '88%' },
                { city: 'Stoney Creek', top: '48%', left: '82%' }
              ].map((pt, idx) => (
                <div key={idx} className="absolute text-[8px] font-bold text-brand-slate-light" style={{ top: pt.top, left: pt.left }}>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-green rounded-full shrink-0" />
                    <span>{pt.city}</span>
                  </div>
                </div>
              ))}

              {/* Map controls */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur border border-slate-100 p-3 rounded-xl shadow-md text-[10px] space-y-1">
                <p className="font-bold text-brand-navy">Service Radius:</p>
                <p className="text-brand-slate-muted">Hamilton & GHA • Halton Region</p>
                <p className="text-brand-slate-light italic">Prompt local truck response</p>
              </div>

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur border border-slate-100 px-3 py-1.5 rounded-xl shadow-md text-[10px] font-bold text-brand-green flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
                <span>Lynden L0R 1T0</span>
              </div>

            </div>

            {/* Map description right */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-brand-green font-mono text-xs font-bold tracking-[0.25em] uppercase block">
                GEOGRAPHY
              </span>
              <h3 className="font-display text-2xl font-bold text-brand-navy">
                Southern Ontario Coverage
              </h3>
              <p className="text-xs text-brand-slate-muted leading-relaxed">
                We operate directly out of our mechanical facility at 1636 2nd Concession West, Lynden, Ontario. This strategic location gives us seamless highway access to respond promptly to builders and home repairs across Hamilton, Ancaster, Burlington, Oakville, and Dundas.
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-brand-teal font-bold">✓</span>
                  <span><strong>Hamilton & Ancaster:</strong> 15-minute average response</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-teal font-bold">✓</span>
                  <span><strong>Burlington & Oakville:</strong> Custom contract priority dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-teal font-bold">✓</span>
                  <span><strong>Tenders:</strong> We accept architectural plan sets via PDF</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onBookNow}
                  className="bg-brand-navy hover:bg-brand-green text-white font-bold text-xs tracking-wide px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2 btn-premium"
                >
                  <span>Request Booking Calendar</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
