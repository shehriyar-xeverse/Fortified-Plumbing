import { motion } from 'motion/react';
import { ShieldCheck, Calendar, Award, Star, Users, MapPin, CheckCircle, HeartHandshake, FileText, ChevronRight, MessageSquare } from 'lucide-react';
import { STATISTICS } from '../data';
import SectionAnimate, { ImageAnimate, HeadingAnimate, DescAnimate } from '../components/SectionAnimate';
import TiltCard from '../components/TiltCard';
import WaterBubbles from '../components/WaterBubbles';
import Antigravity from '../components/Antigravity';

export default function About() {
  const values = [
    {
      title: 'Red Seal Craftsmanship',
      desc: 'Every joint, PEX line, and gas fitting we install is built strictly to Ontario building code standards with Master level certifications.',
      icon: Award,
    },
    {
      title: 'Honest Transparent Pricing',
      desc: 'We outline options and give fixed upfront pricing so you are completely in control. No hidden emergency fees or sudden surprises.',
      icon: ShieldCheck,
    },
    {
      title: 'Family Integrity First',
      desc: 'We care for your home as if it were our own. We wear protective shoe covers, lay down drop cloths, and clean up every spec of dust.',
      icon: HeartHandshake,
    },
    {
      title: 'Active Community Care',
      desc: 'Serving local neighbors in Hamilton, Lynden, and Burlington. We support local trade apprenticeships and community sports teams.',
      icon: Users,
    },
  ];

  const milestones = [
    {
      year: '2010',
      title: 'Master Accreditation',
      desc: 'Adam Van Berkel completes his strict Red Seal Plumbing exams and qualifies as a registered Master Plumber in Ontario.',
    },
    {
      year: '2014',
      title: 'The Foundation of Fortified',
      desc: 'Adam and Jodi officially launch Fortified Plumbing in Lynden, ON with a single truck and a commitment to family-run integrity.',
    },
    {
      year: '2018',
      title: 'Custom Build Expansion',
      desc: 'Partnering with premier home builders across Ancaster and Burlington, establishing a reputation for outstanding luxury rough-ins.',
    },
    {
      year: '2022',
      title: 'Comprehensive Systems Integration',
      desc: 'Expanding service list to include advanced commercial-grade water filtration systems, radiant floors, and smart water alarms.',
    },
    {
      year: '2026',
      title: 'Ontario\'s Trusted Contractors',
      desc: 'Celebrating over 15 years of five-star craftsmanship, serving thousands of families with reliable home solutions.',
    },
  ];

  return (
    <div className="pt-24 pb-16">
      
      {/* 1. HEADER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-green/5 to-brand-navy/5 py-12 px-4 border-b border-slate-100">
        <WaterBubbles density="subtle" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-7 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-[10px] font-bold font-mono tracking-widest uppercase">
              <span>GET TO KNOW US</span>
            </div>
            <HeadingAnimate tag="h1" className="text-3xl sm:text-5xl font-display font-bold text-brand-navy tracking-tight leading-tight">
              Built on Family. Driven by Integrity.
            </HeadingAnimate>
            <DescAnimate className="text-sm sm:text-base text-brand-slate-muted max-w-2xl">
              Discover the values and craftsmen behind Southern Ontario's premier luxury renovation and custom-build plumbing contractor.
            </DescAnimate>
          </div>
          
          <div className="md:col-span-5 h-[180px] w-full relative pointer-events-none">
            <Antigravity
              count={180}
              magnetRadius={10}
              ringRadius={8}
              waveSpeed={0.4}
              waveAmplitude={1.2}
              particleSize={1.5}
              lerpSpeed={0.06}
              color={'#14B8A6'}
              autoAnimate={true}
              particleVariance={0.8}
              particleShape="sphere"
              fieldStrength={10}
            />
          </div>
        </div>
      </section>

      {/* 2. STORY SPLIT-LAYOUT */}
      <section className="py-20 bg-brand-bg-primary noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Image Left */}
            <div className="lg:col-span-5">
              <ImageAnimate
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
                alt="Luxury Home Builder Project"
                className="rounded-3xl shadow-xl aspect-square"
              />
            </div>

            {/* Story Text Right */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-brand-green font-mono text-xs font-bold tracking-[0.25em] uppercase block">
                OUR JOURNEY
              </span>
              
              <HeadingAnimate tag="h2" className="text-3xl font-display font-bold text-brand-navy">
                The Fortified Heritage
              </HeadingAnimate>

              <DescAnimate className="text-xs sm:text-sm text-brand-slate-muted leading-relaxed space-y-4">
                <p>
                  Every luxury custom home build or detailed bathroom renovation demands mechanical installations that are flawless and robust. Fortified Plumbing was founded by Adam Van Berkel and his wife Jodi with a simple, solid promise: to bring premium contracting standards together with friendly, trustworthy customer service.
                </p>
                <p>
                  Based in Lynden, Ontario, we grew steadily from a family repair business into a high-end service partner for custom home builders and designers across Hamilton, Burlington, and Oakville. Despite our growth, our core process remains focused on family trust.
                </p>
                <p>
                  Our work is hidden behind drywalls and under floorboards, but we treat it like master art. From copper lines aligned at perfect angles to leak-free radiant manifolds, we build mechanical systems designed to last generations.
                </p>
              </DescAnimate>

              <div className="flex flex-wrap gap-3 pt-2">
                <span className="text-[10px] font-bold bg-slate-50 text-brand-navy border border-slate-100 py-1.5 px-3.5 rounded-full">
                  ✓ Registered Red Seal Master Plumber
                </span>
                <span className="text-[10px] font-bold bg-slate-50 text-brand-navy border border-slate-100 py-1.5 px-3.5 rounded-full">
                  ✓ Full TSSA Fuel Gas Licensure
                </span>
                <span className="text-[10px] font-bold bg-slate-50 text-brand-navy border border-slate-100 py-1.5 px-3.5 rounded-full">
                  ✓ $5 Million Liability Insured
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. TIMELINE & MILESTONES */}
      <section className="py-20 bg-brand-bg-secondary border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <SectionAnimate className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-green font-mono text-xs font-bold tracking-[0.25em] uppercase block mb-3">
              OUR HISTORIC PATH
            </span>
            <HeadingAnimate tag="h2" className="text-3xl font-display font-bold text-brand-navy mb-4">
              Our Growth Timeline
            </HeadingAnimate>
            <DescAnimate className="text-xs sm:text-sm text-brand-slate-muted">
              Follow our milestones from singular licensing to serving premier builders across Southern Ontario.
            </DescAnimate>
          </SectionAnimate>

          {/* Vertical Timeline - Highly Polished and Aligned */}
          <div className="relative border-l-2 border-brand-teal/20 ml-4 md:ml-36 space-y-10">
            {milestones.map((m, index) => (
              <SectionAnimate key={index} className="relative pl-10 group">
                {/* Year Badge on Left for wide screens */}
                <div className="hidden md:block absolute -left-40 top-3 text-right w-28">
                  <span className="text-sm font-bold font-mono text-brand-green bg-brand-green/10 py-1.5 px-4 rounded-full group-hover:bg-brand-green group-hover:text-white transition-all duration-300 shadow-sm">
                    {m.year}
                  </span>
                </div>

                {/* Timeline Node Dot (Luxurious and custom-aligned, zero default input styles) */}
                <span className="absolute -left-[13px] top-4.5 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-brand-green shadow-md z-10 transition-transform duration-300 group-hover:scale-115">
                  <span className="h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
                </span>

                {/* Timeline Content Card */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm group-hover:shadow-md group-hover:border-brand-teal/20 transition-all duration-300 relative">
                  <span className="md:hidden inline-block text-[10px] font-bold font-mono text-brand-green bg-brand-green/10 py-0.5 px-2.5 rounded-full mb-2">
                    {m.year}
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-brand-navy mb-2">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-slate-muted leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </SectionAnimate>
            ))}
          </div>

        </div>
      </section>

      {/* 4. STATISTICS SECTION */}
      <section className="py-20 bg-brand-bg-primary noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATISTICS.map((stat, idx) => (
              <SectionAnimate key={stat.id} delay={idx * 0.05}>
                <TiltCard className="p-6 h-full text-center flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="text-4xl font-extrabold font-mono text-brand-navy">
                      {stat.value}
                      <span className="text-brand-teal ml-0.5">{stat.suffix}</span>
                    </div>
                    <h4 className="text-xs font-bold font-display tracking-wide text-brand-slate-dark uppercase">
                      {stat.label}
                    </h4>
                    <p className="text-[11px] text-brand-slate-light leading-normal">
                      {stat.description}
                    </p>
                  </div>
                </TiltCard>
              </SectionAnimate>
            ))}
          </div>

        </div>
      </section>

      {/* 5. CORE VALUES (WHY CHOOSE US) */}
      <section className="py-20 bg-brand-bg-alternate border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionAnimate className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-green font-mono text-xs font-bold tracking-[0.25em] uppercase block mb-3">
              WHAT SETS US APART
            </span>
            <HeadingAnimate tag="h2" className="text-3xl font-display font-bold text-brand-navy mb-4">
              Why Choose Fortified
            </HeadingAnimate>
            <DescAnimate className="text-xs sm:text-sm text-brand-slate-muted">
              We focus on premium mechanical craftsmanship, straightforward advice, and complete respect for your household.
            </DescAnimate>
          </SectionAnimate>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <SectionAnimate key={i} delay={i * 0.05}>
                  <TiltCard className="p-8 h-full flex gap-5 group">
                    <div className="w-12 h-12 bg-teal-50 text-brand-green rounded-2xl flex items-center justify-center shrink-0 border border-teal-100 group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-lg text-brand-navy">
                        {v.title}
                      </h3>
                      <p className="text-xs text-brand-slate-muted leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                  </TiltCard>
                </SectionAnimate>
              );
            })}
          </div>

          {/* Customer Commitment Box */}
          <SectionAnimate className="mt-16">
            <div className="bg-gradient-to-r from-brand-green to-brand-navy rounded-3xl p-8 md:p-10 text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="max-w-xl">
                <h3 className="font-display text-xl md:text-2xl font-bold mb-3">
                  Our Five-Star Customer Commitment
                </h3>
                <p className="text-xs md:text-sm text-teal-100 leading-relaxed">
                  We guarantee clear communication, polite service, tidy work, and Red Seal craftsmanship. If any installation does not perform flawlessly, we will return and fix it immediately.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
                  ].map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt="Happy Client"
                      className="w-10 h-10 rounded-full border-2 border-brand-green object-cover"
                    />
                  ))}
                </div>
                <div>
                  <span className="block text-xs font-bold">Recommended By Neighbors</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-brand-teal text-brand-teal" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionAnimate>

        </div>
      </section>

    </div>
  );
}
