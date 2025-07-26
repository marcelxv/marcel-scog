'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/use-is-mobile';
import type { IDCardData } from '@/lib/types';

interface IDCardProps {
  data: IDCardData;
  interactive?: boolean;
}

export function IDCard({ data, interactive = true }: IDCardProps) {
  const isMobile = useIsMobile();
  const [isFlipped, setIsFlipped] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full max-w-md mx-auto h-96 bg-neutral-200 dark:bg-neutral-300 rounded-2xl animate-pulse" />
    );
  }

  const handleCardClick = () => {
    if (interactive) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (interactive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-secondary-500 text-accent-100';
      case 'busy':
        return 'bg-primary-500 text-accent-100';
      case 'open-to-opportunities':
        return 'bg-accent-600 text-text-900';
      default:
        return 'bg-text-500 text-accent-100';
    }
  };

  const getStatusText = (status: string = 'open-to-opportunities') => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'busy':
        return 'Busy';
      case 'open-to-opportunities':
      default:
        return 'Open to Opportunities';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`relative w-full transition-all duration-300 ${
          interactive ? 'hover:scale-105 cursor-pointer' : ''
        }`}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        tabIndex={interactive ? 0 : -1}
        role={interactive ? 'button' : 'img'}
        aria-label={
          interactive
            ? 'ID card for Marcel Scognamiglio'
            : 'Marcel Scognamiglio ID card'
        }
      >
        {/* Card content */}
        <div className="w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-100 dark:border-neutral-700 p-8 flex flex-col">
          {/* Contact Information */}
          {/* Profile section */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-neutral-300 dark:border-neutral-400">
                <Image
                  src={data.personal.avatar}
                  alt={`${data.personal.name} profile photo`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary-600 rounded-full border-2 border-text-50 dark:border-neutral-100 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-text-50"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-bold text-text-900 dark:text-white mb-1">
                {data.personal.name}
              </h2>
              <p className="text-sm font-semibold text-primary-700 dark:text-primary-200 mb-1">
                {data.personal.title}
              </p>
              <div className="flex items-center text-xs text-text-800 dark:text-white mb-1">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {data.personal.location}
              </div>
              <div className="text-xs text-secondary-700 dark:text-secondary-600 font-medium">
                💼 Immediate Start Available
              </div>
            </div>
          </div>

          {/* Quick Contact Actions */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <a
              href={`mailto:${data.contact.email}`}
              className="flex items-center justify-center p-3 bg-primary-200 dark:bg-primary-300 hover:bg-primary-300 dark:hover:bg-primary-400 rounded-lg transition-colors duration-300 group"
            >
              <svg
                className="w-4 h-4 text-primary-800 dark:text-primary-900 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-sm font-medium text-primary-800 dark:text-primary-900">
                Email
              </span>
            </a>
            <a
              href={data.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-3 bg-secondary-200 dark:bg-secondary-300 hover:bg-secondary-300 dark:hover:bg-secondary-400 rounded-lg transition-colors duration-300 group"
            >
              <svg
                className="w-4 h-4 text-secondary-800 dark:text-secondary-900 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-secondary-800 dark:text-secondary-900">
                LinkedIn
              </span>
            </a>
          </div>

          {/* Specializations */}
          <div className="mb-4">
            <h4 className="text-xs font-bold text-text-900 dark:text-white mb-2">
              SPECIALIZATIONS
            </h4>
            <div className={isMobile ? 'flex flex-col gap-1' : 'flex flex-wrap gap-2'}>
              {(isMobile ? data.badges.slice(0, 2) : data.badges.slice(0, 4)).map((badge, index) => (
                <div
                  key={index}
                  className={`px-2 py-0.5 rounded-lg ${isMobile ? 'text-[10px] font-normal' : 'text-xs font-medium'} transition-all duration-300 ${!isMobile ? 'hover:scale-105' : ''} ${
                    badge.level === 'expert'
                      ? 'bg-secondary-700 text-white dark:bg-secondary-500 dark:text-white'
                      : badge.level === 'advanced'
                        ? 'bg-primary-700 text-white dark:bg-primary-500 dark:text-white'
                        : badge.level === 'intermediate'
                          ? 'bg-neutral-700 text-white dark:bg-neutral-500 dark:text-white'
                          : 'bg-text-700 text-white dark:bg-text-400 dark:text-white'
                  }`}
                >
                  {badge.name}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs text-text-600 dark:text-text-600">
                ID: MS-{new Date().getFullYear()}
              </div>
              <div className="text-xs text-secondary-700 dark:text-secondary-600 font-medium">
                ✓ Background Verified
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-text-600 dark:text-text-600">
                💡 TL;DR: Experienced • Available • Ready to contribute
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
