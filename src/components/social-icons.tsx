'use client';

import { Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function SocialIcons() {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="h-9 w-9"
          aria-label="Visit LinkedIn profile"
        >
          <a
            href="https://www.linkedin.com/in/ksor/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </Button>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="h-9 w-9"
          aria-label="Visit GitHub profile"
        >
          <a
            href="https://github.com/kevin1204"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <Github className="h-4 w-4" />
          </a>
        </Button>
      </motion.div>
    </div>
  );
}
