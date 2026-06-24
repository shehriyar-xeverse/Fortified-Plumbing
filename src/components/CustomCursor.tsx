import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is touch or screen size is less than tablet
    const checkDevice = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileScreen = window.innerWidth < 1024;
      setIsTouchDevice(isTouch || isMobileScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Event listeners for interactive elements hover states
    const addHoverListeners = () => {
      const elements = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, .interactive-card, [data-cursor]'
      );

      elements.forEach((el) => {
        el.addEventListener('mouseenter', (e) => {
          setIsHovered(true);
          const text = (e.currentTarget as HTMLElement).getAttribute('data-cursor') || '';
          setCursorText(text);
        });
        el.addEventListener('mouseleave', () => {
          setIsHovered(false);
          setCursorText('');
        });
      });
    };

    // Use a MutationObserver to watch for DOM updates and re-apply listeners
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial setup
    addHoverListeners();

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Primary Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-brand-teal rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Trailing Soft Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-brand-green/30 bg-brand-green/5 pointer-events-none z-[9998] flex items-center justify-center text-[8px] font-mono font-medium tracking-widest text-brand-teal uppercase"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 64 : 32,
          height: isHovered ? 64 : 32,
          borderColor: isHovered ? '#14B8A6' : 'rgba(15, 118, 110, 0.3)',
          backgroundColor: isHovered ? 'rgba(20, 114, 166, 0.1)' : 'rgba(15, 118, 110, 0.05)',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      >
        {isHovered && cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-bold text-brand-navy"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
