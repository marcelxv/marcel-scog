import { AppLayout } from '@/components/layout/app-layout';
import { HeroSection } from '@/components/hero/hero-section';
import { AboutSection } from '@/components/about/about-section';
import { SkillsSection } from '@/components/skills/skills-section';
import { PortfolioSection } from '@/components/portfolio/portfolio-section';
import { ContactForm } from '@/components/contact/contact-form';
import type { SkillCategory } from '@/lib/types';
import { mockProjects } from '@/lib/mock-data';

// Marcel's actual technical skills from CV - simplified for better UX/SEO
const marcelSkillCategories: SkillCategory[] = [
  {
    category: 'Languages & Frameworks',
    skills: [
      {
        name: 'JavaScript',
        proficiency: 5,
        icon: 'javascript',
        description: 'Node.js, ES6+, modern JavaScript development',
      },
      {
        name: 'TypeScript',
        proficiency: 5,
        icon: 'typescript',
        description: 'Type-safe development and large-scale applications',
      },
      {
        name: 'React',
        proficiency: 5,
        icon: 'react',
        description: 'Component architecture, hooks, state management',
      },
      {
        name: 'Next.js',
        proficiency: 5,
        icon: 'nextjs',
        description: 'Full-stack React framework, SSR/SSG',
      },
      {
        name: 'Vue.js',
        proficiency: 4,
        icon: 'vue',
        description: 'Nuxt.js, progressive web applications',
      },
      {
        name: 'Python',
        proficiency: 4,
        icon: 'python',
        description: 'Backend development, AI integration',
      },
      {
        name: 'GraphQL',
        proficiency: 4,
        icon: 'graphql',
        description: 'API design, data fetching optimization',
      },
      {
        name: 'PHP',
        proficiency: 3,
        icon: 'php',
        description: 'Server-side scripting, web development',
      },
      {
        name: 'Rust',
        proficiency: 2,
        icon: 'rust',
        description: 'Systems programming (learning)',
      },
    ],
  },
  {
    category: 'Databases & Storage',
    skills: [
      {
        name: 'PostgreSQL',
        proficiency: 5,
        icon: 'postgresql',
        description: 'Advanced queries, performance optimization',
      },
      {
        name: 'MongoDB',
        proficiency: 4,
        icon: 'mongodb',
        description: 'Document databases, aggregation pipelines',
      },
      {
        name: 'Supabase',
        proficiency: 4,
        icon: 'supabase',
        description: 'Real-time databases, authentication',
      },
      {
        name: 'Firebase',
        proficiency: 3,
        icon: 'firebase',
        description: 'Cloud database, real-time sync',
      },
    ],
  },
  {
    category: 'Cloud & DevOps',
    skills: [
      {
        name: 'AWS',
        proficiency: 5,
        icon: 'aws',
        description: 'Lambda, EventBridge, CloudWatch, CodePipeline',
      },
      {
        name: 'Docker',
        proficiency: 4,
        icon: 'docker',
        description: 'Containerization, multi-stage builds',
      },
      {
        name: 'Kubernetes',
        proficiency: 4,
        icon: 'kubernetes',
        description: 'Container orchestration, scaling',
      },
      {
        name: 'CI/CD',
        proficiency: 5,
        icon: 'cicd',
        description: 'GitHub Actions, automated deployments',
      },
      {
        name: 'Vercel',
        proficiency: 4,
        icon: 'vercel',
        description: 'Frontend deployment, edge functions',
      },
      {
        name: 'Netlify',
        proficiency: 4,
        icon: 'netlify',
        description: 'JAMstack deployment, serverless functions',
      },
    ],
  },
  {
    category: 'AI & Automation',
    skills: [
      {
        name: 'Orkes/Conductor',
        proficiency: 4,
        icon: 'conductor',
        description: 'Workflow orchestration, business processes',
      },
      {
        name: 'Novu',
        proficiency: 4,
        icon: 'novu',
        description: 'Multi-channel notifications, real-time messaging',
      },
      {
        name: 'OpenAI API',
        proficiency: 4,
        icon: 'openai',
        description: 'AI integration, content generation',
      },
      {
        name: 'n8n',
        proficiency: 3,
        icon: 'n8n',
        description: 'Workflow automation, API integrations',
      },
      {
        name: 'Trigger.dev',
        proficiency: 3,
        icon: 'trigger',
        description: 'Background jobs, event processing',
      },
      {
        name: 'AI Agents',
        proficiency: 4,
        icon: 'ai',
        description: 'Human-AI collaboration, intelligent automation',
      },
    ],
  },
  {
    category: 'Architecture & Design',
    skills: [
      {
        name: 'Event-Driven Architecture',
        proficiency: 5,
        icon: 'events',
        description: 'Scalable, decoupled systems',
      },
      {
        name: 'Microservices',
        proficiency: 4,
        icon: 'microservices',
        description: 'Distributed system design',
      },
      {
        name: 'API Design',
        proficiency: 5,
        icon: 'api',
        description: 'RESTful APIs, GraphQL, API-first development',
      },
      {
        name: 'System Architecture',
        proficiency: 5,
        icon: 'architecture',
        description: 'Scalable, maintainable system design',
      },
      {
        name: 'Design Systems',
        proficiency: 4,
        icon: 'design-system',
        description: 'Component libraries, design consistency',
      },
      {
        name: 'UX Engineering',
        proficiency: 5,
        icon: 'ux',
        description: 'User-centered development approach',
      },
    ],
  },
  {
    category: 'Tools & Collaboration',
    skills: [
      {
        name: 'Figma',
        proficiency: 4,
        icon: 'figma',
        description: 'UI/UX design, prototyping, design systems',
      },
      {
        name: 'Git',
        proficiency: 5,
        icon: 'git',
        description: 'Version control, collaboration workflows',
      },
      {
        name: 'Jira',
        proficiency: 4,
        icon: 'jira',
        description: 'Project management, agile workflows',
      },
      {
        name: 'Notion',
        proficiency: 4,
        icon: 'notion',
        description: 'Documentation, team collaboration',
      },
      {
        name: 'Miro',
        proficiency: 4,
        icon: 'miro',
        description: 'Visual collaboration, system diagramming',
      },
      {
        name: 'Mermaid',
        proficiency: 4,
        icon: 'mermaid',
        description: 'Technical documentation, flowcharts',
      },
    ],
  },
];

export default function HomePage() {
  return (
    <AppLayout>
      {/* Hero Section with ID Card */}
      <HeroSection />

      {/* About Section with Timeline */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection skillCategories={marcelSkillCategories} />

      {/* Portfolio Section */}
      <PortfolioSection projects={mockProjects} />

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto lg:max-w-4xl">
            <h2 className="text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 sm:text-5xl">
              Hit me! 📧
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
              Have a project in mind or just want to say hello? I&apos;d love to
              hear from you. Fill out the form and I&apos;ll get back to you.
            </p>
            <div className="mt-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
