import readingTime from 'reading-time';
import { translateToEnglish } from './translate';

export interface SubstackPostSummary {
  id: number | string;
  title: string;
  slug: string;
  url: string;
  subtitle?: string;
  published_at?: string;
}

export interface SubstackPostCard {
  type: 'substack';
  id: string;
  title: string;
  slug: string;
  url: string;
  excerpt: string;
  date: Date;
  reading: string; // e.g. "6 min read"
  badges: string[]; // optional lightweight tags (we won't include "Newsletter" to avoid duplication)
  translated?: boolean; // if title/excerpt were translated
  sourceLang: string | undefined;
  isPT: boolean; // normalized flag for Portuguese source
}

const SUBSTACK_BASE = 'https://marcelscog.substack.com';

export async function getSubstackPosts(
  limit: number = 6
): Promise<SubstackPostCard[]> {
  try {
    const res = await fetch(`${SUBSTACK_BASE}/api/v1/archive?limit=${limit}`, {
      // Cache server-side for 1 hour
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return [];
    }
    const data: SubstackPostSummary[] = await res.json();

    const posts = (data || []).slice(0, limit);
    const translated = await Promise.all(
      posts.map(async p => {
        const rawTitle = p.title || '';
        const rawExcerpt = p.subtitle || '';

        const [trTitle, trExcerpt] = await Promise.all([
          translateToEnglish(rawTitle),
          translateToEnglish(rawExcerpt),
        ]);

        const title = trTitle.text || rawTitle;
        const excerpt = trExcerpt.text || rawExcerpt;
        const wasTranslated = Boolean(
          trTitle.translated || trExcerpt.translated
        );
        let sourceLang: string | undefined = undefined;
        if ('sourceLang' in trTitle && trTitle.sourceLang) {
          sourceLang = trTitle.sourceLang;
        }
        if (!sourceLang && 'sourceLang' in trExcerpt && trExcerpt.sourceLang) {
          sourceLang = trExcerpt.sourceLang;
        }
        const isPT = (sourceLang || '').toUpperCase().startsWith('PT');
        const rt = readingTime(excerpt || title);

        return {
          type: 'substack' as const,
          id: String(p.id),
          title,
          slug: p.slug,
          url: p.url || `${SUBSTACK_BASE}/p/${p.slug}`,
          excerpt,
          date: p.published_at ? new Date(p.published_at) : new Date(),
          reading: rt.text,
          badges: [],
          translated: wasTranslated,
          sourceLang,
          isPT,
        } as SubstackPostCard;
      })
    );

    return translated;
  } catch (err) {
    console.error('Failed to fetch Substack archive:', err);
    return [];
  }
}
