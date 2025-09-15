'use client';

import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-is-mobile';

interface ProjectsOverviewProps {
  title: string;
  subtitle: string;
  highlights: Array<{
    category: string;
    metric: string;
  }>;
}

export function ProjectsOverview({
  title,
  subtitle,
  highlights,
}: ProjectsOverviewProps) {
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'Speed & Efficiency':
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
      case 'Reliability':
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        );
      case 'Growth & Conversion':
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        );
    }
  };

  const content = (
    <>
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          {title}
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Top Outcomes Section */}
      <div className="mb-16">
        {/* <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-8 text-center">
          Top 3 Outcomes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {highlights.map((highlight, index) => {
            const HighlightCard = isMobile ? 'div' : motion.div;
            const cardProps = isMobile
              ? {}
              : {
                  variants: itemVariants,
                  initial: 'hidden',
                  whileInView: 'visible',
                  viewport: { once: true },
                };

            return (
              <HighlightCard
                key={index}
                {...cardProps}
                className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-neutral-800 dark:to-neutral-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-600 dark:bg-primary-500 rounded-lg flex items-center justify-center text-white">
                      {getIconForCategory(highlight.category)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      {highlight.category}
                    </h4>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {highlight.metric}
                    </p>
                  </div>
                </div>
              </HighlightCard>
            );
          })}
        </div> */}
      </div>

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
        {[
          {
            label: 'Projects Delivered',
            value: '13+',
            color: 'text-blue-600 dark:text-blue-400',
          },
          {
            label: 'Avg. Efficiency Gain',
            value: '72%',
            color: 'text-green-600 dark:text-green-400',
          },
          {
            label: 'Production Systems',
            value: '8',
            color: 'text-purple-600 dark:text-purple-400',
          },
          {
            label: 'Tech Stack',
            value: '25+',
            color: 'text-orange-600 dark:text-orange-400',
          },
        ].map((stat, index) => {
          const StatCard = isMobile ? 'div' : motion.div;
          const statProps = isMobile
            ? {}
            : {
                variants: itemVariants,
                initial: 'hidden',
                whileInView: 'visible',
                viewport: { once: true },
              };

          return (
            <StatCard
              key={index}
              {...statProps}
              className="bg-white dark:bg-neutral-800 rounded-lg p-4 text-center shadow-md"
            >
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400">
                {stat.label}
              </div>
            </StatCard>
          );
        })}
      </div> */}
    </>
  );

  if (isMobile) {
    return <div className="py-12 px-4">{content}</div>;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="py-12 px-4"
    >
      {content}
    </motion.div>
  );
}
