'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import type { NavigationItem } from '@/lib/types';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface NavigationProps {
  items: NavigationItem[];
  currentSection?: string;
}

export function Navigation({ items, currentSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showSectionHighlight, setShowSectionHighlight] = useState(false);
  const [navigatedSection, setNavigatedSection] = useState<string | null>(null);
  const minimizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll effects
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Update scroll state for header styling
    setIsScrolled(scrollY > 20);

    // Calculate scroll progress
    const progress = (scrollY / (documentHeight - windowHeight)) * 100;
    setScrollProgress(Math.min(Math.max(progress, 0), 100));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Handle smooth scroll to section
  const handleNavClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    // Close mobile menu
    setIsMobileMenuOpen(false);

    // Handle internal navigation
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (
    event: React.KeyboardEvent,
    href: string,
    external?: boolean
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavClick(href, external);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      const key = event.key.toUpperCase();
      const item = items.find(item => item.shortcut === key);

      if (item) {
        event.preventDefault();
        handleNavClick(item.href, item.external);

        // Show section highlight
        setShowSectionHighlight(true);
        setNavigatedSection(item.href.replace('#', ''));

        // Clear any existing timeout
        if (minimizeTimeoutRef.current) {
          clearTimeout(minimizeTimeoutRef.current);
        }

        // Auto-clear highlight after 2 seconds
        minimizeTimeoutRef.current = setTimeout(() => {
          setShowSectionHighlight(false);
          setNavigatedSection(null);
        }, 2000);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [items]);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Progress indicator */}
      <div className="fixed top-[7.5rem] left-0 right-0 z-40 h-1 bg-neutral-200 dark:bg-neutral-300">
        <div
          className="h-full bg-primary-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={scrollProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page scroll progress"
        />
      </div>

      {/* Main navigation header */}
      <header
        className={`fixed top-12 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-text-50/80 dark:bg-neutral-950/90 backdrop-blur-md shadow-lg'
            : 'bg-white dark:bg-neutral-950'
        }`}
      >
        <nav
          className="container mx-auto px-4 py-4"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <button
                onClick={() => handleNavClick('#hero')}
                onKeyDown={e => handleKeyDown(e, '#hero')}
                className="text-xl font-bold text-text-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950 rounded-md px-2 py-1"
                aria-label="Go to top of page"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src="/images/marcel-scog-headshot.png"
                    alt="Marcel Scognamiglio"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </motion.div>
              </button>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {items.map(item => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href, item.external)}
                  onKeyDown={e => handleKeyDown(e, item.href, item.external)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950 ${
                    (showSectionHighlight &&
                      navigatedSection === item.href.replace('#', '')) ||
                    (!showSectionHighlight &&
                      currentSection === item.href.replace('#', ''))
                      ? 'text-primary-600 dark:text-primary-300 bg-primary-100/50 dark:bg-primary-900/20'
                      : 'text-text-700 dark:text-text-50 hover:text-primary-600 dark:hover:text-primary-300'
                  }`}
                  aria-current={
                    currentSection === item.href.replace('#', '')
                      ? 'page'
                      : undefined
                  }
                  title={
                    item.shortcut
                      ? `${item.label} (Press ${item.shortcut})`
                      : item.label
                  }
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.shortcut && (
                      <span
                        className={`hidden lg:inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-text-500 dark:text-text-400 bg-text-100 dark:bg-neutral-800 rounded border border-text-200 dark:border-neutral-700 transition-all duration-300 ${
                          showSectionHighlight &&
                          navigatedSection === item.href.replace('#', '')
                            ? 'ring-2 ring-primary-400 dark:ring-primary-500 bg-primary-100 dark:bg-primary-900/50'
                            : ''
                        }`}
                      >
                        {item.shortcut}
                      </span>
                    )}
                  </span>
                  {item.external && (
                    <svg
                      className="inline-block w-3 h-3 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  )}

                  {/* Active indicator */}
                  {((showSectionHighlight &&
                    navigatedSection === item.href.replace('#', '')) ||
                    (!showSectionHighlight &&
                      currentSection === item.href.replace('#', ''))) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full animate-pulse" />
                  )}
                </button>
              ))}

              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-text-700 dark:text-text-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-text-900 rounded-md transition-colors duration-300"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${
                    isMobileMenuOpen ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 z-40 h-full w-80 max-w-[80vw] bg-accent-50 dark:bg-neutral-950 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex flex-col h-full">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between p-6 border-b border-accent-300 dark:border-neutral-800">
            <h2
              id="mobile-menu-title"
              className="text-lg font-semibold text-text-900 dark:text-accent-500"
            >
              Navigation
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-text-500 hover:text-text-700 dark:text-text-400 dark:hover:text-text-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md transition-colors duration-300"
              aria-label="Close navigation menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu items */}
          <nav
            className="flex-1 px-6 py-4"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-2">
              {items.map(item => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href, item.external)}
                    onKeyDown={e => handleKeyDown(e, item.href, item.external)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      currentSection === item.href.replace('#', '')
                        ? 'bg-primary-100 dark:bg-primary-800/20 text-primary-700 dark:text-primary-300'
                        : 'text-text-700 dark:text-text-300 hover:bg-accent-200 dark:hover:bg-text-800 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                    aria-current={
                      currentSection === item.href.replace('#', '')
                        ? 'page'
                        : undefined
                    }
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {item.label}
                        {item.shortcut && (
                          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-text-500 dark:text-text-400 bg-text-100 dark:bg-neutral-800 rounded border border-text-200 dark:border-neutral-700">
                            {item.shortcut}
                          </span>
                        )}
                      </span>
                      {item.external && (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
