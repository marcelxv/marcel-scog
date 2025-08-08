import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { marked } from 'marked';

export interface Study {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: Date;
  updatedAt: Date | undefined;
  topics: string[];
  tools: string[];
  tags: string[];
  level: string | undefined;
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
  outcomes: string[] | undefined;
  resources: { title: string; url: string }[] | undefined;
  canonical: string | undefined;
}

export interface StudyFrontmatter {
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  topics?: string[];
  tools?: string[];
  tags?: string[];
  level?: string;
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
  outcomes?: string[];
  resources?: { title: string; url: string }[];
  canonical?: string;
}

const STUDIES_CONTENT_PATH = path.join(process.cwd(), 'content/studies');

export function getStudySlugs(): string[] {
  if (!fs.existsSync(STUDIES_CONTENT_PATH)) return [];
  return fs
    .readdirSync(STUDIES_CONTENT_PATH)
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .map(f => f.replace(/\.(md|mdx)$/, ''));
}

export async function getStudyBySlug(slug: string): Promise<Study | null> {
  try {
    const md = path.join(STUDIES_CONTENT_PATH, `${slug}.md`);
    const mdx = path.join(STUDIES_CONTENT_PATH, `${slug}.mdx`);
    const filePath = fs.existsSync(md) ? md : fs.existsSync(mdx) ? mdx : null;
    if (!filePath) return null;

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const fm = data as StudyFrontmatter;

    const htmlContent = await marked(content);
    const rt = readingTime(content);

    const defaultAuthor = {
      name: 'Marcel Scognamiglio',
      avatar: '/images/marcel-scog-alpha.jpeg',
    };

    const study: Study = {
      slug,
      title: fm.title,
      excerpt: fm.excerpt,
      content: htmlContent,
      publishedAt: new Date(fm.publishedAt),
      updatedAt: fm.updatedAt ? new Date(fm.updatedAt) : undefined,
      topics: fm.topics || [],
      tools: fm.tools || [],
      tags: fm.tags || [],
      level: fm.level,
      readingTime: rt,
      featured: fm.featured || false,
      author: fm.author || defaultAuthor,
      seo: {
        title: fm.seo?.title || fm.title,
        description: fm.seo?.description || fm.excerpt,
        keywords: fm.seo?.keywords || fm.tags || [],
      },
      image: fm.image,
      outcomes: fm.outcomes,
      resources: fm.resources,
      canonical: fm.canonical,
    };

    return study;
  } catch (error) {
    console.error(`Error reading study ${slug}:`, error);
    return null;
  }
}

export async function getAllStudies(): Promise<Study[]> {
  const slugs = getStudySlugs();
  const studies = await Promise.all(slugs.map(slug => getStudyBySlug(slug)));
  return studies
    .filter((s): s is Study => s !== null)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

export async function getAllStudyTopics(): Promise<string[]> {
  const all = await getAllStudies();
  const topics = new Set<string>();
  all.forEach(s => s.topics.forEach(t => topics.add(t)));
  return Array.from(topics).sort();
}

export async function getStudiesByTopic(topic: string): Promise<Study[]> {
  const all = await getAllStudies();
  return all.filter(s =>
    s.topics.some(t => t.toLowerCase() === topic.toLowerCase())
  );
}

export async function getRelatedStudies(
  current: Study,
  limit: number = 3
): Promise<Study[]> {
  const all = await getAllStudies();
  const others = all.filter(s => s.slug !== current.slug);

  const scored = others.map(s => {
    let score = 0;
    s.topics.forEach(t => {
      if (current.topics.includes(t)) score += 3;
    });
    s.tools.forEach(tool => {
      if (current.tools.includes(tool)) score += 2;
    });
    s.tags.forEach(tag => {
      if (current.tags.includes(tag)) score += 1;
    });
    return { s, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.s);
}
