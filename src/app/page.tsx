import { AppLayout } from '@/components/layout/app-layout';
import { HeroSection } from '@/components/hero/hero-section';
import { AboutSection } from '@/components/about/about-section';
import { SkillsSection } from '@/components/skills/skills-section';
import { PortfolioSectionEnhanced } from '@/components/portfolio/portfolio-section-enhanced';
import { ContactForm } from '@/components/contact/contact-form';
import { BookCallSection } from '@/components/contact/book-call-section';
import { ContactScheduleSwitcher } from '@/components/contact/contact-schedule-switcher';
import type { SkillCategory } from '@/lib/types';
import { projectsData, topOutcomes } from '@/lib/projects-data';
import { KnowledgeSection } from '@/components/knowledge/knowledge-section';

// Marcel's actual technical skills from CV - simplified for better UX/SEO
const marcelSkillCategories: SkillCategory[] = [
  {
    category: 'Languages & Frameworks',
    skills: [
      {
        name: 'JavaScript',
        proficiency: 5,
        icon: 'javascript',
        description:
          'Node.js, React, Next.js, Vue, TypeScript - Expert level full-stack development',
      },
      {
        name: 'Python',
        proficiency: 3,
        icon: 'python',
        description: 'Backend development, AI integration, automation scripts',
      },
      {
        name: 'PHP',
        proficiency: 3,
        icon: 'php',
        description:
          'Server-side scripting, web development, legacy system maintenance',
      },
      {
        name: 'GraphQL',
        proficiency: 3,
        icon: 'graphql',
        description:
          'API design, data fetching optimization, schema development',
      },
      {
        name: 'Rust',
        proficiency: 3,
        icon: 'rust',
        description:
          'Systems programming (in progress), performance-critical applications',
      },
    ],
  },
  {
    category: 'Frontend & UX Tools',
    skills: [
      {
        name: 'Figma',
        proficiency: 3,
        icon: 'figma',
        description:
          'Design systems, prototyping, collaborative design workflows',
      },
      {
        name: 'Design Systems',
        proficiency: 3,
        icon: 'designsystems',
        description:
          'Component libraries, consistent UI patterns, accessibility',
      },
      {
        name: 'Responsive Design',
        proficiency: 3,
        icon: 'responsivedesign',
        description: 'Mobile-first development, cross-browser compatibility',
      },
      {
        name: 'Markdown',
        proficiency: 3,
        icon: 'markdown',
        description: 'Documentation, content management, technical writing',
      },
      {
        name: 'Mermaid Diagrams',
        proficiency: 3,
        icon: 'mermaiddiagrams',
        description:
          'System architecture visualization, workflow documentation',
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
        description:
          'Advanced queries, performance optimization, data modeling',
      },
      {
        name: 'MongoDB',
        proficiency: 3,
        icon: 'mongodb',
        description: 'Document databases, aggregation pipelines, schema design',
      },
      {
        name: 'Supabase',
        proficiency: 3,
        icon: 'supabase',
        description: 'Real-time databases, authentication, edge functions',
      },
      {
        name: 'Firebase',
        proficiency: 3,
        icon: 'firebase',
        description: 'Cloud database, real-time sync, serverless functions',
      },
      {
        name: 'Redis',
        proficiency: 3,
        icon: 'redis',
        description: 'In-memory data structures, caching, pub/sub messaging',
      },
    ],
  },
  {
    category: 'Cloud & DevOps',
    skills: [
      {
        name: 'AWS',
        proficiency: 3,
        icon: 'aws',
        description:
          'Lambda, EventBridge, CloudWatch, CodePipeline - Event-driven architecture',
      },
      {
        name: 'Docker',
        proficiency: 3,
        icon: 'docker',
        description: 'Containerization, multi-stage builds, orchestration',
      },
      {
        name: 'Vercel',
        proficiency: 3,
        icon: 'vercel',
        description:
          'Frontend deployment, edge functions, performance optimization',
      },
      {
        name: 'CI/CD',
        proficiency: 3,
        icon: 'cicd',
        description: 'GitHub Actions, automated deployments, testing pipelines',
      },
      {
        name: 'GitHub',
        proficiency: 3,
        icon: 'github',
        description: 'Version control, collaboration, project management',
      },
    ],
  },
  {
    category: 'AI & Automation',
    skills: [
      {
        name: 'Orkes/Conductor',
        proficiency: 3,
        icon: 'orkesconductor',
        description: 'Workflow orchestration, business process automation',
      },
      {
        name: 'Novu',
        proficiency: 3,
        icon: 'novu',
        description: 'Multi-channel notifications, real-time messaging systems',
      },
      {
        name: 'n8n',
        proficiency: 3,
        icon: 'n8n',
        description: 'Workflow automation, API integrations, data processing',
      },
      {
        name: 'Trigger.dev',
        proficiency: 3,
        icon: 'triggerdev',
        description: 'Background jobs, event processing, scheduled tasks',
      },
      {
        name: 'OpenAI API',
        proficiency: 3,
        icon: 'openaiapi',
        description:
          'AI integration, content generation, intelligent automation',
      },
      {
        name: 'AI-based data enrichment',
        proficiency: 3,
        icon: 'aibaseddataenrichment',
        description: 'Smart notification systems, automated decision making',
      },
    ],
  },
  {
    category: 'Architecture & Product',
    skills: [
      {
        name: 'Event-driven systems',
        proficiency: 3,
        icon: 'eventdrivensystems',
        description: 'Scalable, decoupled architecture patterns',
      },
      {
        name: 'Microservices',
        proficiency: 3,
        icon: 'microservices',
        description: 'Distributed system design, service communication',
      },
      {
        name: 'API-first design',
        proficiency: 3,
        icon: 'apifirstdesign',
        description: 'RESTful services, GraphQL schemas, documentation',
      },
      {
        name: 'AI-embedded agents',
        proficiency: 3,
        icon: 'aiembeddedagents',
        description: 'Human-AI collaboration, intelligent automation',
      },
      {
        name: 'UX-focused development',
        proficiency: 3,
        icon: 'uxfocuseddevelopment',
        description: 'User-centered design, accessibility, performance',
      },
      {
        name: 'Modular Component Patterns (MCPs)',
        proficiency: 3,
        icon: 'modularcomponentpatternsmcps',
        description: 'Reusable, maintainable code architecture',
      },
      {
        name: 'Linear / Notion / Jira',
        proficiency: 3,
        icon: 'linearnotionjira',
        description: 'Agile project management, documentation, workflow',
      },
    ],
  },
];

export default function HomePage() {
  return (
    <AppLayout>
      {/* Hero Section with ID Card */}
      <HeroSection />

      {/* Book a Call Section (high priority) */}
      <BookCallSection />

      {/* About Section with Timeline */}
      <AboutSection />

      {/* Knowledge Section (Studies + Blog) */}
      <KnowledgeSection />

      {/* Skills Section */}
      <SkillsSection skillCategories={marcelSkillCategories} />

      {/* Portfolio Section */}
      <PortfolioSectionEnhanced
        projects={projectsData}
        overview={topOutcomes}
      />

      {/* Contact Section with toggle between form and schedule + illustration on the left */}
      <section id="contact" className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 sm:text-5xl">
              Hit me! 📧
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
              Have a project in mind or just want to say hello? Use the contact
              form or schedule a time directly — whatever you prefer.
            </p>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left illustration */}
              <div className="hidden lg:flex items-center justify-center bg-neutral-100 dark:bg-neutral-700 rounded-3xl overflow-hidden h-[620px] md:h-[740px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/marcel-scog-bg.jpeg"
                  alt="Illustration accompanying contact methods"
                  className="object-cover w-full h-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Right: toggle between form and schedule */}
              <div className="w-full">
                <ContactScheduleSwitcher compact />
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
