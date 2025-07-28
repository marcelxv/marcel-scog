'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CaseStudyHero } from './case-study-hero';
import { CaseStudySection } from './case-study-section';
import { TechnologyStack } from './technology-stack';
import { ProjectMetrics } from './project-metrics';
import { TestimonialSection } from './testimonial-section';
import { ImageGallery } from './image-gallery';
import { ProjectTimeline } from './project-timeline';
import type { Project } from '@/lib/types';
import type { CaseStudy } from '@/lib/case-study-data';

interface CaseStudyPageProps {
  project: Project;
  caseStudy: CaseStudy;
}

export function CaseStudyPage({ project, caseStudy }: CaseStudyPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-white dark:bg-neutral-700"
    >
      {/* Navigation */}
      <motion.nav
        variants={sectionVariants}
        className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-700/80 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/#portfolio"
              className="flex items-center gap-2 text-text-600 dark:text-text-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
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
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Portfolio
            </Link>

            <div className="flex items-center gap-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg transition-colors"
                >
                  View Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-text-700 dark:text-text-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  View Code
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div variants={sectionVariants}>
        <CaseStudyHero caseStudy={caseStudy} project={project} />
      </motion.div>

      {/* Overview */}
      <motion.section
        variants={sectionVariants}
        className="py-16 bg-neutral-50 dark:bg-neutral-800/50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-text-800 dark:text-text-200 mb-6">
              Project Overview
            </h2>
            <p className="text-lg text-text-600 dark:text-text-400 leading-relaxed">
              {caseStudy.overview}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Technology Stack */}
      <motion.div variants={sectionVariants}>
        <TechnologyStack technologies={caseStudy.technologies} />
      </motion.div>

      {/* Project Metrics */}
      <motion.div variants={sectionVariants}>
        <ProjectMetrics metrics={caseStudy.metrics} />
      </motion.div>

      {/* Problem Section */}
      <motion.div variants={sectionVariants}>
        <CaseStudySection
          section={caseStudy.problem}
          backgroundColor="bg-white dark:bg-neutral-700"
        />
      </motion.div>

      {/* Solution Section */}
      <motion.div variants={sectionVariants}>
        <CaseStudySection
          section={caseStudy.solution}
          backgroundColor="bg-neutral-50 dark:bg-neutral-800/50"
        />
      </motion.div>

      {/* Results Section */}
      <motion.div variants={sectionVariants}>
        <CaseStudySection
          section={caseStudy.results}
          backgroundColor="bg-white dark:bg-neutral-700"
        />
      </motion.div>

      {/* Project Timeline */}
      <motion.div variants={sectionVariants}>
        <ProjectTimeline timeline={caseStudy.timeline} />
      </motion.div>

      {/* Image Gallery */}
      <motion.div variants={sectionVariants}>
        <ImageGallery gallery={caseStudy.gallery} title={caseStudy.title} />
      </motion.div>

      {/* Testimonials */}
      {caseStudy.testimonials.length > 0 && (
        <motion.div variants={sectionVariants}>
          <TestimonialSection testimonials={caseStudy.testimonials} />
        </motion.div>
      )}

      {/* Challenges & Learnings */}
      <motion.section
        variants={sectionVariants}
        className="py-16 bg-neutral-50 dark:bg-neutral-800/50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Challenges */}
              <div>
                <h2 className="text-2xl font-bold text-text-800 dark:text-text-200 mb-6">
                  Key Challenges
                </h2>
                <ul className="space-y-4">
                  {caseStudy.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-text-600 dark:text-text-400">
                        {challenge}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learnings */}
              <div>
                <h2 className="text-2xl font-bold text-text-800 dark:text-text-200 mb-6">
                  Key Learnings
                </h2>
                <ul className="space-y-4">
                  {caseStudy.learnings.map((learning, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary-1000 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-text-600 dark:text-text-400">
                        {learning}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Next Steps (if available) */}
      {caseStudy.nextSteps && caseStudy.nextSteps.length > 0 && (
        <motion.section
          variants={sectionVariants}
          className="py-16 bg-white dark:bg-neutral-700"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-text-800 dark:text-text-200 mb-6">
                Future Enhancements
              </h2>
              <ul className="space-y-4">
                {caseStudy.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-text-600 dark:text-text-400">{step}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>
      )}

      {/* Call to Action */}
      <motion.section
        variants={sectionVariants}
        className="py-20 bg-gradient-to-r from-accent-500 to-secondary-500"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Interested in working together?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how I can help bring your next project to life
            with the same attention to detail and technical expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="px-8 py-3 bg-white text-accent-600 font-medium rounded-lg hover:bg-neutral-100 transition-colors"
            >
              Get In Touch
            </Link>
            <Link
              href="/#portfolio"
              className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
