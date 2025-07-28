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

  const cardClasses =
    'bg-white dark:bg-neutral-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300';

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
        <div className="flex items-center justify-between mb-3">
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

        {/* Project Links */}
        <div className="flex items-center space-x-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-text-600 dark:text-text-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-text-600 dark:text-text-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live Demo
            </a>
          )}
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
