'use client';

import { Timeline } from './timeline';
import type { Experience } from '@/lib/types';

// Marcel's professional experience from resume.md (ordered from most recent to oldest)
const marcelExperiences: Experience[] = [
  {
    id: '4',
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
    id: '3',
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
    id: '2',
    company: 'FoodReady',
    position: 'Senior Software Developer',
    startDate: new Date('2023-11-01'),
    endDate: new Date('2024-10-01'),
    description: 'Developed fullstack features for food safety and compliance tools, with React, Node.js, and TypeScript. Contributed to data pipelines and backend services, focusing on code reliability, observability, and regulatory accuracy.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Go'],
    achievements: ['Partnered with product and design to iterate quickly on user flows, feedback loops, and internal dashboards',
      'Built scalable data processing systems handling regulatory compliance workflows',
      'Implemented comprehensive testing strategies ensuring 95%+ code coverage'],
  },
  {
    id: '1',
    company: 'FoodReady',
    position: 'Lead Software Developer | Automation & AI Engineer',
    startDate: new Date('2024-11-01'),
    // endDate is omitted for current position
    description: 'Architected the evolution of the platform from cron-based scheduling to a fully event-driven infrastructure using AWS Lambda, EventBridge, Supabase, PostgreSQL, and MongoDB. Introduced AI-powered automation agents for food safety and regulatory workflows using N8N, OpenAI (Claude, Perplexity) API, Orkes/Conductor, and Novu, resulting in smarter and more autonomous operations.',
    technologies: ['TypeScript', 'JavaScript', 'Java', 'Go', 'PostgreSQL', 'MongoDB', 'AWS', 'Orkes/Conductor', 'Novu', 'EventBridge', 'Lambda', 'AI', 'Automation', 'n8n', 'Supabase'],
    achievements: ['Streamlined backend orchestration with reusable JavaScript/TypeScript workflows, improving consistency and onboarding time across teams',
      'Led the migration from third-party authentication to a secure, custom-built identity layer with MFA and centralized access control',
      'Defined architecture principles, versioning strategies, and documentation standards for high-velocity engineering squads'],
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
