'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Calendar, User } from 'lucide-react';
import type { Project } from '@/lib/types';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { ImageModal } from '@/components/image-modal';

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <Button asChild variant="ghost">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Hero section */}
          <motion.div variants={staggerItem}>
            <div className="relative overflow-hidden rounded-2xl mb-8">
              <Image
                src={project.cover}
                alt={project.title}
                width={1200}
                height={600}
                className="w-full h-96 object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-4xl font-bold font-display text-white mb-2">
                  {project.title}
                </h1>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{project.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project links */}
          <motion.div variants={staggerItem}>
            <div className="flex flex-wrap gap-4">
              {project.links.live && (
                <Button asChild size="lg">
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Site
                  </a>
                </Button>
              )}
              {project.links.github && (
                <Button asChild variant="outline" size="lg">
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Source Code
                  </a>
                </Button>
              )}
              {project.links.caseStudy && (
                <Button asChild variant="outline" size="lg">
                  <a href={project.links.caseStudy} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Case Study
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Project description */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {project.description || project.summary}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <motion.div variants={staggerItem}>
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Key Metrics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {project.metrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold font-display gradient-text mb-2">
                          {metric.value}
                        </div>
                        <div className="text-muted-foreground">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <motion.div variants={staggerItem}>
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.gallery.map((image, index) => (
                      <div 
                        key={index} 
                        className="relative overflow-hidden rounded-lg cursor-pointer group"
                        onClick={() => openModal(index)}
                      >
                        <Image
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error(`Failed to load image: ${image}`);
                            console.error('Error:', e);
                          }}
                          onLoad={() => {
                            console.log(`Successfully loaded image: ${image}`);
                          }}
                          unoptimized={true}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Technologies */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Image Modal */}
      <ImageModal
        images={project.gallery || []}
        currentIndex={selectedImageIndex}
        isOpen={modalOpen}
        onClose={closeModal}
        projectTitle={project.title}
      />
    </div>
  );
}
