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
    <div className="w-full max-w-sm mx-auto">
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
          className="w-full bg-white dark:bg-[#23272f] rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-6 flex flex-col relative z-10"
          style={{ minHeight: '370px' }}
        >
          {/* Profile section */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-neutral-300 dark:border-neutral-500 shadow-md">
                <Image
                  src={data.personal.avatar}
                  alt={`${data.personal.name} profile photo`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-secondary-600 rounded-full border-2 border-white dark:border-neutral-700 flex items-center justify-center shadow">
                <svg
                  className="w-4 h-4 text-white"
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
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-0.5">
                {data.personal.name}
              </h2>
              <p className="text-sm font-medium text-primary-700 dark:text-primary-300 mb-0.5">
                {data.personal.title}
              </p>
              <div className="flex items-center text-xs text-neutral-700 dark:text-neutral-300">
                <svg
                  className="w-4 h-4 mr-1 text-neutral-500 dark:text-neutral-400"
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
            </div>
          </div>
          {/* Specializations */}
          <div className="mb-4">
            <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-1 tracking-wide">
              Specializations
            </h4>
            <div
              className={
                isMobile ? 'flex flex-col gap-1' : 'flex flex-wrap gap-2'
              }
            >
              {(isMobile
                ? data.badges.slice(0, 3)
                : data.badges.slice(0, 4)
              ).map((badge, index) => (
                <span
                  key={index}
                  className="bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-200 px-2 py-0.5 rounded-md text-xs font-medium shadow-sm border border-primary-100 dark:border-primary-800"
                >
                  {badge.name}
                </span>
              ))}
            </div>
          </div>
          {/* Mobile-only contact links */}
          {isMobile && (
            <div className="mt-2 pt-3 border-t border-neutral-200 dark:border-neutral-700 flex flex-row gap-2">
              <a
                href={data.contact.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-xs font-medium text-primary-700 dark:text-primary-300 hover:underline"
              >
                Download Resume
              </a>
              <a
                href={data.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-xs font-medium text-primary-700 dark:text-primary-300 hover:underline"
              >
                View LinkedIn
              </a>
            </div>
          )}
          {/* Footer: ID and barcode/QR */}
          <div className="mt-auto pt-3 flex items-end justify-between">
            <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono tracking-tight">
              ID: MS-{new Date().getFullYear()}
            </div>
            {/* Barcode/QR placeholder */}
            <div className="w-16 h-8 flex items-center justify-center">
              <svg
                className="w-14 h-6"
                viewBox="0 0 56 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1" y="2" width="2" height="12" rx="1" fill="#888" />
                <rect x="5" y="4" width="1" height="8" rx="0.5" fill="#888" />
                <rect x="8" y="2" width="2" height="12" rx="1" fill="#888" />
                <rect x="12" y="4" width="1" height="8" rx="0.5" fill="#888" />
                <rect x="15" y="2" width="2" height="12" rx="1" fill="#888" />
                <rect x="19" y="4" width="1" height="8" rx="0.5" fill="#888" />
                <rect x="22" y="2" width="2" height="12" rx="1" fill="#888" />
                <rect x="26" y="4" width="1" height="8" rx="0.5" fill="#888" />
                <rect x="29" y="2" width="2" height="12" rx="1" fill="#888" />
                <rect x="33" y="4" width="1" height="8" rx="0.5" fill="#888" />
                <rect x="36" y="2" width="2" height="12" rx="1" fill="#888" />
                <rect x="40" y="4" width="1" height="8" rx="0.5" fill="#888" />
                <rect x="43" y="2" width="2" height="12" rx="1" fill="#888" />
                <rect x="47" y="4" width="1" height="8" rx="0.5" fill="#888" />
                <rect x="50" y="2" width="2" height="12" rx="1" fill="#888" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
