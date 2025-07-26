'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Project } from '@/lib/types';
import type { CaseStudy } from '@/lib/case-study-data';

interface CaseStudyHeroProps {
  caseStudy: CaseStudy;
  project: Project;
}

export function CaseStudyHero({ caseStudy, project }: CaseStudyHeroProps) {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900 dark:to-accent-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-accent-500 text-white text-sm font-medium rounded-full mb-4">
                  Case Study
                </span>
                {project.company && (
                  <p className="text-accent-600 dark:text-accent-400 font-medium mb-2">
                    {project.company} • {project.year}
                  </p>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-800 dark:text-text-200 mb-6">
                {caseStudy.title}
              </h1>

              <p className="text-xl text-text-600 dark:text-text-400 mb-8 leading-relaxed">
                {caseStudy.subtitle}
              </p>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.slice(0, 6).map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white dark:bg-neutral-800 text-text-600 dark:text-text-400 text-sm rounded-full border border-neutral-200 dark:border-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 6 && (
                  <span className="px-3 py-1 bg-white dark:bg-neutral-800 text-text-600 dark:text-text-400 text-sm rounded-full border border-neutral-200 dark:border-neutral-700">
                    +{project.technologies.length - 6} more
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-lg transition-colors"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15,3 21,3 21,9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-text-700 dark:text-text-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 font-medium rounded-lg transition-colors"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-2"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Source Code
                  </a>
                )}
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={caseStudy.heroImage}
                  alt={`${caseStudy.title} hero image`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent-500/20 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary-500/20 rounded-full blur-xl" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
    </section>
  );
}
