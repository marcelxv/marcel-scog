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

      {/* Skills Section */}
      <section
        id="skills"
        className="min-h-screen flex items-center justify-center bg-primary-100 dark:bg-primary-800"
      >
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-700 dark:text-primary-300 mb-8">
              Skills & Expertise
            </h2>
            <div className="card max-w-3xl mx-auto p-8">
              <p className="text-lg text-text-800 dark:text-text-200 mb-6">
                This section will showcase Marcel&apos;s technical skills with
                interactive visualizations and proficiency indicators.
              </p>
              <p className="text-sm text-text-600 dark:text-text-400">
                The scroll progress indicator at the top shows your current
                position on the page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <PortfolioSection projects={mockProjects} />

      {/* Blog Section */}
      <section
        id="blog"
        className="min-h-screen flex items-center justify-center bg-secondary-200 dark:bg-secondary-700"
      >
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-secondary-800 dark:text-secondary-200 mb-8">
              Blog & Writing
            </h2>
            <div className="card max-w-3xl mx-auto p-8">
              <p className="text-lg text-text-800 dark:text-text-200 mb-6">
                This section will feature Marcel&apos;s technical writing, blog
                posts, and thought leadership content.
              </p>
              <p className="text-sm text-text-600 dark:text-text-400">
                The mobile menu provides a full-screen navigation experience on
                smaller devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center bg-primary-200 dark:bg-primary-700"
      >
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-800 dark:text-primary-200 mb-8">
              Get In Touch
            </h2>
            {/* Contact Section */}
            <section
              id="contact"
              className="min-h-screen flex items-center justify-center bg-accent-50 dark:bg-accent-900"
            >
              <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary-800 dark:text-primary-200">
                    Contact Marcel
                  </h2>
                  <p className="text-center text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                    Fill out the form below to get in touch. I usually respond
                    within 1-2 business days.
                  </p>
                  <ContactForm />
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
