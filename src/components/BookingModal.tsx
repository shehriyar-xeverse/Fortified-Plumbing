import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Phone, User, Mail, Clipboard, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { BookingInquiry } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const CITIES = ['Hamilton', 'Ancaster', 'Burlington', 'Oakville', 'Dundas', 'Stoney Creek', 'Lynden'];
const SERVICES = [
  'Kitchen Plumbing & Renovation',
  'Bathroom Plumbing & Renovation',
  'Spas & Saunas Custom Setup',
  'Water Systems & Treatment',
  'Water Heater Install & Repair',
  'Plumbing Services & General Repairs',
  'Emergency Plumbing Support',
];

export default function BookingModal({ isOpen, onClose, preselectedService = '' }: BookingModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: CITIES[0],
    serviceType: SERVICES[0],
    message: '',
    date: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      // Find matching service from option list
      const matched = SERVICES.find(s => s.toLowerCase().includes(preselectedService.toLowerCase()));
      if (matched) {
        setFormData(prev => ({ ...prev, serviceType: matched }));
      }
    }
  }, [preselectedService, isOpen]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/[-() ]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street Address is required.';
    if (!formData.date) newErrors.date = 'Please select a preferred date.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate luxury API response lag
    setTimeout(() => {
      const newBooking: BookingInquiry = {
        id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
        ...formData,
        status: 'pending',
      };

      // Save to localStorage
      const existing = localStorage.getItem('fortified_bookings');
      const bookings = existing ? JSON.parse(existing) : [];
      bookings.push(newBooking);
      localStorage.setItem('fortified_bookings', JSON.stringify(bookings));

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      email: '',
      phone: '',
      streetAddress: '',
      city: CITIES[0],
      serviceType: SERVICES[0],
      message: '',
      date: '',
    });
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="absolute inset-0 bg-brand-slate-dark/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Side Branding Panel (hidden on mobile) */}
            <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-brand-green to-brand-navy p-8 text-white flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-teal/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-green/20 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-8">
                  <svg
                    className="w-8 h-8 text-brand-teal"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span className="font-display font-bold tracking-tight text-lg">Fortified</span>
                </div>

                <h3 className="font-display text-xl font-bold mb-4">Book Your Service With Masters</h3>
                <p className="text-sm text-slate-200 leading-relaxed mb-6">
                  Experience plumbing services built on integrity, master craftsmanship, and friendly family-oriented service.
                </p>

                <div className="space-y-4 text-xs text-teal-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-teal shrink-0" />
                    <span>Red Seal Certified Plumbers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-brand-teal shrink-0" />
                    <span>Proud Family-Run Business</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-teal shrink-0" />
                    <span>Prompt, On-Time Arrivals</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 border-t border-white/10 pt-4 text-[10px] text-teal-200">
                Serving Hamilton, Burlington, Oakville, and Southern Ontario.
              </div>
            </div>

            {/* Form Content Area */}
            <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-brand-navy">Request Booking</h2>
                  <p className="text-xs text-brand-slate-muted">We will respond within 1-2 hours.</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-brand-slate-muted transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="booking-form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* First Name */}
                    <div>
                      <label className="block text-xs font-semibold text-brand-slate-dark mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 w-4 h-4 text-brand-slate-light" />
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="w-full pl-9 pr-3 py-2 text-sm bg-brand-bg-secondary rounded-xl border border-slate-100 focus:border-brand-green/50 transition-all text-brand-slate-dark"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-brand-slate-dark mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 w-4 h-4 text-brand-slate-light" />
                          <input
                            type="email"
                            placeholder="you@email.com"
                            className="w-full pl-9 pr-3 py-2 text-sm bg-brand-bg-secondary rounded-xl border border-slate-100 focus:border-brand-green/50 transition-all text-brand-slate-dark"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-brand-slate-dark mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 w-4 h-4 text-brand-slate-light" />
                          <input
                            type="tel"
                            placeholder="519-555-0199"
                            className="w-full pl-9 pr-3 py-2 text-sm bg-brand-bg-secondary rounded-xl border border-slate-100 focus:border-brand-green/50 transition-all text-brand-slate-dark"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Street Address & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-brand-slate-dark mb-1">
                          Street Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-brand-slate-light" />
                          <input
                            type="text"
                            placeholder="123 Maple St."
                            className="w-full pl-9 pr-3 py-2 text-sm bg-brand-bg-secondary rounded-xl border border-slate-100 focus:border-brand-green/50 transition-all text-brand-slate-dark"
                            value={formData.streetAddress}
                            onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                          />
                        </div>
                        {errors.streetAddress && (
                          <p className="text-[10px] text-red-500 mt-1">{errors.streetAddress}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-brand-slate-dark mb-1">
                          City
                        </label>
                        <select
                          className="w-full py-2 px-3 text-sm bg-brand-bg-secondary rounded-xl border border-slate-100 focus:border-brand-green/50 transition-all text-brand-slate-dark"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        >
                          {CITIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Service Type & Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-brand-slate-dark mb-1">
                          Service Required
                        </label>
                        <select
                          className="w-full py-2 px-3 text-sm bg-brand-bg-secondary rounded-xl border border-slate-100 focus:border-brand-green/50 transition-all text-brand-slate-dark"
                          value={formData.serviceType}
                          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        >
                          {SERVICES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-brand-slate-dark mb-1">
                          Preferred Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-brand-slate-light" />
                          <input
                            type="date"
                            className="w-full pl-9 pr-3 py-2 text-sm bg-brand-bg-secondary rounded-xl border border-slate-100 focus:border-brand-green/50 transition-all text-brand-slate-dark"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          />
                        </div>
                        {errors.date && (
                          <p className="text-[10px] text-red-500 mt-1">{errors.date}</p>
                        )}
                      </div>
                    </div>

                    {/* Brief Details Message */}
                    <div>
                      <label className="block text-xs font-semibold text-brand-slate-dark mb-1">
                        Brief Details
                      </label>
                      <div className="relative">
                        <Clipboard className="absolute left-3 top-2.5 w-4 h-4 text-brand-slate-light" />
                        <textarea
                          placeholder="Describe your project, bathroom renovation ideas, or leak repair details..."
                          rows={3}
                          className="w-full pl-9 pr-3 py-2 text-sm bg-brand-bg-secondary rounded-xl border border-slate-100 focus:border-brand-green/50 transition-all text-brand-slate-dark resize-none"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-brand-green to-brand-teal hover:from-brand-green hover:to-brand-teal-hover text-white py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-brand-teal/20 transition-all duration-300 transform active:scale-98 disabled:opacity-75 flex items-center justify-center gap-2 cursor-pointer btn-premium"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Confirming availability...</span>
                        </>
                      ) : (
                        <span>Confirm Appointment Request</span>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    className="flex flex-col items-center justify-center py-12 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-16 h-16 bg-emerald-50 text-brand-teal rounded-full flex items-center justify-center mb-6 shadow-inner"
                    >
                      <CheckCircle2 className="w-10 h-10" />
                    </motion.div>

                    <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">
                      Booking Confirmed!
                    </h3>
                    <p className="text-sm text-brand-slate-muted max-w-md mb-6">
                      Thank you, <strong className="text-brand-green">{formData.firstName}</strong>. We've saved your inquiry for <strong className="text-brand-navy">{formData.serviceType}</strong> on <strong className="text-brand-navy">{formData.date}</strong> in Lynden / Southern Ontario schedule.
                    </p>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl w-full text-left text-xs space-y-2 mb-6">
                      <div className="flex justify-between">
                        <span className="text-brand-slate-light">Service Area:</span>
                        <span className="font-bold text-brand-navy">{formData.city}, ON</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-slate-light">Contact:</span>
                        <span className="font-bold text-brand-navy">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-slate-light">Master Plumber:</span>
                        <span className="font-bold text-brand-green">Adam Van Berkel</span>
                      </div>
                    </div>

                    <button
                      onClick={handleReset}
                      className="bg-brand-navy hover:bg-brand-navy/95 text-white py-2.5 px-6 rounded-xl font-bold text-sm transition-colors shadow-md cursor-pointer"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
