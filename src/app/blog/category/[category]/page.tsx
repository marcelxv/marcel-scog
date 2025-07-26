import { notFound } from 'next/navigation';
import { getBlogPostsByCategory, getAllCategories } from '@/lib/blog';
import Link from 'next/link';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map(category => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category.replace(/-/g, ' ');
  const posts = await getBlogPostsByCategory(categoryName);

  if (posts.length === 0) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${categoryName} - Blog Category`,
    description: `Browse all blog posts in the ${categoryName} category. ${posts.length} articles available.`,
    openGraph: {
      title: `${categoryName} - Blog Category`,
      description: `Browse all blog posts in the ${categoryName} category.`,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryName = category.replace(/-/g, ' ');
  const posts = await getBlogPostsByCategory(categoryName);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <nav className="mb-4">
          <Link
            href="/blog"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            ← Back to Blog
          </Link>
        </nav>

        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          {categoryName}
        </h1>

        <p className="text-neutral-600 dark:text-neutral-400">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this
          category
        </p>
      </header>

      {/* Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map(post => (
          <article
            key={post.slug}
            className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.map(category => (
                <span
                  key={category}
                  className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-sm"
                >
                  {category}
                </span>
              ))}
            </div>

            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {post.title}
              </Link>
            </h2>

            <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
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
    </div>
  );
}
