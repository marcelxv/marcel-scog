'use client';

import { motion } from 'framer-motion';

interface TimelineItem {
  phase: string;
  duration: string;
  description: string;
}

interface ProjectTimelineProps {
  timeline: TimelineItem[];
}

export function ProjectTimeline({ timeline }: ProjectTimelineProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16 bg-white dark:bg-neutral-700">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-800 dark:text-text-200 mb-4">
              Project Timeline
            </h2>
            <p className="text-lg text-text-600 dark:text-text-400 max-w-2xl mx-auto">
              A detailed breakdown of the project phases and development process
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-500 via-secondary-500 to-primary-500" />

            {/* Timeline items */}
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative flex items-start gap-8"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-4 h-4 bg-white dark:bg-neutral-700 border-4 border-accent-500 rounded-full" />
                    {/* Pulse animation for active item */}
                    <div className="absolute inset-0 w-4 h-4 bg-accent-500 rounded-full animate-ping opacity-20" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-xl font-semibold text-text-800 dark:text-text-200">
                          {item.phase}
                        </h3>
                        <span className="inline-flex items-center px-3 py-1 bg-accent-50 dark:bg-accent-800 text-accent-700 dark:text-accent-300 text-sm font-medium rounded-full mt-2 sm:mt-0">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12,6 12,12 16,14" />
                          </svg>
                          {item.duration}
                        </span>
                      </div>
                      <p className="text-text-600 dark:text-text-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Completion indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative flex items-center gap-8 mt-8"
            >
              <div className="relative z-10 flex-shrink-0">
                <div className="w-6 h-6 bg-secondary-1000 rounded-full flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gradient-to-r from-secondary-50 to-accent-50 dark:from-secondary-900/20 dark:to-accent-900/20 rounded-xl p-6 border border-secondary-200 dark:border-secondary-700">
                  <h3 className="text-xl font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                    Project Completed
                  </h3>
                  <p className="text-text-600 dark:text-text-400">
                    Successfully delivered on time and within budget, exceeding
                    client expectations
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
