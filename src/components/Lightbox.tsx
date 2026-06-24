import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Download, ExternalLink } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageTitle: string;
  category?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function Lightbox({
  isOpen,
  onClose,
  imageUrl,
  imageTitle,
  category,
  onPrev,
  onNext,
}: LightboxProps) {
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          
          {/* Backdrop Touch Handler */}
          <motion.div
            className="absolute inset-0 cursor-zoom-out"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          {onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Media Frame Container */}
          <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center z-10 p-2">
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img
                src={imageUrl}
                alt={imageTitle}
                className="max-w-full max-h-[75vh] object-contain select-none"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white text-left">
                {category && (
                  <span className="inline-block px-2.5 py-0.5 bg-brand-teal text-white rounded-md text-[10px] font-bold font-mono tracking-widest uppercase mb-2">
                    {category}
                  </span>
                )}
                <h3 className="text-lg md:text-xl font-display font-bold tracking-tight text-white mb-1">
                  {imageTitle}
                </h3>
                <p className="text-xs text-slate-300">
                  Fortified Plumbing Master Installation Services
                </p>
              </div>
            </motion.div>

            {/* Micro details / actions below */}
            <div className="flex items-center gap-6 mt-4 text-xs text-slate-400">
              <a
                href={imageUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in full tab</span>
              </a>
              <span className="text-slate-600">|</span>
              <span className="font-mono text-[10px]">RED SEAL ONTARIO CERTIFIED</span>
            </div>

          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
