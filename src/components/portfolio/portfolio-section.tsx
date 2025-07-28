'use client';

import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { ProjectGrid } from './project-grid';
import type { Project } from '@/lib/types';

interface PortfolioSectionProps {
  projects: Project[];
}

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  const isMobile = useIsMobile();
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const renderContent = () => (
    <>
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-800 dark:text-text-200 mb-6">
          Featured Work
        </h2>
        <p className="text-lg md:text-xl text-text-600 dark:text-text-400 max-w-3xl mx-auto leading-relaxed">
          Some projects that I've write for my ideas to get back to the community
        </p>
      </div>

      {/* Project Grid */}
      <div className="max-w-7xl mx-auto">
        <ProjectGrid projects={projects} />
      </div>
    </>
  );

  return (
    <section id="portfolio" className="py-20 bg-primary-50 dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        {isMobile ? (
          renderContent()
        ) : (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Section Header */}
            <motion.div variants={headerVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-800 dark:text-text-200 mb-6">
                Featured Work
              </h2>
              <p className="text-lg md:text-xl text-text-600 dark:text-text-400 max-w-3xl mx-auto leading-relaxed">
                Some projects that I've write for my ideas to get back to the community
              </p>
            </motion.div>

            {/* Project Grid */}
            <motion.div variants={headerVariants} className="max-w-7xl mx-auto">
              <ProjectGrid projects={projects} />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
