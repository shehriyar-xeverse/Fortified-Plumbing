import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  drift: number;
  scaleChange: number;
  colorType: 'teal' | 'green' | 'white';
  opacity: number;
  blur: string;
}

interface WaterBubblesProps {
  density?: 'high' | 'medium' | 'low' | 'subtle';
}

export default function WaterBubbles({ density = 'medium' }: WaterBubblesProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Determine screen-size based limits
    const width = window.innerWidth;
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    let baseCount = 20;
    if (density === 'high') {
      baseCount = isMobile ? 8 : isTablet ? 16 : 28;
    } else if (density === 'medium') {
      baseCount = isMobile ? 6 : isTablet ? 12 : 18;
    } else if (density === 'low') {
      baseCount = isMobile ? 4 : isTablet ? 8 : 12;
    } else {
      // subtle
      baseCount = isMobile ? 3 : isTablet ? 5 : 8;
    }

    const items: Bubble[] = Array.from({ length: baseCount }).map((_, i) => {
      // Randomize sizes, positions, speed, colors
      const size = Math.floor(Math.random() * 32) + 12; // 12px to 44px
      const left = Math.random() * 100; // 0% to 100%
      const duration = Math.random() * 12 + 10; // 10s to 22s float time
      const delay = Math.random() * -18; // Negative delay to start immediately and distribute evenly
      const drift = Math.random() * 60 - 30; // -30px to 30px side-to-side drift
      const scaleChange = Math.random() * 0.3 + 0.85; // change scale while floating (0.85 to 1.15)
      
      // Bubble colors
      const randColor = Math.random();
      let colorType: 'teal' | 'green' | 'white' = 'white';
      let opacity = Math.random() * 0.25 + 0.15; // default soft transparency (15% to 40%)

      if (randColor < 0.45) {
        colorType = 'teal'; // teal highlight
        opacity = Math.random() * 0.22 + 0.18;
      } else if (randColor < 0.75) {
        colorType = 'green'; // deep green accent
        opacity = Math.random() * 0.18 + 0.12;
      } else {
        colorType = 'white'; // soft white
        opacity = Math.random() * 0.25 + 0.15;
      }

      const blurVal = size > 30 ? 'blur(0.5px)' : 'none';

      return {
        id: i,
        size,
        left,
        duration,
        delay,
        drift,
        scaleChange,
        colorType,
        opacity,
        blur: blurVal,
      };
    });

    setBubbles(items);
  }, [density]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-[1]">
      <style>{`
        @keyframes bubble-rise {
          0% {
            transform: translateY(110vh) translateX(0) scale(0.6);
            opacity: 0;
          }
          10% {
            opacity: var(--bubble-opacity);
          }
          90% {
            opacity: var(--bubble-opacity);
          }
          100% {
            transform: translateY(-10vh) translateX(var(--bubble-drift)) scale(var(--bubble-scale-change));
            opacity: 0;
          }
        }
        .animate-bubble {
          animation: bubble-rise var(--bubble-duration) cubic-bezier(0.37, 0, 0.63, 1) infinite;
          animation-delay: var(--bubble-delay);
        }
      `}</style>

      {bubbles.map((bubble) => {
        // Setup premium water glass gradients
        let background = '';
        let border = '';
        let boxShadow = '';

        if (bubble.colorType === 'teal') {
          background = 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, rgba(20, 184, 166, 0.08) 40%, rgba(15, 118, 110, 0.15) 85%, rgba(255, 255, 255, 0.05) 100%)';
          border = '1px solid rgba(20, 184, 166, 0.25)';
          boxShadow = `inset -2px -2px 6px rgba(15, 118, 110, 0.25), inset 2px 2px 6px rgba(255, 255, 255, 0.4), 0 4px 8px rgba(20, 184, 166, 0.05)`;
        } else if (bubble.colorType === 'green') {
          background = 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.35) 0%, rgba(15, 118, 110, 0.06) 40%, rgba(13, 148, 136, 0.12) 85%, rgba(255, 255, 255, 0.02) 100%)';
          border = '1px solid rgba(15, 118, 110, 0.2)';
          boxShadow = `inset -2px -2px 6px rgba(15, 118, 110, 0.3), inset 2px 2px 5px rgba(255, 255, 255, 0.35), 0 4px 8px rgba(15, 118, 110, 0.04)`;
        } else {
          background = 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(20, 184, 166, 0.08) 85%, rgba(255, 255, 255, 0.03) 100%)';
          border = '1px solid rgba(255, 255, 255, 0.35)';
          boxShadow = `inset -2px -2px 5px rgba(15, 118, 110, 0.12), inset 2px 2px 5px rgba(255, 255, 255, 0.55), 0 4px 8px rgba(255, 255, 255, 0.02)`;
        }

        return (
          <div
            key={bubble.id}
            className="absolute rounded-full animate-bubble"
            style={{
              left: `${bubble.left}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              background,
              border,
              boxShadow,
              filter: bubble.blur,
              backdropFilter: 'blur(0.5px)',
              top: 0,
              transformOrigin: 'center center',
              ['--bubble-opacity' as any]: bubble.opacity,
              ['--bubble-duration' as any]: `${bubble.duration}s`,
              ['--bubble-delay' as any]: `${bubble.delay}s`,
              ['--bubble-drift' as any]: `${bubble.drift}px`,
              ['--bubble-scale-change' as any]: bubble.scaleChange,
            }}
          >
            {/* Top-left soft water highlight spot */}
            <div 
              className="absolute rounded-full bg-white/70"
              style={{
                top: '15%',
                left: '15%',
                width: '25%',
                height: '25%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)',
              }}
            />
            {/* Subtle light reflection on the bottom right curve */}
            <div 
              className="absolute rounded-full bg-teal-300/25"
              style={{
                bottom: '12%',
                right: '12%',
                width: '35%',
                height: '15%',
                transform: 'rotate(-35deg)',
                background: 'radial-gradient(ellipse, rgba(20,184,166,0.3) 0%, rgba(20,184,166,0) 90%)',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
