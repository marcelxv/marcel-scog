'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-is-mobile';
import type { Project } from '@/lib/types';

interface ProjectCardEnhancedProps {
  project: Project;
  variant?: 'grid' | 'featured' | 'compact';
  index: number;
}

export function ProjectCardEnhanced({
  project,
  variant = 'grid',
  index,
}: ProjectCardEnhancedProps) {
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
    variant === 'featured'
      ? 'bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden'
      : 'bg-white dark:bg-neutral-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden';

  const cardContent = (
    <div className="h-full flex flex-col">
      {/* Tags Section */}
      {project.tags && project.tags.length > 0 && (
        <div className="px-6 pt-4 flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${tag === 'Production' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                ${tag === 'Beta' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : ''}
                ${tag === 'MVP' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : ''}
                ${tag === 'Built from scratch' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' : ''}
                ${tag === 'System improvement' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' : ''}
                ${tag === 'Performance & UX' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' : ''}
                ${tag === 'Event-driven' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' : ''}
                ${tag === 'Compliance' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}
              `}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3
          className={`${variant === 'featured' ? 'text-xl' : 'text-lg'} font-bold text-neutral-900 dark:text-neutral-100 mb-2`}
        >
          {project.title}
        </h3>

        {/* Tech Stack */}
        {project.techStack && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 font-mono">
            {project.techStack}
          </p>
        )}

        {/* Problem & Solution */}
        {variant === 'featured' && project.problem && (
          <div className="space-y-3 mb-4">
            <div>
              <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                Problem:
              </span>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">
                {project.problem}
              </p>
            </div>
            {project.solution && (
              <div>
                <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                  Solution:
                </span>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Compact description for non-featured */}
        {variant !== 'featured' && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Results Section */}
        {project.results && project.results.length > 0 && (
          <div className="mt-auto">
            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3">
              <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                Results:
              </span>
              <div className="mt-2 space-y-1">
                {project.results
                  .slice(0, variant === 'featured' ? 4 : 2)
                  .map((result, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span className="text-xs text-neutral-700 dark:text-neutral-300">
                        <span className="font-medium">{result.metric}:</span>{' '}
                        {result.value}
                        {result.estimated && (
                          <span className="text-neutral-500"> (est.)</span>
                        )}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Metrics for featured cards */}
        {variant === 'featured' &&
          project.metrics &&
          project.metrics.length > 0 && (
            <div className="mt-4 p-3 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
              <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                Benchmark:
              </span>
              <div className="mt-2 space-y-1">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="text-xs">
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">
                      {metric.label}:
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400 ml-1">
                      {metric.before && `${metric.before} → `}
                      {metric.after}
                    </span>
                    <span className="text-green-600 dark:text-green-400 ml-1 font-medium">
                      ({metric.improvement})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Project Links */}
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5 mr-1"
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
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          {project.caseStudySlug && (
            <Link
              href={`/projects/${project.caseStudySlug}`}
              className="inline-flex items-center text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors ml-auto"
            >
              View Details
              <svg
                className="w-3.5 h-3.5 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
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
