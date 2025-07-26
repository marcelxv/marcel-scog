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
    title: 'AI-Powered Food Safety Automation',
    description:
      'Built AI-powered automation agents for regulatory compliance in food safety SaaS, featuring workflow orchestration and real-time notifications.',
    technologies: [
      'Node.js',
      'TypeScript',
      'Orkes/Conductor',
      'Novu',
      'AWS Lambda',
      'EventBridge',
      'PostgreSQL',
    ],
    imageUrl: getPlaceholderImage(800, 600, 'foodsafety'),
    githubUrl: 'https://github.com/marcelscognamiglio/foodready-automation',
    caseStudySlug: 'foodready-automation',
    featured: true,
    company: 'FoodReady',
    year: 2024,
  },
  {
    id: '2',
    title: 'Full-Stack Monorepo Platform',
    description:
      'Technical lead for a comprehensive full-stack platform built with Next.js, GraphQL, and MongoDB, focusing on performance and user experience.',
    technologies: [
      'Next.js',
      'GraphQL',
      'MongoDB',
      'TypeScript',
      'React',
      'Node.js',
    ],
    imageUrl: getPlaceholderImage(800, 600, 'monorepo'),
    githubUrl: 'https://github.com/marcelscognamiglio/synthetic-platform',
    caseStudySlug: 'synthetic-platform',
    featured: true,
    company: 'Synthetic Systems',
    year: 2023,
  },
  {
    id: '3',
    title: 'Educational Marketplace Platform',
    description:
      'Developed frontend features for educational marketplace with SEO improvements and Core Web Vitals optimization.',
    technologies: [
      'Vue.js',
      'Nuxt.js',
      'React',
      'TypeScript',
      'Node.js',
      'Ruby on Rails',
      'PostgreSQL',
    ],
    imageUrl: getPlaceholderImage(800, 600, 'education'),
    githubUrl: 'https://github.com/marcelscognamiglio/quero-educacao',
    featured: true,
    company: 'Quero Educação',
    year: 2022,
  },
  {
    id: '4',
    title: 'Event-Driven Architecture Migration',
    description:
      'Led migration from cron-based systems to event-driven architecture using AWS Lambda, EventBridge, and PostgreSQL for improved scalability.',
    technologies: [
      'AWS Lambda',
      'EventBridge',
      'PostgreSQL',
      'Node.js',
      'TypeScript',
      'CloudWatch',
    ],
    imageUrl: getPlaceholderImage(800, 600, 'eventdriven'),
    githubUrl: 'https://github.com/marcelscognamiglio/event-architecture',
    featured: false,
    company: 'FoodReady',
    year: 2024,
  },
  {
    id: '5',
    title: 'Database Migration & Optimization',
    description:
      'Led database migration from MongoDB to PostgreSQL, improving performance and consistency across large-scale data.',
    technologies: [
      'PostgreSQL',
      'MongoDB',
      'Node.js',
      'TypeScript',
      'AWS',
      'Docker',
    ],
    imageUrl: getPlaceholderImage(800, 600, 'database'),
    githubUrl: 'https://github.com/marcelscognamiglio/db-migration',
    featured: false,
    company: 'FoodReady',
    year: 2024,
  },
  {
    id: '6',
    title: 'CI/CD Pipeline Implementation',
    description:
      'Set up comprehensive CI/CD pipelines with AWS, Docker, and Kubernetes for automated deployment and improved development workflow.',
    technologies: [
      'AWS',
      'Docker',
      'Kubernetes',
      'GitHub Actions',
      'CodePipeline',
      'Terraform',
    ],
    imageUrl: getPlaceholderImage(800, 600, 'cicd'),
    githubUrl: 'https://github.com/marcelscognamiglio/cicd-pipeline',
    featured: false,
    company: 'Quero Educação',
    year: 2023,
  },
  {
    id: '7',
    title: 'Proprietary Authentication System',
    description:
      'Replaced third-party auth service with a secure, proprietary solution, integrated across multiple applications.',
    technologies: [
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'JWT',
      'OAuth2',
      'AWS',
    ],
    imageUrl: getPlaceholderImage(800, 600, 'auth'),
    githubUrl: 'https://github.com/marcelscognamiglio/auth-system',
    featured: false,
    company: 'FoodReady',
    year: 2024,
  },
  {
    id: '8',
    title: 'AI-Embedded Development Workflow',
    description:
      'Led AI-driven development inside small cross-functional squads, building secure, clean, human-integrated code alongside AI agents.',
    technologies: [
      'OpenAI API',
      'GitHub Copilot',
      'TypeScript',
      'Python',
      'Node.js',
      'AI Automation',
    ],
    imageUrl: getPlaceholderImage(800, 600, 'aiworkflow'),
    githubUrl: 'https://github.com/marcelscognamiglio/ai-development',
    featured: false,
    company: 'FoodReady',
    year: 2024,
  },
];
