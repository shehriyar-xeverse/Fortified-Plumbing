import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect, ReactNode } from 'react';

interface SectionAnimateProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  key?: string | number;
}

export default function SectionAnimate({ children, className = '', id, delay = 0 }: SectionAnimateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Section-level loader simulation
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsPreloaded(true);
      }, 400); // 400ms section preload micro-shimmer state
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      id={id}
      className={`relative transition-all duration-700 ${
        isInView ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {/* Section Level Loader / Preload State */}
      {!isPreloaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm z-30 pointer-events-none transition-opacity duration-300">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-brand-teal rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-brand-navy rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}

      {/* Blurred transition based on section load */}
      <div
        className="transition-all duration-500 ease-out"
        style={{
          filter: isPreloaded ? 'blur(0px)' : 'blur(4px)',
          opacity: isPreloaded ? 1 : 0.8,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Sub-component for Images: Left -> Right
interface ImageAnimateProps {
  src: string;
  alt: string;
  className?: string;
  id?: string;
  onClick?: () => void;
  lazy?: boolean;
}

export function ImageAnimate({ src, alt, className = '', id, onClick, lazy = true }: ImageAnimateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <div ref={ref} id={id} className="overflow-hidden rounded-2xl shadow-lg relative group">
      <motion.img
        src={src}
        alt={alt}
        onClick={onClick}
        loading={lazy ? 'lazy' : 'eager'}
        className={`w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105 ${className}`}
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
        transition={{
          duration: 1.0,
          ease: [0.25, 1, 0.5, 1], // Power3 out equivalent
        }}
      />
    </div>
  );
}

// Sub-component for Headings: Top -> Down
interface HeadingAnimateProps {
  children: ReactNode;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'span';
}

export function HeadingAnimate({ children, className = '', tag = 'h2' }: HeadingAnimateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const Tag = tag;

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.1, // Slight delay after image animation starts
          ease: [0.25, 1, 0.5, 1],
        }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
}

// Sub-component for Descriptions: Right -> Left
interface DescAnimateProps {
  children: ReactNode;
  className?: string;
}

export function DescAnimate({ children, className = '' }: DescAnimateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.2, // Slight delay after heading animation
          ease: [0.25, 1, 0.5, 1],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
