'use client';

import { Timeline } from './timeline';
import type { Experience } from '@/lib/types';

// Marcel's professional experience from resume.md (ordered from most recent to oldest)
const marcelExperiences: Experience[] = [
  {
    id: '6',
    company: 'Quero Educação',
    position: 'Full Stack Software Developer, Frontend heavy',
    startDate: new Date('2022-05-01'),
    endDate: new Date('2023-11-01'),
    description: 'Developed frontend features for educational marketplace (Vue, Nuxt.js, React, TypeScript). Delivered SEO improvements and Core Web Vitals optimization.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Ruby', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Nuxt.js', 'Ruby on Rails', 'AI'],
    achievements: ['Integrated frontend with backend services (Node.js, Ruby on Rails, PostgreSQL)',
      'Set up CI/CD pipelines with AWS, Docker, and Kubernetes',
      'Improved Core Web Vitals scores by 60% through optimization techniques'],
  },
  {
    id: '5',
    company: 'Synthetic Systems',
    position: 'Tech Lead (Consultant)',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-10-01'),
    description: 'Technical lead for full-stack monorepo platform (Next.js, GraphQL, MongoDB). Led backend-to-frontend integration with focus on performance and user experience.',
    technologies: ['Next.js', 'Go', 'MongoDB', 'GraphQL'],
    achievements: ['Facilitated agile ceremonies, technical planning, and architectural decisions',
      'Mentored developers and improved team delivery speed significantly',
      'Implemented performance optimizations resulting in 40% faster page load times'],
  },
  {
    id: '4',
    company: 'FoodReady',
    position: 'Senior Software Developer',
    startDate: new Date('2023-11-01'),
    endDate: new Date('2024-11-01'),
    description: 'Developed fullstack features for food safety and compliance tools, with React, Node.js, and TypeScript. Contributed to data pipelines and backend services, focusing on code reliability, observability, and regulatory accuracy.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Go'],
    achievements: ['Partnered with product and design to iterate quickly on user flows, feedback loops, and internal dashboards',
      'Built scalable data processing systems handling regulatory compliance workflows',
      'Implemented comprehensive testing strategies ensuring 95%+ code coverage'],
  },
  {
    id: '3',
    company: 'FoodReady',
    position: 'Lead Software Developer | Automation & AI Engineer',
    startDate: new Date('2024-11-01'),
    endDate: new Date('2025-07-01'),
    description: 'Architected the evolution of the platform from cron-based scheduling to a fully event-driven infrastructure using AWS Lambda, EventBridge, Supabase, PostgreSQL, and MongoDB. Introduced AI-powered automation agents for food safety and regulatory workflows using N8N, OpenAI (Claude, Perplexity) API, Orkes/Conductor, and Novu, resulting in smarter and more autonomous operations.',
    technologies: ['TypeScript', 'JavaScript', 'Java', 'Go', 'PostgreSQL', 'MongoDB', 'AWS', 'Orkes/Conductor', 'Novu', 'EventBridge', 'Lambda', 'AI', 'Automation', 'n8n', 'Supabase'],
    achievements: ['Streamlined backend orchestration with reusable JavaScript/TypeScript workflows, improving consistency and onboarding time across teams',
      'Led the migration from third-party authentication to a secure, custom-built identity layer with MFA and centralized access control',
      'Defined architecture principles, versioning strategies, and documentation standards for high-velocity engineering squads'],
  },
  {
    id: '2',
    company: 'Verios.ai',
    position: 'Founding Engineer',
    startDate: new Date('2025-07-01'),
    endDate: new Date('2025-10-01'),
    description: 'Led technical foundation and rapid development of an AI-powered legal research platform—a "Cursor for Legal Companies." Made critical architecture decisions and implemented full-stack infrastructure from ground zero using Claude Code and modern AI-assisted development workflows, achieving exceptional velocity without compromising code quality.',
    technologies: ['Next.js', 'PostgreSQL', 'AI'],
    achievements: ['Delivered production-ready MVP with multi-tenancy architecture in 3 months, enabling simultaneous onboarding of multiple law firms',
      'Designed scalable system architecture supporting AI-powered legal document analysis and competitive intelligence features',
      'Established engineering practices, tech stack decisions (Next.js, PostgreSQL, AI APIs), and development workflows for future team growth'],
  },
  {
    id: '1',
    company: 'Clipboard Health',
    position: 'AI Software Engineer',
    startDate: new Date('2025-10-01'),
    // endDate is omitted for current position
    description: 'Engineering intelligent document processing systems that combine LLM capabilities with deterministic tooling to automate healthcare workforce operations. Building production-grade AI pipelines that handle complex document analysis, data extraction, and validation workflows at scale.',
    technologies: ['AI'],
    achievements: ['Architected hybrid AI systems combining GPT-4/Claude with rule-based validation for 99%+ accuracy in document processing',
      'Developed automated workflows reducing manual document review time by 70%',
      'Implemented robust error handling and fallback mechanisms for mission-critical healthcare data processing'],
  }
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
