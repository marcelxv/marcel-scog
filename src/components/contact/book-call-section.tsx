import React from 'react';

export function BookCallSection() {
  return (
    <section
      id="book-call"
      className="relative py-20 sm:py-32 overflow-hidden bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 dark:from-primary-950 dark:via-accent-900 dark:to-secondary-950"
    >
      {/* Background Pattern Layer 1 - Large geometric shapes */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-200/40 to-primary-300/40 dark:from-primary-800/30 dark:to-primary-700/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-bl from-secondary-200/40 to-secondary-300/40 dark:from-secondary-800/30 dark:to-secondary-700/30 rounded-full blur-3xl transform translate-x-1/2" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-accent-200/40 to-accent-300/40 dark:from-accent-800/30 dark:to-accent-700/30 rounded-full blur-3xl transform translate-y-1/2" />
      </div>

      {/* Background Pattern Layer 2 - Geometric grid */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary-300 dark:text-primary-700"
              />
            </pattern>
            <pattern
              id="dots"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="2"
                cy="2"
                r="1"
                fill="currentColor"
                className="text-primary-400 dark:text-primary-600"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Background Pattern Layer 3 - Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-20 w-4 h-4 bg-primary-400/30 dark:bg-primary-500/20 rounded-full animate-bounce"
          style={{ animationDelay: '0s', animationDuration: '3s' }}
        />
        <div
          className="absolute top-40 right-32 w-3 h-3 bg-secondary-400/30 dark:bg-secondary-500/20 rounded-full animate-bounce"
          style={{ animationDelay: '1s', animationDuration: '4s' }}
        />
        <div
          className="absolute bottom-32 left-40 w-2 h-2 bg-accent-400/30 dark:bg-accent-500/20 rounded-full animate-bounce"
          style={{ animationDelay: '2s', animationDuration: '5s' }}
        />
        <div className="absolute top-1/2 right-20 w-6 h-6 border-2 border-primary-300/30 dark:border-primary-600/20 rounded-full animate-pulse" />
        <div
          className="absolute bottom-20 right-1/3 w-8 h-8 border border-secondary-300/30 dark:border-secondary-600/20 rounded-lg rotate-45 animate-pulse"
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main content card with depth */}
          <div className="relative bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-neutral-800/50 shadow-2xl p-8 sm:p-12">
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5 dark:from-primary-400/10 dark:to-accent-400/10 rounded-3xl" />

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 dark:from-primary-400 dark:via-primary-300 dark:to-primary-200 bg-clip-text text-transparent mb-6">
                Quick question?
              </h3>
              <p className="text-lg sm:text-xl leading-relaxed text-text-600 dark:text-text-300 max-w-2xl mx-auto mb-10">
                Schedule a call with me to discuss your project, collaboration,
                or idea.
              </p>

              <div className="flex items-center justify-center">
                <a
                  href="https://cal.com/marcelxv"
                  data-cal-link="marcelxv"
                  target="_blank"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 overflow-hidden"
                  aria-label="Open booking dialog to schedule a call"
                >
                  {/* Button background glow */}
                  <div className="absolute inset-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Button content */}
                  <span className="relative flex items-center gap-2">
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Book a Call
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
                  </span>
                </a>
              </div>

              {/* Additional features */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="group">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-800 dark:to-primary-700 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-primary-600 dark:text-primary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-text-700 dark:text-text-300">
                    30-min slots
                  </p>
                </div>
                <div className="group">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-800 dark:to-secondary-700 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-secondary-600 dark:text-secondary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-text-700 dark:text-text-300">
                    Video call
                  </p>
                </div>
                <div className="group">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-800 dark:to-accent-700 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-accent-600 dark:text-accent-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-text-700 dark:text-text-300">
                    Free consultation
                  </p>
                </div>
              </div>
            </div>
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
