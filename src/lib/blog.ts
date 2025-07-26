import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { marked } from 'marked';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: Date;
  updatedAt: Date | undefined;
  categories: string[];
  tags: string[];
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
  featured: boolean;
  author: {
    name: string;
    avatar?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  image: string | undefined;
}

export interface BlogFrontmatter {
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  categories: string[];
  tags?: string[];
  featured?: boolean;
  author?: {
    name: string;
    avatar?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  image?: string;
}

const BLOG_CONTENT_PATH = path.join(process.cwd(), 'content/blog');

/**
 * Get all blog post slugs
 */
export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_CONTENT_PATH)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_CONTENT_PATH)
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .map(file => file.replace(/\.(md|mdx)$/, ''));
}

/**
 * Get blog post by slug
 */
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(BLOG_CONTENT_PATH, `${slug}.md`);
    const mdxPath = path.join(BLOG_CONTENT_PATH, `${slug}.mdx`);

    let filePath: string;
    if (fs.existsSync(fullPath)) {
      filePath = fullPath;
    } else if (fs.existsSync(mdxPath)) {
      filePath = mdxPath;
    } else {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as BlogFrontmatter;

    // Parse markdown to HTML
    const htmlContent = await marked(content);

    // Calculate reading time
    const readingTimeStats = readingTime(content);

    // Default author
    const defaultAuthor = {
      name: 'Marcel Scognamiglio',
      avatar: '/images/marcel-scog-alpha.jpeg',
    };

    const post: BlogPost = {
      slug,
      title: frontmatter.title,
      excerpt: frontmatter.excerpt,
      content: htmlContent,
      publishedAt: new Date(frontmatter.publishedAt),
      updatedAt: frontmatter.updatedAt
        ? new Date(frontmatter.updatedAt)
        : undefined,
      categories: frontmatter.categories || [],
      tags: frontmatter.tags || [],
      readingTime: readingTimeStats,
      featured: frontmatter.featured || false,
      author: frontmatter.author || defaultAuthor,
      seo: {
        title: frontmatter.seo?.title || frontmatter.title,
        description: frontmatter.seo?.description || frontmatter.excerpt,
        keywords: frontmatter.seo?.keywords || frontmatter.tags || [],
      },
      image: frontmatter.image,
    };

    return post;
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog posts
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = getBlogSlugs();
  const posts = await Promise.all(slugs.map(slug => getBlogPostBySlug(slug)));

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

/**
 * Get blog posts by category
 */
export async function getBlogPostsByCategory(
  category: string
): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post =>
    post.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
  );
}

/**
 * Get blog posts by tag
 */
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post =>
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get featured blog posts
 */
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post => post.featured);
}

/**
 * Get all unique categories
 */
export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllBlogPosts();
  const categories = new Set<string>();

  allPosts.forEach(post => {
    post.categories.forEach(category => categories.add(category));
  });

  return Array.from(categories).sort();
}

/**
 * Get all unique tags
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllBlogPosts();
  const tags = new Set<string>();

  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });

  return Array.from(tags).sort();
}

/**
 * Search blog posts by title, excerpt, or content
 */
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  const searchTerm = query.toLowerCase();

  return allPosts.filter(post => {
    return (
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.categories.some(cat => cat.toLowerCase().includes(searchTerm)) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  });
}

/**
 * Get related posts based on categories and tags
 */
export async function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3
): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  const otherPosts = allPosts.filter(post => post.slug !== currentPost.slug);

  // Score posts based on shared categories and tags
  const scoredPosts = otherPosts.map(post => {
    let score = 0;

    // Higher score for shared categories
    post.categories.forEach(category => {
      if (currentPost.categories.includes(category)) {
        score += 3;
      }
    });

    // Lower score for shared tags
    post.tags.forEach(tag => {
      if (currentPost.tags.includes(tag)) {
        score += 1;
      }
    });

    return { post, score };
  });

  // Sort by score and return top results
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}
