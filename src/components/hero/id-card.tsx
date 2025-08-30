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
      <div className="w-full max-w-sm mx-auto h-80 bg-neutral-200 dark:bg-[#23272f] rounded-2xl animate-pulse" />
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
        return 'bg-secondary-1000 text-accent-100';
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
    <div className="w-full">
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
            ? `ID card for ${data.personal.name}`
            : `${data.personal.name} ID card`
        }
      >
        {/* Background illustration */}
        {/* <div className="absolute inset-0 bg-primary-500/20 dark:bg-primary-400/10 rounded-3xl blur-2xl scale-110">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="45" fill="#888" />
          </svg>
        </div> */}
        {/* Card content */}
        <div
          className="w-full bg-white dark:bg-[#23272f] rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6 flex flex-col relative z-10"
          style={{ minHeight: isMobile ? '280px' : '320px' }}
        >
          {/* Profile section */}
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative">
              <div
                className={`${isMobile ? 'w-20 h-24' : 'w-24 h-28'} rounded-lg overflow-hidden border-2 border-neutral-300 dark:border-neutral-600 shadow-sm`}
              >
                <Image
                  src={data.personal.avatar}
                  alt={`${data.personal.name} profile photo`}
                  width={isMobile ? 100 : 120}
                  height={isMobile ? 120 : 140}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2
                className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-neutral-900 dark:text-neutral-100 mb-1 sm:mb-2 truncate`}
              >
                {data.personal.name}
              </h2>
              <p
                className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-primary-600 dark:text-primary-400 mb-2 sm:mb-3 leading-tight`}
              >
                Senior Software Engineer
              </p>
              <div
                className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'} text-neutral-600 dark:text-neutral-400`}
              >
                <svg
                  className={`${isMobile ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-1.5'} flex-shrink-0`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="truncate">São José dos Campos, SP</span>
              </div>
            </div>
          </div>
          {/* Key Skills - Minimal */}
          <div className="mb-3 sm:mb-4">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <span
                className={`bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm'} rounded font-medium text-center`}
              >
                Full Stack
              </span>
              <span
                className={`bg-secondary-50 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm'} rounded font-medium text-center`}
              >
                AI & Automation
              </span>
            </div>
          </div>

          {/* Footer: ID and barcode */}
          <div className="mt-auto pt-2 sm:pt-3 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-700">
            <div
              className={`${isMobile ? 'text-xs' : 'text-sm'} text-neutral-500 dark:text-neutral-400 font-mono`}
            >
              ID: MS-{new Date().getFullYear()}
            </div>
            {/* Simple barcode */}
            <div className="flex items-center gap-px">
              {[2, 1, 3, 1, 2, 1, 3, 2, 1, 2].map((height, i) => (
                <div
                  key={i}
                  className="bg-neutral-400 dark:bg-neutral-500 w-0.5"
                  style={{ height: `${height * (isMobile ? 3 : 4)}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
