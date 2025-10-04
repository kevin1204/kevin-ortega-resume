'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import type { Certification } from '@/lib/types';
import { 
  gridStaggerVariants, 
  gridItemVariants,
  mobileScrollReveal
} from '@/lib/animations';
import { useMobileTap, getMobileTapProps } from '@/lib/use-mobile-tap';
import { LoadingGrid } from '@/components/loading';

interface CertificationsGridProps {
  certifications: Certification[];
}

export function CertificationsGrid({ certifications }: CertificationsGridProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMobileTap();

  // Debug log to see if certifications are being passed
  console.log('CertificationsGrid received certifications:', certifications?.length || 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className="space-y-8">
      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {certifications?.length || 0} certifications
      </div>

      {/* Certifications Grid */}
      {isLoading ? (
        <LoadingGrid count={6} />
      ) : !certifications || certifications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No certifications found.</p>
        </div>
      ) : (
        <motion.div
          variants={gridStaggerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((certification, index) => (
          <motion.div key={certification.id} variants={gridItemVariants}>
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
                <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:border-primary/60 hover:shadow-primary/10 relative overflow-hidden">
                  {/* Running line outline effect */}
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-primary/30 transition-all duration-500 group-hover:animate-pulse z-10"></div>
                  <div className="absolute inset-0 rounded-lg border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              <CardContent className="p-6 h-full flex flex-col relative z-20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {certification.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {certification.issuer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Issued {formatDate(certification.issuedOn)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {certification.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button
                    asChild
                    className="w-full group/btn"
                    size="sm"
                  >
                    <a
                      href={certification.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      View Certificate
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </a>
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
