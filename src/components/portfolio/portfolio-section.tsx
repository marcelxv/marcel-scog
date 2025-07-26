'use client';

import { motion } from 'framer-motion';
import { ProjectGrid } from './project-grid';
import type { Project } from '@/lib/types';

interface PortfolioSectionProps {
  projects: Project[];
}

export function PortfolioSection({ projects }: PortfolioSectionProps) {
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

  return (
    <section
      id="portfolio"
      className="py-20 bg-accent-50 dark:bg-accent-900/20"
    >
      <div className="container mx-auto px-4">
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
              A showcase of projects that demonstrate technical expertise,
              creative problem-solving, and commitment to delivering exceptional
              user experiences.
            </p>
          </motion.div>

          {/* Project Grid */}
          <motion.div variants={headerVariants} className="max-w-7xl mx-auto">
            <ProjectGrid projects={projects} />
          </motion.div>

          {/* Call to Action */}
          {/* <motion.div variants={headerVariants} className="text-center mt-16">
            <p className="text-text-600 dark:text-text-400 mb-6">
              Interested in working together or learning more about these
              projects?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-lg transition-colors"
              >
                Get In Touch
              </a>
              <a
                href="https://github.com/marcelscognamiglio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-accent-500 text-accent-600 dark:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/30 font-medium rounded-lg transition-colors"
              >
                View GitHub
              </a>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}
