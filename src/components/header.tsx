'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SocialIcons } from '@/components/social-icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Me', href: '/about' },
  { name: 'Timeline', href: '/timeline' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    if (!mounted) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, mounted]);

  // Debug log for menu state
  useEffect(() => {
    console.log('Mobile menu state changed:', mobileMenuOpen, 'mounted:', mounted);
  }, [mobileMenuOpen, mounted]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Kevin Ortega Rodriguez</span>
            <motion.div
              className="text-xl font-bold font-display gradient-text"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Kevin Ortega
            </motion.div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              console.log('Mobile menu clicked, current state:', mobileMenuOpen);
              const newState = !mobileMenuOpen;
              console.log('Setting mobile menu state to:', newState);
              setMobileMenuOpen(newState);
            }}
            aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
          >
            {mounted && (
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            )}
          </Button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-semibold leading-6 transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <SocialIcons />
        </div>
      </nav>
      
      {/* Mobile Menu - Full Height Implementation */}
      {mounted && mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => {
              console.log('Backdrop clicked, closing menu');
              setMobileMenuOpen(false);
            }}
          />
          
          {/* Menu Panel */}
          <div 
            className="absolute top-0 right-0 bottom-0 w-full shadow-2xl animate-in slide-in-from-right duration-300"
            style={{ backgroundColor: '#000000', opacity: 1 }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div 
                className="flex items-center justify-end p-6 border-b border-gray-800"
                style={{ backgroundColor: '#000000', opacity: 1 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    console.log('Close button clicked');
                    setMobileMenuOpen(false);
                  }}
                  aria-label="Close menu"
                  className="hover:bg-gray-800 text-white"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              {/* Navigation Links */}
              <div 
                className="flex-1 px-6 py-6"
                style={{ backgroundColor: '#000000', opacity: 1 }}
              >
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-base font-semibold leading-7 transition-all duration-200 hover:bg-gray-800 hover:text-white hover:scale-[1.02]",
                        pathname === item.href 
                          ? "text-white bg-gray-800 border border-gray-700 shadow-sm" 
                          : "text-gray-300 hover:shadow-sm"
                      )}
                      onClick={() => {
                        console.log('Navigation link clicked:', item.name);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              
              {/* Social Icons */}
              <div 
                className="p-6 border-t border-gray-800"
                style={{ backgroundColor: '#000000', opacity: 1 }}
              >
                <div className="flex items-center justify-center">
                  <SocialIcons />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
