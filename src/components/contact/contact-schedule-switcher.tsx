'use client';

import React, { useState } from 'react';
import { ContactForm } from '@/components/contact/contact-form';
import { CalInlineEmbed } from '@/components/contact/cal-inline-embed';

type View = 'form' | 'schedule';

interface ContactScheduleSwitcherProps {
  className?: string;
  compact?: boolean; // removes outer top margin
}

export function ContactScheduleSwitcher({
  className,
  compact = false,
}: ContactScheduleSwitcherProps) {
  const [view, setView] = useState<View>('form');

  return (
    <div className={[compact ? '' : 'mt-12', className || ''].join(' ').trim()}>
      {/* Toggle */}
      <div className="flex items-center justify-center">
        <div
          role="tablist"
          aria-label="Choose contact method"
          className="inline-flex rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 p-1"
        >
          <button
            role="tab"
            aria-selected={view === 'form'}
            aria-controls="contact-form-panel"
            id="contact-form-tab"
            onClick={() => setView('form')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              view === 'form'
                ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow'
                : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/70'
            }`}
          >
            Contact Form
          </button>
          <button
            role="tab"
            aria-selected={view === 'schedule'}
            aria-controls="schedule-panel"
            id="schedule-tab"
            onClick={() => setView('schedule')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              view === 'schedule'
                ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow'
                : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-2 00/70 dark:hover:bg-neutral-700/70'
            }`}
          >
            Schedule
          </button>
        </div>
      </div>

      {/* Unified card area with fixed height */}
      <div className="mt-6">
        <div
          className="w-full h-[620px] md:h-[740px]"
          role="region"
          aria-labelledby={
            view === 'form' ? 'contact-form-tab' : 'schedule-tab'
          }
        >
          {view === 'form' ? (
            <div id="contact-form-panel">
              <ContactForm layout="compact" className="h-full" />
            </div>
          ) : (
            <div id="schedule-panel" className="h-full">
              <CalInlineEmbed calLink="marcelxv" className="h-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
