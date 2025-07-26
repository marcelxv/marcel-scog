import { notFound } from 'next/navigation';
import { CaseStudyPage } from '@/components/case-study/case-study-page';
import { mockProjects } from '@/lib/mock-data';
import { mockCaseStudies } from '@/lib/case-study-data';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = mockProjects.find(p => p.caseStudySlug === slug);
  const caseStudy = mockCaseStudies.find(cs => cs.slug === slug);

  if (!project || !caseStudy) {
    notFound();
  }

  return <CaseStudyPage project={project} caseStudy={caseStudy} />;
}

export async function generateStaticParams() {
  return mockProjects
    .filter(project => project.caseStudySlug)
    .map(project => ({
      slug: project.caseStudySlug!,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = mockProjects.find(p => p.caseStudySlug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Case Study | Marcel Scognamiglio`,
    description: project.description,
  };
}
