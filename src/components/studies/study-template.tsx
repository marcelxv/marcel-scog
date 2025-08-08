'use client';

import Image from 'next/image';
import type { Study } from '@/lib/studies';

interface StudyTemplateProps {
  study: Study;
  children: React.ReactNode;
}

export function StudyTemplate({ study, children }: StudyTemplateProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          {study.topics.map(topic => (
            <span
              key={topic}
              className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
            >
              {topic}
            </span>
          ))}
          {study.level && (
            <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm">
              {study.level}
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          {study.title}
        </h1>

        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
          {study.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
          <span>By {study.author.name}</span>
          <time dateTime={study.publishedAt.toISOString()}>
            {study.publishedAt.toLocaleDateString()}
          </time>
          <span>{study.readingTime.text}</span>
          {study.updatedAt && (
            <span>Updated {study.updatedAt.toLocaleDateString()}</span>
          )}
        </div>

        {study.image && (
          <div className="mt-6">
            <Image
              src={study.image}
              alt={study.title}
              width={800}
              height={400}
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700"
              priority
            />
          </div>
        )}
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {children}
      </div>

      {(study.outcomes?.length || study.resources?.length) && (
        <footer className="mt-12 grid gap-8 md:grid-cols-2">
          {study.outcomes?.length ? (
            <section>
              <h2 className="text-2xl font-semibold mb-3">Key Outcomes</h2>
              <ul className="list-disc list-inside space-y-2">
                {study.outcomes.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {study.resources?.length ? (
            <section>
              <h2 className="text-2xl font-semibold mb-3">Resources</h2>
              <ul className="space-y-2">
                {study.resources.map((r, i) => (
                  <li key={i}>
                    <a
                      className="underline text-primary-600 dark:text-primary-400"
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {r.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </footer>
      )}
    </article>
  );
}

export default StudyTemplate;
