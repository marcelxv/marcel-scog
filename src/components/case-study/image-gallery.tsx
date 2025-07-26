'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';

interface GalleryImage {
  url: string;
  caption: string;
  alt: string;
}

interface ImageGalleryProps {
  gallery: GalleryImage[];
  title: string;
}

export function ImageGallery({ gallery, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute('data-index') || '0'
            );
            setLoadedImages(prev => new Set([...prev, index]));
          }
        });
      },
      { rootMargin: '50px' }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set([...prev, index]));
  };

  const openModal = useCallback((index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  }, []);

  const navigateImage = useCallback(
    (direction: 'prev' | 'next') => {
      if (selectedImage === null) return;

      const newIndex =
        direction === 'prev'
          ? (selectedImage - 1 + gallery.length) % gallery.length
          : (selectedImage + 1) % gallery.length;

      setSelectedImage(newIndex);
    },
    [selectedImage, gallery.length]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigateImage, closeModal]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  return (
    <section className="py-16 bg-neutral-50 dark:bg-neutral-800/50">
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
              Project Gallery
            </h2>
            <p className="text-lg text-text-600 dark:text-text-400 max-w-2xl mx-auto">
              Visual showcase of {title} features, interface design, and user
              experience
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {gallery.map((image, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group cursor-pointer"
                onClick={() => openModal(index)}
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                  {/* Lazy loading placeholder */}
                  {!loadedImages.has(index) && (
                    <div
                      ref={el => {
                        if (el && observerRef.current) {
                          el.setAttribute('data-index', index.toString());
                          observerRef.current.observe(el);
                        }
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 animate-pulse"
                    />
                  )}

                  {/* Image */}
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                      loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(index)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                  {/* Expand icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 dark:bg-neutral-800/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-text-700 dark:text-text-300"
                    >
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-4">
                  <p className="text-sm text-text-600 dark:text-text-400 leading-relaxed">
                    {image.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage !== null && gallery[selectedImage] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={e => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={gallery[selectedImage].url}
                  alt={gallery[selectedImage].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-lg">
                  {gallery[selectedImage].caption}
                </p>
              </div>

              {/* Navigation */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <svg
                  width="24"
                  height="24"
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

              {/* Image counter */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 text-white rounded-full text-sm">
                {selectedImage + 1} / {gallery.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
