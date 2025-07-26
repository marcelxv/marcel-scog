'use client';

import { useEffect, useState, useCallback } from 'react';

interface UseSectionObserverOptions {
  rootMargin?: string;
  threshold?: number;
  sections: string[];
}

export function useSectionObserver({
  rootMargin = '-20% 0px -80% 0px',
  threshold = 0.1,
  sections,
}: UseSectionObserverOptions) {
  const [activeSection, setActiveSection] = useState<string>('');

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      // Find the section that's most visible
      let mostVisibleSection = '';
      let maxIntersectionRatio = 0;

      entries.forEach(entry => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio > maxIntersectionRatio
        ) {
          maxIntersectionRatio = entry.intersectionRatio;
          mostVisibleSection = entry.target.id;
        }
      });

      if (mostVisibleSection) {
        setActiveSection(mostVisibleSection);
      }
    },
    []
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !sections.length) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin,
      threshold,
    });

    // Observe all sections
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [sections, rootMargin, threshold, handleIntersection]);

  return activeSection;
}
