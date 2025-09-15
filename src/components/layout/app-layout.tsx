'use client';

import { Navigation } from './navigation';
import { useSectionObserver } from '@/hooks/use-section-observer';
import type { NavigationItem } from '@/lib/types';

interface AppLayoutProps {
  children: React.ReactNode;
}

// Navigation items configuration
const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '#hero', shortcut: 'H' },
  { label: 'Book a Call', href: '#book-call', shortcut: 'B' },
  { label: 'About', href: '#about', shortcut: 'A' },
  { label: 'Knowledge', href: '#knowledge', shortcut: 'K' },
  { label: 'Skills', href: '#skills', shortcut: 'S' },
  { label: 'Portfolio', href: '#portfolio', shortcut: 'P' },
  { label: 'Contact', href: '#contact', shortcut: 'C' },
];

// Section IDs for intersection observer
const sectionIds = navigationItems
  .filter(item => !item.external)
  .map(item => item.href.replace('#', ''));

export function AppLayout({ children }: AppLayoutProps) {
  const activeSection = useSectionObserver({
    sections: sectionIds,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-accent-50 dark:bg-neutral-950 transition-colors duration-300">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary-600 text-text-50 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <Navigation items={navigationItems} currentSection={activeSection} />

      {/* Main content */}
      <main
        id="main-content"
        className="pt-20" // Account for fixed header
        role="main"
      >
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-300 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-text-700 dark:text-text-200">
              © {new Date().getFullYear()} Marcel Scognamiglio. All rights
              reserved.
            </div>

            <div className="flex items-center space-x-6">
              <a
                href="mailto:marcel@example.com"
                className="text-sm text-text-700 dark:text-text-200 hover:text-primary-700 dark:hover:text-primary-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-200 rounded-md px-2 py-1"
                aria-label="Send email to Marcel"
              >
                Email
              </a>
              <a
                href="https://linkedin.com/in/marcel-scognamiglio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-700 dark:text-text-200 hover:text-primary-700 dark:hover:text-primary-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-200 rounded-md px-2 py-1"
                aria-label="Visit Marcel's LinkedIn profile (opens in new tab)"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/marcel-scognamiglio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-700 dark:text-text-200 hover:text-primary-700 dark:hover:text-primary-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-200 rounded-md px-2 py-1"
                aria-label="Visit Marcel's GitHub profile (opens in new tab)"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
