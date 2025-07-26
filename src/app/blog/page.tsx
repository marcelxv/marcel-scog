import { getAllBlogPosts, getAllCategories } from '@/lib/blog';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Marcel Scognamiglio',
  description:
    'Technical articles and insights on web development, AI, and software engineering.',
  openGraph: {
    title: 'Blog - Marcel Scognamiglio',
    description:
      'Technical articles and insights on web development, AI, and software engineering.',
    type: 'website',
  },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const categories = await getAllCategories();
  const featuredPosts = posts.filter(post => post.featured);
  const recentPosts = posts.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Blog
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Technical articles and insights on web development, AI, and software
          engineering.
        </p>
      </header>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
            Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <Link
                key={category}
                href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
            Featured Articles
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {featuredPosts.map(post => (
              <article
                key={post.slug}
                className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded text-sm font-medium">
                    Featured
                  </span>
                  {post.categories.slice(0, 2).map(category => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                  <time dateTime={post.publishedAt.toISOString()}>
                    {post.publishedAt.toLocaleDateString()}
                  </time>
                  <span>{post.readingTime.text}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
          Recent Articles
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map(post => (
            <article
              key={post.slug}
              className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.categories.slice(0, 2).map(category => (
                  <span
                    key={category}
                    className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>

              <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                <time dateTime={post.publishedAt.toISOString()}>
                  {post.publishedAt.toLocaleDateString()}
                </time>
                <span>{post.readingTime.text}</span>
              </div>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 text-neutral-500 dark:text-neutral-500 text-xs">
                      +{post.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500 dark:text-neutral-400">
              No blog posts available yet. Check back soon!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
