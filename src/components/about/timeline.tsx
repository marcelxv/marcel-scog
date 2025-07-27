'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Experience } from '@/lib/types';

interface TimelineProps {
  experiences: Experience[];
}

interface TimelineItemProps {
  experience: Experience;
  index: number;
  isVisible: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

function TimelineItem({
  experience,
  index,
  isVisible,
  isExpanded,
  onToggle,
}: TimelineItemProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  const calculateDuration = (startDate: Date, endDate?: Date) => {
    const end = endDate || new Date();
    const months =
      (end.getFullYear() - startDate.getFullYear()) * 12 +
      (end.getMonth() - startDate.getMonth());

    if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    }

    return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  };

  return (
    <div
      className={`relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-accent-300 dark:bg-text-600" />

      {/* Timeline dot */}
      <div className="absolute left-4 top-8 w-4 h-4 bg-primary-500 rounded-full border-4 border-accent-100 dark:border-text-800 shadow-lg" />

      {/* Content */}
      <div className="ml-16 pb-12">
        <div
          className="card p-6 bg-white dark:bg-neutral-900 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          onClick={onToggle}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToggle();
            }
          }}
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details for ${experience.position} at ${experience.company}`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              {/* Company logo placeholder */}
              {/* <div className="w-12 h-12 bg-accent-200 dark:bg-text-700 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  {experience.company.charAt(0)}
                </span>
              </div> */}

              <div>
                <h3 className="text-lg font-bold text-text-900 dark:text-white">
                  {experience.position}
                </h3>
                <p className="text-primary-600 dark:text-primary-300 font-medium">
                  {experience.company}
                </p>
                <div className="flex items-center space-x-2 text-sm text-text-700 dark:text-text-200 mt-1">
                  <span>
                    {formatDate(experience.startDate)} -{' '}
                    {experience.endDate
                      ? formatDate(experience.endDate)
                      : 'Present'}
                  </span>
                  <span>•</span>
                  <span>
                    {calculateDuration(
                      experience.startDate,
                      experience.endDate
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Expand/Collapse icon */}
            <div
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            >
              <svg
                className="w-5 h-5 text-text-500 dark:text-text-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Description */}
          <p className="text-text-700 dark:text-text-300 mb-4 leading-relaxed">
            {experience.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.technologies
              .slice(0, isExpanded ? experience.technologies.length : 6)
              .map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-md text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            {!isExpanded && experience.technologies.length > 6 && (
              <span className="px-2 py-1 bg-accent-200 dark:bg-text-700 text-text-600 dark:text-text-400 rounded-md text-xs font-medium">
                +{experience.technologies.length - 6} more
              </span>
            )}
          </div>

          {/* Expandable achievements */}
          {isExpanded && experience.achievements.length > 0 && (
            <div className="mt-4 pt-4 border-t border-accent-300 dark:border-text-600">
              <h4 className="text-sm font-semibold text-text-800 dark:text-text-200 mb-3">
                Key Achievements
              </h4>
              <ul className="space-y-2">
                {experience.achievements.map(
                  (achievement, achievementIndex) => (
                    <li
                      key={achievementIndex}
                      className="flex items-start space-x-2 text-sm text-text-700 dark:text-text-300"
                    >
                      <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Expand hint */}
          {!isExpanded && (
            <div className="text-sm text-text-800 dark:text-text-100 mt-4 flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              Click to expand details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Timeline({ experiences }: TimelineProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = parseInt(
            entry.target.getAttribute('data-index') || '0'
          );
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const timelineItems = timelineRef.current?.querySelectorAll('[data-index]');
    timelineItems?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div ref={timelineRef} className="relative">
      {/* Timeline header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-text-900 dark:text-accent-500 mb-4">
          Professional Journey
        </h2>
        <p className="text-lg text-text-600 dark:text-text-400 max-w-2xl mx-auto">
          A timeline of my career progression, key roles, and the technologies
          I&apos;ve mastered along the way.
        </p>
      </div>

      {/* Timeline items */}
      <div className="max-w-4xl mx-auto">
        {experiences.map((experience, index) => (
          <div key={experience.id} data-index={index}>
            <TimelineItem
              experience={experience}
              index={index}
              isVisible={visibleItems.has(index)}
              isExpanded={expandedItems.has(index)}
              onToggle={() => toggleExpanded(index)}
            />
          </div>
        ))}
      </div>

      {/* Timeline end */}
      <div className="flex justify-center mt-8">
        <div className="w-4 h-4 bg-secondary-500 rounded-full border-4 border-accent-100 dark:border-text-800 shadow-lg" />
      </div>
    </div>
  );
}
