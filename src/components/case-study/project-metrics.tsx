'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { ProjectMetric } from '@/lib/case-study-data';

interface ProjectMetricsProps {
  metrics: ProjectMetric[];
}

function AnimatedCounter({
  value,
  duration = 2000,
}: {
  value: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState('0');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Extract numeric value and suffix
    const numericMatch = value.match(/(\d+)/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseInt(numericMatch[1] || '0');
    const suffix = value.replace(numericMatch[1] || '', '');
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentNumber = Math.floor(targetNumber * easeOutQuart);

      setDisplayValue(`${currentNumber}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [value, duration, isVisible]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsVisible(true)}
      className="text-3xl md:text-4xl font-bold text-accent-600 dark:text-accent-400"
    >
      {displayValue}
    </motion.div>
  );
}

export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-br from-accent-50 to-secondary-50 dark:from-accent-900/20 dark:to-secondary-900/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-800 dark:text-text-200 mb-4">
              Project Impact
            </h2>
            <p className="text-lg text-text-600 dark:text-text-400 max-w-2xl mx-auto">
              Measurable results that demonstrate the success and impact of this
              project
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="relative p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-secondary-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative z-10">
                    <AnimatedCounter value={metric.value} />

                    <h3 className="text-lg font-semibold text-text-800 dark:text-text-200 mt-4 mb-2">
                      {metric.label}
                    </h3>

                    {metric.description && (
                      <p className="text-sm text-text-600 dark:text-text-400 leading-relaxed">
                        {metric.description}
                      </p>
                    )}
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-accent-500 rounded-full opacity-60" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-secondary-500 rounded-full opacity-40" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-text-600 dark:text-text-400 max-w-3xl mx-auto">
              These metrics represent the tangible impact achieved through
              careful planning, technical excellence, and user-centered design
              principles.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
