'use client';

import React from 'react';
import { useTheme } from '@/providers/theme-provider';

interface CalInlineEmbedProps {
  calLink?: string; // username or username/event-type
  height?: number;
  className?: string;
}

export function CalInlineEmbed({
  calLink = 'marcelxv',
  height = 740,
  className,
}: CalInlineEmbedProps) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
  const src = `https://cal.com/${calLink}?embed=true&theme=${theme}`;

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl bg-transparent dark:bg-transparent ${className ?? ''}`}
      style={className ? undefined : { height }}
    >
      <iframe
        title="Cal.com inline calendar"
        src={src}
        loading="lazy"
        style={{ width: '100%', height: '100%', border: 0 }}
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
