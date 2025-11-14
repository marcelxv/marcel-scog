import Link from 'next/link';
import { Suspense } from 'react';
import ClientLoadMore from './client-load-more';
import { getSubstackPosts } from '@/lib/substack';

// Server component: aggregates latest Studies and Blog
export async function KnowledgeSection() {
  const newsletter = await getSubstackPosts(12);

  const items = newsletter
    .map(n => ({
      type: 'substack' as const,
      title: n.title,
      slug: n.slug,
      url: n.url,
      excerpt: n.excerpt,
      date: n.date,
      reading: n.reading,
      badges: n.badges,
      translated: n.translated,
      sourceLang: n.sourceLang,
      isPT: (n as any).isPT as boolean,
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <section
      id="knowledge"
      className="py-20 sm:py-32 bg-neutral-50 dark:bg-neutral-900"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-neutral-800 dark:text-neutral-200">
              Latest Articles
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Deep dives into AI, automation, system architecture, and modern
              development practices.
            </p>
          </div>
        </div>

        <KnowledgeGrid
          initialItems={items.slice(0, 3)}
          remainingItems={items.slice(3)}
        />
      </div>
    </section>
  );
}
function KnowledgeGrid({
  initialItems,
  remainingItems,
}: {
  initialItems: any[];
  remainingItems: any[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {initialItems.map(item => (
        <article
          key={`${item.type}-${item.slug || item.url}`}
          className="group relative bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8 hover:shadow-2xl hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300"
        >
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
              Article
            </span>
            {item.isPT && (
              <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full text-xs font-medium">
                PT
              </span>
            )}
            {item.translated && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                Portuguese
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            <a
              href={(item as any).url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {item.title}
            </a>
          </h3>

          <p className="text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-3 leading-relaxed">
            {item.excerpt}
          </p>

          <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <time dateTime={item.date.toISOString()}>
              {item.date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
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
              {item.reading}
            </span>
          </div>
        </article>
      ))}

      {remainingItems.length > 0 && <LoadMore items={remainingItems} />}
    </div>
  );
}
function LoadMore({ items }: { items: any[] }) {
  return (
    <Suspense>
      <ClientLoadMore items={items} />
    </Suspense>
  );
}
