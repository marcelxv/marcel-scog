'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Testimonial {
  id: string;
  content: string;
  author: string;
  position: string;
  company: string;
  avatar?: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
    <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
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
              Client Testimonials
            </h2>
            <p className="text-lg text-text-600 dark:text-text-400 max-w-2xl mx-auto">
              What clients say about working with me and the results we achieved
              together
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {testimonials.map(testimonial => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className="group"
              >
                <div className="relative p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Quote icon */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-accent-500"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <blockquote className="text-lg text-text-700 dark:text-text-300 leading-relaxed mb-6">
                      &ldquo;{testimonial.content}&rdquo;
                    </blockquote>

                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-accent-400 to-secondary-500 flex-shrink-0">
                        {testimonial.avatar ? (
                          <Image
                            src={testimonial.avatar}
                            alt={`${testimonial.author} avatar`}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                            {testimonial.author.charAt(0)}
                          </div>
                        )}
                      </div>

                      {/* Author info */}
                      <div>
                        <div className="font-semibold text-text-800 dark:text-text-200">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-text-600 dark:text-text-400">
                          {testimonial.position} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-accent-500 rounded-full opacity-60" />
                  <div className="absolute top-4 left-4 w-1 h-1 bg-secondary-1000 rounded-full opacity-40" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-text-600 dark:text-text-400 mb-6">
              Ready to achieve similar results for your project?
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-lg transition-colors"
            >
              Let&apos;s Work Together
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
