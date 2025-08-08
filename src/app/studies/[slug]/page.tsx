import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getStudyBySlug, getStudySlugs } from '@/lib/studies';
import { StudyTemplate } from '@/components/studies/study-template';

interface StudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getStudySlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: StudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getStudyBySlug(slug);
  if (!study) return { title: 'Study Not Found' };

  return {
    title: study.seo.title,
    description: study.seo.description,
    keywords: study.seo.keywords,
    alternates: study.canonical ? { canonical: study.canonical } : undefined,
    authors: [{ name: study.author.name }],
    openGraph: {
      title: study.seo.title,
      description: study.seo.description,
      type: 'article',
      publishedTime: study.publishedAt.toISOString(),
      modifiedTime: study.updatedAt?.toISOString(),
      authors: [study.author.name],
      tags: [...study.topics, ...study.tags],
      images: study.image
        ? [{ url: study.image, width: 1200, height: 630, alt: study.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: study.seo.title,
      description: study.seo.description,
      images: study.image ? [study.image] : undefined,
    },
  };
}

export default async function StudyPage({ params }: StudyPageProps) {
  const { slug } = await params;
  const study = await getStudyBySlug(slug);
  if (!study) notFound();

  return (
    <StudyTemplate study={study!}>
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: study!.content }}
      />
    </StudyTemplate>
  );
}
