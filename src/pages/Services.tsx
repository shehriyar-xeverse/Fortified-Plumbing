import { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, CheckCircle, ChevronDown, Award, HelpCircle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data';
import SectionAnimate, { ImageAnimate, HeadingAnimate, DescAnimate } from '../components/SectionAnimate';
import WaterBubbles from '../components/WaterBubbles';
import Antigravity from '../components/Antigravity';

// Detailed Expanded Services definitions to meet the prompt's specific items
const DETAILED_SERVICES = [
  {
    id: 'kitchen-plumbing',
    title: 'Kitchen Plumbing',
    category: 'Interior Specialties',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
    description: 'Expert planning and premium installations for high-end kitchens. We handle behind-the-wall rough-ins, water purification systems, luxury faucet layouts, waste disposals, and gas range fittings with certified precision.',
    benefits: [
      'Precise fitting for undermount & farmhouse sinks',
      'Advanced reverse-osmosis water systems integration',
      'Pot filler and gas range installation (TSSA Licensed)',
      'Optimal drainage angles to prevent waste backup'
    ],
    process: [
      'Detailed site review and plumbing layout layout review',
      'Behind-the-wall line routing & TSSA gas line fitting',
      'Leak testing under hydrostatic pressure',
      'Visual finishing, trim assembly and user tutorial'
    ]
  },
  {
    id: 'bathroom-plumbing',
    title: 'Bathroom Plumbing',
    category: 'Luxury Wet Rooms',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    description: 'We construct premium wet rooms, custom walk-in showers with linear drains, floating vanity systems, and freestanding bathtubs. Built to avoid humidity issues and water damage with Red Seal mastery.',
    benefits: [
      'Waterproof wet-room subfloor layout engineering',
      'Concealed water-closet & wall-hung toilet assemblies',
      'Floor-mounted luxury tub filler alignment',
      'Thermostatic pressure-balancing shower systems'
    ],
    process: [
      'In-floor drainage mapping & structural planning',
      'Waterproof layer and concrete mudbed coordination',
      'Thermostatic valve calibration & pressure test',
      'Premium trim mounting and shower flow validation'
    ]
  },
  {
    id: 'custom-home',
    title: 'Custom Home Plumbing',
    category: 'New Construction',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    description: 'Bespoke piping architecture engineered for brand new custom estates. We work side-by-side with general contractors and architectural drawings to lay down radiant hydronic floors, deep sumps, and complex manifold panels.',
    benefits: [
      'Perfect execution of complex blueprint designs',
      'Pre-pour radiant floor heating loops calibration',
      'Multi-zone manifold panel engineering',
      'Strict adherence to the Ontario Building Code'
    ],
    process: [
      'CAD layout reviews and on-site builder coordination',
      'Under-slab drain line layouts and testing',
      'Full home PEX water line rough-in routing',
      'Pre-drywall inspection & municipal authorization'
    ]
  },
  {
    id: 'renovation-plumbing',
    title: 'Renovation Plumbing',
    category: 'Home Renovations',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    description: 'Transforming older plumbing networks into safe, modern layouts. We safely bypass ancient lead/poly-B pipes, relocate structural drains, and install new fixtures to breathe premium life into your existing property.',
    benefits: [
      'Complete removal of unsafe poly-B & old copper corrosion',
      'Expert relocation of stack pipes for open concept designs',
      'Minimally invasive wall opening & tidy cleanup practices',
      'Vast increase in old home water flow pressure'
    ],
    process: [
      'Inspection of current pipeline states & diagnostic scan',
      'Careful extraction of out-of-date plumbing elements',
      'Installation of modern high-volume PEX lines',
      'Flow calibration and structural safety checks'
    ]
  },
  {
    id: 'water-systems',
    title: 'Water Systems',
    category: 'Water Quality',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800',
    description: 'Defeat Southern Ontario hardness. We analyze and install custom whole-home salt softeners, sediment carbon pre-filters, iron defense loops, and ultraviolet sterilization arrays to ensure pure water.',
    benefits: [
      'Saves high-end brass & copper fixtures from lime scale',
      'No more dry skin, hair scaling, or clothing discoloration',
      'Saves up to 30% on household detergent and soap usage',
      'Ensures pure, delicious, chemical-free tap water'
    ],
    process: [
      'Complimentary multi-point chemical raw water check',
      'Custom sizing of softener media based on hardness',
      'Bypass valve & eco-drain fitting installation',
      'Flow test and soft-water calibration audit'
    ]
  },
  {
    id: 'water-heaters',
    title: 'Water Heaters',
    category: 'Thermal Comfort',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    description: 'High-efficiency continuous tankless hot water loops. We install wall-mounted Navien units, replace leaky old water heaters, and upgrade natural gas vents with Red Seal gas licensure.',
    benefits: [
      'Endless hot water even with multiple active showers',
      'Cuts monthly gas bills by up to 40%',
      'Wall-mount layout frees up significant utility room space',
      'Saves old basement floors from catastrophic tank ruptures'
    ],
    process: [
      'Peak hot water load calculation & sizing analysis',
      'Extraction and safe disposal of old bulky boiler tanks',
      'Mounting Navien unit & licensed gas line layout',
      'Digital panel set, commissioning, and flue ventilation check'
    ]
  },
  {
    id: 'plumbing-repairs',
    title: 'Plumbing Repairs',
    category: 'Diagnostic Maintenance',
    image: 'https://images.unsplash.com/photo-1542013936693-8848e5740475?auto=format&fit=crop&q=80&w=800',
    description: 'Fast, authoritative diagnostics and fixes. From leaking ceiling joints, faulty toilet flushing units, to kitchen drain back-ups, we arrive with fully stocked trucks to handle everything immediately.',
    benefits: [
      'Upfront clear solid-quote flat-rates — no surprises',
      'Equipped with high-definition camera scope reels',
      'Polite, friendly plumbers who respect your home floors',
      'Tidy repairs that prevent drywall water damage'
    ],
    process: [
      'Visual inspection & high-def camera line tracing',
      'Straightforward diagnostic rundown and written choice options',
      'Flawless technical repair using premium copper/PEX',
      'Post-repair pressure check & surrounding joint audit'
    ]
  },
  {
    id: 'emergency-support',
    title: 'Emergency Plumbing Support',
    category: '24/7 Rapid Action',
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80&w=800',
    description: 'Catastrophic leaks or major back-ups demand immediate action to save your property. Our emergency plumbing response team is on standby to shut down, bypass, and repair active pipeline bursts.',
    benefits: [
      'Rapid-action local dispatch directly out of Lynden/Ancaster',
      'Immediate property safety tips over phone while we drive',
      'Equipped with heavy water pump extractors & line clamps',
      'Provides peace of mind when structural damage is active'
    ],
    process: [
      'Immediate main water valve emergency shutdown',
      'Assessment of source fault & instant water redirection',
      'Line clamping, joint rebuilding or pump-out service',
      'Dry-out checklist and municipal valve verification'
    ]
  }
];

interface ServicesProps {
  onBookNow: (serviceTitle?: string) => void;
}

export default function Services({ onBookNow }: ServicesProps) {
  const [activeTab, setActiveTab] = useState('all');

  const categories = ['all', 'Interior Specialties', 'Luxury Wet Rooms', 'New Construction', 'Home Renovations', 'Water Quality', 'Thermal Comfort', 'Diagnostic Maintenance', '24/7 Rapid Action'];

  const filteredServices = activeTab === 'all' 
    ? DETAILED_SERVICES 
    : DETAILED_SERVICES.filter(s => s.category === activeTab);

  return (
    <div className="pt-24 pb-16">
      
      {/* 1. HEADER HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-green/5 to-brand-navy/5 py-12 px-4 border-b border-slate-100">
        <WaterBubbles density="medium" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-7 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-[10px] font-bold font-mono tracking-widest uppercase">
              <Sparkles className="w-3 h-3 text-brand-teal" />
              <span>EXCEPTIONAL CRATFSMANSHIP</span>
            </div>
            <HeadingAnimate tag="h1" className="text-3xl sm:text-5xl font-display font-bold text-brand-navy tracking-tight leading-tight">
              Our Plumbing Specialties
            </HeadingAnimate>
            <DescAnimate className="text-sm sm:text-base text-brand-slate-muted max-w-2xl">
              From luxury bathroom retreats to whole-home radiant floor loops and prompt leak fixes, we engineer systems that deliver lifelong reliability.
            </DescAnimate>
          </div>
          
          <div className="md:col-span-5 h-[180px] w-full relative pointer-events-none">
            <Antigravity
              count={200}
              magnetRadius={9}
              ringRadius={8}
              waveSpeed={0.4}
              waveAmplitude={1.1}
              particleSize={1.4}
              lerpSpeed={0.07}
              color={'#0F766E'}
              autoAnimate={true}
              particleVariance={0.8}
              particleShape="capsule"
              fieldStrength={10}
            />
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS */}
      <section className="py-8 bg-brand-bg-secondary border-b border-slate-100 sticky top-[68px] z-30">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-none flex items-center gap-2">
          <span className="text-xs font-bold text-brand-slate-light whitespace-nowrap mr-2">Filter Craft:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`text-xs font-bold py-2 px-4 rounded-full transition-all border whitespace-nowrap cursor-pointer ${
                activeTab === cat
                  ? 'bg-brand-green border-brand-green text-white shadow-md'
                  : 'bg-white border-slate-100 text-brand-slate-muted hover:border-slate-300'
              }`}
            >
              {cat === 'all' ? 'Show All Services' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. DETAILED SERVICES LAYOUT */}
      <section className="py-16 bg-brand-bg-primary noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {filteredServices.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={service.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-slate-100/50 pb-16 last:border-0 last:pb-0"
              >
                {/* Image Column */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-first' : 'lg:order-last'}`}>
                  <ImageAnimate
                    src={service.image}
                    alt={service.title}
                    className="rounded-3xl shadow-xl aspect-[4/3] object-cover"
                  />
                </div>

                {/* Content Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold font-mono tracking-widest text-brand-teal uppercase bg-teal-50 border border-teal-100 py-1 px-2.5 rounded-md">
                      {service.category}
                    </span>
                    {service.id === 'emergency-support' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono tracking-widest text-rose-600 uppercase bg-rose-50 border border-rose-100 py-1 px-2.5 rounded-md animate-pulse">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>ACTIVE RESPONSE</span>
                      </span>
                    )}
                  </div>

                  <HeadingAnimate tag="h2" className="text-2xl sm:text-3xl font-display font-bold text-brand-navy">
                    {service.title}
                  </HeadingAnimate>

                  <DescAnimate className="text-xs sm:text-sm text-brand-slate-muted leading-relaxed">
                    {service.description}
                  </DescAnimate>

                  {/* Split Benefits & Process */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    
                    {/* Benefits List */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-extrabold text-brand-navy uppercase tracking-wider">
                        Core Service Benefits:
                      </h4>
                      <ul className="space-y-2 text-xs text-brand-slate-muted">
                        {service.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-brand-green mt-0.5 font-bold">✓</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Process Steps */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-extrabold text-brand-navy uppercase tracking-wider">
                        Our Process (How We Work):
                      </h4>
                      <ol className="space-y-2 text-xs text-brand-slate-muted">
                        {service.process.map((p, idx) => (
                          <li key={idx} className="flex items-start gap-2 font-medium">
                            <span className="w-4.5 h-4.5 rounded-full bg-brand-bg-secondary border border-slate-100 text-brand-green flex items-center justify-center text-[10px] shrink-0 font-bold">
                              {idx + 1}
                            </span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                  </div>

                  {/* Actions Row */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      onClick={() => onBookNow(service.title)}
                      className="w-full sm:w-auto bg-brand-green hover:bg-brand-teal text-white font-bold text-xs tracking-wide px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 btn-premium"
                    >
                      <CalendarDays className="w-4 h-4" />
                      <span>Book this service</span>
                    </button>

                    <button
                      onClick={() => {
                        const contactEl = document.getElementById('faq-section');
                        if (contactEl) {
                          contactEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-brand-navy font-bold text-xs px-6 py-3 rounded-xl border border-slate-100 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Inquire about custom pricing</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FAQ / SAFETY SECTION */}
      <section id="faq-section" className="py-20 bg-brand-bg-secondary border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <SectionAnimate className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-green font-mono text-xs font-bold tracking-[0.25em] uppercase block mb-3">
              HELP & RESOURCES
            </span>
            <HeadingAnimate tag="h2" className="text-3xl font-display font-bold text-brand-navy mb-4">
              Common Service Inquiries
            </HeadingAnimate>
            <DescAnimate className="text-xs sm:text-sm text-brand-slate-muted">
              Find fast responses to plumbing, gas, and renovation inquiries below.
            </DescAnimate>
          </SectionAnimate>

          {/* Q&A List */}
          <div className="space-y-6">
            {[
              {
                q: 'Are you licensed to handle custom natural gas lines in Ontario?',
                a: 'Yes, absolutely. Under TSSA (Technical Standards and Safety Authority) rules, anyone fitting natural gas piping or venting gas heaters in Ontario must hold a Gas Technician license. Adam Van Berkel is fully certified and licensed to run luxury gas appliances, gas heaters, and fireplace lines.'
              },
              {
                q: 'What is the advantage of using PEX piping over traditional copper?',
                a: 'PEX (cross-linked polyethylene) is highly flexible, meaning fewer joints, which drastically decreases leak risks. It expands slightly if water freezes inside, reducing the risk of burst pipes during Southern Ontario winters. We specify premium PEX for home rough-ins, but use rigid copper for exposed boiler/utility rooms where visual structural alignment is critical.'
              },
              {
                q: 'Can you work directly with our general contractor or designer?',
                a: 'Yes, we collaborate extensively with local custom builders, framers, and interior designers across Hamilton, Burlington, and Oakville. We review site blueprint specs, coordinate structural timeline schedules, and deliver clean mechanical rough-ins that integrate beautifully with overall designs.'
              },
              {
                q: 'Do you charge a dispatch fee for emergency leak checks?',
                a: 'We provide clear flat-rate diagnostic fees before we get to work. When you face an active plumbing burst, we explain how to shut off your main home valve over the phone for free while we drive, saving your home from catastrophic drywall damage.'
              }
            ].map((faq, i) => (
              <SectionAnimate key={i}>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <div className="flex gap-2 items-start">
                    <HelpCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    <h3 className="font-display font-bold text-brand-navy text-sm sm:text-base">
                      {faq.q}
                    </h3>
                  </div>
                  <p className="text-xs text-brand-slate-muted pl-7 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </SectionAnimate>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
