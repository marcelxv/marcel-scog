'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProjectFilterProps {
  technologies: string[];
  selectedTechnologies: string[];
  onFilterChange: (technologies: string[]) => void;
}

export function ProjectFilter({
  technologies,
  selectedTechnologies,
  onFilterChange,
}: ProjectFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTechnologyToggle = (technology: string) => {
    const newSelected = selectedTechnologies.includes(technology)
      ? selectedTechnologies.filter(t => t !== technology)
      : [...selectedTechnologies, technology];

    onFilterChange(newSelected);
  };

  const clearFilters = () => {
    onFilterChange([]);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors"
          aria-expanded={isExpanded}
          aria-controls="technology-filters"
        >
          <span>Filter by Technology</span>
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </button>

        {selectedTechnologies.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-600 dark:text-text-400">
              {selectedTechnologies.length} filter
              {selectedTechnologies.length !== 1 ? 's' : ''} active
            </span>
            <button
              onClick={clearFilters}
              className="text-sm text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <motion.div
        id="technology-filters"
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="flex flex-wrap gap-2 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
          {technologies.map(technology => {
            const isSelected = selectedTechnologies.includes(technology);
            return (
              <button
                key={technology}
                onClick={() => handleTechnologyToggle(technology)}
                className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
                  isSelected
                    ? 'bg-accent-500 text-white shadow-md'
                    : 'bg-white dark:bg-neutral-700 text-text-700 dark:text-text-300 hover:bg-accent-100 dark:hover:bg-accent-800 border border-neutral-200 dark:border-neutral-600'
                }`}
                aria-pressed={isSelected}
              >
                {technology}
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
