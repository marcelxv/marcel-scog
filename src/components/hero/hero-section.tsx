'use client';

import { IDCard } from './id-card';
import type { IDCardData } from '@/lib/types';

const marcelIDCardData: IDCardData = {
  personal: {
    name: 'Marcel S.',
    title: 'Senior Software Engineer',
    location: 'São José dos Campos, SP, Brazil',
    status: 'open-to-opportunities',
    avatar: '/images/marcel-headshot.png',
    qrCode: 'https://marcel-scognamiglio.com/contact',
  },
  badges: [
    {
      name: 'Full Stack JavaScript Developer',
      level: 'expert',
      color: '#8aa488',
    },
    { name: 'AI & Automation', level: 'expert', color: '#8aa488' },
    { name: 'System Architecture', level: 'expert', color: '#40617f' },
    { name: 'DevOps', level: 'advanced', color: '#40617f' },
  ],
  contact: {
    email: 'marcelx@protonmail.com',
    linkedin: 'https://linkedin.com/in/marcel-scognamiglio',
    github: 'https://github.com/marcel-scognamiglio',
    resume: '/resume.pdf',
  },
  stats: {
    experience: '5+',
    projects: 30,
    technologies: 20,
  },
};

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-accent-50 dark:bg-neutral-900 relative overflow-hidden"
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

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-200 rounded-full text-sm font-semibold text-yellow-900 dark:text-yellow-900 mb-4">
                <div className="w-2 h-2 bg-yellow-600 rounded-full mr-2 animate-pulse" />
                Open to new opportunities
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-text-900 dark:text-white mb-4 leading-tight">
                Hello, I&lsquo;m Marcel 👋🏼
              </h1>

              <p className="text-xl text-text-800 dark:text-text-50 mb-8 max-w-2xl">
                System Architect and Software Engineer with 5+ years of
                experience helping companies deliver impactful digital products
                through automation, AI, and scalable architecture. I build
                systems to make people&lsquo;s lives easier.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-neutral-100 hover:bg-neutral-200 text-text-900 font-semibold rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-700 dark:hover:bg-primary-800 dark:text-white dark:focus:ring-offset-neutral-900"
              >
                Download Resume
                <svg
                  className="ml-2 w-5 h-5"
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
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center justify-center px-8 py-4 bg-neutral-200 dark:bg-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-400 text-text-900 dark:text-text-900 font-semibold rounded-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:focus:ring-offset-accent-500"
              >
                View Portfolio
              </a>
            </div>

            {/* Key Technologies */}
            <div className="mb-8">
              <div className="text-xs font-bold uppercase text-neutral-800 dark:text-neutral-100 mb-2 tracking-wider">
                CORE TECHNOLOGIES
              </div>
              <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
                <span className="px-3 py-1 bg-secondary-300 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 rounded-full text-sm font-semibold shadow-sm border border-secondary-400 dark:border-secondary-600">
                  JavaScript/TypeScript
                </span>
                <span className="px-3 py-1 bg-primary-300 dark:bg-primary-700 text-primary-900 dark:text-primary-100 rounded-full text-sm font-semibold shadow-sm border border-primary-400 dark:border-primary-600">
                  React/Next.js/Vue
                </span>
                <span className="px-3 py-1 bg-accent-200 dark:bg-accent-700 text-accent-900 dark:text-accent-100 rounded-full text-sm font-semibold shadow-sm border border-accent-400 dark:border-accent-600">
                  AI & Automation
                </span>
                <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-full text-sm font-semibold shadow-sm border border-neutral-300 dark:border-neutral-700">
                  AWS/PostgreSQL
                </span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-extrabold text-primary-700 dark:text-primary-200">
                  5+
                </div>
                <div className="text-sm text-neutral-800 dark:text-neutral-100 font-semibold">
                  Years Experience
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-extrabold text-secondary-700 dark:text-secondary-200">
                  30+
                </div>
                <div className="text-sm text-neutral-800 dark:text-neutral-100 font-semibold">
                  Projects Delivered
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-extrabold text-neutral-700 dark:text-neutral-100">
                  20+
                </div>
                <div className="text-sm text-neutral-800 dark:text-neutral-100 font-semibold">
                  Technologies
                </div>
              </div>
            </div>
          </div>

          {/* Right side - ID Card */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Glow effect behind card */}
              <div className="absolute inset-0 bg-primary-500/20 dark:bg-primary-400/10 rounded-3xl blur-2xl scale-110" />

              {/* ID Card */}
              <div className="relative">
                <IDCard data={marcelIDCardData} interactive={true} />
              </div>

              {/* Floating elements around card */}
              {/* <div className="absolute -top-4 -left-4 w-8 h-8 bg-secondary-500 rounded-lg opacity-80 animate-float hidden sm:block" />
              <div className="absolute -top-2 -right-6 w-6 h-6 bg-primary-500 rounded-full opacity-60 animate-float-delayed hidden sm:block" />
              <div className="absolute -bottom-6 -left-2 w-10 h-10 bg-accent-600 rounded-xl opacity-70 animate-float hidden sm:block" />
              <div className="absolute -bottom-4 -right-4 w-7 h-7 bg-text-400 rounded-lg opacity-50 animate-float-delayed hidden sm:block" /> */}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="flex flex-col items-center text-text-800 dark:text-white">
            <span className="text-sm font-semibold mb-2 dark:text-white">
              Scroll to explore
            </span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
