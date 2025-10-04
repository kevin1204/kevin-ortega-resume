'use client';

import { useState, useEffect } from 'react';

// Hook to detect mobile devices
export function useMobileTap() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// Mobile tap feedback props
export const getMobileTapProps = (isMobile: boolean) => {
  return isMobile ? {
    whileTap: { 
      scale: 0.98,
      transition: { 
        duration: 0.15, 
        ease: [0.4, 0.0, 0.2, 1] 
      }
    }
  } : {};
};
