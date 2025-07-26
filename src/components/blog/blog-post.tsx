'use client';

import { BlogPost } from '@/lib/blog';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface BlogPostProps {
  post: BlogPost;
  children: React.ReactNode;
}

export function BlogPostTemplate({ post, children }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <Link
            href="/blog"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            ← Back to Blog
          </Link>
        </nav>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map(category => (
            <Link
              key={category}
              href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400 mb-6">
          <div className="flex items-center gap-2">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span>By {post.author.name}</span>
          </div>

          <time dateTime={post.publishedAt.toISOString()}>
            {formatDistanceToNow(post.publishedAt, { addSuffix: true })}
          </time>

          <span>{post.readingTime.text}</span>

          {post.updatedAt && (
            <span>
              Updated {formatDistanceToNow(post.updatedAt, { addSuffix: true })}
            </span>
          )}
        </div>

        {/* Featured image */}
        {post.image && (
          <div className="mb-8">
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={400}
              className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700"
              priority
            />
          </div>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {children}
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                {post.author.name}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Senior Software Engineer
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Published {post.publishedAt.toLocaleDateString()}
            </p>
            {post.updatedAt && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Updated {post.updatedAt.toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </footer>
    </article>
  );
}

export default BlogPostTemplate;
