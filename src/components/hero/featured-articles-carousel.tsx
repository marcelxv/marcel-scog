'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Article {
  title: string;
  url: string;
  reading: string;
}

interface FeaturedArticlesCarouselProps {
  articles: Article[];
}

export function FeaturedArticlesCarousel({
  articles,
}: FeaturedArticlesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (articles.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % articles.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles.length]);

  if (!articles.length) return null;

  const currentArticle = articles[currentIndex];

  return (
    <div className="relative bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 rounded-2xl p-6 border border-primary-200/50 dark:border-primary-800/30 shadow-lg overflow-hidden">
      {/* Animated background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5 animate-pulse" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-primary-600 dark:text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="text-sm font-bold text-primary-700 dark:text-primary-300 uppercase tracking-wide">
              Latest from Blog
            </span>
          </div>

          {/* Carousel indicators */}
          {articles.length > 1 && (
            <div className="flex gap-1.5">
              {articles.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrentIndex(idx);
                      setIsAnimating(false);
                    }, 300);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-primary-600 dark:bg-primary-400'
                      : 'w-1.5 bg-primary-300 dark:bg-primary-700 hover:bg-primary-400 dark:hover:bg-primary-600'
                  }`}
                  aria-label={`Go to article ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Article content with animation */}
        <div
          className={`transition-all duration-300 ${
            isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          <a
            href={currentArticle.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {currentArticle.title}
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {currentArticle.reading}
              </span>

              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all">
                Read article
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </a>
        </div>

        {/* View all link */}
        <div className="mt-4 pt-4 border-t border-primary-200/50 dark:border-primary-800/30">
          <Link
            href="#knowledge"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors group"
          >
            View all articles
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
