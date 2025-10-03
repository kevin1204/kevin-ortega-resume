'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Building, ArrowRight, GraduationCap, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import type { TimelineEntry } from '@/lib/types';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { MagneticCard } from '@/components/magnetic-card';

interface TimelinePreviewProps {
  entries: TimelineEntry[];
}

export function TimelinePreview({ entries }: TimelinePreviewProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  // Get the 4 most recent entries (2 experience, 2 education)
  const recentEntries = entries
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 4);

  const formatDate = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const startFormatted = start.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
    
    if (!endDate) {
      return `${startFormatted} - Present`;
    }
    
    const end = new Date(endDate);
    const endFormatted = end.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
    
    return `${startFormatted} - ${endFormatted}`;
  };

  const getTypeIcon = (type: string) => {
    return type === 'education' ? (
      <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />
    ) : (
      <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
    );
  };

  const getTypeColor = (type: string) => {
    return type === 'education' ? 'bg-blue-500' : 'bg-green-500';
  };

  return (
    <section className="py-12 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={staggerItem}
            className="text-3xl font-bold font-display sm:text-4xl lg:text-5xl mb-4"
          >
            My <span className="gradient-text">Journey</span>
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            A glimpse into my professional experience and educational background, 
            showcasing my growth in web development and business leadership.
          </motion.p>
        </motion.div>

        <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto">
          {recentEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <div className="flex items-start gap-3 sm:gap-6">
                {/* Timeline dot */}
                <motion.div 
                  className="flex-shrink-0"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      duration: 0.5, 
                      delay: index * 0.1 + 0.2,
                      ease: "easeOut"
                    }
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className={`w-8 h-8 sm:w-12 sm:h-12 ${getTypeColor(entry.type)} rounded-full flex items-center justify-center text-white shadow-lg`}>
                    {entry.type === 'education' ? (
                      <GraduationCap className="h-4 w-4 sm:h-6 sm:w-6" />
                    ) : (
                      <Briefcase className="h-4 w-4 sm:h-6 sm:w-6" />
                    )}
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div 
                  className="flex-1 min-w-0"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      duration: 0.6, 
                      delay: index * 0.1 + 0.1,
                      ease: "easeOut"
                    }
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <MagneticCard className="flex-1 min-w-0" intensity={0.1}>
                    <Card 
                      className={`group glass hover:shadow-2xl transition-all duration-300 ease-out bg-card/80 cursor-pointer relative overflow-hidden ${
                        expandedItem === entry.id 
                          ? 'shadow-lg !border-primary/50' 
                          : '!border-border/30 hover:!border-primary/20'
                      }`}
                      onClick={() => setExpandedItem(expandedItem === entry.id ? null : entry.id)}
                    >
                    {/* Running line outline effect */}
                    <div className={`absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-300 ease-out z-10 ${
                      expandedItem === entry.id 
                        ? 'border-primary/30 animate-pulse' 
                        : 'group-hover:border-primary/30 group-hover:animate-pulse'
                    }`}></div>
                    <div className={`absolute inset-0 rounded-lg border border-primary/20 transition-opacity duration-250 ease-out z-10 ${
                      expandedItem === entry.id 
                        ? 'opacity-100' 
                        : 'opacity-0 group-hover:opacity-100'
                    }`}></div>
                    
                    <CardContent className="pt-1 pb-4 px-4 sm:pt-1 sm:pb-6 sm:px-6 relative z-20">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                            <Badge 
                              variant="outline"
                              className="text-xs font-medium px-2 py-1 flex items-center gap-2 text-[#1F5D96] border-[#1F5D96] bg-transparent hover:bg-[#1F5D96]/10 w-fit"
                            >
                              <div className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
                                {getTypeIcon(entry.type)}
                              </div>
                              {entry.type === 'education' ? 'EDUCATION' : 'EXPERIENCE'}
                            </Badge>
                            {entry.tags && entry.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 sm:gap-2">
                                {entry.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <h3 className="text-lg sm:text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-250 ease-out break-words">
                            {entry.title}
                          </h3>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{entry.organization}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{entry.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{formatDate(entry.startDate, entry.endDate)}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Expand/Collapse button */}
                        <motion.button 
                          className="flex-shrink-0 p-1 hover:bg-muted/50 rounded-full transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedItem(expandedItem === entry.id ? null : entry.id);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <motion.div
                            animate={{ rotate: expandedItem === entry.id ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          </motion.div>
                        </motion.button>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed break-words">
                        {entry.description[0]}
                      </p>

                      {/* Expanded content */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedItem === entry.id ? 'auto' : 0,
                          opacity: expandedItem === entry.id ? 1 : 0
                        }}
                        transition={{ 
                          duration: 0.3, 
                          ease: "easeInOut",
                          opacity: { 
                            duration: 0.25,
                            ease: "easeInOut"
                          }
                        }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-border/20">
                          <div className="space-y-3">
                            {entry.description.slice(1).map((desc, index) => (
                              <p key={index} className="text-muted-foreground text-sm leading-relaxed break-words">
                                {desc}
                              </p>
                            ))}
                            
                            {entry.tags && entry.tags.length > 2 && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {entry.tags.slice(2).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </MagneticCard>
                </motion.div>
              </div>

            </motion.div>
          ))}
        </div>

        <motion.div
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="group">
            <Link href="/timeline">
              View Full Timeline
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
