'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { starVariants, constellationLineVariants } from '@/lib/animations';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
  delay: number;
}

interface ConstellationLine {
  id: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay: number;
}

export function ConstellationBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [lines, setLines] = useState<ConstellationLine[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Generate stars
    const generatedStars: Star[] = [];
    for (let i = 0; i < 50; i++) {
      generatedStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        brightness: Math.random() * 0.8 + 0.2,
        delay: Math.random() * 2,
      });
    }
    setStars(generatedStars);

    // Generate constellation lines (neural network-like connections)
    const generatedLines: ConstellationLine[] = [];
    const maxConnections = 15;
    
    for (let i = 0; i < maxConnections; i++) {
      const fromStar = generatedStars[Math.floor(Math.random() * generatedStars.length)];
      const toStar = generatedStars[Math.floor(Math.random() * generatedStars.length)];
      
      // Only create lines between stars that are reasonably close
      const distance = Math.sqrt(
        Math.pow(fromStar.x - toStar.x, 2) + Math.pow(fromStar.y - toStar.y, 2)
      );
      
      if (distance < 40 && fromStar.id !== toStar.id) {
        generatedLines.push({
          id: i,
          from: { x: fromStar.x, y: fromStar.y },
          to: { x: toStar.x, y: toStar.y },
          delay: Math.random() * 3,
        });
      }
    }
    setLines(generatedLines);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(120,119,198,0.1), transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(120,119,198,0.1), transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(120,119,198,0.1), transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(120,119,198,0.1), transparent 50%)",
            "radial-gradient(circle at 20% 20%, rgba(120,119,198,0.1), transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Constellation lines */}
      <svg className="absolute inset-0 w-full h-full">
        {lines.map((line) => (
          <motion.line
            key={line.id}
            x1={`${line.from.x}%`}
            y1={`${line.from.y}%`}
            x2={`${line.to.x}%`}
            y2={`${line.to.y}%`}
            stroke="url(#constellationGradient)"
            strokeWidth="0.5"
            strokeOpacity="0.6"
            variants={constellationLineVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: line.delay }}
          />
        ))}
        
        {/* Gradient definition for lines */}
        <defs>
          <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-primary/60"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px hsl(var(--primary) / ${star.brightness})`,
          }}
          variants={starVariants}
          initial="hidden"
          animate={["visible", "twinkle"]}
          transition={{
            delay: star.delay,
          }}
        />
      ))}

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.8, 0.1],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle parallax layers */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
