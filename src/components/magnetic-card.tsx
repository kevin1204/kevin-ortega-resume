'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function MagneticCard({ 
  children, 
  className = '', 
  intensity = 0.15 
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [intensity * 5, -intensity * 5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-intensity * 5, intensity * 5]);
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;
    
    x.set(distanceX / (rect.width / 2));
    y.set(distanceY / (rect.height / 2));
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      className={`magnetic-hover ${className}`}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}
