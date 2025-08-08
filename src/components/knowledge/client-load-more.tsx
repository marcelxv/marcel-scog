'use client';

import { useState } from 'react';

export default function ClientLoadMore({ items }: { items: any[] }) {
  const [visible, setVisible] = useState(0);
  const batch = 3;
  const toShow = items.slice(0, visible);
  const hasMore = visible < items.length;

  return (
    <>
      {toShow.map(item => (
        <article
          key={`${item.type}-${item.slug || item.url}`}
          className="relative bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-lg transition-shadow"
        >
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary-400/40 to-transparent" />
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 rounded-full text-xs font-medium tracking-wide bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
              Newsletter
            </span>
            {(item as any).isPT && (
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full text-xs">
                PT
              </span>
            )}
            {(item as any).translated && (
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

      {hasMore && (
        <div className="col-span-full flex justify-center mt-2">
          <button
            onClick={() => setVisible(Math.min(visible + batch, items.length))}
            className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
