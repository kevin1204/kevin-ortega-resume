'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { Code, Database, Users, Briefcase } from 'lucide-react';

const skills = [
  // Frontend
  { 
    category: 'Frontend Development', 
    skills: ['JavaScript', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Webflow'],
    icon: Code
  },
  // Backend
  { 
    category: 'Backend & Architecture', 
    skills: ['Node.js', 'Express', 'Python', 'MongoDB', 'PostgreSQL', 'REST APIs', 'System Design'],
    icon: Database
  },
  // Technical Leadership
  { 
    category: 'Technical Leadership', 
    skills: ['Solutions Architecture', 'Technical Account Management', 'System Integration', 'API Design', 'Performance Optimization'],
    icon: Users
  },
  // Business & Management
  { 
    category: 'Business & Management', 
    skills: ['Project Management', 'Client Relations', 'Team Leadership', 'Strategic Planning', 'Technical Consulting'],
    icon: Briefcase
  },
];

export function Skills() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
            Skills & Expertise
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A comprehensive toolkit spanning full-stack development, solutions architecture, 
            technical leadership, and business management.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {skills.map((skillGroup) => {
            const IconComponent = skillGroup.icon;
            return (
              <motion.div key={skillGroup.category} variants={staggerItem}>
              <motion.div
                variants={fadeInUp}
                className="group bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/60 hover:shadow-primary/10 transition-all duration-300 hover:shadow-lg relative overflow-hidden cursor-pointer"
              >
                {/* Running line outline effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-500 group-hover:animate-pulse z-10"></div>
                <div className="absolute inset-0 rounded-2xl border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <div className="flex items-center justify-center gap-3 mb-4 relative z-20">
                    <IconComponent className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-semibold text-center group-hover:text-primary transition-colors duration-300">
                      {skillGroup.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center relative z-20">
                    {skillGroup.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
