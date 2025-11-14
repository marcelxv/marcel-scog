'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Article {
  title: string;
  url: string;
  reading: string;
}

interface ArticleTopBarProps {
  articles: Article[];
}

export function ArticleTopBar({ articles }: ArticleTopBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (articles.length <= 1 || !isVisible) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % articles.length);
        setIsAnimating(false);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, [articles.length, isVisible]);

  if (!articles.length || !isVisible) return null;

  const currentArticle = articles[currentIndex];
  if (!currentArticle) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Icon and label */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg
              className="w-5 h-5"
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
            <span className="text-sm font-bold hidden sm:inline">
              Latest Article:
            </span>
          </div>

          {/* Article content with animation */}
          <div
            className={`flex-1 min-w-0 transition-all duration-300 ${
              isAnimating
                ? 'opacity-0 translate-y-1'
                : 'opacity-100 translate-y-0'
            }`}
          >
            <a
              href={currentArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4"
            >
              <span className="text-sm font-medium truncate group-hover:underline">
                {currentArticle.title}
              </span>
              <span className="text-xs text-primary-100 flex-shrink-0 hidden md:flex items-center gap-1">
                <svg
                  className="w-3 h-3"
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
            </a>
          </div>

          {/* Indicators and close button */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Carousel indicators */}
            {articles.length > 1 && (
              <div className="hidden sm:flex gap-1.5">
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
                        ? 'w-6 bg-white'
                        : 'w-1.5 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to article ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
              aria-label="Close article bar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
