import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Grid, Image as ImageIcon, Sparkles, SlidersHorizontal, Info } from 'lucide-react';
import { GALLERY_IMAGES } from '../data';
import SectionAnimate, { HeadingAnimate, DescAnimate } from '../components/SectionAnimate';
import Lightbox from '../components/Lightbox';
import WaterBubbles from '../components/WaterBubbles';
import Antigravity from '../components/Antigravity';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const filters = ['All', 'Kitchen', 'Bathroom', 'Water System', 'Custom Build', 'Renovation'];

  const filteredImages = activeFilter === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeFilter);

  const openLightbox = (index: number) => {
    // Find absolute index in the GALLERY_IMAGES array
    const selectedImg = filteredImages[index];
    const absoluteIdx = GALLERY_IMAGES.findIndex(img => img.id === selectedImg.id);
    setSelectedImageIdx(absoluteIdx);
    setLightboxOpen(true);
  };

  const handlePrevImage = () => {
    setSelectedImageIdx((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIdx((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="pt-24 pb-16">
      
      {/* 1. HEADER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-green/5 to-brand-navy/5 py-12 px-4 border-b border-slate-100">
        <WaterBubbles density="low" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-7 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-[10px] font-bold font-mono tracking-widest uppercase">
              <ImageIcon className="w-3.5 h-3.5 text-brand-teal" />
              <span>PORTFOLIO & CRAFTS</span>
            </div>
            <HeadingAnimate tag="h1" className="text-3xl sm:text-5xl font-display font-bold text-brand-navy tracking-tight leading-tight">
              Our Work Speaks for Itself
            </HeadingAnimate>
            <DescAnimate className="text-sm sm:text-base text-brand-slate-muted max-w-2xl">
              Review actual mechanical installations, radiant tubing lines, and premium bathroom rough-ins completed across Hamilton and Southern Ontario homes.
            </DescAnimate>
          </div>
          
          <div className="md:col-span-5 h-[180px] w-full relative pointer-events-none">
            <Antigravity
              count={180}
              magnetRadius={10}
              ringRadius={9}
              waveSpeed={0.5}
              waveAmplitude={1.0}
              particleSize={1.5}
              lerpSpeed={0.05}
              color={'#14B8A6'}
              autoAnimate={true}
              particleVariance={0.7}
              particleShape="tetrahedron"
              fieldStrength={8}
            />
          </div>
        </div>
      </section>

      {/* 2. GALLERY FILTERS */}
      <section className="py-6 bg-brand-bg-secondary border-b border-slate-100 sticky top-[68px] z-30">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-none flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs font-bold text-brand-slate-light mr-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-brand-green" />
            <span>Categories:</span>
          </div>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-xs font-bold py-2 px-4 rounded-full transition-all border whitespace-nowrap cursor-pointer ${
                activeFilter === filter
                  ? 'bg-brand-green border-brand-green text-white shadow'
                  : 'bg-white border-slate-100 text-brand-slate-muted hover:border-slate-200'
              }`}
            >
              {filter === 'All' ? 'View All Works' : `${filter}s`}
            </button>
          ))}
        </div>
      </section>

      {/* 3. MASONRY LAYOUT */}
      <section className="py-16 bg-brand-bg-primary noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatePresence mode="wait">
            {filteredImages.length === 0 ? (
              <motion.div
                key="empty-gallery"
                className="text-center py-24 text-brand-slate-light font-mono text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No images matching the selected category filter.
              </motion.div>
            ) : (
              <motion.div
                key={activeFilter}
                className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {filteredImages.map((img, index) => (
                  <div
                    key={img.id}
                    onClick={() => openLightbox(index)}
                    className="break-inside-avoid relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 cursor-zoom-in group shadow-sm hover:shadow-lg transition-all duration-500"
                    data-cursor="view"
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-auto object-cover select-none transition-transform duration-700 ease-out group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay */}
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Inline info note about pictures */}
          <SectionAnimate className="mt-16 bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-start gap-3 max-w-2xl mx-auto">
            <Info className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-brand-navy">Ontario Red Seal Integrity</h4>
              <p className="text-brand-slate-muted leading-relaxed">
                All photos represent real, on-site plumbing rough-ins, pre-pour layouts, and water boiler integrations completed by Fortified Plumbing. We never use generic CGI mockups or false representations.
              </p>
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
