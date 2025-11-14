'use client';

import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

interface Article {
  title: string;
  url: string;
}

interface ArticleTickerProps {
  articles: Article[];
}

export function ArticleTicker({ articles }: ArticleTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (articles.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % articles.length);
        setIsAnimating(false);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, [articles.length]);

  if (!articles.length) return null;

  const currentArticle = articles[currentIndex];

  return (
    <a
      href={currentArticle?.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group hidden lg:flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-950/50 hover:bg-primary-100 dark:hover:bg-primary-900/50 rounded-full border border-primary-200 dark:border-primary-800 transition-all duration-300 max-w-md"
      title="Read latest article"
    >
      <BookOpen className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
      <div
        className={`flex-1 min-w-0 transition-all duration-300 ${
          isAnimating ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
        }`}
      >
        <p className="text-sm font-medium text-primary-900 dark:text-primary-100 truncate group-hover:text-primary-700 dark:group-hover:text-primary-300">
          {currentArticle?.title}
        </p>
      </div>
      <svg
        className="w-3 h-3 text-primary-600 dark:text-primary-400 flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </a>
  );
}
