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
        name: 'TypeScript/JavaScript',
        proficiency: 3,
        icon: 'typescriptjavascript',
        description: 'Node.js, NestJS, Next.js, React, TypeScript (Strict Mode)',
      },
      {
        name: 'Database & ORM',
        proficiency: 3,
        icon: 'databaseorm',
        description: 'PostgreSQL, Prisma (TypedSQL), MongoDB, Supabase, Redis',
      },
      {
        name: 'API & Contracts',
        proficiency: 3,
        icon: 'apicontracts',
        description: 'ts-rest, Zod, GraphQL, REST (JSON:API), OpenAPI/Swagger',
      },
      {
        name: 'Python',
        proficiency: 3,
        icon: 'python',
        description: 'Backend development, AI integration, automation scripts',
      }
    ],
  },
  {
    category: 'AI & Automation',
    skills: [
      {
        name: 'LLM Orchestration',
        proficiency: 3,
        icon: 'llmorchestration',
        description: 'RAG, Prompt chaining, Deterministic LLM, GPT, Anthropic, Mistral',
      },
      {
        name: 'Document Processing',
        proficiency: 3,
        icon: 'documentprocessing',
        description: 'OCR (Vision-based), Field Extraction, Rules Engines',
      },
      {
        name: 'Automation Tools',
        proficiency: 3,
        icon: 'automationtools',
        description: 'Orkes/Conductor, Novu, n8n, Trigger.dev',
      },
      {
        name: 'Evaluation',
        proficiency: 3,
        icon: 'evaluation',
        description: 'AI-based data enrichment, Backtesting and LLM evaluation scripts',
      }
    ],
  },
  {
    category: 'Cloud, DevOps & Observability',
    skills: [
      {
        name: 'AWS',
        proficiency: 3,
        icon: 'aws',
        description: 'EventBridge, SQS, S3, RDS, SSM, Lambda - Event-driven architecture',
      },
      {
        name: 'Infrastructure as Code',
        proficiency: 3,
        icon: 'infrastructureascode',
        description: 'Terraform, LocalStack (AWS emulation)',
      },
      {
        name: 'Observability',
        proficiency: 3,
        icon: 'observability',
        description: 'Datadog (Tracing, Metrics, Monitors)',
      },
      {
        name: 'Tooling',
        proficiency: 3,
        icon: 'tooling',
        description: 'Docker, GitHub Actions, LaunchDarkly (Feature Flags)',
      }
    ],
  },
  {
    category: 'Architecture & Practices',
    skills: [
      {
        name: 'System Design',
        proficiency: 3,
        icon: 'systemdesign',
        description: 'Three-tier architecture, Repository pattern, Domain Objects (DOs)',
      },
      {
        name: 'Async Systems',
        proficiency: 3,
        icon: 'asyncsystems',
        description: 'Background jobs, idempotent consumers, cross-service messaging',
      },
      {
        name: 'Quality',
        proficiency: 3,
        icon: 'quality',
        description: 'Jest, TDD, strict type safety, 100% logic coverage targets',
      },
      {
        name: 'UX & Design',
        proficiency: 3,
        icon: 'uxdesign',
        description: 'Figma, Design Systems, Responsive Design, Accessibility',
      }
    ],
  }
];

export default function HomePage() {
  return (
    <AppLayout>
      {/* Hero Section with ID Card */}
      <HeroSection />

      {/* About Section with Timeline */}
      <AboutSection />

      {/* Knowledge Section (Studies + Blog) - Prioritized to show authority */}
      <KnowledgeSection />

      {/* Book a Call Section - Simple solid background */}
      <BookCallSection />

      {/* Portfolio Section */}
      <PortfolioSectionEnhanced
        projects={projectsData}
        overview={topOutcomes}
      />

      {/* Skills Section */}
      <SkillsSection skillCategories={marcelSkillCategories} />

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
