import React from 'react';

export function BookCallSection() {
  return (
    <section id="book-call" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 sm:text-5xl">
            Book a Call
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            Want to discuss a project, collaboration, or idea? Pick a time that
            works for you and let’s chat.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <a
              href="https://cal.com/marcelxv"
              data-cal-link="marcelxv"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 text-white font-bold text-base shadow-md hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
              aria-label="Open booking dialog to schedule a call"
            >
              Book a call
            </a>
          </div>

          {/* Accessibility hint for screen readers */}
          <p className="sr-only" aria-live="polite">
            The Book a call button opens a scheduling dialog powered by Cal.com.
          </p>
        </div>
      </div>
    </section>
  );
}
