'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/types';
import { 
  scrollRevealVariants, 
  gridStaggerVariants, 
  gridItemVariants,
  buttonHoverVariants
} from '@/lib/animations';
import { MagneticCard } from '@/components/magnetic-card';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featuredProjects = projects.filter(project => project.featured);
  
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={scrollRevealVariants}
            className="text-3xl font-bold font-display sm:text-4xl lg:text-5xl mb-4"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            variants={scrollRevealVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            transition={{ delay: 0.2 }}
          >
            A selection of my recent work showcasing modern web development and design excellence.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <MagneticCard className="h-full" intensity={0.15}>
                <Card className="group overflow-hidden border-0 glass hover:shadow-2xl transition-all duration-500 hover:border-primary/20 h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <motion.div 
                      className="relative overflow-hidden flex-1"
                      initial={{ opacity: 0, scale: 1.1 }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { 
                          duration: 0.8, 
                          delay: index * 0.2 + 0.1,
                          ease: "easeOut"
                        }
                      }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <Image
                        src={project.cover}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-2">
                          {project.links.live && (
                            <Button size="sm" asChild>
                              <Link href={project.links.live} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-3 w-3" />
                                Live Site
                              </Link>
                            </Button>
                          )}
                          {project.links.github && (
                            <Button size="sm" variant="outline" asChild>
                              <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-3 w-3" />
                                Code
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          duration: 0.6, 
                          delay: index * 0.2 + 0.2,
                          ease: "easeOut"
                        }
                      }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                              {project.role.toUpperCase()}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                            {project.title}
                          </h3>
                        </div>
                        <Badge variant="default" className="text-xs font-medium">
                          Featured
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {project.summary}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs hover:bg-primary/10 transition-colors duration-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button asChild variant="ghost" className="group/link">
                        <Link href={`/projects/${project.slug}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </MagneticCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="group">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
