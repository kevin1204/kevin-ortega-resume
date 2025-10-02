'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Eye } from 'lucide-react';
import type { SiteConfig } from '@/lib/types';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  scrollRevealVariants,
  buttonHoverVariants,
  pageTransitionVariants
} from '@/lib/animations';
import { ConstellationBackground } from '@/components/constellation-background';

interface HeroProps {
  siteConfig: SiteConfig;
}

export function Hero({ siteConfig }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Constellation Background */}
      <ConstellationBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          className="text-center"
        >
          <motion.div 
            variants={scrollRevealVariants}
            className="mb-8"
          >
            <motion.h1 
              className="text-4xl font-bold tracking-tight font-display sm:text-6xl lg:text-7xl"
              variants={scrollRevealVariants}
            >
              <span className="gradient-text">{siteConfig.name}</span>
            </motion.h1>
          </motion.div>
          
          <motion.div 
            variants={scrollRevealVariants}
            className="mb-8"
            transition={{ delay: 0.2 }}
          >
            <motion.h2 
              className="text-xl font-semibold text-muted-foreground sm:text-2xl lg:text-3xl"
              variants={scrollRevealVariants}
            >
              Full Stack Developer & Solutions Architect • Founder & CEO @{' '}
              <Link 
                href={siteConfig.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-semibold"
              >
                WebLoft Studio
              </Link>
            </motion.h2>
          </motion.div>
          
          <motion.div 
            variants={scrollRevealVariants}
            className="mb-12"
            transition={{ delay: 0.4 }}
          >
            <motion.p 
              className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance"
              variants={scrollRevealVariants}
            >
              {siteConfig.description}
            </motion.p>
          </motion.div>
          
          <motion.div 
            variants={scrollRevealVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            transition={{ delay: 0.6 }}
          >
            <motion.div variants={scrollRevealVariants}>
              <Button asChild size="lg" className="group">
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div variants={scrollRevealVariants}>
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="/contact">
                  <Eye className="mr-2 h-4 w-4" />
                  Get In Touch
                </Link>
              </Button>
            </motion.div>
            
            <motion.div variants={scrollRevealVariants}>
              <Button asChild variant="ghost" size="lg" className="group">
                <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={scrollRevealVariants}
            className="mt-16"
            transition={{ delay: 0.8 }}
          >
            <motion.div 
              className="flex items-center justify-center space-x-6 text-sm text-muted-foreground"
              variants={scrollRevealVariants}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Available for projects</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <div className="hidden sm:block">
                <span>{siteConfig.links.location}</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
