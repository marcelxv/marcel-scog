'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-is-mobile';
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
  const isMobile = useIsMobile();
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

  const cardClasses = 'bg-white dark:bg-neutral-900 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300';

  const cardContent = (
    <div className="p-6 h-full flex flex-col">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-text-900 dark:text-text-100 mb-2">
          {project.title}
        </h3>
        <p className="text-text-700 dark:text-text-300 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Project Footer */}
      <div className="mt-4 pt-4 border-t border-text-200 dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {project.technologies?.slice(0, 3).map(tech => (
              <span
                key={tech}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const MotionContainer = motion.div;

  if (isMobile) {
    return <div className={cardClasses}>{cardContent}</div>;
  }

  return (
    <MotionContainer
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={cardClasses}
    >
      {cardContent}
    </MotionContainer>
  );
}
