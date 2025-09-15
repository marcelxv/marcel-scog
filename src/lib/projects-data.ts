import type { Project } from './types';

const getPlaceholderImage = (
  width: number = 800,
  height: number = 600,
  seed: string
) => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

export const topOutcomes = {
  title: 'Recent Projects',
  subtitle:
    'Concise outcomes across marketplaces, SaaS, and platform work — with tech stacks for quick scanning.',
  highlights: [
    {
      category: 'Speed & Efficiency',
      metric:
        'Time-to-compliance 90 → 25 days (−72%); newsletter curation 3h → 5 min (−97%).',
    },
    {
      category: 'Reliability',
      metric:
        'Notifications at 99.9%+ SLO, p95 4s → 1s (−75%); automatic retries in event-driven flows.',
    },
    {
      category: 'Growth & Conversion',
      metric: 'Checkout conversion +20–35%; Shopify conversion +15–25% (est.).',
    },
  ],
};

export const projectsData: Project[] = [
  {
    id: 'food-b2b-marketplace',
    title: 'Food B2B Supplier Marketplace',
    description:
      'Launched a compliant B2B marketplace with secure authentication, end-to-end order flow, and supplier dashboards.',
    tags: ['Built from scratch', 'Beta'],
    techStack:
      'MedusaJS, Next.js, Supabase, secure auth, order flows, supplier dashboards',
    technologies: [
      'MedusaJS',
      'Next.js',
      'Supabase',
      'TypeScript',
      'PostgreSQL',
    ],
    problem:
      'Buyers and suppliers had fragmented, non-compliant channels with no single place to transact.',
    solution:
      'Launched a compliant B2B marketplace with secure authentication, end-to-end order flow, and supplier dashboards.',
    results: [
      { metric: 'Checkout time', value: '~5:00 → ~2:00 (−50–60%)' },
      { metric: 'Checkout conversion', value: '+20–35%' },
    ],
    imageUrl: getPlaceholderImage(800, 600, 'food-b2b'),
    featured: true,
    year: 2024,
  },
  {
    id: 'lms-knowledge-base',
    title: 'LMS & Knowledge Base System',
    description:
      'Centralized LMS with SSO and an integrated knowledge base/docs portal.',
    tags: ['Built from scratch', 'Production'],
    techStack: 'WordPress (LMS), SSO, knowledge base & docs portal',
    technologies: ['WordPress', 'PHP', 'MySQL', 'SSO', 'REST API'],
    problem:
      'Training, onboarding, and documentation were scattered; support volume was high.',
    solution:
      'Centralized LMS with SSO and an integrated knowledge base/docs portal.',
    results: [
      { metric: 'Monthly Active Users', value: '50+' },
      { metric: 'Course creators', value: '3' },
      { metric: 'Courses', value: '20+' },
      { metric: 'Support tickets', value: '−60%' },
      { metric: 'Onboarding time', value: '10 → 5 days' },
      { metric: 'NPS', value: '+10–15', estimated: true },
    ],
    imageUrl: getPlaceholderImage(800, 600, 'lms-knowledge'),
    featured: false,
    year: 2024,
  },
  {
    id: 'legal-saas-rag-ai',
    title: 'Legal SaaS with RAG + AI Agent (MVP)',
    description:
      'Implemented RAG pipelines over Supabase with LLM summarization to accelerate discovery and first drafts.',
    tags: ['Built from scratch', 'MVP', 'Compliance'],
    techStack:
      'Supabase, RAG pipelines, GPT/Claude for retrieval and summarization',
    technologies: [
      'Supabase',
      'Python',
      'OpenAI',
      'Claude',
      'PostgreSQL',
      'Vector DB',
    ],
    problem:
      'Legal teams spent hours searching case files and drafting summaries manually.',
    solution:
      'Implemented RAG pipelines over Supabase with LLM summarization to accelerate discovery and first drafts.',
    results: [
      { metric: 'Documents indexed', value: '500+' },
      { metric: 'Research time', value: '10h → 4–6h (−40–60%)' },
      { metric: 'First draft time', value: '~2h → ~15 min', estimated: true },
    ],
    imageUrl: getPlaceholderImage(800, 600, 'legal-saas'),
    featured: true,
    year: 2024,
  },
  {
    id: 'compliance-automation-ai',
    title: 'Compliance Automation with AI',
    description:
      'AI-powered classification/scoring with automated routing over n8n and Supabase.',
    tags: ['Built from scratch', 'Production', 'Compliance'],
    techStack:
      'OpenAI/Grok, n8n workflows, Supabase; schema-based classification & scoring',
    technologies: ['OpenAI', 'n8n', 'Supabase', 'Node.js', 'PostgreSQL'],
    problem:
      'Approval workflows were slow/expensive, with months-long lead times.',
    solution:
      'AI-powered classification/scoring with automated routing over n8n and Supabase.',
    results: [
      { metric: 'Flow automated', value: '30%' },
      { metric: 'Time-to-compliance', value: '90 → 25 days (−72%)' },
      { metric: 'Cost reduction', value: '−30–50%', estimated: true },
    ],
    imageUrl: getPlaceholderImage(800, 600, 'compliance-automation'),
    featured: true,
    year: 2024,
  },
  {
    id: 'supplier-portal-workflow',
    title: 'Supplier Portal with Workflow Orchestration',
    description:
      'Built a self-serve portal for document intake, approval routing, and AI scanning.',
    tags: ['Built from scratch', 'MVP'],
    techStack:
      'Supabase, n8n; AI-powered document intake, routing, and scanning',
    technologies: ['Supabase', 'n8n', 'Next.js', 'TypeScript', 'AI APIs'],
    problem:
      'Suppliers lacked visibility and automation in document exchange/approval.',
    solution:
      'Built a self-serve portal for document intake, approval routing, and AI scanning.',
    results: [
      { metric: 'Manual touches', value: '−70%' },
      { metric: 'Approval SLA', value: '~5d → ~2d' },
      { metric: 'Document loss', value: '≈ 0' },
    ],
    imageUrl: getPlaceholderImage(800, 600, 'supplier-portal'),
    featured: false,
    year: 2024,
  },
  {
    id: 'multichannel-notification',
    title: 'Multichannel Notification Platform',
    description:
      'Centralized orchestration with user preferences, channel failover, and real-time tracking.',
    tags: ['System improvement', 'Production'],
    techStack:
      'Novu orchestration; push, email, SMS, in-app; user prefs & real-time tracking',
    technologies: ['Novu', 'Node.js', 'Redis', 'PostgreSQL', 'WebSockets'],
    problem:
      'Critical updates were missed due to fragmented, unreliable delivery.',
    solution:
      'Centralized orchestration with user preferences, channel failover, and real-time tracking.',
    results: [
      { metric: 'Delivery SLO', value: '99.9%+' },
      { metric: 'p95 latency', value: '~4s → ~1s (−75%)' },
      { metric: 'Missed actions', value: '−20–35%', estimated: true },
    ],
    imageUrl: getPlaceholderImage(800, 600, 'notification-platform'),
    featured: true,
    year: 2024,
  },
  {
    id: 'shopify-store-theme',
    title: 'Shopify Store & Theme',
    description:
      'Developed a custom theme with performance budgets, UX improvements, and conversion best practices.',
    tags: ['Built from scratch', 'Performance & UX'],
    techStack: 'Shopify Liquid; performance and conversion optimization',
    technologies: [
      'Shopify',
      'Liquid',
      'JavaScript',
      'CSS',
      'Performance Optimization',
    ],
    problem:
      'The retailer needed a branded, high-performance online channel with low maintenance.',
    solution:
      'Developed a custom theme with performance budgets, UX improvements, and conversion best practices.',
    results: [
      { metric: 'Conversion', value: '+15–25%', estimated: true },
      { metric: 'Bounce rate', value: '−10–20%', estimated: true },
      {
        metric: 'Core Web Vitals (p75)',
        value: 'LCP ≤2.0s, INP ≤200ms, CLS ≤0.1',
      },
      { metric: '90-day revenue', value: '+10–20%', estimated: true },
    ],
    imageUrl: getPlaceholderImage(800, 600, 'shopify-store'),
    featured: false,
    year: 2024,
  },
  {
    id: 'erp-integration-layer',
    title: 'ERP Integration Layer',
    description:
      'Normalization layer with a common event schema and import wizard to automate posting and reconciliation.',
    tags: ['System improvement', 'Production'],
    techStack:
      'QuickBooks + third-party ERPs; common event schema; custom triggers; import wizard',
    technologies: [
      'QuickBooks API',
      'Node.js',
      'PostgreSQL',
      'REST APIs',
      'TypeScript',
    ],
    problem:
      'Partners manually created invoices/receipts after SaaS operations, causing inconsistent data.',
    solution:
      'Normalization layer with a common event schema and import wizard to automate posting and reconciliation.',
    results: [
      { metric: 'Partner onboarding', value: '~1 week → ~30 min (−96%)' },
      { metric: 'Reconciliation errors', value: '−40–60%', estimated: true },
    ],
    imageUrl: getPlaceholderImage(800, 600, 'erp-integration'),
    featured: false,
    year: 2024,
  },
  {
    id: 'event-driven-migration',
    title: 'Event-Driven System Migration',
    description:
      'Migrated to an event-driven architecture with durable queues, retries, and end-to-end observability.',
    tags: ['System improvement', 'Event-driven'],
    techStack:
      'MongoDB Change Streams, AWS EventBridge, n8n; observability, retries, alerting',
    technologies: [
      'MongoDB',
      'AWS EventBridge',
      'n8n',
      'Node.js',
      'CloudWatch',
    ],
    problem:
      'Cron/batch jobs missed events and limited scalability/reliability.',
    solution:
      'Migrated to an event-driven architecture with durable queues, retries, and end-to-end observability.',
    results: [
      { metric: 'Automatic retries', value: 'Per-execution' },
      { metric: 'MTTR', value: '~2h → ~12 min (−90%)' },
      { metric: 'MTTD', value: '−60–80%', estimated: true },
    ],
    imageUrl: getPlaceholderImage(800, 600, 'event-driven'),
    featured: true,
    year: 2024,
  },
  {
    id: 'newsletter-curator-agent',
    title: 'Newsletter Curator Generator Agent',
    description:
      'Built an agent that aggregates sources by keywords, queues drafts, and automates delivery.',
    tags: ['Built from scratch', 'Production'],
    techStack:
      'Trigger.dev agent; scraping pipelines; Supabase; Mailchimp/Resend',
    technologies: [
      'Trigger.dev',
      'Node.js',
      'Supabase',
      'Mailchimp',
      'Web Scraping',
    ],
    problem: 'Teams struggled to curate and send newsletters consistently.',
    solution:
      'Built an agent that aggregates sources by keywords, queues drafts, and automates delivery.',
    results: [
      { metric: 'Curation time', value: '~3h → ~5 min (−97%)' },
      { metric: 'On-time send SLA', value: '>95%' },
    ],
    imageUrl: getPlaceholderImage(800, 600, 'newsletter-curator'),
    featured: false,
    year: 2024,
  },
  {
    id: 'lead-generator-token',
    title: 'Lead Generator Token System',
    description:
      'Token-based activation with credit management and geo targeting to launch by neighborhood/city.',
    tags: ['Built from scratch', 'MVP'],
    techStack:
      'Stripe credits, Supabase multi-tenant, Google/GCP geo-targeting, Next.js microfrontends',
    technologies: [
      'Stripe',
      'Supabase',
      'Next.js',
      'Google Maps API',
      'Microfrontends',
    ],
    problem:
      'Businesses needed hyper-local lead generation without budget waste.',
    solution:
      'Token-based activation with credit management and geo targeting to launch by neighborhood/city.',
    results: [
      { metric: 'Research time', value: '4h → 5 min (−98%)' },
      { metric: 'Activation time', value: '1d → 10 min', estimated: true },
      { metric: 'CAC', value: '−20%', estimated: true },
      { metric: 'Local conversion', value: '+30%', estimated: true },
    ],
    imageUrl: getPlaceholderImage(800, 600, 'lead-generator'),
    featured: false,
    year: 2024,
  },
  {
    id: 'rust-pdf-extractor',
    title: 'Rust-Based PDF Text & OCR Extraction Service',
    description:
      'Built a high-performance extractor with OCR fallback, structured tracing, and resource controls.',
    tags: ['Built from scratch', 'Production'],
    techStack:
      'Rust HTTP service, Tesseract OCR fallback, API keys, rate limiting, tracing (Railway)',
    technologies: [
      'Rust',
      'Tesseract OCR',
      'HTTP',
      'Railway',
      'Performance Optimization',
    ],
    problem:
      'Existing parsers were slow, costly, and unreliable at scale for mixed digital/scanned PDFs.',
    solution:
      'Built a high-performance extractor with OCR fallback, structured tracing, and resource controls.',
    results: [
      { metric: 'Concurrent requests', value: '100+' },
      { metric: 'Throughput', value: '+200–400%', estimated: true },
      { metric: 'Cost/1k pages', value: '−50–70%', estimated: true },
      { metric: 'p95 latency', value: '1.2s → 300ms (−75%)' },
    ],
    metrics: [
      {
        label: 'Text extraction (vs LlamaParse)',
        before: '8,530 ms',
        after: '3,087 ms',
        improvement: '~2.8× faster',
        type: 'time',
      },
      {
        label: 'Total processing',
        before: '23,589 ms',
        after: '31,929 ms',
        improvement: '~35% slower (optimization needed)',
        type: 'time',
      },
    ],
    imageUrl: getPlaceholderImage(800, 600, 'rust-pdf'),
    featured: true,
    year: 2024,
  },
  {
    id: 'iprotein-macro-tracker',
    title: 'iProtein Macro Tracker',
    description:
      'A minimalist, user-friendly web application for tracking daily macronutrient intake.',
    tags: ['Built from scratch', 'Production'],
    techStack:
      'Next.js 14, Tailwind CSS, Supabase, shadcn/ui, Zustand, React Hook Form, Zod, PostgreSQL',
    technologies: [
      'Next.js 14',
      'Tailwind CSS',
      'Supabase',
      'shadcn/ui',
      'Zustand',
    ],
    problem:
      'Users needed a simple, fast way to track macros without complex features.',
    solution:
      'Built a minimalist PWA with quick logging, real-time progress, and offline support.',
    results: [
      {
        metric: 'Features',
        value: 'Quick macro logging, customizable targets, offline support',
      },
      { metric: 'Performance', value: 'Instant loading, PWA ready' },
    ],
    imageUrl: getPlaceholderImage(800, 600, 'iprotein'),
    demoUrl: 'https://iprotein.vercel.app',
    featured: false,
    year: 2024,
  },
];
