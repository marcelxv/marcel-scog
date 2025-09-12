'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { ProjectCardEnhanced } from './project-card-enhanced';
import { ProjectsOverview } from './projects-overview';
import type { Project, ProjectTag } from '@/lib/types';

interface PortfolioSectionEnhancedProps {
  projects: Project[];
  overview: {
    title: string;
    subtitle: string;
    highlights: Array<{
      category: string;
      metric: string;
    }>;
  };
}

export function PortfolioSectionEnhanced({
  projects,
  overview,
}: PortfolioSectionEnhancedProps) {
  const isMobile = useIsMobile();
  const [selectedTag, setSelectedTag] = useState<ProjectTag | 'All'>('All');
  const [showAll, setShowAll] = useState(false);

  // Get unique tags from projects
  const allTags: (ProjectTag | 'All')[] = ['All'];
  projects.forEach(project => {
    project.tags?.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
  });

  // Filter projects by selected tag
  const filteredProjects =
    selectedTag === 'All'
      ? projects
      : projects.filter(project =>
          project.tags?.includes(selectedTag as ProjectTag)
        );

  // Featured projects (first 3 with featured flag or highest impact)
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  // Display logic: show 6 initially, or all if showAll is true
  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

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
      className="py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900"
    >
      <div className="container mx-auto px-4">
        {/* Projects Overview */}
        <ProjectsOverview {...overview} />

        {/* Divider */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent"></div>
        </div>

        {/* Featured Projects Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-8 text-center">
            Featured Projects
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {featuredProjects.map((project, index) => (
              <ProjectCardEnhanced
                key={project.id}
                project={project}
                variant="featured"
                index={index}
              />
            ))}
          </div>
        </div>

        {/* All Projects Section */}
        <div>
          <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-6 text-center">
            All Projects
          </h3>

          {/* Tag Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag);
                  setShowAll(false);
                }}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    selectedTag === tag
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-sm'
                  }
                `}
              >
                {tag}
                {tag !== 'All' && (
                  <span className="ml-1 text-xs opacity-75">
                    (
                    {
                      projects.filter(p => p.tags?.includes(tag as ProjectTag))
                        .length
                    }
                    )
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {displayedProjects.map((project, index) => (
              <ProjectCardEnhanced
                key={project.id}
                project={project}
                variant="grid"
                index={index}
              />
            ))}
          </div>

          {/* Show More Button */}
          {!showAll && filteredProjects.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Show All Projects
                <span className="ml-2 text-sm opacity-75">
                  ({filteredProjects.length - 6} more)
                </span>
              </button>
            </div>
          )}

          {/* Show Less Button */}
          {showAll && filteredProjects.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(false)}
                className="inline-flex items-center px-6 py-3 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors duration-200"
              >
                Show Less
              </button>
            </div>
          )}
        </div>

        {/* Tech Stack Summary */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-4 text-center">
              Technology Expertise
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {Array.from(new Set(projects.flatMap(p => p.technologies)))
                .slice(0, 20)
                .map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
