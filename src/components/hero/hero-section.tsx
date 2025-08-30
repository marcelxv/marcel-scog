'use client';

import { IDCard } from './id-card';
import { VideoPresentation } from './video-presentation';
import type { IDCardData } from '@/lib/types';

const marcelIDCardData: IDCardData = {
  personal: {
    name: 'Marcel L.',
    title: 'Senior Software Engineer',
    location: 'São José dos Campos, SP, Brazil',
    status: 'open-to-opportunities',
    avatar: '/images/Marcel.jpeg',
    qrCode: 'https://marcel-scognamiglio.com/contact',
  },
  badges: [
    { name: 'Full Stack', level: 'expert', color: 'primary' },
    { name: 'AI & Automation', level: 'expert', color: 'secondary' },
  ],
  contact: {
    email: 'marcelx@protonmail.com',
    linkedin: 'https://linkedin.com/in/marcel-scognamiglio',
    github: 'https://github.com/marcel-scognamiglio',
    resume: '/resume.pdf',
  },
  stats: {
    experience: '8+',
    projects: 30,
    technologies: 26,
  },
};

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-accent-50 dark:bg-neutral-700 relative overflow-hidden"
    >
      {/* Background geometric patterns */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5 hidden sm:block">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary-300 dark:border-primary-600 rounded-2xl rotate-12 animate-pulse" />
        <div
          className="absolute top-40 right-20 w-24 h-24 border border-secondary-300 dark:border-secondary-600 rounded-full animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-32 left-20 w-40 h-40 border border-accent-400 dark:border-accent-600 rounded-3xl -rotate-6 animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-20 right-10 w-28 h-28 border border-text-300 dark:border-text-600 rounded-xl rotate-45 animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
      </div>

      <div className="container mx-auto px-6 py-16 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left order-2 lg:order-1 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-200 rounded-full text-sm font-semibold text-yellow-900 dark:text-yellow-900 shadow-sm border border-yellow-200 dark:border-yellow-300">
                <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full mr-2.5 animate-pulse" />
                Open to new opportunities
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-6xl font-extrabold text-text-900 dark:text-white leading-tight tracking-tight">
                Hello, I&lsquo;m{' '}
                <span className="text-primary-600 dark:text-primary-300">
                  Marcel
                </span>{' '}
                👋🏼
              </h1>

              <p className="text-xl md:text-2xl text-text-600 dark:text-text-300 max-w-2xl leading-relaxed font-light">
                Building scalable platforms and{' '}
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  AI-powered automation
                </span>{' '}
                that help teams deliver impactful digital products. Expert in
                full-stack development with{' '}
                <span className="font-semibold">8+ years</span> turning complex
                problems into elegant solutions.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 shadow-lg"
              >
                <svg
                  className="mr-2 w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </a>

              <a
                href="#portfolio"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-text-900 dark:text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 shadow-lg border border-neutral-200 dark:border-neutral-600"
              >
                <svg
                  className="mr-2 w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                View Portfolio
              </a>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left group">
                <div className="text-3xl font-extrabold text-primary-600 dark:text-primary-400 mb-1 transition-transform duration-300 group-hover:scale-110">
                  8+
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                  Years Experience
                </div>
              </div>
              <div className="text-center lg:text-left group">
                <div className="text-3xl font-extrabold text-secondary-600 dark:text-secondary-400 mb-1 transition-transform duration-300 group-hover:scale-110">
                  30+
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                  Projects Delivered
                </div>
              </div>
              <div className="text-center lg:text-left group">
                <div className="text-3xl font-extrabold text-accent-600 dark:text-accent-400 mb-1 transition-transform duration-300 group-hover:scale-110">
                  26+
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                  Technologies
                </div>
              </div>
            </div>
          </div>

          {/* Right side - ID Card & Video */}
          <div className="order-1 lg:order-2 flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
            <div className="relative group w-full">

              {/* ID Card */}
              <div className="relative transform transition-all duration-300 group-hover:scale-105 w-full">
                <IDCard data={marcelIDCardData} interactive={true} />
              </div>
            </div>

            {/* Video Button with flat styling */}
            <div className="w-full">
              <VideoPresentation
                videoId="cWhBmvPpjRg"
                title="Watch Presentation"
                variant="button"
                className="w-full justify-center py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-neutral-800 hover:bg-neutral-900 dark:bg-primary-600 dark:hover:bg-primary-700"
              />
            </div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block">
          <div className="flex flex-col items-center text-text-600 dark:text-text-300 group cursor-pointer">
            <span className="text-sm font-medium mb-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border-2 border-text-400 dark:border-text-500 rounded-full flex justify-center relative group-hover:border-primary-500 dark:group-hover:border-primary-400 transition-colors duration-300">
              <div className="w-1 h-3 bg-text-400 dark:bg-text-500 rounded-full mt-2 animate-bounce group-hover:bg-primary-500 dark:group-hover:bg-primary-400 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
