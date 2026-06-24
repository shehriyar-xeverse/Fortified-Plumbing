import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface GlobalLoaderProps {
  isInitial?: boolean;
  onFinished?: () => void;
}

export default function GlobalLoader({ isInitial = true, onFinished }: GlobalLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isInitial) {
      // For quick route changes, just show loader briefly then fade out
      const timer = setTimeout(() => {
        if (onFinished) onFinished();
      }, 600);
      return () => clearTimeout(timer);
    }

    // For initial app boot, simulate high-end progressive asset preloading
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onFinished) onFinished();
          }, 300); // Small pause at 100%
          return 100;
        }
        const diff = Math.random() * 15 + 5;
        return Math.min(prev + diff, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isInitial, onFinished]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-white z-[99999] flex flex-col items-center justify-center noise-bg"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          filter: 'blur(10px)',
          transition: { duration: 0.6, ease: 'easeInOut' }
        }}
      >
        <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
          {/* Decorative fluid abstract shapes behind logo */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-brand-teal/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-brand-green/5 rounded-full blur-2xl" />

          {/* Logo Brand Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8 relative z-10"
          >
            {/* Elegant Shield/Plumbing Logo */}
            <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-green to-brand-navy rounded-2xl shadow-xl shadow-brand-green/10">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              {/* Ripple Ring Effect */}
              <motion.div
                className="absolute inset-0 border border-brand-teal rounded-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
            </div>
            
            <div className="text-left">
              <span className="block text-2xl font-bold font-display tracking-tight text-brand-navy">
                FORTIFIED
              </span>
              <span className="block text-xs font-bold font-sans tracking-[0.25em] text-brand-teal uppercase -mt-1">
                PLUMBING
              </span>
            </div>
          </motion.div>

          {/* Shimmer loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-xs font-mono font-medium tracking-widest text-brand-slate-light uppercase mb-4"
          >
            {isInitial ? `Crafting Comfort... ${Math.round(progress)}%` : 'Loading Experience...'}
          </motion.p>

          {/* Thin Stroke Progress Bar */}
          <div className="w-48 h-[2px] bg-brand-bg-alternate rounded-full overflow-hidden relative">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-green to-brand-teal"
              initial={{ width: 0 }}
              animate={{ width: isInitial ? `${progress}%` : '100%' }}
              transition={{ ease: 'easeInOut' }}
            />
          </div>

          <p className="mt-4 text-[10px] text-brand-slate-muted italic">
            Family Values • Exceptional Craftsmanship
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
