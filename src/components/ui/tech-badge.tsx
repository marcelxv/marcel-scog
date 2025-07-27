import React from 'react';
import { TechIcon } from './tech-icon';

interface TechBadgeProps {
  name: string;
  variant?: 'default' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function TechBadge({ 
  name, 
  variant = 'default', 
  size = 'md', 
  showIcon = true 
}: TechBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const variantClasses = {
    default: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700',
    outline: 'bg-transparent border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800',
    subtle: 'bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-0'
  };

  return (
    <span className={`
      inline-flex items-center rounded-md font-medium transition-colors
      ${sizeClasses[size]}
      ${variantClasses[variant]}
    `}>
      {showIcon && (
        <TechIcon name={name} className={iconSizes[size]} />
      )}
      <span>{name}</span>
    </span>
  );
}