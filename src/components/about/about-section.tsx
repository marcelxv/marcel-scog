'use client';

import { Timeline } from './timeline';
import type { Experience } from '@/lib/types';

// Marcel's professional experience from resume.md (ordered from most recent to oldest)
const marcelExperiences: Experience[] = [
  {
    id: '6',
    company: 'Quero Educação',
    position: 'Full Stack Software Developer, Frontend heavy',
    startDate: new Date(),
    summary: '📚 Boosted Core Web Vitals by 60%—Google finally smiled at us',
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Ruby',
      'PostgreSQL',
      'AWS',
      'Docker',
      'Kubernetes',
      'Nuxt.js',
      'Ruby on Rails',
      'AI',
    ],
    achievements: [
      'Integrated frontend with backend services (Node.js, Ruby on Rails, PostgreSQL)',
      'Set up CI/CD pipelines with AWS, Docker, and Kubernetes',
      'Improved Core Web Vitals scores by 60% through optimization techniques',
    ],
  },
  {
    id: '5',
    company: 'Synthetic Systems',
    position: 'Tech Lead (Consultant)',
    startDate: new Date(),
    summary:
      '⚡ Led the squad, mentored devs, made pages load 40% faster (they noticed)',
    technologies: ['Next.js', 'Go', 'MongoDB', 'GraphQL'],
    achievements: [
      'Facilitated agile ceremonies, technical planning, and architectural decisions',
      'Mentored developers and improved team delivery speed significantly',
      'Implemented performance optimizations resulting in 40% faster page load times',
    ],
  },
  {
    id: '4',
    company: 'FoodReady',
    position: 'Senior Software Developer',
    startDate: new Date(),
    summary:
      '🍔 Made food safety compliance less painful with 95%+ test coverage',
    technologies: ['React', 'TypeScript', 'Node.js', 'Go'],
    achievements: [
      'Partnered with product and design to iterate quickly on user flows, feedback loops, and internal dashboards',
      'Built scalable data processing systems handling regulatory compliance workflows',
      'Implemented comprehensive testing strategies ensuring 95%+ code coverage',
    ],
  },
  {
    id: '3',
    company: 'FoodReady',
    position: 'Lead Software Developer | Automation & AI Engineer',
    startDate: new Date(),
    summary:
      '🚀 Turned cron jobs into event-driven magic with AWS Lambda & AI agents',
    technologies: [
      'TypeScript',
      'JavaScript',
      'Java',
      'Go',
      'PostgreSQL',
      'MongoDB',
      'AWS',
      'Orkes/Conductor',
      'Novu',
      'EventBridge',
      'Lambda',
      'AI',
      'Automation',
      'n8n',
      'Supabase',
    ],
    achievements: [
      'Streamlined backend orchestration with reusable JavaScript/TypeScript workflows, improving consistency and onboarding time across teams',
      'Led the migration from third-party authentication to a secure, custom-built identity layer with MFA and centralized access control',
      'Defined architecture principles, versioning strategies, and documentation standards for high-velocity engineering squads',
    ],
  },
  {
    id: '2',
    company: 'Verios.ai',
    position: 'Founding Engineer',
    startDate: new Date(),
    summary:
      '⚖️ Built "Cursor for lawyers" from scratch—shipped MVP in 3 months flat',
    technologies: ['Next.js', 'PostgreSQL', 'AI'],
    achievements: [
      'Delivered production-ready MVP with multi-tenancy architecture in 3 months, enabling simultaneous onboarding of multiple law firms',
      'Designed scalable system architecture supporting AI-powered legal document analysis and competitive intelligence features',
      'Established engineering practices, tech stack decisions (Next.js, PostgreSQL, AI APIs), and development workflows for future team growth',
    ],
  },
  {
    id: '1',
    company: 'Clipboard Health',
    position: 'AI Software Engineer',
    startDate: new Date(),
    summary:
      '🤖 Teaching robots to read doctor handwriting (99% success rate, surprisingly)',
    technologies: ['TypeScript', 'PostgreSQL', 'AWS', 'EventBridge', 'AI'],
    achievements: [
      'Architected hybrid AI systems combining GPT-4/Claude with rule-based validation engines, achieving 99%+ accuracy in medical document processing and classification',
      'Developed automated document analysis workflows with confidence scoring and fallback mechanisms, reducing manual review time by 70% while maintaining HIPAA compliance',
      'Implemented layered architecture with strict type safety, dependency injection patterns, and 100% test coverage for mission-critical healthcare data processing',
      'Built scalable microservices handling high-volume document ingestion with async job processing, distributed tracing, and comprehensive error handling',
    ],
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-secondary-100 dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <Timeline experiences={marcelExperiences} />
      </div>
    </section>
  );
}
