'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowRight } from 'lucide-react';
import type { Project } from '@/lib/types';
import { 
  gridItemVariants,
  loadingVariants
} from '@/lib/animations';
import { MagneticCard } from '@/components/magnetic-card';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div variants={gridItemVariants} className="h-full">
      <MagneticCard className="h-full" intensity={0.1}>
        <Card className="group h-full overflow-hidden glass hover:shadow-2xl transition-all duration-500 hover:border-primary/60 hover:shadow-primary/10 border-border/50 relative">
          {/* Running line outline effect */}
          <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/30 transition-all duration-500 group-hover:animate-pulse z-10"></div>
          <div className="absolute inset-0 rounded-lg border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          <CardContent className="p-0 h-full flex flex-col relative z-20">
            <div className="relative overflow-hidden flex-1">
              <motion.div
                variants={loadingVariants}
                initial="hidden"
                animate="visible"
              >
                <Image
                  src={project.cover}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              
              <motion.div 
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {project.featured && (
                  <Badge className="bg-primary text-primary-foreground shadow-lg">
                    Featured
                  </Badge>
                )}
              </motion.div>
              
              <motion.div 
                className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex gap-2">
                  {project.links.live && (
                    <Button size="sm" asChild>
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Live Site
                      </a>
                    </Button>
                  )}
                  {project.links.github && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
            
            <div className="p-6">
              <motion.div 
                className="mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                    {project.role.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
              </motion.div>
              
              <motion.p 
                className="text-muted-foreground mb-4 line-clamp-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.summary}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-2 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {project.tags.map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Badge variant="secondary" className="text-xs hover:bg-primary/10 transition-colors duration-300">
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
              
              <Button asChild variant="ghost" className="w-full group/link">
                <Link href={`/projects/${project.slug}`}>
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </MagneticCard>
    </motion.div>
  );
}
