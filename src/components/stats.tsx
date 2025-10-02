'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useCountUp } from 'use-count-up';
import type { Stats as StatsType } from '@/lib/types';
import { 
  scrollRevealVariants, 
  gridStaggerVariants, 
  gridItemVariants,
  loadingVariants
} from '@/lib/animations';

interface StatsProps {
  stats: StatsType;
}

function StatCard({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const { value: countValue } = useCountUp({
    isCounting: isInView,
    end: value,
    duration: 2.5,
    easing: 'easeOutCubic',
  });

  return (
    <motion.div
      ref={ref}
      variants={gridItemVariants}
      className="text-center group"
    >
      <motion.div
        variants={scrollRevealVariants}
        className="text-4xl font-bold font-display gradient-text mb-2 group-hover:scale-110 transition-transform duration-300"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {countValue}{suffix}
      </motion.div>
      <motion.p
        variants={scrollRevealVariants}
        className="text-muted-foreground font-medium group-hover:text-primary transition-colors duration-300"
        transition={{ delay: 0.1 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

export function Stats({ stats }: StatsProps) {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <motion.div
          variants={gridStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-3"
        >
          <StatCard
            label="Years Experience"
            value={stats.yearsExperience}
            suffix="+"
          />
          <StatCard
            label="Certifications"
            value={stats.certificationsCount}
          />
          <StatCard
            label="Projects Shipped"
            value={stats.projectsShipped}
            suffix="+"
          />
        </motion.div>
      </div>
    </section>
  );
}
