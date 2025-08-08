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
    <section id="knowledge" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200">
              Knowledge
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Deep dives, comparisons, and articles.
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
          className="relative bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-lg transition-shadow"
        >
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary-400/40 to-transparent" />

          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 rounded-full text-xs font-medium tracking-wide bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
              Newsletter
            </span>
            {item.isPT && (
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full text-xs">
                PT
              </span>
            )}
            {item.translated && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                Portuguese
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
            <a
              href={(item as any).url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 dark:hover:text-primary-400"
            >
              {item.title}
            </a>
          </h3>

          <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
            {item.excerpt}
          </p>

          <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
            <time dateTime={item.date.toISOString()}>
              {item.date.toLocaleDateString()}
            </time>
            <span>{item.reading}</span>
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
