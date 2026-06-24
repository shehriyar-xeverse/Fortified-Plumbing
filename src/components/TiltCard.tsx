import { useState, useRef, MouseEvent, ReactNode } from 'react';
import { motion } from 'motion/react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  borderRadius?: number;
}

export default function TiltCard({ children, className = '', onClick, borderRadius = 24 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shineX, setShineX] = useState(0);
  const [shineY, setShineY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    // Disable on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Mouse coordinates relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Card dimensions
    const width = rect.width;
    const height = rect.height;

    // Calculate rotation (-12deg to 12deg)
    const rX = ((y / height) - 0.5) * -12; // Inverted rotation
    const rY = ((x / width) - 0.5) * 12;

    setRotateX(rX);
    setRotateY(rY);

    // Light flare coordinates
    setShineX((x / width) * 100);
    setShineY((y / height) * 100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative w-full h-full bg-white border border-slate-100 overflow-hidden cursor-pointer ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        borderRadius,
      }}
      animate={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.025 : 1})`,
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(15, 118, 110, 0.15), 0 0 15px rgba(20, 184, 166, 0.2)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* 3D Shine Glare Overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-35 mix-blend-color-dodge transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 60%)`,
          }}
        />
      )}
      
      {/* Card Content Wrapper */}
      <div style={{ transform: 'translateZ(10px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
