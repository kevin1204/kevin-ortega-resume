'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Calendar, MapPin, Building, GraduationCap, Briefcase } from 'lucide-react';
import type { TimelineEntry } from '@/lib/types';
import { timelineItemVariants, timelineLineVariants, staggerContainer, staggerItem, mobileScrollReveal, touchFeedback } from '@/lib/animations';

interface AnimatedTimelineProps {
  entries: TimelineEntry[];
}

type TimelineFilter = 'all' | 'education' | 'experience';

export function AnimatedTimeline({ entries }: AnimatedTimelineProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<TimelineFilter>('all');
  const [progressHeight, setProgressHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Sort entries by start date (newest first) and filter
  const filteredEntries = useMemo(() => {
    let filtered = entries;
    
    if (activeFilter !== 'all') {
      filtered = entries.filter(entry => entry.type === activeFilter);
    }
    
    // Sort by start date (newest first)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateB.getTime() - dateA.getTime();
    });
  }, [entries, activeFilter]);

  // Mobile detection and scroll progress effect
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      console.log('Mobile detected:', mobile, 'Width:', window.innerWidth); // Debug log
      if (!mobile) {
        setProgressHeight(0); // Reset progress on desktop
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll progress effect (mobile only)
  useEffect(() => {
    if (!isMobile || !timelineRef.current) return;

    const updateProgress = () => {
      if (!timelineRef.current) return;
      
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // More reliable progress calculation
      const timelineTop = rect.top;
      const timelineBottom = rect.bottom;
      const timelineHeight = rect.height;
      
      let progress = 0;
      
      // If timeline is above viewport, progress is 0
      if (timelineBottom < 0) {
        progress = 0;
      }
      // If timeline is below viewport, progress is 1
      else if (timelineTop > windowHeight) {
        progress = 1;
      }
      // If timeline is in viewport, calculate based on how much has been scrolled
      else {
        const scrolledPast = windowHeight - timelineTop;
        progress = Math.min(1, Math.max(0, scrolledPast / timelineHeight));
      }
      
      console.log('Progress update:', { 
        timelineTop, 
        timelineBottom, 
        timelineHeight, 
        windowHeight,
        progress, 
        height: progress * 100 
      }); // Debug log
      setProgressHeight(progress * 100);
    };

    // Use passive scroll listener for better performance
    const handleScroll = () => {
      updateProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, filteredEntries]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const formatDateRange = (startDate: string, endDate: string | null) => {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : 'Present';
    return `${start} - ${end}`;
  };

  return (
    <div className="space-y-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 px-4">
        <Button
          variant={activeFilter === 'all' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('all')}
          className="flex items-center gap-2 text-sm"
          size="sm"
        >
          <span>All</span>
        </Button>
        <Button
          variant={activeFilter === 'education' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('education')}
          className="flex items-center gap-2 text-sm"
          size="sm"
        >
          <GraduationCap className="h-4 w-4" />
          <span className="hidden sm:inline">Education</span>
          <span className="sm:hidden">Edu</span>
        </Button>
        <Button
          variant={activeFilter === 'experience' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('experience')}
          className="flex items-center gap-2 text-sm"
          size="sm"
        >
          <Briefcase className="h-4 w-4" />
          <span className="hidden sm:inline">Work Experience</span>
          <span className="sm:hidden">Work</span>
        </Button>
      </div>

      <div ref={ref} className="relative px-4 sm:px-0">
        {/* Background timeline line */}
        <motion.div
          variants={timelineLineVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-border/50"
          style={{ transformOrigin: 'top' }}
        />
        
        {/* Progress timeline line (mobile only) */}
        {isMobile && (
          <>
            {/* Debug: Always visible red line to test positioning */}
            <div 
              className="absolute left-4 top-0 w-2 h-full bg-red-500 z-30 opacity-50"
              style={{ height: '100%' }}
            />
            {/* Actual progress line */}
            <motion.div
              variants={timelineLineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="absolute left-4 top-0 w-2 z-20"
              style={{ 
                transformOrigin: 'top',
                height: `${progressHeight}%`,
                background: 'linear-gradient(to bottom, #3b82f6, #1d4ed8, #1e40af)',
                boxShadow: '0 0 8px #3b82f6, 0 0 16px #3b82f6, 0 0 24px #3b82f6',
                borderRadius: '4px',
                transition: 'height 0.2s ease-out'
              }}
            />
          </>
        )}

        <motion.div
          ref={timelineRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {filteredEntries.map((entry, index) => (
          <motion.div
            key={entry.id}
            variants={staggerItem}
            className="relative flex items-start"
          >
            {/* Timeline dot */}
            <motion.div
              variants={timelineItemVariants}
              className="absolute left-4 sm:left-8 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10 transform -translate-x-1/2"
            />

            {/* Content */}
            <motion.div
              variants={mobileScrollReveal}
              initial="hidden"
              {...(index < 2 
                ? { animate: "visible" }
                : { 
                    whileInView: "visible",
                    viewport: { once: true, amount: 0.5 }
                  }
              )}
              className="ml-16 sm:ml-16 flex-1 min-w-0"
            >
              <motion.div {...touchFeedback} className="h-full">
              <Card 
                className={`group cursor-pointer transition-all duration-300 ease-out hover:shadow-lg hover:border-primary/60 hover:shadow-primary/10 relative overflow-hidden ${
                  expandedItem === entry.id ? 'shadow-lg border-primary/50' : ''
                }`}
                onClick={() => setExpandedItem(expandedItem === entry.id ? null : entry.id)}
              >
                {/* Running line outline effect */}
                <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/30 transition-all duration-300 ease-out group-hover:animate-pulse"></div>
                <div className="absolute inset-0 rounded-lg border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-250 ease-out"></div>
                <CardContent className="pt-1 pb-2 px-4 sm:pt-1.5 sm:pb-3 sm:px-6 relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge 
                          variant={entry.type === 'education' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {entry.type === 'education' ? 'Education' : 'Experience'}
                        </Badge>
                        {entry.tags && entry.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-semibold mb-1 break-words group-hover:text-primary transition-colors duration-250 ease-out">{entry.title}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1 min-w-0">
                          <Building className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{entry.organization}</span>
                        </div>
                        <div className="flex items-center gap-1 min-w-0">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{entry.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{formatDateRange(entry.startDate, entry.endDate)}</span>
                      </div>
                    </div>
                    
                    {entry.externalLink && (
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0"
                      >
                        <a href={entry.externalLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Expanded content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedItem === entry.id ? 'auto' : 0,
                      opacity: expandedItem === entry.id ? 1 : 0,
                    }}
                    transition={{ 
                      duration: 0.3, 
                      ease: 'easeInOut',
                      opacity: { 
                        duration: 0.25,
                        ease: "easeInOut"
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-border">
                      <ul className="space-y-2">
                        {entry.description.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="break-words">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {entry.tags && entry.tags.length > 2 && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex flex-wrap gap-2">
                            {entry.tags.slice(2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </div>
  );
}
