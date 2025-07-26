'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import type { CaseStudySection as CaseStudySectionType } from '@/lib/case-study-data';

interface CaseStudySectionProps {
  section: CaseStudySectionType;
  backgroundColor?: string;
}

export function CaseStudySection({
  section,
  backgroundColor = 'bg-white dark:bg-neutral-900',
}: CaseStudySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-800 dark:text-text-200 mb-6">
                {section.title}
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-text-600 dark:text-text-400 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </motion.div>

            {/* Images */}
            {section.images && section.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                {section.images.length === 1 ? (
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={section.images[0]!}
                      alt={`${section.title} illustration`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => {
                        if (section.images?.[0]) {
                          setSelectedImage(section.images[0]);
                        }
                      }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {section.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden shadow-md"
                      >
                        <Image
                          src={image}
                          alt={`${section.title} illustration ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onClick={() => setSelectedImage(image)}
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Enlarged view"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
