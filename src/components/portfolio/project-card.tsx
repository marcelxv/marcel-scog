'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  variant?: 'grid' | 'featured' | 'compact';
  index: number;
}

export function ProjectCard({
  project,
  variant = 'grid',
  index,
}: ProjectCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: index * 0.1,
      },
    },
  };

  const getCardClasses = () => {
    const baseClasses =
      'bg-white dark:bg-neutral-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300';
    return baseClasses;
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={getCardClasses()}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-900 dark:text-text-100 mb-2">
            {project.title}
          </h3>
          <p className="text-text-600 dark:text-text-400 text-sm mb-4 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Project Footer */}
        <div className="mt-4 pt-4 border-t border-text-100 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {project.technologies?.slice(0, 3).map(tech => (
                <span
                  key={tech}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
