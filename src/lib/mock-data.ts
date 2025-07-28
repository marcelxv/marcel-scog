import type { Project } from './types';

// Helper function to generate placeholder images
const getPlaceholderImage = (
  width: number = 800,
  height: number = 600,
  seed: string
) => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Mingau Publishing Platform',
    description:
      'An MCP-first publishing platform for writers, journalists, and creators to publish newsletters and other content directly to subscribers through LLM interfaces. Built as a monorepo with modern web technologies.',
    technologies: [
      'Next.js',
      'TypeScript',
      'MCP',
      'React',
      'Node.js',
      'Tailwind CSS',
      'Monorepo',
    ],
    imageUrl: getPlaceholderImage(800, 600, 'mingau'),
    caseStudySlug: 'mingau-publishing-platform',
    featured: true,
    year: 2024,
  },
  {
    id: '2',
    title: 'Automenu Monorepo',
    description:
      'A groundbreaking platform monorepo housing three core apps that power an innovative tech ecosystem. Features a central hub of innovation, collaboration, and creation with real clients in Brazil.',
    technologies: [
      'Next.js',
      'Strapi',
      'TypeScript',
      'React',
      'Node.js',
      'pnpm',
      'Monorepo',
      'API Integration',
    ],
    imageUrl: getPlaceholderImage(800, 600, 'automenu'),
    caseStudySlug: 'automenu-monorepo',
    demoUrl: 'https://www.benditosejapaes.com.br',
    featured: true,
    year: 2024,
  },
  {
    id: '3',
    title: 'iProtein Macro Tracker',
    description:
      'A minimalist, user-friendly web application for tracking daily macronutrient intake. Features quick macro logging, real-time progress tracking, customizable targets, and offline support with Supabase integration.',
    technologies: [
      'Next.js 14',
      'Tailwind CSS',
      'Supabase',
      'shadcn/ui',
      'Zustand',
      'React Hook Form',
      'Zod',
      'PostgreSQL',
    ],
    imageUrl: getPlaceholderImage(800, 600, 'iprotein'),
    demoUrl: 'https://iprotein.vercel.app',
    caseStudySlug: 'iprotein-macro-tracker',
    featured: true,
    year: 2024,
  },
];
