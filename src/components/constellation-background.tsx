'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import { starVariants, constellationLineVariants } from '@/lib/animations';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
  delay: number;
  connections: number[];
}

interface ConstellationLine {
  id: number;
  from: { x: number; y: number; id: number };
  to: { x: number; y: number; id: number };
  delay: number;
  distance: number;
  pulsePhase: number;
  animationPhase: number; // 0 = drawing, 1 = visible, 2 = fading
}

interface TravelingLine {
  id: string;
  path: { x: number; y: number; id: number }[];
  currentIndex: number;
  progress: number;
  delay: number;
  speed: number;
}


export function ConstellationBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [lines, setLines] = useState<ConstellationLine[]>([]);
  const [travelingLines, setTravelingLines] = useState<TravelingLine[]>([]);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  

  // Generate constellation connections based on proximity
  const generateConnections = useCallback((starList: Star[]) => {
    const connections: ConstellationLine[] = [];
    const maxDistance = 60; // Increased maximum distance for more connections
    const minDistance = 5;  // Reduced minimum distance
    
    // Create fewer but more dynamic connections
    const numConnections = Math.min(25, starList.length * 0.4); // Fewer connections
    
    for (let i = 0; i < numConnections; i++) {
      const fromStar = starList[Math.floor(Math.random() * starList.length)];
      
      // Find nearby stars for more natural connections
      const nearbyStars = starList
        .map((otherStar, otherIndex) => ({
          star: otherStar,
          index: otherIndex,
          distance: Math.sqrt(
            Math.pow(fromStar.x - otherStar.x, 2) + Math.pow(fromStar.y - otherStar.y, 2)
          )
        }))
        .filter(({ index: otherIndex, distance }) => 
          otherIndex !== fromStar.id && distance >= minDistance && distance <= maxDistance
        )
        .sort((a, b) => a.distance - b.distance);
      
      if (nearbyStars.length > 0) {
        const toStar = nearbyStars[Math.floor(Math.random() * Math.min(3, nearbyStars.length))].star;
        
        // Avoid duplicate connections
        const connectionExists = connections.some(line => 
          (line.from.id === fromStar.id && line.to.id === toStar.id) ||
          (line.from.id === toStar.id && line.to.id === fromStar.id)
        );
        
        if (!connectionExists) {
          connections.push({
            id: connections.length,
            from: { x: fromStar.x, y: fromStar.y, id: fromStar.id },
            to: { x: toStar.x, y: toStar.y, id: toStar.id },
            delay: Math.random() * 4, // More varied delays
            distance: Math.sqrt(
              Math.pow(fromStar.x - toStar.x, 2) + Math.pow(fromStar.y - toStar.y, 2)
            ),
            pulsePhase: Math.random() * Math.PI * 2,
            animationPhase: Math.random() * 3, // Random starting phase
          });
        }
      }
    }
    
    return connections;
  }, []);

  // Generate traveling lines that move through multiple stars
  const generateTravelingLines = useCallback((starList: Star[]) => {
    const travelingLinesList: TravelingLine[] = [];
    const numTravelingLines = 1; // Generate only one line at a time
    
    for (let i = 0; i < numTravelingLines; i++) {
      // Create a path through 3-5 stars with more variation
      const pathLength = 3 + Math.floor(Math.random() * 3); // 3-5 stars
      const path: { x: number; y: number; id: number }[] = [];
      
      // Start with a random star
      let currentStar = starList[Math.floor(Math.random() * starList.length)];
      path.push({ x: currentStar.x, y: currentStar.y, id: currentStar.id });
      
      // Build path by finding nearby stars with more varied distances
      for (let j = 1; j < pathLength; j++) {
        const nearbyStars = starList
          .filter(star => 
            star.id !== currentStar.id && 
            !path.some(p => p.id === star.id) &&
            Math.sqrt(Math.pow(currentStar.x - star.x, 2) + Math.pow(currentStar.y - star.y, 2)) <= 50 // Increased range
          )
          .sort((a, b) => {
            const distA = Math.sqrt(Math.pow(currentStar.x - a.x, 2) + Math.pow(currentStar.y - a.y, 2));
            const distB = Math.sqrt(Math.pow(currentStar.x - b.x, 2) + Math.pow(currentStar.y - b.y, 2));
            return distA - distB;
          });
        
        if (nearbyStars.length > 0) {
          // Choose a nearby star with more randomness
          const nextStar = nearbyStars[Math.floor(Math.random() * Math.min(5, nearbyStars.length))];
          path.push({ x: nextStar.x, y: nextStar.y, id: nextStar.id });
          currentStar = nextStar;
        } else {
          break; // No more nearby stars
        }
      }
      
      if (path.length >= 2) { // Only create if we have at least 2 points
        travelingLinesList.push({
          id: `line-${Date.now()}-${Math.random()}`, // Unique ID to prevent repetition
          path,
          currentIndex: 0,
          progress: 0,
          delay: Math.random() * 1, // Small random delay for smooth appearance
          speed: 0.4 + Math.random() * 0.8, // More varied speeds
        });
      }
    }
    
    return travelingLinesList;
  }, []);

  // Generate shooting stars

  useEffect(() => {
    setMounted(true);
    
    // Generate stars with better distribution
    const generatedStars: Star[] = [];
    const numStars = 60; // Increased number of stars for more connections
    
    for (let i = 0; i < numStars; i++) {
      generatedStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        brightness: Math.random() * 0.7 + 0.3,
        delay: Math.random() * 2,
        connections: [],
      });
    }
    
    setStars(generatedStars);
    
    // Generate initial constellation lines
    const generatedLines = generateConnections(generatedStars);
    setLines(generatedLines);
    
    
    // Generate traveling lines
    const generatedTravelingLines = generateTravelingLines(generatedStars);
    setTravelingLines(generatedTravelingLines);
    
    // Dynamic constellation regeneration for regular lines only
    const regenerateInterval = setInterval(() => {
      const newLines = generateConnections(generatedStars);
      setLines(newLines);
    }, 4000); // Regenerate regular connections every 4 seconds
    
    // Gradual traveling lines regeneration - one at a time
    const travelingLinesInterval = setInterval(() => {
      setTravelingLines(prevLines => {
        // Remove lines that have completed their journey
        const activeLines = prevLines.filter(line => 
          line.currentIndex < line.path.length - 1
        );
        
        // If we have fewer than 4 active lines, add just one new line
        if (activeLines.length < 4) {
          const newTravelingLines = generateTravelingLines(generatedStars);
          // Only add the first new line to prevent bulk changes
          if (newTravelingLines.length > 0) {
            return [...activeLines, newTravelingLines[0]];
          }
        }
        
        return activeLines;
      });
    }, 3000); // Check every 3 seconds for smoother flow
    
    return () => {
      clearInterval(regenerateInterval);
      clearInterval(travelingLinesInterval);
    };
  }, [generateConnections, generateTravelingLines]);


  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
    >
      
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

      {/* Enhanced Constellation lines with pulsing animation */}
      <svg className="absolute inset-0 w-full h-full">
        {lines.map((line) => {
          const baseWidth = 0.6;
          const animationDuration = 5; // Slower animation
          
          return (
            <motion.line
              key={line.id}
              x1={`${line.from.x}%`}
              y1={`${line.from.y}%`}
              x2={`${line.to.x}%`}
              y2={`${line.to.y}%`}
              stroke="white"
              strokeWidth={baseWidth}
              strokeOpacity="0.3"
              strokeLinecap="round"
              strokeDasharray="200"
              strokeDashoffset="200"
              variants={constellationLineVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: line.delay }}
            >
              {/* Drawing animation - line draws from start to end */}
              <motion.animate
                attributeName="stroke-dashoffset"
                values="200;0;0;200"
                dur={`${animationDuration}s`}
                repeatCount="indefinite"
                begin={`${line.delay}s`}
                calcMode="linear"
                keyTimes="0;0.2;0.6;1"
              />
              
              {/* Opacity animation - fade in while drawing, stay visible, then fade out */}
              <motion.animate
                attributeName="stroke-opacity"
                values="0;0.3;0.3;0"
                dur={`${animationDuration}s`}
                repeatCount="indefinite"
                begin={`${line.delay}s`}
                calcMode="linear"
                keyTimes="0;0.2;0.6;1"
              />
              
              {/* Width pulsing while visible */}
              <motion.animate
                attributeName="stroke-width"
                values={`${baseWidth * 0.6};${baseWidth * 1.3};${baseWidth * 0.6}`}
                dur="1.5s"
                repeatCount="indefinite"
                begin={`${line.delay + 0.6}s`}
                calcMode="spline"
                keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
                keyTimes="0; 0.5; 1"
              />
            </motion.line>
          );
        })}
        
        {/* Traveling Lines - Complete Journey Animation */}
        {travelingLines.map((travelingLine) => {
          if (travelingLine.path.length < 2) return null;
          
          return (
            <g key={`traveling-${travelingLine.id}`}>
              {/* Render each segment of the path */}
              {travelingLine.path.slice(0, -1).map((point, index) => {
                const nextPoint = travelingLine.path[index + 1];
                
                return (
                  <motion.line
                    key={`segment-${travelingLine.id}-${index}`}
                    x1={`${point.x}%`}
                    y1={`${point.y}%`}
                    x2={`${nextPoint.x}%`}
                    y2={`${nextPoint.y}%`}
                    stroke="white"
                    strokeWidth="0.6"
                    strokeLinecap="round"
                    strokeDasharray="200"
                    strokeDashoffset="200"
                    initial={{ strokeOpacity: 0 }}
                    animate={{
                      strokeDashoffset: [200, 0, 0, 200],
                      strokeOpacity: [0, 0.3, 0.3, 0],
                    }}
                    transition={{
                      duration: 4,
                      delay: travelingLine.delay + index * 1.2, // Slower sequential drawing
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </g>
          );
        })}
        
        {/* Enhanced gradient definitions */}
        <defs>
          <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="50%" stopColor="white" stopOpacity="0.2" />
            <stop offset="100%" stopColor="white" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="shootingStarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="30%" stopColor="white" stopOpacity="0.6" />
            <stop offset="70%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>



      {/* Enhanced Stars with smooth animations */}
      {stars.map((star) => {
        const enhancedSize = 3;
        const enhancedBrightness = 0.6;
        
        return (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${enhancedSize}px`,
              height: `${enhancedSize}px`,
              backgroundColor: '#5e98cc',
              boxShadow: `0 0 ${enhancedSize * 2}px rgba(94, 152, 204, ${enhancedBrightness})`,
              zIndex: 20,
            }}
            variants={starVariants}
            initial="hidden"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 4 + Math.random() * 2, // 4-6 seconds
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
          />
        );
      })}

      {/* Enhanced floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: '#5e98cc',
            zIndex: 15,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.3, 1.2, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 6, // 8-14 seconds for slower, smoother movement
            repeat: Infinity,
            delay: Math.random() * 5,
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
