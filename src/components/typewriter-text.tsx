'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  mobileText?: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  repeat?: boolean;
  repeatDelay?: number;
}

export function TypewriterText({ 
  text, 
  mobileText,
  speed = 50, 
  delay = 0, 
  className = '',
  cursor = true,
  repeat = true,
  repeatDelay = 4000
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Use mobile text if provided and on mobile, otherwise use full text
  const displayText = isMobile && mobileText ? mobileText : text;

  useEffect(() => {
    if (isWaiting) {
      const timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, repeatDelay);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (currentIndex > 0) {
        const timeout = setTimeout(() => {
          setCurrentIndex(currentIndex - 1);
          setDisplayedText(displayText.slice(0, currentIndex - 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        if (repeat) {
          const timeout = setTimeout(() => {
            setCurrentIndex(0);
            setDisplayedText('');
          }, delay);
          return () => clearTimeout(timeout);
        }
      }
    } else {
      if (currentIndex < displayText.length) {
        const timeout = setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setDisplayedText(displayText.slice(0, currentIndex + 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        if (repeat) {
          const timeout = setTimeout(() => {
            setIsWaiting(true);
          }, repeatDelay);
          return () => clearTimeout(timeout);
        }
      }
    }
  }, [currentIndex, isDeleting, isWaiting, displayText, speed, delay, repeat, repeatDelay]);

  return (
    <span className={className} aria-label={displayText}>
      {displayedText}
      {cursor && (
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-white/80 ml-1"
          animate={{ opacity: [0.8, 0.4, 0.8] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
