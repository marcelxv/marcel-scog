'use client';

import { Timeline } from './timeline';
import type { Experience } from '@/lib/types';

// Marcel's actual professional experience from CV
const marcelExperiences: Experience[] = [
  {
    id: '1',
    company: 'FoodReady',
    position: 'Senior Software Developer / Automation & AI Engineer',
    startDate: new Date('202-11-01'),
    // endDate is omitted for current position
    description:
      'Built AI-powered automation agents for regulatory compliance in food safety SaaS. Led workflow orchestration using Orkes/Conductor and real-time notifications with Novu. Migrated from cron-based systems to event-driven architecture using AWS Lambda, EventBridge, and PostgreSQL.',
    technologies: [
      'Node.js',
      'TypeScript',
      'Orkes/Conductor',
      'Novu',
      'AWS Lambda',
      'EventBridge',
      'PostgreSQL',
      'MongoDB',
      'AI Automation',
    ],
    achievements: [
      'Built AI-powered automation agents for regulatory compliance in food safety SaaS',
      'Led workflow orchestration using Orkes/Conductor and real-time notifications with Novu',
      'Migrated from cron-based systems to event-driven architecture using AWS Lambda, EventBridge, and PostgreSQL',
      'Led database migration from MongoDB to PostgreSQL, improving performance and consistency across large-scale data',
      'Replaced third-party auth service with a secure, proprietary solution, integrated across applications',
      'Collaborated closely with product, engineering, and compliance teams to deliver scalable, regulatory-aligned solutions',
    ],
  },
  {
    id: '2',
    company: 'Synthetic Systems',
    position: 'DevLead (Consultant)',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-10-31'),
    description:
      'Technical lead for full-stack monorepo platform (Next.js, GraphQL, MongoDB). Led backend-to-frontend integration with focus on performance and user experience. Facilitated agile ceremonies, technical planning, and architectural decisions.',
    technologies: [
      'Next.js',
      'GraphQL',
      'MongoDB',
      'TypeScript',
      'React',
      'Node.js',
    ],
    achievements: [
      'Technical lead for full-stack monorepo platform (Next.js, GraphQL, MongoDB)',
      'Led backend-to-frontend integration with focus on performance and user experience',
      'Facilitated agile ceremonies, technical planning, and architectural decisions',
      'Mentored developers and improved team delivery speed significantly',
    ],
  },
  {
    id: '3',
    company: 'Quero Educação',
    position: 'Software Developer',
    startDate: new Date('2022-05-01'),
    endDate: new Date('2023-11-30'),
    description:
      'Developed frontend features for educational marketplace (Vue.js, Nuxt.js, React, TypeScript). Delivered SEO improvements and Core Web Vitals optimization. Integrated frontend with backend services (Node.js, Ruby on Rails, PostgreSQL).',
    technologies: [
      'Vue.js',
      'Nuxt.js',
      'React',
      'TypeScript',
      'Node.js',
      'Ruby on Rails',
      'PostgreSQL',
      'AWS',
      'Docker',
      'Kubernetes',
    ],
    achievements: [
      'Developed frontend features for educational marketplace (Vue, Nuxt.js, React, TypeScript)',
      'Delivered SEO improvements and Core Web Vitals optimization',
      'Integrated frontend with backend services (Node.js, Ruby on Rails, PostgreSQL)',
      'Set up CI/CD pipelines with AWS, Docker, and Kubernetes',
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
