import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllStudies, getAllStudyTopics } from '@/lib/studies';

export const metadata: Metadata = {
  title: 'Studies - Deep Dives & Comparative Analyses',
  description:
    'Technical studies on MCPs, orchestration tools, code assistants, and diagramming.',
  openGraph: {
    title: 'Studies',
    description: 'Deep dives, comparisons, and engineering notes.',
    type: 'website',
  },
};

export default async function StudiesIndexPage() {
  const studies = await getAllStudies();
  const topics = await getAllStudyTopics();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Studies
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Deep dives, comparisons, and structured notes to sharpen engineering
          decisions.
        </p>
      </header>

      {topics.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Topics</h2>
          <div className="flex flex-wrap gap-2">
            {topics.map(t => (
              <span
                key={t}
                className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {studies.map(s => (
            <article
              key={s.slug}
              className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                {s.topics.slice(0, 2).map(t => (
                  <span
                    key={t}
                    className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-sm"
                  >
                    {t}
                  </span>
                ))}
                {s.tags.includes('MCP') && (
                  <span className="ml-auto px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                    MCP
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold mb-2">
                <Link
                  href={`/studies/${s.slug}`}
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {s.title}
                </Link>
              </h3>

              <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                {s.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                <time dateTime={s.publishedAt.toISOString()}>
                  {s.publishedAt.toLocaleDateString()}
                </time>
                <span>{s.readingTime.text}</span>
              </div>
            </article>
          ))}
        </div>

        {studies.length === 0 && (
          <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
            No studies yet.
          </div>
        )}
      </section>
    </div>
  );
}
