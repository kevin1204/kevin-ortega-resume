'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowRight } from 'lucide-react';
import type { Project } from '@/lib/types';
import { 
  gridStaggerVariants, 
  gridItemVariants,
  mobileScrollReveal
} from '@/lib/animations';
import { useMobileTap, getMobileTapProps } from '@/lib/use-mobile-tap';
import { LoadingGrid } from '@/components/loading';

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMobileTap();

  // Debug log to see if projects are being passed
  console.log('ProjectsGrid received projects:', projects?.length || 0);

  return (
    <div className="space-y-8">
      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {projects.length} projects
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <LoadingGrid count={6} />
      ) : (
        <motion.div
          variants={gridStaggerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
          <motion.div key={project.id} variants={gridItemVariants}>
            <motion.div
              variants={mobileScrollReveal}
              initial="hidden"
              {...(index < 3 
                ? { animate: "visible" }
                : { 
                    whileInView: "visible",
                    viewport: { once: true, amount: 0.5 }
                  }
              )}
              className="h-full"
            >
              <motion.div {...getMobileTapProps(isMobile)} className="h-full">
                <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/60 hover:shadow-primary/10 relative">
                  {/* Running line outline effect */}
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/30 transition-all duration-500 group-hover:animate-pulse z-10"></div>
                  <div className="absolute inset-0 rounded-lg border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              <CardContent className="p-0 relative z-20">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.featured && (
                      <Badge className="bg-primary text-primary-foreground">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      {project.links.live && (
                        <Button size="sm" asChild>
                          <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-3 w-3" />
                            Live
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
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.role}</p>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button asChild variant="ghost" className="w-full group/link">
                    <Link href={`/projects/${project.slug}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
        </motion.div>
      )}

    </div>
  );
}
