'use client';

import { Timeline } from './timeline';
import type { Experience } from '@/lib/types';

// Marcel's professional experience from resume.md (ordered from most recent to oldest)
const marcelExperiences: Experience[] = [
  {
    id: '1',
    company: 'FoodReady',
    position: 'System Architect | Automation & AI Engineer',
    startDate: new Date('2024-11-01'),
    // endDate is omitted for current position
    description:
      'Architected the evolution of the platform from cron-based scheduling to a fully event-driven infrastructure using AWS Lambda, EventBridge, PostgreSQL, and MongoDB. Introduced AI-powered automation agents for food safety and regulatory workflows using OpenAI API, Orkes/Conductor, and Novu, resulting in smarter and more autonomous operations.',
    technologies: [
      'AWS Lambda',
      'EventBridge',
      'PostgreSQL',
      'MongoDB',
      'JavaScript',
      'TypeScript',
      'OpenAI API',
      'Orkes/Conductor',
      'Novu',
    ],
    achievements: [
      'Streamlined backend orchestration with reusable JavaScript/TypeScript workflows, improving consistency and onboarding time across teams',
      'Led the migration from third-party authentication to a secure, custom-built identity layer with MFA and centralized access control',
      'Defined architecture principles, versioning strategies, and documentation standards for high-velocity engineering squads',
    ],
  },
  {
    id: '2',
    company: 'FoodReady',
    position: 'Senior Software Developer',
    startDate: new Date('2023-11-01'),
    endDate: new Date('2024-10-01'),
    description:
      'Developed fullstack features for food safety and compliance tools, with React, Node.js, and TypeScript. Contributed to data pipelines and backend services, focusing on code reliability, observability, and regulatory accuracy.',
    technologies: ['React', 'Node.js', 'TypeScript'],
    achievements: [
      'Partnered with product and design to iterate quickly on user flows, feedback loops, and internal dashboards',
      'Built scalable data processing systems handling regulatory compliance workflows',
      'Implemented comprehensive testing strategies ensuring 95%+ code coverage',
    ],
  },
  {
    id: '3',
    company: 'Synthetic Systems',
    position: 'DevLead (Consultant)',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-10-01'),
    description:
      'Technical lead for full-stack monorepo platform (Next.js, GraphQL, MongoDB). Led backend-to-frontend integration with focus on performance and user experience.',
    technologies: ['Next.js', 'GraphQL', 'MongoDB'],
    achievements: [
      'Facilitated agile ceremonies, technical planning, and architectural decisions',
      'Mentored developers and improved team delivery speed significantly',
      'Implemented performance optimizations resulting in 40% faster page load times',
    ],
  },
  {
    id: '4',
    company: 'Quero Educação',
    position: 'Software Developer',
    startDate: new Date('2022-05-01'),
    endDate: new Date('2023-11-01'),
    description:
      'Developed frontend features for educational marketplace (Vue, Nuxt.js, React, TypeScript). Delivered SEO improvements and Core Web Vitals optimization.',
    technologies: [
      'Vue',
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
      'Integrated frontend with backend services (Node.js, Ruby on Rails, PostgreSQL)',
      'Set up CI/CD pipelines with AWS, Docker, and Kubernetes',
      'Improved Core Web Vitals scores by 60% through optimization techniques',
    ],
  },
  {
    id: '5',
    company: 'Agência NÓS',
    position: 'Co-founder / Full Stack Developer',
    startDate: new Date('2019-03-01'),
    endDate: new Date('2023-09-01'),
    description:
      'Founded the agency to provide web and e-commerce solutions to local businesses. Built full stack apps using WordPress, WooCommerce, Shopify, Webflow.',
    technologies: ['WordPress', 'WooCommerce', 'Shopify', 'Webflow'],
    achievements: [
      'Led projects using Agile, from prototyping and UX to deployment and optimization',
      'Delivered 50+ successful projects for local businesses',
      'Built scalable e-commerce solutions serving thousands of customers',
    ],
  },
  {
    id: '6',
    company: 'Freelance',
    position: 'Freelance Software Developer',
    startDate: new Date('2016-07-01'),
    endDate: new Date('2022-10-01'),
    description:
      'Delivered full stack systems using React, Vue, Next.js, and backend with Node.js. Migrated monoliths to monorepo, implemented SSR, and optimized cloud deployments.',
    technologies: ['React', 'Vue', 'Next.js', 'Node.js', 'Figma'],
    achievements: [
      'Strong UX sensibility using Figma and design systems',
      'Successfully migrated legacy systems to modern architectures',
      'Maintained 98% client satisfaction rate across 100+ projects',
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
